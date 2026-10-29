import { useEffect, useRef, useState } from 'react';

const S = 104;          // пикселей на метр
const X0 = 150;
const Y0 = 80;
const LEN_M = 6.2;
const WID_M = 2.25;
const BED_W = LEN_M * S;
const BED_H = WID_M * S;

const STATIONS = [
  {
    m: 0,
    label: 'Пустой борт',
    text: 'Ровный пол без тента и бортовых надставок. Груз ставим от кабины к заднему краю, чтобы вес приходился на ось.',
  },
  {
    m: 2.5,
    label: 'Лист 2,5 м',
    text: 'OSB или фанера 2500 × 1250 ложится плашмя, остаётся 3,7 м под остальной груз.',
  },
  {
    m: 3.0,
    label: 'Доска 3 м',
    text: 'Трёхметровый профиль и доска встают вдоль борта с запасом под крепление.',
  },
  {
    m: 6.0,
    label: 'Пиломатериал 6 м',
    text: 'Шестиметровый брус едет целиком: до края борта остаётся 20 см, свеса за габарит нет.',
  },
  {
    m: 6.2,
    label: 'Полный борт',
    text: 'Весь борт занят. Дальше только два варианта: второй рейс или машина побольше.',
  },
];

export default function Bed() {
  const [p, setP] = useState(0);
  const [pin, setPin] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches || window.innerHeight < 660) {
      setP(1);
      return;
    }

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);
        const trigger = ScrollTrigger.create({
          trigger: stageRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => setP(Math.round(self.progress * 100) / 100),
        });
        cleanup = () => trigger.kill();
      });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          timer = window.setTimeout(begin, 60);
        }
      },
      { rootMargin: '320px 0px' }
    );
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  // Прогресс раскладываем по пяти станциям равномерно: каждому грузу — своя четверть скролла,
  // а показания метров остаются настоящими.
  const STEPS_P = STATIONS.map((_, i) => i / (STATIONS.length - 1));
  const meters = (() => {
    for (let i = 1; i < STATIONS.length; i++) {
      if (p <= STEPS_P[i]) {
        const k = (p - STEPS_P[i - 1]) / (STEPS_P[i] - STEPS_P[i - 1]);
        return Math.round((STATIONS[i - 1].m + k * (STATIONS[i].m - STATIONS[i - 1].m)) * 100) / 100;
      }
    }
    return LEN_M;
  })();
  const active = STATIONS.reduce((acc, _s, i) => (p >= STEPS_P[i] - 0.004 ? i : acc), 0);
  const fillW = (meters / LEN_M) * BED_W;
  const edgeX = X0 + fillW;

  return (
    <section className={`bed ${pin ? 'bed--pin' : 'bed--manual'}`} id="bort">
      <div className="wrap">
        <div className="cols bed__head">
          <div className="shead__num micro">03 / габарит</div>
          <h2 className="shead__title reveal">Шесть метров двадцать</h2>
          <p className="shead__note body-s reveal" style={{ color: 'rgba(233,233,228,0.72)' }}>
            Борт в масштабе. Прокрутите — увидите, сколько занимает типовой груз.
          </p>
        </div>

        <div className="bed__grid" ref={stageRef}>
          <div>
            <svg
              className="bed__svg"
              viewBox="0 0 940 400"
              role="img"
              aria-label={`Схема борта сверху: 6,20 м на 2,25 м, заполнено ${meters.toFixed(2).replace('.', ',')} м`}
            >
              <defs>
                <pattern id="hatch" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#de4f10" strokeWidth="1.5" opacity="0.8" />
                </pattern>
              </defs>

              {/* пол борта */}
              <rect x={X0} y={Y0} width={BED_W} height={BED_H} fill="rgba(233,233,228,0.045)" stroke="rgba(233,233,228,0.42)" strokeWidth="1.5" />

              {/* заполненная часть */}
              <rect x={X0} y={Y0} width={Math.max(0, fillW)} height={BED_H} fill="url(#hatch)" opacity={p > 0.005 ? 1 : 0} />
              <rect x={X0} y={Y0} width={Math.max(0, fillW)} height={BED_H} fill="rgba(222,79,16,0.2)" />

              {/* метки метров */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <g key={i}>
                  <line x1={X0 + i * S} y1={Y0} x2={X0 + i * S} y2={Y0 + BED_H} stroke="rgba(233,233,228,0.16)" strokeWidth="1" strokeDasharray="4 6" />
                  <text x={X0 + i * S} y={Y0 + BED_H + 20} textAnchor="middle" fontSize="11" fill={meters >= i ? '#de4f10' : 'rgba(233,233,228,0.42)'} fontFamily="Inter Tight, sans-serif" fontWeight="600">
                    {i}
                  </text>
                </g>
              ))}

              {/* кромка загрузки */}
              {p > 0.01 && p < 0.995 && (
                <g>
                  <line x1={edgeX} y1={Y0 - 16} x2={edgeX} y2={Y0 + BED_H + 6} stroke="#de4f10" strokeWidth="2" />
                  <text x={edgeX} y={Y0 - 24} textAnchor="middle" fontSize="13" fill="#de4f10" fontFamily="Inter Tight, sans-serif" fontWeight="600">
                    {meters.toFixed(2).replace('.', ',')} м
                  </text>
                </g>
              )}

              {/* размер 6,20 */}
              <g stroke="rgba(233,233,228,0.55)" strokeWidth="1">
                <line x1={X0} y1={368} x2={X0 + BED_W} y2={368} />
                <line x1={X0} y1={361} x2={X0} y2={375} />
                <line x1={X0 + BED_W} y1={361} x2={X0 + BED_W} y2={375} />
              </g>
              <text x={X0 + BED_W / 2} y={362} textAnchor="middle" fontSize="13" fill="rgba(233,233,228,0.8)" fontFamily="Inter Tight, sans-serif" fontWeight="600" letterSpacing="1.5">
                6,20 м
              </text>

              {/* размер 2,25 */}
              <g stroke="rgba(233,233,228,0.55)" strokeWidth="1">
                <line x1={118} y1={Y0} x2={118} y2={Y0 + BED_H} />
                <line x1={111} y1={Y0} x2={125} y2={Y0} />
                <line x1={111} y1={Y0 + BED_H} x2={125} y2={Y0 + BED_H} />
              </g>
              <text x={110} y={Y0 + BED_H / 2} textAnchor="middle" fontSize="13" fill="rgba(233,233,228,0.8)" fontFamily="Inter Tight, sans-serif" fontWeight="600" letterSpacing="1.5" transform={`rotate(-90 110 ${Y0 + BED_H / 2})`}>
                2,25 м
              </text>

              {/* подписи станций */}
              {STATIONS.slice(1, 4).map((s) => {
                const x = X0 + s.m * S;
                const on = meters >= s.m - 0.005;
                return (
                  <g key={s.label} opacity={on ? 1 : 0.32}>
                    <circle cx={Math.min(x, X0 + BED_W - 2)} cy={Y0 - 4} r="3.5" fill={on ? '#de4f10' : 'rgba(233,233,228,0.45)'} />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="bed__side">
            <span className="bed__step">{String(active + 1).padStart(2, '0')} / 05 · занято</span>
            <div className="bed__meter">
              {meters.toFixed(2).replace('.', ',')}<small>м</small>
            </div>
            <p>{STATIONS[active].text}</p>
            <div className="bed__list">
              {STATIONS.map((s, i) => (
                <div key={s.label} className={i <= active ? 'on' : ''}>
                  <span>{s.label}</span>
                  <b>{s.m.toFixed(2).replace('.', ',')} м</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
