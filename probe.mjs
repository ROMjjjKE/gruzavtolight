import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text()); });
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4220/gruzavtolight/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Грузоперевозки до пяти тонн, борт 6,20 × 2,25 м, пиломатериал';
  const w = f => { c.font = `40px "${f}"`; return +c.measureText(s).width.toFixed(1); };
  return {
    widths: Object.fromEntries(['Bitter', 'Inter Tight', 'Arial', 'Georgia'].map(f => [f, w(f)])),
    h1: document.querySelector('h1').innerText, cls: +window.__s.reduce((a, b) => a + b, 0).toFixed(4),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
    bed: document.querySelector('.bed').className,
  };
}), null, 1), errs.slice(0, 3));
await b.close();
