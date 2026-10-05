(() => {
  const current = location.pathname.split('/').pop() || 'index.html';
  const active = current === 'index.html' ? 'home' :
    (current === 'lessons.html' || current === 'lesson-sleep.html') ? 'lessons' :
    current === 'critical-thinking.html' ? 'critical' :
    current === 'nutrition-builder.html' ? 'nutrition' :
    current === 'english.html' ? 'english' :
    current === 'games.html' ? 'games' : '';

  document.querySelectorAll('body > nav').forEach(el => el.remove());
  document.querySelectorAll('button.home, a.home').forEach(el => el.remove());

  if (!document.getElementById('global-nav-style')) {
    const style = document.createElement('style');
    style.id = 'global-nav-style';
    style.textContent = `
      body{padding-bottom:82px!important}
      .global-nav{position:fixed;bottom:0;left:0;right:0;background:#ffffffee;backdrop-filter:blur(12px);border-top:1px solid #e8ecf3;display:flex;justify-content:center;z-index:9999;padding-bottom:env(safe-area-inset-bottom)}
      .global-nav-inner{width:min(760px,100%);display:flex;justify-content:space-around;padding:9px 5px 8px}
      .global-nav-item{text-decoration:none;text-align:center;font-size:11px;color:#667085;min-width:50px;font-family:Arial,sans-serif;font-weight:700}
      .global-nav-item strong{display:block;font-size:21px;line-height:1.15;margin-bottom:3px}
      .global-nav-item.active{color:#205fc1}
      .english-subnav{display:flex;gap:9px;overflow:auto;padding:16px 0 3px}
      .english-subnav a{text-decoration:none;border:1px solid #e5eaf2;background:#fff;color:#4f5f77;padding:11px 15px;border-radius:999px;font-weight:900;white-space:nowrap;box-shadow:0 3px 14px #14213d0a}
      .english-subnav a:first-child{background:#edf4ff;color:#205fc1;border-color:#c8daf8}
      .english-vocab-library,.english-games-library{background:#fff;border:1px solid #eef1f6;border-radius:24px;padding:22px;margin-top:20px;box-shadow:0 5px 22px #14213d0c}
      .english-vocab-library h2,.english-games-library h2{margin:0 0 7px}
      .english-vocab-library>p,.english-games-library>p{margin:0;color:#6d778b;line-height:1.55}
      .english-vocab-grid,.english-games-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      .english-vocab-card,.english-game-card{border:1px solid #e5eaf2;background:#f8faff;border-radius:18px;padding:15px;line-height:1.55}
      .english-vocab-card h3,.english-game-card h3{margin:0 0 5px;font-size:18px}
      .english-vocab-card p,.english-game-card p{margin:0;color:#526076}
      .english-vocab-card .example{direction:ltr;text-align:left;margin-top:8px;background:#fff;border:1px solid #e4eaf3;border-radius:11px;padding:8px 10px;color:#263b5e;font-weight:700}
      .english-game-card .game-tag{display:inline-block;margin-top:10px;background:#edf4ff;color:#245fc0;padding:6px 9px;border-radius:999px;font-size:12px;font-weight:900}
      .english-game-card.featured{background:#eef5ff;border-color:#cfe0fb}
      @media(max-width:620px){.english-vocab-grid,.english-games-grid{grid-template-columns:1fr}}
      @media(max-width:420px){.global-nav-item{font-size:9px;min-width:44px}.global-nav-item strong{font-size:19px}}
    `;
    document.head.appendChild(style);
  }

  if (current === 'english.html' && !document.getElementById('englishGames')) {
    const main = document.querySelector('main.app');
    const hero = main?.querySelector('.hero');
    if (main && hero) {
      const subnav = document.createElement('div');
      subnav.className = 'english-subnav';
      subnav.setAttribute('aria-label','ניווט בתוך אנגלית');
      subnav.innerHTML = `<a href="#englishLesson1">📘 שיעור 1</a><a href="#englishVocabulary">🔤 אוצר מילים</a><a href="#englishGames">🎮 משחקי אנגלית</a>`;
      hero.insertAdjacentElement('afterend', subnav);

      const lessonPanel = main.querySelector('.panel');
      if (lessonPanel) lessonPanel.id = 'englishLesson1';

      const vocabulary = document.createElement('section');
      vocabulary.id = 'englishVocabulary';
      vocabulary.className = 'english-vocab-library';
      vocabulary.innerHTML = `
        <h2>🔤 אוצר מילים — שיעור 1</h2>
        <p>המילים של Introducing Myself. כל מילה נשמרת יחד עם משמעות ומשפט שימושי כדי שלא תלמד כמילה מבודדת.</p>
        <div class="english-vocab-grid">
          <article class="english-vocab-card"><h3 dir="ltr">football</h3><p>כדורגל</p><div class="example">I like football.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">pizza</h3><p>פיצה</p><div class="example">My favorite food is pizza.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">music</h3><p>מוזיקה</p><div class="example">I like music.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">dog</h3><p>כלב</p><div class="example">I have a dog.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">school</h3><p>בית ספר</p><div class="example">I go to school.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">gaming</h3><p>משחקי מחשב / גיימינג</p><div class="example">I like gaming.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">basketball</h3><p>כדורסל</p><div class="example">I like basketball.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">tennis</h3><p>טניס</p><div class="example">I like tennis.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">Thailand</h3><p>תאילנד</p><div class="example">I live in Thailand.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">clarinet</h3><p>קלרינט</p><div class="example">I play the clarinet.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">strength training</h3><p>אימוני כוח</p><div class="example">I do strength training.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">hamburger</h3><p>המבורגר</p><div class="example">My favorite food is hamburger.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">dancing</h3><p>ריקוד / לרקוד</p><div class="example">I like dancing.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">drawing</h3><p>ציור / לצייר</p><div class="example">I like drawing.</div></article>
        </div>`;

      const games = document.createElement('section');
      games.id = 'englishGames';
      games.className = 'english-games-library';
      games.innerHTML = `
        <h2>🎮 משחקי אנגלית</h2>
        <p>מאגר משחקים קצרים שאפשר לשלוף לפי מטרת השיעור. Hot Seat כבר משולב בשיעור 1; שאר המשחקים זמינים לשיעורים הבאים או לחזרה.</p>
        <div class="english-games-grid">
          <article class="english-game-card featured"><h3>🔥 Hot Seat</h3><p>תלמיד עם הגב ללוח מנחש מילה לפי רמזים באנגלית מהקבוצה. אסור לומר את המילה עצמה.</p><span class="game-tag">אוצר מילים · דיבור</span></article>
          <article class="english-game-card"><h3>🔎 Find Someone Who</h3><p>התלמידים מסתובבים ושואלים שאלות כדי למצוא מישהו שמתאים למשפט, למשל: likes football או has a dog.</p><span class="game-tag">שאלות · דיבור</span></article>
          <article class="english-game-card"><h3>🤥 Two Truths and a Lie</h3><p>כל תלמיד אומר שלושה משפטים על עצמו — שניים נכונים ואחד שקר — והאחרים מנחשים.</p><span class="game-tag">הצגה עצמית</span></article>
          <article class="english-game-card"><h3>🏁 Board Race</h3><p>שתי קבוצות מתחרות בכתיבת מילים על הלוח לפי קטגוריה: food, hobbies, school ועוד.</p><span class="game-tag">שליפה מהירה</span></article>
          <article class="english-game-card"><h3>🏃 Running Dictation</h3><p>טקסט קצר תלוי רחוק. תלמיד רץ, קורא, חוזר ומכתיב לבן הזוג שכותב.</p><span class="game-tag">קריאה · זיכרון · כתיבה</span></article>
          <article class="english-game-card"><h3>🏐 Question Ball</h3><p>זורקים כדור; מי שתופס עונה על שאלה באנגלית ואז זורק לתלמיד הבא.</p><span class="game-tag">חזרה · דיבור</span></article>
          <article class="english-game-card"><h3>❓ Guess Who / What</h3><p>תלמיד חושב על אדם, חפץ או תחביב והכיתה שואלת שאלות באנגלית עד שמנחשים.</p><span class="game-tag">שאלות · אוצר מילים</span></article>
          <article class="english-game-card"><h3>💰 Sentence Auction</h3><p>מציגים משפטים נכונים ושגויים; קבוצות “קונות” את המשפטים שהן חושבות שנכונים.</p><span class="game-tag">דקדוק</span></article>
          <article class="english-game-card"><h3>🃏 Memory Cards</h3><p>כרטיסי זוגות של מילה–תמונה או שאלה–תשובה. הופכים שניים ומחפשים התאמות.</p><span class="game-tag">אוצר מילים</span></article>
          <article class="english-game-card"><h3>4️⃣ Four Corners</h3><p>ארבע פינות מייצגות תשובות שונות. התלמידים עוברים לפינה שלהם ואז מסבירים באנגלית למה בחרו בה.</p><span class="game-tag">בחירה · דיבור</span></article>
        </div>`;

      const footer = main.querySelector('.footer-card');
      if (footer) {
        footer.insertAdjacentElement('afterend', vocabulary);
        vocabulary.insertAdjacentElement('afterend', games);
      } else {
        main.appendChild(vocabulary);
        main.appendChild(games);
      }
    }
  }

  const nav = document.createElement('nav');
  nav.className = 'global-nav';
  nav.setAttribute('aria-label','ניווט ראשי');
  nav.innerHTML = `<div class="global-nav-inner">
    <a class="global-nav-item ${active==='home'?'active':''}" href="index.html"><strong>⌂</strong>בית</a>
    <a class="global-nav-item ${active==='lessons'?'active':''}" href="lessons.html"><strong>🌿</strong>שיעורי בריאות</a>
    <a class="global-nav-item ${active==='critical'?'active':''}" href="critical-thinking.html"><strong>🧠</strong>חשיבה</a>
    <a class="global-nav-item ${active==='nutrition'?'active':''}" href="nutrition-builder.html"><strong>🥗</strong>תזונה</a>
    <a class="global-nav-item ${active==='english'?'active':''}" href="english.html"><strong>📘🇬🇧</strong>שיעורי אנגלית</a>
    <a class="global-nav-item ${active==='games'?'active':''}" href="games.html"><strong>🎮</strong>משחקים</a>
  </div>`;
  document.body.appendChild(nav);
})();