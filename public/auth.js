Here's your cleaned-up version with all the little useless notes (comments like /* ── credentials ── */, /* ── helpers ── */, etc.) removed:
JavaScript/* VirtualDesktopz Auth — shared across all pages */
(function () {
  'use strict';

  var _k = ['s','e','r','e','n','i','t','t','y','p','r','e','m','i','u','m'].join('');
  var _salt = 'vd_s9x2z_bf3k';
  var _unlocked = false;

  async function hashValue(val) {
    var enc = new TextEncoder();
    var buf = await crypto.subtle.digest('SHA-256', enc.encode(_salt + val));
    return Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
  }

  async function isRemembered() {
    try {
      var stored = localStorage.getItem('vd_auth_tok');
      if (!stored) return false;
      var expected = await hashValue(_k);
      return stored === expected;
    } catch(e) { return false; }
  }

  async function storeRemember() {
    try { localStorage.setItem('vd_auth_tok', await hashValue(_k)); } catch(e){}
  }

  function buildOverlay() {
    var el = document.createElement('div');
    el.id = 'vd-auth-overlay';
    el.innerHTML = `
      <canvas id="vd-auth-canvas"></canvas>
      <div class="vd-pw-card" id="vd-pw-card">
        <div class="vd-brand-row">
          <div class="vd-brand-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <span class="vd-brand-name">VirtualDesktopz</span>
          <span class="vd-badge">PREMIUM</span>
        </div>
        <h2 class="vd-heading">Sign in to continue</h2>
        <p class="vd-subtext">Your session requires authentication.<br>Enter your password below.</p>
        <div class="vd-success" id="vd-success">
          <div class="vd-success-dot"></div>
          <span>Access granted — welcome back.</span>
        </div>
        <div id="vd-form">
          <p class="vd-field-label">Password</p>
          <div class="vd-input-row">
            <input type="password" id="vd-pw-input" placeholder="Enter your password" autocomplete="current-password" autofocus>
            <button class="vd-eye-btn" id="vd-eye" tabindex="-1">
              <svg id="vd-eye-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
          <div class="vd-error-row">
            <div class="vd-error" id="vd-error">
              <span class="vd-error-dot"></span>
              <span>Incorrect password — try again</span>
            </div>
          </div>
          <div class="vd-strength">
            <div class="vd-pip" id="vd-pp1"></div>
            <div class="vd-pip" id="vd-pp2"></div>
            <div class="vd-pip" id="vd-pp3"></div>
            <div class="vd-pip" id="vd-pp4"></div>
          </div>
          <div class="vd-remember-row">
            <span class="vd-remember-label" id="vd-rem-label">Remember me</span>
            <label class="vd-toggle-wrap">
              <input type="checkbox" id="vd-remember">
              <div class="vd-toggle-track"></div>
              <div class="vd-toggle-thumb"></div>
            </label>
          </div>
          <button id="vd-submit">Unlock</button>
        </div>
        <div class="vd-divider"></div>
        <div class="vd-footer-row">
          <span class="vd-footer-left">protected · serenitty</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
      </div>
    `;

    var style = document.createElement('style');
    style.textContent = `
      #vd-auth-overlay {
        position:fixed;inset:0;z-index:2147483647;
        display:flex;align-items:center;justify-content:center;
        background:rgba(0,0,0,0.97);padding:24px;
        font-family:'Inter','Syne',sans-serif;
        pointer-events:all;
      }
      #vd-auth-canvas {
        position:absolute;inset:0;width:100%;height:100%;
        z-index:0;pointer-events:none;
      }
      .vd-pw-card {
        position:relative;z-index:1;
        width:100%;max-width:400px;
        background:rgba(18,16,14,0.92);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;padding:44px 40px 36px;
        overflow:hidden;
        animation:vdCardIn 0.55s cubic-bezier(0.16,1,0.3,1) both;
        transform-style:preserve-3d;
        will-change:transform;
        box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 30px 80px rgba(0,0,0,0.8),0 0 60px rgba(255,255,255,0.02);
        transition:box-shadow 0.15s ease;
        backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);
      }
      .vd-pw-card::after {
        content:'';position:absolute;top:0;left:0;right:0;height:1px;
        background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.15) 30%,rgba(255,255,255,0.15) 70%,transparent 100%);
      }
      .vd-pw-card::before {
        content:'';position:absolute;inset:0;border-radius:20px;
        background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,0.03) 0%,transparent 70%);
        pointer-events:none;
      }
      @keyframes vdCardIn {
        from{opacity:0;transform:translateY(24px) scale(0.97);}
        to{opacity:1;transform:translateY(0) scale(1);}
      }
      @keyframes vdShake {
        0%,100%{transform:translateX(0);}
        15%{transform:translateX(-6px);}30%{transform:translateX(6px);}
        45%{transform:translateX(-4px);}60%{transform:translateX(4px);}
        75%{transform:translateX(-2px);}90%{transform:translateX(2px);}
      }
      .vd-pw-card.shake{animation:vdShake 0.4s ease both;}
      .vd-brand-row{display:flex;align-items:center;gap:10px;margin-bottom:32px;}
      .vd-brand-mark{width:36px;height:36px;border-radius:9px;background:#1e1c18;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .vd-brand-mark svg{width:18px;height:18px;}
      .vd-brand-name{font-size:13px;font-weight:500;color:rgba(255,255,255,0.55);}
      .vd-badge{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,0.22);letter-spacing:0.1em;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:5px;padding:3px 8px;}
      .vd-heading{font-size:22px;font-weight:600;color:#fff;letter-spacing:-0.025em;margin:0 0 6px;line-height:1.2;}
      .vd-subtext{font-size:13.5px;color:rgba(255,255,255,0.32);margin:0 0 28px;line-height:1.55;}
      .vd-success{display:none;align-items:center;gap:10px;background:rgba(95,168,95,0.1);border:1px solid rgba(95,168,95,0.22);border-radius:12px;padding:14px 16px;margin-bottom:20px;}
      .vd-success-dot{width:8px;height:8px;border-radius:50%;background:#7dbf7d;flex-shrink:0;}
      .vd-success span{font-size:13px;color:#7dbf7d;font-weight:500;}
      .vd-field-label{font-size:11px;font-weight:500;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px;font-family:'JetBrains Mono',monospace;}
      .vd-input-row{position:relative;margin-bottom:6px;}
      #vd-pw-input{width:100%;height:46px;background:#0c0b09;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:0 44px 0 16px;font-size:14px;font-family:'JetBrains Mono',monospace;color:#fff;outline:none;letter-spacing:0.06em;transition:border-color 0.18s,box-shadow 0.18s;}
      #vd-pw-input::placeholder{color:rgba(255,255,255,0.18);letter-spacing:0.01em;font-size:13px;}
      #vd-pw-input:focus{border-color:rgba(255,255,255,0.3);box-shadow:0 0 0 3px rgba(255,255,255,0.04);}
      .vd-eye-btn{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.22);padding:4px;display:flex;transition:color 0.15s;}
      .vd-eye-btn:hover{color:rgba(255,255,255,0.5);}
      .vd-error-row{height:20px;margin-bottom:16px;margin-top:4px;}
      .vd-error{font-size:12px;font-family:'JetBrains Mono',monospace;color:#e07070;letter-spacing:0.02em;opacity:0;transition:opacity 0.2s;display:flex;align-items:center;gap:6px;}
      .vd-error.show{opacity:1;}
      .vd-error-dot{width:5px;height:5px;border-radius:50%;background:#e07070;flex-shrink:0;}
      .vd-strength{display:flex;gap:5px;margin-bottom:20px;}
      .vd-pip{height:3px;flex:1;border-radius:2px;background:rgba(255,255,255,0.08);transition:background 0.2s;}
      .vd-pip.s1{background:#e07070;}.vd-pip.s2{background:#d4954a;}.vd-pip.s3{background:#7dbf7d;}.vd-pip.s4{background:#5fa85f;}
      .vd-remember-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
      .vd-remember-label{font-size:12px;color:rgba(255,255,255,0.35);font-family:'JetBrains Mono',monospace;letter-spacing:0.04em;user-select:none;cursor:pointer;}
      .vd-toggle-wrap{position:relative;width:36px;height:20px;cursor:pointer;display:inline-block;}
      .vd-toggle-wrap input{opacity:0;width:0;height:0;position:absolute;}
      .vd-toggle-track{position:absolute;inset:0;border-radius:20px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.12);transition:background 0.22s,border-color 0.22s;}
      .vd-toggle-thumb{position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.35);transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1),background 0.22s;}
      .vd-toggle-wrap input:checked~.vd-toggle-track{background:rgba(95,168,95,0.35);border-color:rgba(95,168,95,0.4);}
      .vd-toggle-wrap input:checked~.vd-toggle-thumb{transform:translateX(16px);background:#7dbf7d;}
      #vd-submit{width:100%;height:46px;background:#fff;color:#0f0e0d;border:none;border-radius:12px;font-family:'Inter','Syne',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:0.02em;cursor:pointer;transition:background 0.15s,transform 0.1s,opacity 0.15s;}
      #vd-submit:hover{background:#e8e6e1;}
      #vd-submit:active{transform:scale(0.99);}
      #vd-submit.busy{opacity:0.6;pointer-events:none;}
      .vd-divider{height:1px;background:rgba(255,255,255,0.06);margin:22px 0;}
      .vd-footer-row{display:flex;align-items:center;justify-content:space-between;}
      .vd-footer-left{font-size:11.5px;color:rgba(255,255,255,0.18);font-family:'JetBrains Mono',monospace;letter-spacing:0.04em;}
    `;
    document.head.appendChild(style);
    document.documentElement.appendChild(el);
    return el;
  }

  function initStarfield(canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles;
    function resize() {
      W = canvas.width = canvas.offsetWidth || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    particles = Array.from({length:90}, function() {
      return {
        x:Math.random()*W, y:Math.random()*H,
        r:Math.random()*1.5+0.3,
        dx:(Math.random()-0.5)*0.25, dy:(Math.random()-0.5)*0.25,
        alpha:Math.random()*0.5+0.05
      };
    });
    function draw() {
      if (!document.getElementById('vd-auth-overlay')) return;
      ctx.clearRect(0,0,W,H);
      particles.forEach(function(p) {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,'+p.alpha+')'; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0||p.x>W) p.dx*=-1;
        if(p.y<0||p.y>H) p.dy*=-1;
      });
      for(var i=0;i<particles.length;i++){
        for(var j=i+1;j<particles.length;j++){
          var dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
          var dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<120){
            ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle='rgba(255,255,255,'+(0.09*(1-dist/120))+')'; ctx.lineWidth=0.7; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initTilt(card) {
    var rect, cx, cy, rafId;
    function onMove(e) {
      if(!rect) rect = card.getBoundingClientRect();
      var x = (e.clientX||((e.touches||[{}])[0]||{}).clientX||0) - rect.left;
      var y = (e.clientY||((e.touches||[{}])[0]||{}).clientY||0) - rect.top;
      cx = rect.width/2; cy = rect.height/2;
      var rx = ((y-cy)/cy)*10;
      var ry = -((x-cx)/cx)*10;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function() {
        card.style.transform = 'perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale3d(1.02,1.02,1.02)';
        card.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06),'+
          (ry*1.2)+'px '+(rx*1.2)+'px 40px rgba(0,0,0,0.9),'+
          '0 0 80px rgba(255,255,255,0.03)';
      });
    }
    function onLeave() {
      cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1),box-shadow 0.6s';
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      card.style.boxShadow = '';
      setTimeout(function(){ card.style.transition='box-shadow 0.15s ease'; }, 600);
    }
    document.addEventListener('mousemove', function(e){
      if(!_unlocked) onMove(e);
    });
    document.addEventListener('touchmove', function(e){
      if(!_unlocked) onMove(e);
    }, {passive:true});
    document.addEventListener('mouseleave', function(){ if(!_unlocked) onLeave(); });
    document.addEventListener('touchend', function(){ if(!_unlocked) onLeave(); });
    window.addEventListener('resize', function(){ rect=null; });
  }

  function buildDevWall() {
    var el = document.createElement('div');
    el.id = 'vd-devtools-wall';
    el.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>Developer tools detected.</span>
      <span style="color:rgba(255,255,255,0.18);font-size:11px">Close DevTools to continue.</span>
    `;
    var style = document.createElement('style');
    style.textContent = `
      #vd-devtools-wall{display:none;position:fixed;inset:0;z-index:2147483646;background:#0c0b09;align-items:center;justify-content:center;flex-direction:column;gap:12px;font-family:'JetBrains Mono',monospace;color:rgba(255,255,255,0.4);font-size:13px;letter-spacing:0.04em;}
      #vd-devtools-wall svg{opacity:0.3;margin-bottom:8px;}
    `;
    document.head.appendChild(style);
    document.documentElement.appendChild(el);
    return el;
  }

  function grantAccess(overlay, remember) {
    _unlocked = true;
    var success = document.getElementById('vd-success');
    var form = document.getElementById('vd-form');
    var card = document.getElementById('vd-pw-card');
    if(success) success.style.display = 'flex';
    if(form) form.style.display = 'none';
    if(card) { card.style.transition='transform 0s'; card.style.transform=''; }
    document.body.style.pointerEvents = '';
    if(remember) storeRemember();
    setTimeout(function() {
      overlay.style.transition = 'opacity 0.55s ease';
      overlay.style.opacity = '0';
      setTimeout(function(){ overlay.remove(); }, 580);
    }, 750);
  }

  async function init() {
    if (await isRemembered()) {
      _unlocked = true;
      return;
    }

    var overlay = buildOverlay();
    var devWall = buildDevWall();
    var card = document.getElementById('vd-pw-card');
    var input = document.getElementById('vd-pw-input');
    var eyeBtn = document.getElementById('vd-eye');
    var eyeSvg = document.getElementById('vd-eye-svg');
    var errEl = document.getElementById('vd-error');
    var submitBtn = document.getElementById('vd-submit');
    var pips = ['vd-pp1','vd-pp2','vd-pp3','vd-pp4'].map(function(id){return document.getElementById(id);});
    var rememberCb = document.getElementById('vd-remember');
    var remLabel = document.getElementById('vd-rem-label');
    var authCanvas = document.getElementById('vd-auth-canvas');

    initStarfield(authCanvas);
    initTilt(card);

    document.body.style.pointerEvents = 'none';
    overlay.style.pointerEvents = 'all';

    remLabel.addEventListener('click', function(){ rememberCb.checked = !rememberCb.checked; });

    var eyeOpen = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    var eyeClosed = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';

    eyeBtn.addEventListener('click', function(){
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eyeSvg.innerHTML = show ? eyeClosed : eyeOpen;
      input.focus();
    });

    input.addEventListener('input', function(){
      errEl.classList.remove('show');
      var len = input.value.length;
      var s = len===0?0:len<5?1:len<10?2:len<16?3:4;
      var cls=['','s1','s2','s3','s4'];
      pips.forEach(function(p,i){p.className='vd-pip';if(i<s)p.classList.add(cls[s]);});
    });

    function shake() { 
      card.classList.remove('shake'); 
      void card.offsetWidth; 
      card.classList.add('shake'); 
    }

    function check() {
      if(!input.value.trim()){input.focus();return;}
      submitBtn.classList.add('busy'); 
      submitBtn.textContent='Verifying…';
      var remember = rememberCb.checked;

      setTimeout(function(){
        if(input.value === _k){
          grantAccess(overlay, remember);
        } else {
          submitBtn.classList.remove('busy'); 
          submitBtn.textContent='Unlock';
          errEl.classList.add('show'); 
          shake();
          input.value=''; 
          pips.forEach(function(p){p.className='vd-pip';}); 
          input.focus();
        }
      }, 480);
    }

    submitBtn.addEventListener('click', check);
    input.addEventListener('keydown', function(e){if(e.key==='Enter')check();});

    function enforce() {
      if(_unlocked) return;
      if(!document.getElementById('vd-auth-overlay')) document.documentElement.appendChild(overlay);
      var s = overlay.style;
      if(s.display==='none') s.display='flex';
      if(parseFloat(s.opacity)<0.5&&s.opacity!=='') s.opacity='1';
      if(parseInt(s.zIndex)<2147483640) s.zIndex='2147483647';
      document.body.style.pointerEvents='none';
      overlay.style.pointerEvents='all';
    }

    setInterval(enforce, 80);

    var domObs = new MutationObserver(function(muts){
      if(_unlocked) return;
      muts.forEach(function(m){
        if(m.type==='childList') m.removedNodes.forEach(function(n){
          if(n===overlay||(n.contains&&n.contains(overlay))) document.documentElement.appendChild(overlay);
        });
        if(m.type==='attributes'){var t=m.target;if(t===overlay||overlay.contains(t))enforce();}
      });
    });
    domObs.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class','hidden','id']});

    document.addEventListener('contextmenu',function(e){if(!_unlocked)e.preventDefault();});
    document.addEventListener('keydown',function(e){
      if(_unlocked) return;
      if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&'IJCK'.includes(e.key))||(e.metaKey&&e.altKey&&'IJC'.includes(e.key))||(e.ctrlKey&&(e.key==='U'||e.key==='S')))
        e.preventDefault();
    });

    setInterval(function(){
      if(_unlocked){devWall.style.display='none';return;}
      var open=window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160;
      devWall.style.display=open?'flex':'none';
      if(open) enforce();
    },500);

    var _origRemove = Element.prototype.remove;
    Element.prototype.remove = function(){if(!_unlocked&&this===overlay)return;return _origRemove.apply(this,arguments);};

    var _origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name,val){if(!_unlocked&&this===overlay&&name==='style')return;return _origSetAttr.apply(this,arguments);};

    setTimeout(function(){input.focus();},100);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();

})();
