const STEPS = [
  { n: '01', title: 'Расскажите груз', text: 'Что везём, сколько весит, длина и ширина. Фото груза ускоряет расчёт.' },
  { n: '02', title: 'Получите цену', text: 'Считаем маршрут и характер груза, называем сумму до выезда. Без «уточним на месте».' },
  { n: '03', title: 'Загрузка и рейс', text: 'Крепим ремнями и упорами, везём. Разгрузка — там, куда скажете.' },
];

export default function Steps() {
  return (
    <section className="section" id="rabota">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">05 / порядок</div>
          <h2 className="shead__title reveal">Три шага до рейса</h2>
          <p className="shead__note body-s reveal">
            Чем точнее габариты и вес, тем меньше вопросов на погрузке.
          </p>
        </div>
        <div className="steps reveal" style={{ marginTop: 'clamp(20px, 2.6vw, 36px)' }}>
          {STEPS.map((s) => (
            <article className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
