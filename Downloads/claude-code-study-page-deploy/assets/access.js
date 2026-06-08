// ── 허용 이메일 목록 ─────────────────────────────────────────────────────────
// 수강생 추가: 이 배열에 이메일 주소를 추가하세요
// 수강생 제거: 해당 줄을 삭제하거나 앞에 // 를 붙이세요
const ALLOWED_EMAILS = [
  'adelinekwak0619@kakao.com',
  'kwonsy0117@naver.com',
  'lipskkh@naver.com',
  'kimyaksa@gmail.com',
  'coolfacejh@hanmail.net',
  'nyhae97@gmail.com',
  'sachol.cap@gmail.com',
  'bq9248@nate.com',
  'soleil96@naver.com',
  'okseomj@gmail.com',
  'bomins0429@gmail.com',
  'gyumsonsam@gmail.com',
  'joohwan.song15b@gmail.com',
  'michelle7610@naver.com',
  'hyeji99@gmail.com',
  'yumyang123@gmail.com',
  'dimplettl@gmail.com',
  'yuhki20@gmail.com',
  'sam05256@naver.com',
  'profen2021@gmail.com',
  'lpby79@naver.com',
  'franklee.sec@gmail.com',
  'joo1974@naver.com',
  'jka10004@gmail.com',
  'icewood@naver.com',
  'todd.cho333@gmail.com',
  'areteleader@gmail.com',
  'younstory@gmail.com',
  'eunji_0027@naver.com',
  'hyjing72@gmail.com',
  'sms20-yms@hanmail.net',
  'hjyk03@gmail.com'
];
// ─────────────────────────────────────────────────────────────────────────────

const ACCESS_STORAGE_KEY='gpters22_claude_code_access';
(function(){
  const body=document.body;
  body.classList.add('is-locked');
  const gate=document.createElement('div');
  gate.className='access-gate';
  gate.id='accessGate';
  gate.innerHTML=`<div class="access-card"><div class="tag">PRIVATE / STUDENT ACCESS</div><h2>수강생 전용<br>페이지</h2><p>이 강의 웹페이지는 수강생용 공유본입니다. 수강 신청 시 등록한 <strong>이메일 주소</strong>를 입력해야 볼 수 있습니다.</p><label class="access-card__label" for="accessEmailInput">이메일</label><div class="access-card__row"><input id="accessEmailInput" type="email" placeholder="수강생 이메일을 입력하세요" autocomplete="email" /><button id="accessEmailButton" type="button">입장하기</button></div><div id="accessEmailError" class="access-card__error" hidden>등록되지 않은 이메일입니다.</div></div>`;
  const shell=document.querySelector('.protected-shell');
  document.body.prepend(gate);
  function unlock(){localStorage.setItem(ACCESS_STORAGE_KEY,'ok');body.classList.remove('is-locked');shell?.setAttribute('aria-hidden','false');gate.hidden=true;}
  function tryUnlock(){
    const input=document.getElementById('accessEmailInput');
    const error=document.getElementById('accessEmailError');
    const email=(input.value||'').trim().toLowerCase();
    if(ALLOWED_EMAILS.map(e=>e.toLowerCase()).includes(email)){unlock();}
    else{error.hidden=false;input.focus();input.select();}
  }
  if(localStorage.getItem(ACCESS_STORAGE_KEY)==='ok'){unlock();}else{shell?.setAttribute('aria-hidden','true');setTimeout(()=>document.getElementById('accessEmailInput')?.focus(),60);}
  gate.querySelector('#accessEmailButton').addEventListener('click',tryUnlock);
  gate.querySelector('#accessEmailInput').addEventListener('keydown',e=>{if(e.key==='Enter')tryUnlock();});
})();

/* ── 진행률 바 주입 ────────────────────────────────────────── */
(function(){
  var WEEK_PROGRESS = { 'week1': 1, 'week2': 2, 'week3': 3, 'week4': 4 };
  function getWeekFromPath(){
    var path = window.location.pathname.toLowerCase();
    for(var key in WEEK_PROGRESS){
      if(path.indexOf(key) !== -1) return WEEK_PROGRESS[key];
    }
    return 0;
  }
  function initProgressBar(){
    var topbar = document.querySelector('.topbar');
    if(!topbar) return;
    var week = getWeekFromPath();
    if(week === 0) return;
    var bar = document.createElement('div');
    bar.className = 'topbar-progress';
    for(var i = 1; i <= 4; i++){
      var seg = document.createElement('div');
      seg.className = 'tp-seg' + (i <= week ? ' tp-seg--on' : '');
      bar.appendChild(seg);
    }
    topbar.appendChild(bar);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initProgressBar);
  } else {
    initProgressBar();
  }
})();

/* ── Pill 아이콘 주입 ───────────────────────────────────────── */
(function(){
  var ICON_MAP = [
    ['쉽게 말하면', '💬'],
    ['왜 하나요',   '⚡'],
    ['샘플 결과물', '👁'],
    ['결과물',      '👁'],
    ['핵심',        '🎯'],
    ['프롬프트 예시','💡'],
    ['이번 주',     '✅'],
    ['시작 예시',   '🚀'],
    ['공식문서',    '📖'],
    ['다음 주',     '📌'],
    ['과제',        '📌'],
    ['왜',          '⚡'],
    ['tip',         '💡'],
    ['주의',        '⚠️'],
  ];
  function initPillIcons(){
    document.querySelectorAll('.pill').forEach(function(el){
      if(el.querySelector('.pill-icon')) return;
      var text = el.textContent.trim();
      for(var i = 0; i < ICON_MAP.length; i++){
        if(text.indexOf(ICON_MAP[i][0]) !== -1){
          var span = document.createElement('span');
          span.className = 'pill-icon';
          span.textContent = ICON_MAP[i][1];
          el.insertBefore(span, el.firstChild);
          break;
        }
      }
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initPillIcons);
  } else {
    initPillIcons();
  }
})();

(function(){
  function initCopyButtons(){
    document.querySelectorAll('.code').forEach(function(block){
      var originalText=block.innerText;
      var btn=document.createElement('button');
      btn.className='copy-btn';
      btn.textContent='복사';
      btn.addEventListener('click',function(){
        navigator.clipboard.writeText(originalText).then(function(){
          btn.textContent='✓ 복사됨';
          setTimeout(function(){btn.textContent='복사';},1500);
        });
      });
      block.appendChild(btn);
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initCopyButtons);
  }else{
    initCopyButtons();
  }
})();
