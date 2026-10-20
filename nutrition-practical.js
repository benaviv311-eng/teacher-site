(() => {
  const current = location.pathname.split('/').pop() || '';

  const lessons = {
    'nutrition-grade8-lesson1.html': {
      title: 'מאזן אנרגיה',
      foods: [
        ['🍌 בננה / פרי', 'פחמימות זמינות שיכולות לספק אנרגיה לפעילות וללמידה.'],
        ['🥣 שיבולת שועל / לחם / אורז / תפוח אדמה', 'מקורות פחמימה. הגוף יכול להשתמש בגלוקוז לאנרגיה ולאגור חלק ממנו כגליקוגן.'],
        ['🥚 ביצה / יוגורט / קטניות', 'חלבון מספק חומצות אמינו לבנייה, תחזוקה ותיקון של רקמות.'],
        ['🥄 טחינה / אבוקדו / אגוזים', 'שומן הוא מקור אנרגיה מרוכז וגם חלק חשוב ממבנה התאים וספיגת ויטמינים מסוימים.'],
        ['🥕 ירקות ופירות', 'מוסיפים סיבים, מים, ויטמינים ומינרלים. הם מדגימים מצוין שנפח גדול לא חייב להיות צפוף באנרגיה.'],
        ['💧 מים', 'נחוצים להובלת חומרים, ויסות חום ותפקוד תקין — בלי להוסיף אנרגיה תזונתית.']
      ],
      protocol: [
        '<strong>בארוחה:</strong> חפשו מקור אנרגיה, מקור חלבון, צבע מהצומח ומים.',
        '<strong>לפני פעילות:</strong> אם רעבים ועבר זמן מהארוחה, אפשר לבחור מזון מוכר ונוח שמכיל פחמימה, למשל פרי או כריך, ולשתות מים.',
        '<strong>אחרי פעילות:</strong> ארוחה רגילה שמשלבת פחמימה + חלבון + ירק/פרי + מים תומכת בחידוש מאגרים ובהתאוששות.',
        '<strong>לא “מקזזים” אוכל באימון:</strong> מאזן אנרגיה מתרחש לאורך זמן, ובגיל ההתבגרות אנרגיה נחוצה גם לגדילה.'
      ],
      caseTitle: 'תיק חקירה: “אבל אכלתי בריא!”',
      casePrompt: 'עידו אכל סלט גדול עם ירקות בלבד לפני אחר צהריים של לימודים ואימון. הוא אומר: “יש פה המון אוכל, אז בטוח יש לי כל מה שאני צריך.” מה חסר בתמונה?',
      caseAnswer: 'הנפח לבדו לא אומר שהארוחה מספקת את כל רכיבי הארוחה. אפשר לשקול להוסיף מקור פחמימה, מקור חלבון ושומן מתאים לפי הארוחה, לצד מים. המטרה אינה להגדיל או להקטין קלוריות בכוח — אלא להבין מה כל רכיב תורם.'
    },
    'nutrition-grade8-lesson2.html': {
      title: 'מטבוליזם',
      foods: [
        ['🥚 ביצה / 🥛 יוגורט / 🫘 קטניות', 'חלבון משמש לבנייה ותחזוקה של רקמות וחלבונים רבים שפועלים בגוף. עיבוד חלבון גם דורש אנרגיה, אבל הוא לא “טריק לשריפת קלוריות”.'],
        ['🍞 לחם / 🍚 אורז / 🥔 תפוח אדמה / 🍌 פרי', 'פחמימות מספקות גלוקוז — דלק חשוב לגוף ולמוח — ויכולות לסייע בחידוש גליקוגן אחרי פעילות.'],
        ['🥄 טחינה / 🥑 אבוקדו / 🥜 אגוזים', 'שומנים תורמים אנרגיה, מרכיבים של תאים וספיגה של ויטמינים מסיסי שומן.'],
        ['🫘 עדשים / טחינה / דגים / בשר', 'דוגמאות למזונות שיכולים לתרום ברזל. ברזל חשוב בין היתר להעברת חמצן; חוסר בו עלול להשפיע על תפקוד ועייפות.'],
        ['🧂 מלח מיודד', 'יוד דרוש ליצירת הורמוני בלוטת התריס. לא צריך “להוסיף יותר מלח”; הרעיון הוא להבין למה יוד הוא מינרל חשוב.'],
        ['🥦 ירקות + 🍎 פירות + 💧 מים', 'מספקים סיבים, מים, ויטמינים ומינרלים שתומכים בתפקוד תקין של מערכות הגוף.']
      ],
      protocol: [
        '<strong>1. אנרגיה:</strong> האם אכלתי לאורך היום מספיק כדי ללמוד, לגדול ולהיות פעיל?',
        '<strong>2. חלבון:</strong> האם הופיע מקור חלבון בארוחות שלי?',
        '<strong>3. מגוון:</strong> האם היו צבעים מהצומח, מקורות פחמימה, שומן ומזונות שונים — ולא “מזון קסם” אחד?',
        '<strong>4. התאוששות:</strong> מים, תנועה, אוכל ושינה עובדים יחד. אין כפתור אחד שמאיץ מטבוליזם.'
      ],
      caseTitle: 'תיק חקירה: “אני אאיץ את המטבוליזם”',
      casePrompt: 'מאיה שמעה ברשת שפלפל חריף ומים קרים “מאיצים מטבוליזם”, ולכן היא מתמקדת בהם אבל מדלגת על ארוחות מסודרות. מה הייתם אומרים לה?',
      caseAnswer: 'אין מאכל יחיד שמאיץ את המטבוליזם בצורה גדולה ומשמעותית. גוף צעיר צריך אנרגיה, חלבון, פחמימות, שומנים, סיבים, ויטמינים, מינרלים, מים, שינה ותנועה. הטריק הוא לא “האצה” — אלא תנאים טובים לתפקוד, גדילה והתאוששות.'
    },
    'nutrition-grade8-lesson3.html': {
      title: 'חלבון, פחמימה ושומן',
      foods: [
        ['🍌 בננה / 🍞 לחם / 🍚 אורז', 'דוגמאות למקורות פחמימה. הם יכולים לספק גלוקוז לאנרגיה ולתרום למילוי מאגרי גליקוגן.'],
        ['🥚 ביצה / 🥛 יוגורט / 🫘 עדשים', 'דוגמאות למקורות חלבון. חומצות האמינו משמשות לבנייה, תחזוקה ותיקון של רקמות וליצירת חלבונים רבים בגוף.'],
        ['🥄 טחינה / 🥑 אבוקדו / 🥜 אגוזים', 'שומן תורם אנרגיה, מרכיבים לתאים וסיוע בספיגת ויטמינים מסיסי שומן.'],
        ['🥦 ירקות / 🍎 פירות / 🫘 קטניות', 'מקורות לסיבים ולמיקרונוטריינטים. סיבים תומכים במערכת העיכול וחלקם משמשים מצע לחיידקי המעי.'],
        ['🥪 כריך עם חביתה / טונה / טופו', 'דוגמה פשוטה לשילוב: פחמימה + חלבון, שאפשר להוסיף אליו ירק ומקור שומן לפי הארוחה.'],
        ['💧 מים', 'מלווים את הארוחה ואת היום ותומכים בהובלת חומרים ובוויסות חום הגוף.']
      ],
      protocol: [
        '<strong>דלק?</strong> חפשו מקור פחמימה שמתאים לארוחה ולפעילות.',
        '<strong>בנייה?</strong> חפשו מקור חלבון כחלק מהארוחה.',
        '<strong>צבע וסיבים?</strong> הוסיפו ירק או פרי, ובמהלך היום גם קטניות ודגנים מלאים כשמתאים.',
        '<strong>שומן ומים?</strong> שלבו מקור שומן כחלק מהארוחה ושתו מים. זה כלי לחשיבה — לא נוסחה קשיחה.'
      ],
      caseTitle: 'תיק חקירה: “חלבון זה הכי חשוב”',
      casePrompt: 'דניאל אוכל לפני אימון רק קופסת טונה כי הוא בטוח שחלבון הוא הדבר היחיד שספורטאי צריך. מה חסר בחשיבה שלו?',
      caseAnswer: 'חלבון חשוב, אבל הוא רק חלק מהצוות. פחמימות יכולות לספק דלק לפעילות ולמלא גליקוגן, שומן ממלא תפקידים נוספים, וירקות/פירות/קטניות מוסיפים סיבים ומיקרונוטריינטים. המטרה היא שילוב ולא “רכיב מנצח”.'
    }
  };

  const lesson = lessons[current];
  if (!lesson || document.getElementById('nutrition-practical-module')) return;

  const style = document.createElement('style');
  style.id = 'nutrition-practical-style';
  style.textContent = `
    .nutrition-practical-module{background:#fff;border:1px solid #e8edf4;border-radius:24px;padding:22px;margin-top:20px;box-shadow:0 6px 24px #14213d0b;font-family:Arial,sans-serif;color:#172033}
    .nutrition-practical-module h2,.nutrition-practical-module h3{margin-top:0}.np-kicker{display:inline-block;background:#ecfdf3;color:#166534;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:900;margin-bottom:8px}
    .np-note{background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;padding:14px 16px;line-height:1.65;font-weight:700}.np-plate{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:15px 0}.np-half{grid-column:1/-1;background:#ecfdf3;border:1px solid #bbf7d0}.np-quarter{background:#fff7ed;border:1px solid #fed7aa}.np-plate>div{border-radius:18px;padding:17px;line-height:1.6}.np-plate strong{display:block;font-size:22px;margin-bottom:5px}.np-side{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0 18px}.np-chip{background:#f8fafc;border:1px solid #e2e8f0;border-radius:999px;padding:8px 11px;font-weight:800}.np-team{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}.np-team div,.np-food{background:#fbfcfe;border:1px solid #e5eaf1;border-radius:16px;padding:14px;line-height:1.55}.np-team b{display:block;font-size:18px;margin-bottom:5px}.np-foods{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0}.np-food strong{display:block;font-size:18px;margin-bottom:4px}.np-protocol{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:18px;padding:17px}.np-protocol li{margin:9px 0;line-height:1.55}.np-case{margin-top:14px;border:1px solid #ddd6fe;border-radius:18px;background:#faf5ff;overflow:hidden}.np-case summary{cursor:pointer;list-style:none;padding:16px 18px;font-weight:900;font-size:17px}.np-case summary::-webkit-details-marker{display:none}.np-case summary:after{content:'גלה את הפתרון';float:left;background:#5b21b6;color:#fff;border-radius:10px;padding:5px 9px;font-size:12px}.np-case[open] summary:after{content:'הסתר'}.np-case-body{padding:0 18px 17px;line-height:1.7}.np-source{font-size:12px;color:#667085;line-height:1.55;margin-top:14px}.np-source a{color:#205fc1;font-weight:700}
    @media(max-width:760px){.np-team{grid-template-columns:1fr 1fr}.np-foods{grid-template-columns:1fr}}@media(max-width:520px){.np-plate,.np-team{grid-template-columns:1fr}.np-half{grid-column:auto}}
  `;
  document.head.appendChild(style);

  const foods = lesson.foods.map(([name, why]) => `<div class="np-food"><strong>${name}</strong>${why}</div>`).join('');
  const protocol = lesson.protocol.map(item => `<li>${item}</li>`).join('');
  const html = `
    <section class="nutrition-practical-module" id="nutrition-practical-module">
      <span class="np-kicker">מהמדע לצלחת · ${lesson.title}</span>
      <h2>🍽️ צלחת מאוזנת — איך כל הצוות עובד יחד?</h2>
      <div class="np-note"><strong>מודל חזותי, לא חוק:</strong> זו דרך פשוטה לבנות ארוחה מגוונת לצעירים — לא יעד אישי, לא ספירת קלוריות ולא חובה שכל ארוחה תיראה בדיוק כך.</div>
      <div class="np-plate">
        <div class="np-half"><strong>½ צלחת — ירקות ופירות 🌈</strong>מגוון צבעים מספק סיבים, מים, ויטמינים ומינרלים.</div>
        <div class="np-quarter"><strong>¼ צלחת — פחמימה / דגן 🍞</strong>למשל לחם, אורז, שיבולת שועל, פסטה או תפוח אדמה. נותנים לגוף מקור אנרגיה זמין.</div>
        <div class="np-quarter"><strong>¼ צלחת — חלבון 🥚</strong>למשל קטניות, ביצים, דג, עוף, יוגורט, גבינה או טופו. תומך בבנייה, תחזוקה והתאוששות.</div>
      </div>
      <div class="np-side"><span class="np-chip">🥄 שומן איכותי — חלק קטן מהארוחה</span><span class="np-chip">💧 מים — לצד הארוחה ולאורך היום</span></div>

      <h3>⚙️ מי עושה מה במטבוליזם?</h3>
      <div class="np-team">
        <div><b>🍞 פחמימה = דלק</b>מתפרקת לגלוקוז, שמשמש אנרגיה לתאים; חלק יכול להיאגר כגליקוגן בשריר ובכבד.</div>
        <div><b>🥚 חלבון = בנייה</b>מספק חומצות אמינו לרקמות, אנזימים וחלבונים רבים שהגוף צריך כדי לתפקד.</div>
        <div><b>🥑 שומן = אנרגיה + תאים</b>מקור אנרגיה מרוכז, מרכיב בממברנות התאים ומסייע בספיגת ויטמינים A, D, E ו-K.</div>
        <div><b>🥦 סיבים = מערכת העיכול</b>תומכים בפעילות מערכת העיכול; סוגים מסוימים משמשים מזון לחיידקי המעי ומשפיעים על קצב ספיגת המזון.</div>
        <div><b>💧 מים = הובלה וקירור</b>נחוצים לזרימת דם, ויסות חום ולתגובות רבות שמתרחשות בגוף.</div>
        <div><b>🔑 ויטמינים ומינרלים = מפתחות</b>לא נותנים לנו קלוריות, אבל רבים מהם משתתפים בתגובות מטבוליות. למשל ברזל בהעברת חמצן ויוד ביצירת הורמוני בלוטת התריס.</div>
      </div>
      <div class="np-note"><strong>האיזון הוא הסיפור:</strong> אין רכיב אחד ש“מפעיל” את המטבוליזם. פחמימות, חלבון, שומן, סיבים, מים ומיקרונוטריינטים ממלאים תפקידים שונים — ולכן מגוון חשוב יותר מחיפוש אחר מאכל קסם.</div>

      <h3>🥗 מאכלים שמתחברים לנושא</h3>
      <div class="np-foods">${foods}</div>

      <div class="np-protocol"><h3>🎯 פרוטוקול מעשי</h3><ol>${protocol}</ol></div>

      <details class="np-case"><summary>🕵️ ${lesson.caseTitle}</summary><div class="np-case-body"><p><strong>המקרה:</strong> ${lesson.casePrompt}</p><p><strong>פתרון לדיון:</strong> ${lesson.caseAnswer}</p></div></details>

      <p class="np-source"><strong>למורה:</strong> יחס ה־½–¼–¼ מוצג כמודל חזותי גמיש בהשראת <a href="https://nutritionsource.hsph.harvard.edu/kids-healthy-eating-plate/" target="_blank" rel="noopener">Kid’s Healthy Eating Plate</a>. <a href="https://me.health.gov.il/parenting/learn-more/child-and-adolescent-nutrition/children-and-adolescents-nutritional-recommendations" target="_blank" rel="noopener">משרד הבריאות</a> מדגיש לילדים ולנוער מים, ירקות, פירות, דגנים מלאים, קטניות, שומנים בריאים ומגוון מזונות. ההתאמה בפועל משתנה לפי גיל, רעב, פעילות, תרבות והעדפות.</p>
    </section>`;

  const main = document.querySelector('main.app') || document.querySelector('main');
  if (!main) return;
  const teacherScience = main.querySelector('.science');
  if (teacherScience) teacherScience.insertAdjacentHTML('beforebegin', html);
  else main.insertAdjacentHTML('beforeend', html);
})();
