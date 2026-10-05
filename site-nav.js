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
      @media(max-width:420px){.global-nav-item{font-size:9px;min-width:44px}.global-nav-item strong{font-size:19px}}
    `;
    document.head.appendChild(style);
  }

  const nav = document.createElement('nav');
  nav.className = 'global-nav';
  nav.setAttribute('aria-label','ניווט ראשי');
  nav.innerHTML = `<div class="global-nav-inner">
    <a class="global-nav-item ${active==='home'?'active':''}" href="index.html"><strong>⌂</strong>בית</a>
    <a class="global-nav-item ${active==='lessons'?'active':''}" href="lessons.html"><strong>📖</strong>שיעורים</a>
    <a class="global-nav-item ${active==='critical'?'active':''}" href="critical-thinking.html"><strong>🧠</strong>חשיבה</a>
    <a class="global-nav-item ${active==='nutrition'?'active':''}" href="nutrition-builder.html"><strong>🥗</strong>תזונה</a>
    <a class="global-nav-item ${active==='english'?'active':''}" href="english.html"><strong>📘🇬🇧</strong>שיעורי אנגלית</a>
    <a class="global-nav-item ${active==='games'?'active':''}" href="games.html"><strong>🎮</strong>משחקים</a>
  </div>`;
  document.body.appendChild(nav);
})();
