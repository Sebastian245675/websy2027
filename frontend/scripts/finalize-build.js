// Runs after react-snap ("postbuild").
// 1) Moves the prerendered 404 page to build/404.html, which nginx serves with a real 404 status
//    (deploy/nginx-site.conf). /404 itself must not exist as a 200 page.
// 2) Fails the build if any route from reactSnap.include was not prerendered. nginx only serves
//    prerendered routes, so a react-snap run that crashes halfway (it happened: 40 of 182 pages)
//    would publish hundreds of 404s. Better to stop here than to deploy that.
const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const notFoundDir = path.join(BUILD, '404');
const notFoundSrc = path.join(notFoundDir, 'index.html');
if (!fs.existsSync(notFoundSrc)) {
  console.error('finalize-build: react-snap did not prerender /404');
  process.exit(1);
}
fs.renameSync(notFoundSrc, path.join(BUILD, '404.html'));
fs.rmSync(notFoundDir, { recursive: true, force: true });

const routeFile = (route) => (route === '/' ? path.join(BUILD, 'index.html') : path.join(BUILD, route, 'index.html'));
const missing = pkg.reactSnap.include.filter((route) => route !== '/404' && !fs.existsSync(routeFile(route)));
if (missing.length) {
  console.error(`finalize-build: ${missing.length} routes were not prerendered:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

console.log(`finalize-build: 404.html ready, ${pkg.reactSnap.include.length - 1} routes prerendered`);
