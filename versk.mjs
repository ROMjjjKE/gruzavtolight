import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4220/gruzavtolight/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));
  const st = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, inner: window.innerWidth, h1: getComputedStyle(document.querySelector('h1')).fontSize, img: document.querySelector('.hero__shot img').getBoundingClientRect().width }));
  console.log(String(w).padStart(4), st.sw, st.sw > st.inner ? 'OVERFLOW' : 'ok', st.h1, 'img', Math.round(st.img), errs[0] || '');
  await p.close();
}
// пин-сцена
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4220/gruzavtolight/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
const top = await p.evaluate(() => document.querySelector('.bed__grid').getBoundingClientRect().top + window.scrollY);
for (let i = 0; i <= 6; i++) {
  await p.evaluate(y => window.scrollTo(0, y), top + i * 260);
  await new Promise(r => setTimeout(r, 550));
  console.log(i * 260, await p.evaluate(() => ({ y: Math.round(document.querySelector('.bed__grid').getBoundingClientRect().top), m: document.querySelector('.bed__meter').innerText.replace(/\s/g, ''), step: document.querySelector('.bed__step').innerText.slice(0, 12) })));
}
await b.close();
