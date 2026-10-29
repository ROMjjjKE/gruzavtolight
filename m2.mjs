import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4220/gruzavtolight/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 600));
console.log(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Грузоперевозки до 5 тонн в Минске борт 6,20 м';
  const w = f => { c.font = `40px ${f}`; return +c.measureText(s).width.toFixed(1); };
  const h1 = document.querySelector('h1');
  return {
    check: document.fonts.check('40px Bitter'),
    loaded: [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.status).join(' | '),
    bitter: w('"Bitter"'), georgia: w('Georgia'), serif: w('serif'),
    inter: w('"Inter Tight"'), arial: w('Arial'),
    h1w: Math.round(h1.getBoundingClientRect().width),
  };
}));
await b.close();
