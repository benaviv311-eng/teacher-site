(() => {
  const current = location.pathname.split('/').pop() || '';

  const conceptSets = {
    'nutrition-grade8-lesson1.html': [
      {
        term: 'קלוריה',
        prompt: 'מה לדעתכם המילה הזאת באמת מודדת?',
        definition: 'קלוריה היא יחידה למדידת אנרגיה. בהקשר של מזון מתכוונים בדרך כלל לקילוקלוריה (קק״ל).',
        example: 'אם שני מזונות מכילים מספר שונה של קלוריות, פירוש הדבר שהם מספקים כמות שונה של אנרגיה — לא שאחד מהם בהכרח “בריא יותר”.'
      },
      {
        term: 'צפיפות אנרגטית',
        prompt: 'איך מזון קטן יכול להכיל יותר אנרגיה ממזון גדול?',
        definition: 'צפיפות אנרגטית מתארת כמה אנרגיה יש בכמות או במשקל מסוים של מזון.',
        example: 'אגוזים או טחינה יכולים להיות צפופים יותר באנרגיה מאבטיח, שמכיל הרבה מים.'
      },
      {
        term: 'הוצאה אנרגטית',
        prompt: 'על מה הגוף משתמש באנרגיה גם כשלא מתאמנים?',
        definition: 'הוצאה אנרגטית היא האנרגיה שהגוף משתמש בה לתפקוד בסיסי, תנועה, עיכול, שמירה על חום ובגיל ההתבגרות גם לגדילה.',
        example: 'גם ישיבה בכיתה דורשת אנרגיה — המוח, הלב והנשימה ממשיכים לעבוד.'
      },
      {
        term: 'מאזן אנרגיה',
        prompt: 'מה קורה כשאנרגיה שנכנסת ואנרגיה שהגוף משתמש בה אינן זהות?',
        definition: 'מאזן אנרגיה הוא היחס לאורך זמן בין האנרגיה שמגיעה ממזון ומשקה לבין האנרגיה שהגוף משתמש בה.',
        example: 'לא שופטים את המאזן לפי ארוחה אחת או אימון אחד; מסתכלים על התהליך המצטבר לאורך זמן.'
      }
    ],
    'nutrition-grade8-lesson2.html': [
      {
        term: 'מטבוליזם',
        prompt: 'האם מטבוליזם הוא פשוט “שריפת קלוריות”?',
        definition: 'מטבוליזם הוא כלל התהליכים הכימיים שהגוף מבצע כדי לחיות, לפרק חומרים, לבנות חומרים ולתחזק את התאים והרקמות.',
        example: 'בניית חלבונים, הפקת אנרגיה מגלוקוז ותהליכים בכבד הם כולם חלק מהמטבוליזם.'
      },
      {
        term: 'הוצאה אנרגטית במנוחה',
        prompt: 'למה הגוף צריך אנרגיה גם כשאנחנו שוכבים ולא זזים?',
        definition: 'הוצאה אנרגטית במנוחה היא האנרגיה שהגוף משתמש בה כדי להפעיל מערכות בסיסיות כשאיננו פעילים.',
        example: 'נשימה, זרימת דם, פעילות המוח ותחזוקת התאים ממשיכות גם בשינה.'
      },
      {
        term: 'NEAT',
        prompt: 'איזו תנועה “נחשבת” גם אם היא לא אימון?',
        definition: 'NEAT הוא ההוצאה האנרגטית מתנועה יומיומית שאינה אימון מתוכנן — למשל הליכה, עמידה, מדרגות וסידור.',
        example: 'שני אנשים יכולים לעשות אותו אימון ובכל זאת להיות שונים מאוד בכמות התנועה שלהם בשאר היום.'
      },
      {
        term: 'האפקט התרמי של המזון',
        prompt: 'האם הגוף צריך אנרגיה גם כדי לעכל אוכל?',
        definition: 'האפקט התרמי של המזון הוא האנרגיה שהגוף משתמש בה לעיכול, ספיגה ועיבוד של רכיבי המזון.',
        example: 'לרכיבי מזון שונים יש עלות עיכול שונה, אבל זו אינה “שיטת קסם” להאצת מטבוליזם.'
      }
    ],
    'nutrition-grade8-lesson3.html': [
      {
        term: 'גלוקוז',
        prompt: 'למה הגוף והמוח צריכים את המולקולה הזאת?',
        definition: 'גלוקוז הוא סוכר פשוט שהתאים יכולים להשתמש בו כמקור אנרגיה.',
        example: 'פחמימות יכולות להתפרק לגלוקוז, שנכנס למסלולים שמייצרים אנרגיה זמינה לתאים.'
      },
      {
        term: 'גליקוגן',
        prompt: 'איפה הגוף שומר חלק מהפחמימות לשימוש מאוחר יותר?',
        definition: 'גליקוגן הוא צורת האחסון של גלוקוז בעיקר בכבד ובשרירים.',
        example: 'בפעילות גופנית השריר יכול להשתמש בגליקוגן כמקור לפחמימות זמינות.'
      },
      {
        term: 'חומצות אמינו',
        prompt: 'מהן “אבני הבניין” שמהן הגוף בונה חלבונים?',
        definition: 'חומצות אמינו הן יחידות הבניין שמהן הגוף מרכיב חלבונים.',
        example: 'הגוף משתמש בחומצות אמינו לבנייה ולתיקון של רקמות וגם ליצירת אנזימים וחלבונים נוספים.'
      },
      {
        term: 'סיבים',
        prompt: 'למה משהו שלא מתעכל כמו שאר הפחמימות עדיין חשוב?',
        definition: 'סיבים הם פחמימות שאינן מתעכלות במעי הדק כמו פחמימות אחרות; הם תומכים בתפקוד מערכת העיכול וחלקם משמשים מצע לחיידקי המעי.',
        example: 'ירקות, פירות, קטניות ודגנים מלאים הם מקורות נפוצים לסיבים.'
      }
    ]
  };

  const concepts = conceptSets[current];
  if (!concepts || document.getElementById('concept-loop-start')) return;

  const style = document.createElement('style');
  style.id = 'nutrition-concept-loop-style';
  style.textContent = `
    .concept-loop{background:#fff;border:1px solid #e8edf4;border-radius:24px;padding:22px;margin-top:20px;box-shadow:0 6px 24px #14213d0b;font-family:Arial,sans-serif;color:#172033}
    .concept-loop h2{margin:0 0 8px}.concept-loop p{line-height:1.65}.concept-loop-kicker{display:inline-block;background:#e0f2fe;color:#075985;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:900;margin-bottom:8px}
    .concept-loop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:15px}.concept-term{background:#111827;color:#fff;border-radius:18px;padding:18px 12px;text-align:center;min-height:105px;display:flex;flex-direction:column;justify-content:center;gap:8px}.concept-term strong{font-size:21px}.concept-term small{color:#cbd5e1;line-height:1.45}
    .concept-loop-instruction{background:#fef3c7;border:1px solid #fde68a;color:#78350f;border-radius:16px;padding:13px 15px;font-weight:800;line-height:1.6;margin-top:14px}
    .concept-recap-list{display:grid;gap:10px;margin-top:14px}.concept-recap{border:1px solid #dbeafe;border-radius:17px;background:#f8fbff;overflow:hidden}.concept-recap summary{cursor:pointer;list-style:none;padding:15px 17px;font-weight:900;font-size:18px}.concept-recap summary::-webkit-details-marker{display:none}.concept-recap summary:after{content:'גלה הגדרה';float:left;background:#1d4ed8;color:#fff;border-radius:9px;padding:5px 8px;font-size:11px}.concept-recap[open] summary:after{content:'הסתר'}.concept-recap-body{padding:0 17px 16px;line-height:1.7}.concept-example{margin-top:8px;background:#ecfdf3;border-radius:12px;padding:10px 12px;color:#166534}
    @media(max-width:760px){.concept-loop-grid{grid-template-columns:1fr 1fr}}@media(max-width:480px){.concept-loop-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const startHtml = `
    <section class="concept-loop" id="concept-loop-start">
      <span class="concept-loop-kicker">פתיחת השיעור</span>
      <h2>🧠 4 מושגים על הלוח</h2>
      <p><strong>עוד לא מגדירים.</strong> מסתכלים על ארבעת המושגים, שומעים ניחושים, דוגמאות וחילוקי דעות — ורק בסוף השיעור חוזרים אליהם.</p>
      <div class="concept-loop-grid">
        ${concepts.map(c => `<div class="concept-term"><strong>${c.term}</strong><small>${c.prompt}</small></div>`).join('')}
      </div>
      <div class="concept-loop-instruction">🎤 <strong>מה אתם חושבים?</strong> בחרו מושג אחד שאתם מכירים ומושג אחד שאתם לא בטוחים לגביו. נסו להסביר בלי לחפש תשובה.</div>
    </section>
  `;

  const recapHtml = `
    <section class="concept-loop" id="concept-loop-recap">
      <span class="concept-loop-kicker">סגירת מעגל</span>
      <h2>🔁 חוזרים ל־4 המושגים</h2>
      <p>לפני שפותחים: תנו לתלמידים להגדיר כל מושג במילים שלהם. אחר כך פותחים ומשווים להגדרה המדעית.</p>
      <div class="concept-recap-list">
        ${concepts.map(c => `
          <details class="concept-recap">
            <summary>${c.term}</summary>
            <div class="concept-recap-body"><strong>הגדרה:</strong> ${c.definition}<div class="concept-example"><strong>דוגמה:</strong> ${c.example}</div></div>
          </details>
        `).join('')}
      </div>
    </section>
  `;

  const main = document.querySelector('main.app') || document.querySelector('main');
  if (!main) return;

  const boardPlan = main.querySelector('.board-plan');
  if (boardPlan) boardPlan.insertAdjacentHTML('beforebegin', startHtml);
  else {
    const hero = main.querySelector('.hero');
    if (hero) hero.insertAdjacentHTML('afterend', startHtml);
    else main.insertAdjacentHTML('afterbegin', startHtml);
  }

  const exit = main.querySelector('.exit');
  const science = main.querySelector('.science');
  if (exit) exit.insertAdjacentHTML('beforebegin', recapHtml);
  else if (science) science.insertAdjacentHTML('beforebegin', recapHtml);
  else main.insertAdjacentHTML('beforeend', recapHtml);
})();