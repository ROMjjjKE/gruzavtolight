import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('requestfailed', r => errs.push('req:' + r.url().split('/').pop()));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('https://romjjjke.github.io/gruzavtolight/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
console.log(await p.evaluate(() => ({
  h1: document.querySelector('h1').innerText,
  font: getComputedStyle(document.querySelector('h1')).fontFamily,
  fontOk: document.fonts.check('700 40px Bitter'),
  tel: document.querySelector('.hdr__tel').getAttribute('href'),
  imgW: document.querySelector('.hero__shot img').naturalWidth,
  sw: document.documentElement.scrollWidth, fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
})), 'errors:', errs.slice(0, 3));
await b.close();
