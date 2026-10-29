export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <h3>АТ-ГрузАвтоЛайт</h3>
            <p>Грузоперевозки до 5 тонн<br />Минск</p>
          </div>
          <div>
            <h3>Телефон</h3>
            <p><a href="tel:+375447589811">+375 44 758-98-11</a></p>
          </div>
          <div>
            <h3>Борт</h3>
            <p className="num">6,20 × 2,25 м<br />до 5 тонн</p>
          </div>
          <div>
            <h3>Разделы</h3>
            <p>
              <a href="#vezyom">Что везём</a><br />
              <a href="#bort">Габарит борта</a><br />
              <a href="#zayavka">Заявка</a>
            </p>
          </div>
        </div>
        <p className="ftr__legal">
          Информация на сайте не является публичной офертой: стоимость рейса согласуется по маршруту, весу и
          характеру груза. Габариты борта указаны по документам автомобиля. Фотографии сделаны на реальных
          загрузках.
        </p>
      </div>
    </footer>
  );
}
