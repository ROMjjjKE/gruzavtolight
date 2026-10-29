const KINDS = [
  {
    n: '01',
    title: 'Пиломатериалы и стройматериалы',
    text: 'Брус, доска, фанера, OSB, гипсокартон, профиль. Шестиметровый пиломатериал — целиком, без свеса и «довеска» на прицеп.',
  },
  {
    n: '02',
    title: 'Деревянные конструкции',
    text: 'Щиты, каркасы, бытовки и садовые конструкции: борт без тента, значит длинное и высокое можно поставить на опоры и закрепить.',
  },
  {
    n: '03',
    title: 'Мебель, техника, оборудование',
    text: 'Квартирные и офисные перевозки, доставка станков и торгового оборудования. Крепим ремнями, стыки прокладываем.',
  },
  {
    n: '04',
    title: 'Нестандарт по размеру',
    text: 'Если груз длиннее 6,2 м или шире 2,25 м — говорим об этом сразу, а не на месте погрузки. Иногда честнее отказать.',
  },
];

export default function Kinds() {
  return (
    <section className="section" id="vezyom">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">02 / грузы</div>
          <h2 className="shead__title reveal">Что встаёт на этот борт</h2>
          <p className="shead__note body-s reveal">
            Борт без тента и без гидроборта: погрузка сверху или сбоку, крепление ремнями и упорами.
          </p>
        </div>
        <div className="kinds reveal" style={{ marginTop: 'clamp(22px, 3vw, 40px)' }}>
          {KINDS.map((k) => (
            <article className="kind" key={k.n}>
              <span className="kind__n">{k.n}</span>
              <h3>{k.title}</h3>
              <p>{k.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
