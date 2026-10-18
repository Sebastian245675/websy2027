const fs = require('fs');
const http = require('http');
const path = require('path');
const puppeteer = require('puppeteer');

const buildRoot = path.resolve(__dirname, '..', 'build');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let filePath = path.join(buildRoot, requestPath === '/' ? 'index.html' : requestPath);
  if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
  if (!filePath.startsWith(buildRoot)) return response.writeHead(403).end();

  fs.readFile(filePath, (error, data) => {
    const send = (body, resolvedPath) => {
      response.setHeader('Content-Type', contentTypes[path.extname(resolvedPath)] || 'application/octet-stream');
      response.end(body);
    };
    if (!error) return send(data, filePath);
    fs.readFile(path.join(buildRoot, 'index.html'), (fallbackError, fallback) => {
      if (fallbackError) return response.writeHead(404).end();
      send(fallback, path.join(buildRoot, 'index.html'));
    });
  });
});

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const run = async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  try {
    const page = await browser.newPage();
    const runtimeErrors = [];
    page.on('pageerror', (error) => {
      if (/hydration|did not match|react/i.test(error.message)) runtimeErrors.push(error.stack || error.message);
    });
    page.on('console', (message) => {
      if (message.type() === 'error' && /hydration|did not match|uncaught/i.test(message.text())) {
        runtimeErrors.push(message.text());
      }
    });
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`http://127.0.0.1:${port}/?pais=ar`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      localStorage.removeItem('websy_language');
      localStorage.setItem('websy_country', 'AR');
    });
    await page.reload({ waitUntil: 'networkidle0' });

    await page.evaluate(() => document.querySelector('button[aria-label="Seleccionar idioma"]').click());
    await page.waitForSelector('button[role="option"]');
    await page.evaluate(() => {
      [...document.querySelectorAll('button[role="option"]')]
        .find((element) => element.textContent.includes('English'))
        .click();
    });
    await page.waitForFunction(() => {
      const heading = document.querySelector('h1');
      return heading && heading.textContent.includes('Websites and systems');
    });

    const desktop = await page.evaluate(() => ({
      heading: document.querySelector('h1') && document.querySelector('h1').textContent,
      htmlLanguage: document.documentElement.lang,
      storedLanguage: localStorage.getItem('websy_language'),
      servicesTranslated: [...document.querySelectorAll('nav a')]
        .some((element) => element.textContent.trim() === 'Services'),
    }));
    assert(desktop.htmlLanguage === 'en', 'The document language did not change to English');
    assert(desktop.storedLanguage === 'en', 'English was not saved');
    assert(desktop.servicesTranslated, 'The desktop navigation did not translate');

    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForFunction(() => {
      const heading = document.querySelector('h1');
      return heading && heading.textContent.includes('Websites and systems');
    });
    assert(await page.evaluate(() => localStorage.getItem('websy_language') === 'en'), 'English did not persist after reload');

    await page.goto(`http://127.0.0.1:${port}/contacto`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => {
      const heading = document.querySelector('h1');
      return heading && heading.textContent.includes("Let's talk about your project");
    });
    const contactTranslated = await page.evaluate(() => document.body.textContent.includes('Request a free website audit'));
    assert(contactTranslated, 'The contact page did not restore its English copy');

    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.querySelector('button[aria-label="Open or close menu"]').click());
    await page.waitForSelector('div[role="listbox"] button[role="option"]');
    await page.evaluate(() => {
      [...document.querySelectorAll('div[role="listbox"] button[role="option"]')]
        .find((element) => element.textContent.includes('Español'))
        .click();
    });
    await page.waitForFunction(() => {
      const heading = document.querySelector('h1');
      return heading && heading.textContent.includes('Webs y sistemas');
    });

    const mobile = await page.evaluate(() => ({
      heading: document.querySelector('h1') && document.querySelector('h1').textContent,
      htmlLanguage: document.documentElement.lang,
      storedLanguage: localStorage.getItem('websy_language'),
    }));
    assert(mobile.htmlLanguage === 'es', 'The document language did not return to Spanish');
    assert(mobile.storedLanguage === 'es', 'Spanish was not saved from the mobile menu');
    assert(runtimeErrors.length === 0, `Runtime errors detected: ${runtimeErrors.join(' | ')}`);

    console.log('verify-translator: desktop, persistence, contact page, mobile and hydration OK');
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
};

run().catch((error) => {
  console.error(`verify-translator: ${error.message}`);
  server.close(() => process.exit(1));
});
