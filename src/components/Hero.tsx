const PHONE = '+375 44 758-98-11';
const TEL = 'tel:+375447589811';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__plate micro">АТ-ГрузАвтоЛайт · грузоперевозки</div>
            <h1>Грузоперевозки до 5 тонн в Минске</h1>
            <p className="lead hero__lead">
              Борт 6,2 × 2,25 м: шестиметровый пиломатериал едет целиком, без свеса за борт.
              Скажите, что везём, — назовём цену до выезда.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>{PHONE}</a>
              <a className="link-signal" href="#zayavka">Оставить заявку</a>
            </div>
            <p className="hero__note">
              Город Минск. Габариты борта и тоннаж — по документам машины, а не «примерно».
            </p>

            <div className="specs">
              <div className="spec"><b className="num">5 т</b><span>грузоподъёмность</span></div>
              <div className="spec"><b className="num">6,20 м</b><span>длина борта</span></div>
              <div className="spec"><b className="num">2,25 м</b><span>ширина борта</span></div>
              <div className="spec"><b>Минск</b><span>выезд</span></div>
            </div>
          </div>

          <figure className="hero__shot" style={{ margin: 0 }}>
            <img
              src="/gruzavtolight/img/bort-pilomaterial.jpg"
              width={920}
              height={455}
              alt="Бортовой автомобиль загружен пакетом пиломатериала, груз закреплён оранжевой стяжной стропой"
              {...{ fetchpriority: 'high' }}
            />
            <figcaption className="hero__cap">
              <span>Пиломатериал на борту 6,2 м</span>
              <span>крепление стропой</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
