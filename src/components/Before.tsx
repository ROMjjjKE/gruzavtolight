const ITEMS = [
  ['Вес', 'До 5 тонн — это про массу груза, а не про «объём кузова». Тяжёлый груз распределяем по борту.'],
  ['Габарит', 'Длина до 6,2 м, ширина до 2,25 м. Всё, что длиннее, обсуждаем отдельно и честно.'],
  ['Крепление', 'Стяжные ремни и упоры. Груз, который нельзя крепить, лучше не везти.'],
  ['Погрузка', 'Борт без гидроборта: нужна техника или руки на месте. Об этом договариваемся заранее.'],
];

export default function Before() {
  return (
    <section className="section" id="do-zagruzki">
      <div className="wrap before">
        <div>
          <div className="micro" style={{ marginBottom: 12 }}>06 / до загрузки</div>
          <h2 className="reveal" style={{ fontSize: 'var(--fs-34)', marginBottom: 14 }}>Что проверить до звонка</h2>
          <p className="body-s">
            Четыре вещи, которые определяют, поедет груз в один рейс или в два. Если сомневаетесь — сфотографируйте
            груз и место погрузки, так быстрее.
          </p>
        </div>
        <ul className="before__list reveal">
          {ITEMS.map(([k, v], i) => (
            <li key={k}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span><strong style={{ color: 'var(--ink)' }}>{k}. </strong>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
