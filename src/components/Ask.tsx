import { useState } from 'react';

const WHEN = ['Сегодня', 'Завтра', 'В течение недели', 'Обсудим по телефону'];
const PHONE = '+375 44 758-98-11';
const TEL = 'tel:+375447589811';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', from: '', to: '', cargo: '', weight: '', when: WHEN[0] });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта АТ-ГрузАвтоЛайт',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Откуда: ${f.from || '—'}`,
      `Куда: ${f.to || '—'}`,
      `Груз: ${f.cargo || '—'}`,
      `Вес: ${f.weight || '—'}`,
      `Когда: ${f.when}`,
    ].join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375447589811?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="shead__num micro">07 / заявка</div>
          <h2 className="shead__title reveal">Скажите груз — назовём цену</h2>
          <p className="shead__note reveal" style={{ color: 'rgba(233,233,228,0.7)' }}>
            Звоните или оставьте заявку. Ответим на вопросы по габаритам и креплению до заказа.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <p className="ask__hint">
              Если не беру трубку — значит за рулём. Напишите в WhatsApp: маршрут и что везём, перезвоню.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-name">Имя</label>
                <input id="a-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-tel">Телефон</label>
                <input id="a-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-from">Откуда</label>
                <input id="a-from" value={f.from} onChange={(e) => set('from', e.target.value)} placeholder="Адрес или район" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-to">Куда</label>
                <input id="a-to" value={f.to} onChange={(e) => set('to', e.target.value)} placeholder="Адрес или район" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="a-cargo">Что везём</label>
              <textarea id="a-cargo" rows={2} value={f.cargo} onChange={(e) => set('cargo', e.target.value)} placeholder="Например: 20 досок 6 м, 100 кг" />
            </div>

            <div className="half">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-weight">Вес, примерно</label>
                <input id="a-weight" value={f.weight} onChange={(e) => set('weight', e.target.value)} inputMode="numeric" placeholder="кг или тонны" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="a-when">Когда</label>
                <select id="a-when" value={f.when} onChange={(e) => set('when', e.target.value)}>
                  {WHEN.map((w) => <option key={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось отправить сообщение. Если не открылось,
                позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Цену называем до выезда и не меняем в процессе. Отдельно оплачивается только то, что вы
              добавите по ходу: второй адрес, дополнительный рейс, ожидание.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
