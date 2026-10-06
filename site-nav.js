(() => {
  const current = location.pathname.split('/').pop() || 'index.html';
  const active = current === 'index.html' ? 'home' :
    (current === 'lessons.html' || current === 'lesson-sleep.html') ? 'lessons' :
    (current === 'nutrition-science.html' || current === 'nutrition-grade8-lesson1.html') ? 'nutritionScience' :
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
      .global-nav-inner{width:min(900px,100%);display:flex;justify-content:space-around;padding:9px 4px 8px}
      .global-nav-item{text-decoration:none;text-align:center;font-size:10px;color:#667085;min-width:44px;font-family:Arial,sans-serif;font-weight:700;line-height:1.15}
      .global-nav-item strong{display:block;font-size:21px;line-height:1.15;margin-bottom:3px}
      .global-nav-item.active{color:#205fc1}
      .english-subnav{display:flex;gap:9px;overflow:auto;padding:16px 0 3px}
      .english-subnav a{text-decoration:none;border:1px solid #e5eaf2;background:#fff;color:#4f5f77;padding:11px 15px;border-radius:999px;font-weight:900;white-space:nowrap;box-shadow:0 3px 14px #14213d0a}
      .english-subnav a:first-child{background:#edf4ff;color:#205fc1;border-color:#c8daf8}
      .english-vocab-library,.english-games-library{background:#fff;border:1px solid #eef1f6;border-radius:24px;padding:22px;margin-top:20px;box-shadow:0 5px 22px #14213d0c}
      .english-vocab-library h2,.english-games-library h2{margin:0 0 7px}
      .english-vocab-library h3.vocab-heading{margin:20px 0 8px;font-size:18px}
      .english-vocab-library>p,.english-games-library>p{margin:0;color:#6d778b;line-height:1.55}
      .english-vocab-grid,.english-games-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      .english-vocab-card,.english-game-card{border:1px solid #e5eaf2;background:#f8faff;border-radius:18px;padding:15px;line-height:1.55}
      .english-vocab-card h3,.english-game-card h3{margin:0 0 5px;font-size:18px}
      .english-vocab-card p,.english-game-card p{margin:0;color:#526076}
      .english-vocab-card .example{direction:ltr;text-align:left;margin-top:8px;background:#fff;border:1px solid #e4eaf3;border-radius:11px;padding:8px 10px;color:#263b5e;font-weight:700}
      .english-game-card .game-tag{display:inline-block;margin-top:10px;background:#edf4ff;color:#245fc0;padding:6px 9px;border-radius:999px;font-size:12px;font-weight:900}
      .english-game-card.featured{background:#eef5ff;border-color:#cfe0fb}
      .lesson2-wrap{scroll-margin-top:18px;margin-top:34px;padding-top:6px;border-top:3px solid #dbe7fb}
      .lesson2-wrap>.section-title{margin-top:20px}
      @media(max-width:620px){.english-vocab-grid,.english-games-grid{grid-template-columns:1fr}}
      @media(max-width:420px){.global-nav-item{font-size:8.5px;min-width:40px}.global-nav-item strong{font-size:18px}}
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
      subnav.innerHTML = `<a href="#englishLesson1">📘 שיעור 1</a><a href="#englishLesson2">📗 שיעור 2</a><a href="#englishVocabulary">🔤 אוצר מילים</a><a href="#englishGames">🎮 משחקי אנגלית</a>`;
      hero.insertAdjacentElement('afterend', subnav);

      const lessonPanel = main.querySelector('.panel');
      if (lessonPanel) lessonPanel.id = 'englishLesson1';

      const lessonTabs = main.querySelectorAll('.lesson-tabs .tab');
      if (lessonTabs[1]) {
        lessonTabs[1].disabled = false;
        lessonTabs[1].classList.remove('locked');
        lessonTabs[1].textContent = 'שיעור 2 · My Daily Routine';
        lessonTabs[1].onclick = () => document.getElementById('englishLesson2')?.scrollIntoView({behavior:'smooth'});
      }

      const lesson2 = document.createElement('section');
      lesson2.id = 'englishLesson2';
      lesson2.className = 'lesson2-wrap';
      lesson2.innerHTML = `
        <section class="panel">
          <h2>שיעור 2 — My Daily Routine</h2>
          <p class="sub">נושא: השגרה היומית שלי. התלמידים עוברים מתיאור מי הם לתיאור מה הם עושים במהלך היום, עם אוצר מילים שימושי, קריאה, משחק, כתיבה ושיחה.</p>
          <div class="summary" style="margin-top:15px">
            <div class="goal"><strong>🎯 Can-Do Goal</strong><br><span dir="ltr">Today I can talk about my daily routine in English.</span><br>בסוף השיעור התלמיד יכול לתאר את היום שלו ב־4–6 משפטים ולענות על שאלות בסיסיות על השגרה שלו.</div>
            <div class="prep"><strong>🧰 לפני הכניסה לכיתה</strong><ul><li>כתוב מראש את ה־Do Now.</li><li>כתוב את Vocabulary Bank בצד הלוח.</li><li>הכן את הטקסט Meet Maya.</li><li>הכן פתקים ל־Mime & Guess.</li><li>השאר מקום לשאלות הראיון.</li></ul></div>
          </div>
          <div class="quickbar"><div class="quick"><b>13</b><span>שלבים</span></div><div class="quick"><b>45</b><span>דקות</span></div><div class="quick"><b>10</b><span>ביטויי שגרה</span></div><div class="quick"><b>1</b><span>משחק מרכזי</span></div></div>

          <h3>מה צריך להיות על הלוח לפני הצלצול?</h3>
          <div class="board"><strong>LESSON 2 — MY DAILY ROUTINE</strong><div class="en"><br>DO NOW<br><br>Complete:<br>1. I wake up at ______.<br>2. I go to school at ______.<br>3. I go to bed at ______.<br><br>TODAY I CAN:<br>Talk about my daily routine in English.</div><br><strong>VOCABULARY BANK</strong><div class="en">wake up — להתעורר<br>get dressed — להתלבש<br>eat breakfast — לאכול ארוחת בוקר<br>go to school — ללכת לבית הספר<br>come home — לחזור הביתה<br>eat lunch — לאכול ארוחת צהריים<br>do homework — להכין שיעורי בית<br>practice — להתאמן<br>take a shower — להתקלח<br>go to bed — ללכת לישון<br><br>I ______ at ______.<br>After school, I ______.</div></div>
        </section>

        <div class="section-title"><div><h2>שיעור 2 — דקה אחר דקה</h2><p>אותו מבנה קבוע: הקשר → קלט → תרגול → משחק → שימוש אישי → עצמאות.</p></div></div>

        <section class="timeline">
          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">1</span><h3>Do Now</h3></div><span class="time">00:00–04:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>כוון את התלמידים מיד למשימה שעל הלוח והסתובב ביניהם בזמן הכתיבה.</p><div class="say"><small>Say:</small>Good morning. Sit down, take out your notebook and look at the board.<br>Complete the three sentences.<br>You have four minutes. Start.</div><div class="tip">אם תלמיד תקוע: “Start with number one. What time do you wake up?”</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>משלימים שלושה משפטים אישיים: מתי הם קמים, מגיעים לבית הספר והולכים לישון.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">2</span><h3>השגת תשומת לב</h3></div><span class="time">04:00–05:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>אל תדבר מעל רעש. עצור את העבודה ורק אז המשך.</p><div class="say"><small>Say:</small>3… 2… 1… Pens down. Eyes on me.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מסיימים, מניחים עט ומפנים תשומת לב.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">3</span><h3>חזרה קצרה משיעור 1</h3></div><span class="time">05:00–08:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>שאל 2–3 תלמידים שאלות מהשיעור הקודם כדי ליצור רצף.</p><div class="say"><small>Ask:</small>What’s your name?<br>Where do you live?<br>What do you like?<br><br>Last lesson, we talked about ourselves.<br>Today, we are going to talk about our day.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>עונים בקצרה ומחזירים חומר קודם לזיכרון.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">4</span><h3>Lead-in — היום שלך</h3></div><span class="time">08:00–11:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>תן מודל אמיתי וקצר של היום שלך. קודם הבנה, אחר כך פירוק השפה.</p><div class="say"><small>Say slowly:</small>I wake up at 6:30.<br>I get dressed.<br>I eat breakfast.<br>I go to work.<br>I practice volleyball.<br>I come home.<br>I take a shower.<br>I go to bed at 11:00.<br><br>What did you understand about my day?</div><div class="tip">אפשר לקבל תשובות בעברית ולנסח אותן שוב באנגלית.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מקשיבים ומנסים להבין מידע על השגרה שלך.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">5</span><h3>מטרת השיעור</h3></div><span class="time">11:00–12:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>הצבע על המטרה שעל הלוח. הסבר במשפט אחד.</p><div class="say"><small>Say:</small>Today you will learn how to talk about your daily routine.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מבינים מה יוכלו לעשות בסוף השיעור.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">6</span><h3>Input — Meet Maya</h3></div><span class="time">12:00–17:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>בפעם הראשונה התלמידים רק מקשיבים. בפעם השנייה קוראים יחד ואז עונים על שאלות הבנה.</p><div class="say"><small>Meet Maya:</small>Hi, I’m Maya.<br>I wake up at 7:00.<br>I get dressed and eat breakfast.<br>I go to school at 8:00.<br>I come home at 2:00.<br>I eat lunch.<br>I do my homework in the afternoon.<br>I take a shower.<br>I go to bed at 10:00.</div><div class="say"><small>Ask:</small>What time does Maya wake up?<br>What time does she go to school?<br>What does she do in the afternoon?<br>What time does she go to bed?</div><div class="tip">חכה 3–5 שניות אחרי כל שאלה לפני שאתה עונה בעצמך.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מקשיבים, קוראים יחד ומאתרים מידע מתוך הטקסט.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">7</span><h3>אוצר מילים בתוך משפטים</h3></div><span class="time">17:00–23:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>לכל ביטוי: אמור משפט, הכיתה חוזרת, ואז תלמיד אחד אומר אותו בעצמו. אל תלמד את המילים כרשימה מנותקת.</p><div class="say"><small>Vocabulary in sentences:</small>I wake up at 7:00.<br>I get dressed in the morning.<br>I eat breakfast at home.<br>I go to school at 8:00.<br>I come home in the afternoon.<br>I eat lunch at 2:00.<br>I do my homework after school.<br>I practice after school.<br>I take a shower in the evening.<br>I go to bed at 10:00.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>חוזרים בקול ומשתמשים בביטויים בתוך משפטים.</p><div class="wordbank"><span class="word">wake up</span><span class="word">get dressed</span><span class="word">eat breakfast</span><span class="word">go to school</span><span class="word">come home</span><span class="word">eat lunch</span><span class="word">do homework</span><span class="word">practice</span><span class="word">take a shower</span><span class="word">go to bed</span></div></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">8</span><h3>Mime & Guess — משחק</h3></div><span class="time">23:00–28:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>חלק לשתי קבוצות. תלמיד מקבל פעולה וממחיז אותה בלי לדבר. הקבוצה מנחשת באנגלית.</p><div class="say"><small>Say:</small>Two teams.<br>One student comes to the front.<br>You act. No talking.<br>Your team guesses in English.</div><div class="check">בדיקת הוראות: Can you talk? — No. English or Hebrew? — English.</div><div class="tip">פעולות מומלצות: wake up, get dressed, eat breakfast, do homework, take a shower, go to bed.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>ממחיזים פעולות ומנחשים את הביטוי באנגלית. תשובה נכונה שווה נקודה.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">9</span><h3>סדר את היום</h3></div><span class="time">28:00–31:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>כתוב פעולות בסדר מעורב ובקש מהזוגות לסדר אותן.</p><div class="say"><small>On the board:</small>go to bed<br>eat breakfast<br>come home<br>wake up<br>go to school<br><br>Put the actions in the correct order.</div><div class="tip">שאל: What comes first? What comes next?</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מסדרים: wake up → eat breakfast → go to school → come home → go to bed.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">10</span><h3>Guided Practice — כתיבה אישית</h3></div><span class="time">31:00–36:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>בקש להשלים חמישה משפטים אישיים. בדוק: לבד או בזוג? כמה משפטים? אפשר להשתמש באוצר המילים?</p><div class="say"><small>Write:</small>MY DAILY ROUTINE<br><br>1. I wake up at ______.<br>2. I ______ in the morning.<br>3. I go to school at ______.<br>4. After school, I ______.<br>5. I go to bed at ______.<br><br>Complete five sentences. Work alone. You have five minutes. Start.</div><div class="tip">לתלמידים חזקים: Add two more sentences.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>כותבים חמישה משפטים על השגרה האישית שלהם ומשתמשים בבנק המילים.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">11</span><h3>Pair Interview</h3></div><span class="time">36:00–40:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>קודם הדגם ראיון קצר עם תלמיד, ואז העבר לעבודה בזוגות.</p><div class="say"><small>Questions:</small>What time do you wake up?<br>What do you do after school?<br>What time do you go to bed?<br><br>Work with the person next to you.<br>Student A asks. Student B answers.<br>Then switch.</div><div class="check">לפני ההתחלה: מי שואל קודם? מה קורה אחר כך?</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>שואלים ועונים על שלוש שאלות, ואז מחליפים תפקידים.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">12</span><h3>Independent Challenge — בלי מחברת</h3></div><span class="time">40:00–42:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>בקש לסגור מחברות ולספר לבן הזוג על היום בשלושה משפטים לפחות.</p><div class="say"><small>Say:</small>Close your notebook.<br>Tell your partner about your day.<br>No reading.<br>At least three sentences.</div><div class="tip">חפש עצמאות, לא שלמות.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>מדברים מהזיכרון על השגרה שלהם.</p></div></div>
          </article>

          <article class="stage">
            <div class="stage-head"><div class="stage-num"><span class="num">13</span><h3>Exit Ticket וסיום</h3></div><span class="time">42:00–45:00</span></div>
            <div class="two"><div class="role teacher"><h4>👨‍🏫 מה אני עושה כמורה</h4><p>בקש שלושה משפטים על השגרה בלי להסתכל במחברת. בדוק כמה דוגמאות לפני היציאה.</p><div class="say"><small>Say:</small>Last task.<br>Write three sentences about your daily routine without looking at your notebook.<br><br>Can you talk about your daily routine in English now?</div><div class="check">מדד הצלחה: רוב התלמידים מייצרים לפחות 3 משפטים עצמאיים ומשתמשים ב־3–5 ביטויי שגרה.</div></div><div class="role students"><h4>👥 מה התלמידים עושים</h4><p>כותבים שלושה משפטים עצמאיים ומסיימים את השיעור עם הוכחה קצרה ללמידה.</p></div></div>
          </article>
        </section>
      `;

      const vocabulary = document.createElement('section');
      vocabulary.id = 'englishVocabulary';
      vocabulary.className = 'english-vocab-library';
      vocabulary.innerHTML = `
        <h2>🔤 אוצר מילים באנגלית</h2>
        <p>כל מילה נשמרת יחד עם משמעות ומשפט שימושי כדי שלא תלמד כמילה מבודדת.</p>
        <h3 class="vocab-heading">שיעור 1 — Introducing Myself</h3>
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
        </div>
        <h3 class="vocab-heading">שיעור 2 — My Daily Routine</h3>
        <div class="english-vocab-grid">
          <article class="english-vocab-card"><h3 dir="ltr">wake up</h3><p>להתעורר</p><div class="example">I wake up at 7:00.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">get dressed</h3><p>להתלבש</p><div class="example">I get dressed in the morning.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">eat breakfast</h3><p>לאכול ארוחת בוקר</p><div class="example">I eat breakfast at home.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">go to school</h3><p>ללכת לבית הספר</p><div class="example">I go to school at 8:00.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">come home</h3><p>לחזור הביתה</p><div class="example">I come home in the afternoon.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">eat lunch</h3><p>לאכול ארוחת צהריים</p><div class="example">I eat lunch at 2:00.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">do homework</h3><p>להכין שיעורי בית</p><div class="example">I do my homework after school.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">practice</h3><p>להתאמן</p><div class="example">I practice after school.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">take a shower</h3><p>להתקלח</p><div class="example">I take a shower in the evening.</div></article>
          <article class="english-vocab-card"><h3 dir="ltr">go to bed</h3><p>ללכת לישון</p><div class="example">I go to bed at 10:00.</div></article>
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
        footer.insertAdjacentElement('beforebegin', lesson2);
        footer.insertAdjacentElement('afterend', vocabulary);
        vocabulary.insertAdjacentElement('afterend', games);
      } else {
        main.appendChild(lesson2);
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
    <a class="global-nav-item ${active==='nutritionScience'?'active':''}" href="nutrition-science.html"><strong>🔬</strong>מדעי תזונה</a>
    <a class="global-nav-item ${active==='critical'?'active':''}" href="critical-thinking.html"><strong>🧠</strong>חשיבה</a>
    <a class="global-nav-item ${active==='nutrition'?'active':''}" href="nutrition-builder.html"><strong>🥗</strong>בונה תפריט</a>
    <a class="global-nav-item ${active==='english'?'active':''}" href="english.html"><strong>📘🇬🇧</strong>אנגלית</a>
    <a class="global-nav-item ${active==='games'?'active':''}" href="games.html"><strong>🎮</strong>משחקים</a>
  </div>`;
  document.body.appendChild(nav);
})();