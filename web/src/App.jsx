import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BOOK, TAGLINE, CONCEPTS, CHAPTERS, EXTRA_SECTIONS, AUDIENCE,
  VISION_2033, CLUB, QUESTION_BANK, READINGS, VERSES, QUOTES, FAQ,
} from './content';

// --- SVG ICONS ---
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Book: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Pen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Chat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Help: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Eye: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Hand: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-4 0" /><path d="M14 10V4a2 2 0 0 0-4 0v2" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  Target: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Copy: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Link: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Chevron: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

const CONCEPT_ICONS = { Eye: Icons.Eye, Hand: Icons.Hand, Target: Icons.Target };

const TABS = [
  { id: 'home', label: '首頁', icon: Icons.Home },
  { id: 'book', label: '關於本書', icon: Icons.Book },
  { id: 'club', label: '讀書會', icon: Icons.Calendar },
  { id: 'reading', label: '延伸閱讀', icon: Icons.Pen },
  { id: 'discuss', label: '討論題庫', icon: Icons.Chat },
  { id: 'faq', label: '常見問題', icon: Icons.Help },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const copy = (text, msg = '已複製到剪貼簿！') => {
    navigator.clipboard.writeText(text)
      .then(() => showToast(msg))
      .catch(() => showToast('複製失敗，請手動選取複製。'));
  };

  const goTab = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- COUNTDOWN TIMER (每週三、六 20:00–20:45) ---
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isMeeting: false });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const day = now.getDay();
      const isMeeting = (day === 3 || day === 6) && now.getHours() === 20 && now.getMinutes() <= 45;

      let next = null;
      for (let i = 0; i <= 7; i++) {
        const d = new Date(now.getTime() + i * 86400000);
        if (d.getDay() === 3 || d.getDay() === 6) {
          const t = new Date(d);
          t.setHours(20, 0, 0, 0);
          if (t > now) { next = t; break; }
        }
      }
      if (!next) {
        setCountdown((c) => ({ ...c, isMeeting }));
        return;
      }

      const diff = next - now;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isMeeting,
      });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- CHAPTER PROGRESS ---
  const [done, setDone] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chapter_progress');
      if (saved) setDone(JSON.parse(saved));
    } catch {
      localStorage.removeItem('chapter_progress');
    }
    setProgressLoaded(true);
  }, []);

  // 等載入完才回寫，否則初始的空陣列會蓋掉使用者既有進度。
  useEffect(() => {
    if (progressLoaded) localStorage.setItem('chapter_progress', JSON.stringify(done));
  }, [done, progressLoaded]);

  // 必須用 functional updater：連續點擊會落在同一個 render 批次，
  // 直接讀 done 會拿到舊值，後一次點擊就會蓋掉前一次。
  const toggleChapter = (no) => {
    setDone((prev) => (prev.includes(no) ? prev.filter((n) => n !== no) : [...prev, no]));
  };

  // --- READING ACCORDION ---
  const [openReading, setOpenReading] = useState(1);

  // --- FEEDBACK ---
  const [fbName, setFbName] = useState('');
  const [fbText, setFbText] = useState('');

  const sendFeedback = () => {
    if (!fbText.trim()) {
      showToast('請先寫下你的心得或回饋。');
      return;
    }
    const body = `【一的力量讀書會 — 心得回饋】\n來自：${fbName.trim() || '匿名'}\n時間：${new Date().toLocaleString('zh-TW')}\n\n${fbText}`;
    copy(body, '已複製！可直接貼到小區祭壇 LINE 群組分享。');
  };

  return (
    <div className="app">
      {/* 首頁星空背景。純裝飾，其他分頁不顯示。 */}
      {activeTab === 'home' && <div className="home-backdrop" aria-hidden="true" />}

      {toast && <div className="toast">{toast}</div>}

      <header className="topbar">
        <button className="brand" onClick={() => goTab('home')}>
          <span className="brand-mark">一</span>
          <span className="brand-text">
            <strong>「一」的力量</strong>
            <small>緯華化梅小區讀書會</small>
          </span>
        </button>
        <nav className="nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`nav-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => goTab(t.id)}
            >
              <t.icon /><span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {/* --- TAB: HOME --- */}
        {activeTab === 'home' && (
          <div className="fade-in">
            <section className="hero">
              <div className="hero-badge">Empowered21 · 2033 全球異象</div>
              <h1 className="hero-title">
                {TAGLINE.text.split('\n').map((line, i) => <span key={i}>{line}</span>)}
              </h1>
              <p className="hero-source">— {TAGLINE.source}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => goTab('club')}>加入讀書會</button>
                <button className="btn" onClick={() => goTab('book')}>認識這本書</button>
              </div>
            </section>

            <section className={`countdown-card ${countdown.isMeeting ? 'live' : ''}`}>
              {countdown.isMeeting ? (
                <div className="live-now"><span className="dot" />讀書會進行中 — 現在就到群組裡加入我們！</div>
              ) : (
                <>
                  <div className="countdown-label">距離下一場讀書會</div>
                  <div className="countdown-nums">
                    {[['天', countdown.days], ['時', countdown.hours], ['分', countdown.minutes], ['秒', countdown.seconds]].map(([u, v]) => (
                      <div className="cd-unit" key={u}>
                        <b>{String(v).padStart(2, '0')}</b><small>{u}</small>
                      </div>
                    ))}
                  </div>
                  <div className="countdown-sub">{CLUB.when} ｜ {CLUB.where}</div>
                </>
              )}
            </section>

            <section className="section">
              <h2 className="sec-title">這本書在講什麼</h2>
              <div className="concept-grid">
                {CONCEPTS.map((c) => {
                  const Ico = CONCEPT_ICONS[c.icon];
                  return (
                    <div className="card concept" key={c.title}>
                      <div className="concept-ico"><Ico /></div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card vision">
              <h2>{VISION_2033.title}</h2>
              <p>{VISION_2033.body}</p>
            </section>

            <section className="section">
              <h2 className="sec-title">這本書適合誰</h2>
              <ul className="audience">
                {AUDIENCE.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </section>

            <section className="section">
              <h2 className="sec-title">金句</h2>
              <div className="quote-grid">
                {QUOTES.map((q) => (
                  <figure className="card quote" key={q.text}>
                    <blockquote>{q.text}</blockquote>
                    <figcaption>— {q.source}</figcaption>
                    <button className="btn btn-ghost btn-sm" onClick={() => copy(`「${q.text}」\n— ${q.source}｜《「一」的力量》讀書會`)}>
                      <Icons.Copy />分享
                    </button>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --- TAB: BOOK --- */}
        {activeTab === 'book' && (
          <div className="fade-in">
            <h1 className="page-title">關於本書</h1>
            <p className="page-sub">{BOOK.description}</p>

            <section className="card bookinfo">
              <h2>{BOOK.title}<small>{BOOK.subtitle}</small></h2>
              <p className="orig">{BOOK.originalTitle}</p>
              <dl className="meta">
                <div><dt>作者</dt><dd>{BOOK.author}</dd></div>
                <div><dt>譯者</dt><dd>{BOOK.translator}</dd></div>
                <div><dt>出版</dt><dd>{BOOK.publisher}</dd></div>
                <div><dt>出版日期</dt><dd>{BOOK.published}</dd></div>
                <div><dt>頁數</dt><dd>{BOOK.pages} 頁</dd></div>
                <div><dt>ISBN</dt><dd>{BOOK.isbn}</dd></div>
                <div><dt>定價</dt><dd>{BOOK.price}</dd></div>
                <div><dt>推薦序</dt><dd>{BOOK.foreword}</dd></div>
              </dl>
              <div className="buy">
                {BOOK.buyLinks.map((l) => (
                  <a className="btn btn-primary" key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                    <Icons.Link />在{l.label}購書
                  </a>
                ))}
              </div>
            </section>

            <section className="card author">
              <h2>關於作者</h2>
              <p>{BOOK.authorBio}</p>
            </section>

            <section className="section">
              <h2 className="sec-title">六章架構</h2>
              <div className="toc">
                {CHAPTERS.map((c) => (
                  <div className="toc-row" key={c.no}>
                    <span className="toc-no">{String(c.no).padStart(2, '0')}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.gist}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="toc-extra">本書另含：{EXTRA_SECTIONS.join('、')}</p>
            </section>
          </div>
        )}

        {/* --- TAB: CLUB --- */}
        {activeTab === 'club' && (
          <div className="fade-in">
            <h1 className="page-title">讀書會</h1>
            <p className="page-sub">{CLUB.format}，全程線上進行。</p>

            <section className="card highlight">
              <div className="kv"><span>時間</span><b>{CLUB.when}</b></div>
              <div className="kv"><span>地點</span><b>{CLUB.where}</b></div>
            </section>

            <section className="section">
              <h2 className="sec-title">每次怎麼進行</h2>
              {CLUB.flow.map((f) => (
                <div className="card flow" key={f.time}>
                  <div className="flow-time">{f.time}</div>
                  <div>
                    <h3>{f.what}</h3>
                    <p>{f.detail}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="section">
              <h2 className="sec-title">如何參加</h2>
              <ol className="steps">
                {CLUB.joinSteps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </section>

            <section className="section">
              <div className="sec-head">
                <h2 className="sec-title">進度追蹤</h2>
                <span className="progress-count">{done.length} / {CHAPTERS.length}</span>
              </div>
              <div className="progress-bar"><i style={{ width: `${(done.length / CHAPTERS.length) * 100}%` }} /></div>
              <div className="checklist">
                {CHAPTERS.map((c) => (
                  <button
                    key={c.no}
                    className={`check-row ${done.includes(c.no) ? 'done' : ''}`}
                    onClick={() => toggleChapter(c.no)}
                  >
                    <span className="box" />
                    <span className="ch-no">第 {c.no} 章</span>
                    <span className="ch-title">{c.title}</span>
                  </button>
                ))}
              </div>
              <p className="hint">進度只存在你自己的瀏覽器裡，換裝置不會同步。</p>
            </section>
          </div>
        )}

        {/* --- TAB: READING --- */}
        {activeTab === 'reading' && (
          <div className="fade-in">
            <h1 className="page-title">延伸閱讀</h1>
            <p className="page-sub">各章導讀與默想。這是小區自行撰寫的延伸思考，不是書籍原文——讀了導讀，還是要回頭讀書。</p>

            {READINGS.map((r) => {
              const open = openReading === r.no;
              return (
                <article className={`card reading ${open ? 'open' : ''}`} key={r.no}>
                  <button className="reading-head" onClick={() => setOpenReading(open ? null : r.no)}>
                    <div>
                      <div className="reading-ch">
                        {r.chapter}{r.pages && <span className="pages">p.{r.pages}</span>}
                      </div>
                      <h2><span className="reading-no">{String(r.no).padStart(2, '0')}</span>{r.title}</h2>
                    </div>
                    <span className={`chev ${open ? 'up' : ''}`}><Icons.Chevron /></span>
                  </button>

                  {open && (
                    <div className="reading-body">
                      {r.body.map((p, i) => <p key={i}>{p}</p>)}
                      <p className="reading-closing">{r.closing}</p>

                      <div className="reflect">
                        <h3>默想與討論</h3>
                        <ol>
                          {r.reflections.map((q, i) => <li key={i}>{q}</li>)}
                        </ol>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => copy(`【${r.chapter}｜默想與討論】\n${r.reflections.map((q, i) => `${i + 1}. ${q}`).join('\n')}`)}
                        >
                          <Icons.Copy />複製題目
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            <section className="section">
              <h2 className="sec-title">相關經文</h2>
              {VERSES.map((v) => (
                <div className="card verse" key={v.ref}>
                  <div className="verse-ref">{v.ref}</div>
                  <p>{v.text}</p>
                  <small>{v.note}</small>
                </div>
              ))}
              <p className="hint">經文引自和合本。</p>
            </section>
          </div>
        )}

        {/* --- TAB: DISCUSS --- */}
        {activeTab === 'discuss' && (
          <div className="fade-in">
            <h1 className="page-title">討論題庫</h1>
            <p className="page-sub">出自本小區讀書會教材，歡迎其他小組直接取用。</p>

            {QUESTION_BANK.map((b) => (
              <section className="card bank" key={b.range}>
                <div className="bank-head">
                  <span className="bank-range">{b.range}</span>
                  <h2>{b.label}</h2>
                </div>
                <p className="bank-focus">{b.focus}</p>
                <ol className="bank-q">
                  {b.questions.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
                <div className="bank-action">
                  <h3>一的行動</h3>
                  <p>{b.action}</p>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => copy(`【${b.range}｜${b.label}】\n${b.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n【一的行動】\n${b.action}`)}
                >
                  <Icons.Copy />複製整組題目
                </button>
              </section>
            ))}
          </div>
        )}

        {/* --- TAB: FAQ --- */}
        {activeTab === 'faq' && (
          <div className="fade-in">
            <h1 className="page-title">常見問題</h1>
            <p className="page-sub">來之前你可能會想問的事。</p>

            {FAQ.map((f) => (
              <details className="card faq" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}

            <section className="card feedback">
              <h2>分享你的心得</h2>
              <p className="hint">本站沒有後端，不會儲存你的內容。按下按鈕後文字會複製到剪貼簿，你可以自行貼到小區祭壇 LINE 群組分享。</p>
              <input
                className="input"
                placeholder="你的名字（可留空）"
                value={fbName}
                onChange={(e) => setFbName(e.target.value)}
              />
              <textarea
                className="input textarea"
                placeholder="讀完哪一章？想到了誰？打算做什麼？"
                rows={6}
                value={fbText}
                onChange={(e) => setFbText(e.target.value)}
              />
              <button className="btn btn-primary" onClick={sendFeedback}><Icons.Copy />複製，貼到 LINE 群組</button>
            </section>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          本站為緯華化梅小區【「一」的力量】讀書會的公開介紹頁，內容為小區自行撰寫的導讀與討論教材。
          書籍原文著作權屬原作者與出版社所有，本站不提供內文與錄音。
        </p>
        <p>
          想讀這本書，請支持正版：
          {BOOK.buyLinks.map((l, i) => (
            <React.Fragment key={l.url}>
              {i > 0 && '、'}
              <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
            </React.Fragment>
          ))}
        </p>
      </footer>
    </div>
  );
}

export default App;
