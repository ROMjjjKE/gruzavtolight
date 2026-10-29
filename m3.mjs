import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4220/gruzavtolight/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
console.log(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Грузоперевозки до 5 тонн в Минске борт 6,20 м';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    bitter700: w('700 40px "Bitter"'), georgia700: w('700 40px Georgia'), georgia400: w('400 40px Georgia'),
    inter400: w('400 40px "Inter Tight"'), arial400: w('400 40px Arial'),
    ratioBitter: +(w('700 40px "Bitter"') / w('700 40px Georgia')).toFixed(4),
    ratioInter: +(w('400 40px "Inter Tight"') / w('400 40px Arial')).toFixed(4),
  };
}));
await b.close();
