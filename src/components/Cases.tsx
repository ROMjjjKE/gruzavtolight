export default function Cases() {
  return (
    <section className="section" id="raboty">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">04 / с борта</div>
          <h2 className="shead__title reveal">Как это выглядит в работе</h2>
          <p className="shead__note body-s reveal">
            Две реальные загрузки: пиломатериал и деревянная конструкция. Снято на телефон, без постановки.
          </p>
        </div>

        <div className="cases reveal" style={{ marginTop: 'clamp(22px, 3vw, 40px)' }}>
          <figure className="case" style={{ margin: 0 }}>
            <img
              src="/gruzavtolight/img/bort-pilomaterial.jpg"
              width={920}
              height={455}
              loading="lazy"
              alt="Пакет пиломатериала на борту грузовика, стянут оранжевым ремнём"
            />
            <figcaption>
              <b>Пакет пиломатериала, 6 метров</b>
              <span>Борт 6,2 м: пакет лёг целиком, стропа через середину. Свеса за габарит нет.</span>
            </figcaption>
          </figure>

          <div className="cases__col">
            <figure className="case" style={{ margin: 0 }}>
              <img
                src="/gruzavtolight/img/konstrukciya-bort.jpg"
                width={518}
                height={600}
                loading="lazy"
                alt="Деревянная конструкция с плоской крышей на борту грузовика, закреплённая ремнём"
              />
              <figcaption>
                <b>Деревянная конструкция</b>
                <span>Сборный короб с крышей. Ставится на борт краном или вручную, крепится ремнём и упорами.</span>
              </figcaption>
            </figure>
            <p className="body-s">
              Фотографии сделаны на выездах и показывают ровно то, что важно при заказе: длину груза относительно
              борта и способ крепления. Пафосные снимки машины сбоку ничего не доказывают.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
