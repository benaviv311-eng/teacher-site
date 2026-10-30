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
        term: 'פחמימה',
        prompt: 'מה היא עושה בגוף — ולמה ספורטאים מדברים עליה כל כך הרבה?',
        definition: 'פחמימות הן משפחה של רכיבי מזון שהגוף יכול לפרק, בין היתר, לגלוקוז — מקור אנרגיה חשוב לתאים.',
        example: 'לחם, אורז, תפוח אדמה, שיבולת שועל ופירות הם דוגמאות למקורות פחמימה.',
        importance: 'היא עוזרת לי להבין מאיפה מגיע דלק לפעילות ואיך הגוף שומר חלק ממנו כגליקוגן.'
      },
      {
        term: 'חלבון',
        prompt: 'האם התפקיד שלו הוא רק לבנות שריר?',
        definition: 'חלבון בנוי מחומצות אמינו ומשמש לבנייה, תחזוקה ותיקון של רקמות וגם ליצירת חלבונים ואנזימים רבים בגוף.',
        example: 'ביצה, יוגורט, דג, טופו, עדשים ושעועית יכולים לספק חלבון.',
        importance: 'הוא עוזר לי להבין התאוששות ובנייה — בלי לחשוב שכל חלבון שאוכלים הופך מיד לשריר.'
      },
      {
        term: 'שומן',
        prompt: 'למה הגוף צריך אותו גם אם יש לו פחמימות לאנרגיה?',
        definition: 'שומן הוא מקור אנרגיה מרוכז, חלק ממבנה התאים ומסייע בספיגת ויטמינים מסיסי שומן.',
        example: 'טחינה, אבוקדו, אגוזים, זרעים ושמן זית הם דוגמאות למקורות שומן.',
        importance: 'הוא עוזר לי לזכור ששומן אינו “אויב” ושיש לו תפקידים חשובים מעבר לאנרגיה.'
      },
      {
        term: 'סיבים',
        prompt: 'למה משהו שלא מתעכל כמו שאר הפחמימות עדיין חשוב כל כך?',
        definition: 'סיבים הם סוגי פחמימות שאינם מתעכלים במעי הדק כמו פחמימות אחרות ותומכים בתפקוד מערכת העיכול ובסביבת המעי.',
        example: 'ירקות, פירות, קטניות ודגנים מלאים הם מקורות נפוצים לסיבים.',
        importance: 'הם עוזרים לי להבין למה פרי שלם ומיץ אינם בדיוק אותו דבר ולמה חשוב מגוון מזונות מן הצומח.'
      }
    ],
    'nutrition-grade8-lesson4.html': [
      {
        term: 'מים',
        prompt: 'למה הגוף צריך מים אם אין בהם אנרגיה?',
        definition: 'מים הם חלק מרכזי מנוזלי הגוף ומשתתפים בהובלת חומרים, בוויסות חום ובתהליכים רבים בתאים.',
        example: 'שתייה לאורך היום ומזונות כמו אבטיח, מלפפון, חלב ומרק תורמים לנוזלים.',
        importance: 'הם עוזרים לי לחשוב לא רק כמה שתיתי אלא גם מתי, כמה חם ומה צפוי באימון.'
      },
      {
        term: 'זיעה',
        prompt: 'האם מי שמזיע יותר בהכרח עובד קשה יותר?',
        definition: 'זיעה היא נוזל שמופרש לעור; האידוי שלה מסייע בפיזור חום מהגוף.',
        example: 'ביום לח הזיעה יכולה להתאדות פחות ביעילות ולכן הקירור נעשה קשה יותר.',
        importance: 'היא עוזרת לי להבין שזיעה היא מנגנון קירור ולא מדד לאיכות האימון או לשריפת שומן.'
      },
      {
        term: 'אלקטרוליטים',
        prompt: 'מה עוד אנחנו מאבדים בזיעה חוץ ממים?',
        definition: 'אלקטרוליטים הם מינרלים טעונים בנוזלי הגוף, ובהם נתרן ואשלגן, שקשורים לתפקוד עצבים, שרירים ומאזן נוזלים.',
        example: 'אלקטרוליטים מגיעים גם מאוכל רגיל כמו יוגורט, תפוח אדמה, בננה, מרק וקטניות.',
        importance: 'הם עוזרים לי להבין מתי מים מספיקים ומתי פעילות ממושכת והזעה רבה הופכות השלמת מלחים לרלוונטית יותר.'
      },
      {
        term: 'התייבשות',
        prompt: 'איך הגוף מאותת שהוא מאבד יותר נוזלים ממה שהוא מקבל?',
        definition: 'התייבשות היא מצב שבו הגוף מאבד יותר נוזלים ממה שהוא מקבל.',
        example: 'צמא, יובש בפה, פחות שתן או שתן כהה, כאב ראש וסחרחורת יכולים להיות רמזים אפשריים.',
        importance: 'היא עוזרת לי לזהות רמזים מוקדם ולדעת שהתגובה תלויה במצב ולא במספר קסם של בקבוקים.'
      }
    ],
    'nutrition-grade8-lesson5.html': [
      {
        term: 'ברזל',
        prompt: 'למה אפשר להרגיש חלשים גם כשאוכלים מספיק אנרגיה?',
        definition: 'ברזל הוא מינרל שנחוץ בין היתר ליצירת המוגלובין ומיוגלובין, חלבונים שקשורים להובלת ואחסון חמצן.',
        example: 'בשר, דגים, עדשים, שעועית ומזונות מועשרים יכולים לספק ברזל; ויטמין C יכול לשפר ספיגה של ברזל מהצומח.',
        importance: 'הוא עוזר לי להבין למה כמות המזון לבדה לא מספרת הכול — גם ספיגה ומצב הברזל חשובים.'
      },
      {
        term: 'סידן',
        prompt: 'למה עצמות צריכות יותר מתרגיל טוב באימון?',
        definition: 'סידן הוא מינרל שמרביתו מאוחסן בעצמות ובשיניים, והוא חשוב גם לשרירים ולעצבים.',
        example: 'חלב, יוגורט, גבינה, מזונות מועשרים, טופו מתאים ודגים עם עצמות יכולים לספק סידן.',
        importance: 'הוא עוזר לי להבין שבניית עצם היא תהליך ארוך שמושפע מתזונה ומפעילות.'
      },
      {
        term: 'ויטמין D',
        prompt: 'למה סידן לבדו לא מספר את כל הסיפור של העצם?',
        definition: 'ויטמין D מסייע לגוף לספוג סידן ומשתתף גם בתפקוד שרירים, עצבים ומערכת החיסון.',
        example: 'דגים שמנים ומזונות מועשרים הם מקורות מזון; הגוף יכול גם לייצר ויטמין D בעור בעקבות חשיפה מתאימה לשמש.',
        importance: 'הוא עוזר לי לחבר בין מה שאכלתי לבין מה שהגוף מסוגל לספוג ולנצל.'
      },
      {
        term: 'B12',
        prompt: 'איזה ויטמין דורש תשומת לב מיוחדת כשלא אוכלים מזון מן החי?',
        definition: 'ויטמין B12 נחוץ ליצירת תאי דם אדומים תקינים, לתפקוד מערכת העצבים וליצירת DNA.',
        example: 'דגים, בשר, ביצים ומוצרי חלב מכילים B12 באופן טבעי; מזונות צמחיים מספקים אותו רק אם הועשרו.',
        importance: 'הוא עוזר לי להבין שגם תזונה מגוונת יכולה להזדקק לתכנון של רכיב מסוים.'
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
    .concept-recap-list{display:grid;gap:10px;margin-top:14px}.concept-recap{border:1px solid #dbeafe;border-radius:17px;background:#f8fbff;overflow:hidden}.concept-recap summary{cursor:pointer;list-style:none;padding:15px 17px;font-weight:900;font-size:18px}.concept-recap summary::-webkit-details-marker{display:none}.concept-recap summary:after{content:'גלה הגדרה';float:left;background:#1d4ed8;color:#fff;border-radius:9px;padding:5px 8px;font-size:11px}.concept-recap[open] summary:after{content:'הסתר'}.concept-recap-body{padding:0 17px 16px;line-height:1.7}.concept-example{margin-top:8px;background:#ecfdf3;border-radius:12px;padding:10px 12px;color:#166534}.concept-importance{margin-top:8px;background:#eff6ff;border-radius:12px;padding:10px 12px;color:#1e3a8a}
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
            <div class="concept-recap-body"><strong>הגדרה:</strong> ${c.definition}<div class="concept-example"><strong>דוגמה:</strong> ${c.example}</div>${c.importance ? `<div class="concept-importance"><strong>למה חשוב לי:</strong> ${c.importance}</div>` : ''}</div>
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