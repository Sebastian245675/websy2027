#!/usr/bin/env node
// Production deploy entry point. npm automatically runs predeploy (full build + local gate)
// before this file and postdeploy (the complete live SEO audit) after it succeeds.
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SERVER = process.env.WEBSY_DEPLOY_SERVER || 'root@2.24.100.82';
const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
const release = `websy-${stamp}`;
const archive = path.join(ROOT, `${release}.tar`);

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: 'inherit', shell: false });
  if (result.status !== 0) process.exit(result.status || 1);
};

run('node', [path.join('scripts', 'verify-build.js')]);
run('tar', ['-cf', archive, '-C', 'build', '.']);
try {
  run('scp', [
    archive,
    path.join('deploy', 'nginx-site.conf'),
    path.join('deploy', 'websysrl-redirects.conf'),
    path.join('deploy', 'websysrl-proxy.conf'),
    `${SERVER}:/root/apps/websysrl/releases/`,
  ]);

  const remote = `set -e
cd /root/apps/websysrl
release='${release}'
archive="releases/${release}.tar"
target="releases/${release}"
backup="backups/site-pre-${release}"
test ! -e "$target"
test ! -e "$backup"
if tar -tf "$archive" | grep -Eq '(^/|(^|/)\\.\\.(/|$))'; then echo unsafe_archive; exit 1; fi
mkdir "$target"
tar -xf "$archive" -C "$target"
test -s "$target/index.html"
test -s "$target/404.html"
expected=$(grep -c '<loc>' "$target/sitemap.xml")
actual=0
while IFS= read -r url; do
  route=\${url#https://www.websysrl.com}
  if [ "$route" = / ]; then file="$target/index.html"; else file="$target$route/index.html"; fi
  test -s "$file"
  actual=$((actual + 1))
done < <(sed -n 's:.*<loc>\\(.*\\)</loc>.*:\\1:p' "$target/sitemap.xml")
test "$actual" -eq "$expected"
cp site.conf "backups/site.conf-pre-${release}"
cp /root/apps/inmobiliaria/deploy/nginx/websysrl.conf "backups/websysrl.conf-pre-${release}"
cp releases/nginx-site.conf site.conf
cat releases/websysrl-redirects.conf releases/websysrl-proxy.conf > /root/apps/inmobiliaria/deploy/nginx/websysrl.conf
mv site "$backup"
mv "$target" site
rollback() {
  rm -rf "releases/${release}-failed"
  mv site "releases/${release}-failed" || true
  mv "$backup" site || true
  cp "backups/site.conf-pre-${release}" site.conf || true
  cp "backups/websysrl.conf-pre-${release}" /root/apps/inmobiliaria/deploy/nginx/websysrl.conf || true
  docker compose up -d --force-recreate site || true
  docker exec inmobiliaria_web nginx -s reload || true
}
if ! docker compose up -d --force-recreate site; then rollback; exit 1; fi
if ! docker exec websysrl_site nginx -t; then rollback; exit 1; fi
if ! docker exec inmobiliaria_web nginx -t; then rollback; exit 1; fi
docker exec inmobiliaria_web nginx -s reload
echo "DEPLOY_OK release=$release sitemap_urls=$expected"`;
  // Send the script as base64 so Windows/OpenSSH cannot reinterpret multiline quoting.
  const payload = Buffer.from(remote, 'utf8').toString('base64');
  run('ssh', [SERVER, `printf '%s' '${payload}' | base64 -d | bash`]);
} finally {
  fs.rmSync(archive, { force: true });
}
