if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  try { gsap.registerPlugin(ScrollTrigger); } catch(e) {}
}

document.addEventListener('DOMContentLoaded', function() {
  var logoText = document.querySelector('.logo-title');
  if (logoText) {
    var chars = logoText.textContent.split('');
    logoText.innerHTML = '';
    chars.forEach(function(ch,i){
      var span = document.createElement('span');
      span.textContent = ch;
      span.style.opacity = 0;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(0.6em)';
      logoText.appendChild(span);
      if (typeof gsap !== 'undefined') gsap.to(span,{duration:0.38,delay:i*0.02,opacity:1,y:0,ease:'back.out(1.4)'});
      else { span.style.opacity=1; span.style.transform='translateY(0)'; }
    });
  }

  if (typeof gsap !== 'undefined') {
    gsap.from('#mainTitle',{duration:0.9,y:40,opacity:0,ease:'power3.out',delay:0.12});
    gsap.from('#subTitle',{duration:0.9,y:30,opacity:0,ease:'power3.out',delay:0.28});
    gsap.to('.menu-toggle',{y:-6,duration:1.6,repeat:-1,yoyo:true,ease:'sine.inOut'});
  }

  var cards = document.querySelectorAll('.card');
  var heroInners = document.querySelectorAll('.hero.sport-hero .hero-inner');
  var teamCards = document.querySelectorAll('.team-card');
  var animateFromTo = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (animateFromTo) {
    gsap.utils.toArray(cards).forEach(function(card,i){
      gsap.fromTo(card,{opacity:0,y:30},{opacity:1,y:0,duration:0.7,ease:'back.out(1.4)',delay:i*0.06,scrollTrigger:{trigger:card,start:'top 92%'}});
    });
    gsap.utils.toArray(heroInners).forEach(function(el,i){
      gsap.fromTo(el,{opacity:0,y:18},{opacity:1,y:0,duration:0.9,ease:'power3.out',delay:0.05 + i*0.05,scrollTrigger:{trigger:el,start:'top 95%'}});
    });
    teamCards.forEach(function(card){
      card.addEventListener('mouseenter', function(){ gsap.to(card,{scale:1.02,y:-6,duration:0.2,ease:'power2.out'}); });
      card.addEventListener('mouseleave', function(){ gsap.to(card,{scale:1,y:0,duration:0.2,ease:'power2.out'}); });
      gsap.fromTo(card,{opacity:0,y:18},{opacity:1,y:0,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 92%'}});
    });
  } else {
    cards.forEach(function(c){ c.style.opacity=1; c.style.transform='translateY(0)'; });
    heroInners.forEach(function(h){ h.style.opacity=1; h.style.transform='translateY(0)'; });
    teamCards.forEach(function(c){ c.style.opacity=1; c.style.transform='translateY(0)'; });
  }

  var menuToggle = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var toggleSidebar = function(show) {
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('active', show);
    overlay.classList.toggle('active', show);
    if (typeof gsap !== 'undefined') gsap.to(sidebar,{x: show ? 0 : -320,duration:0.28,ease:'power2.inOut'});
  };

  if (menuToggle) menuToggle.addEventListener('click', function(){ toggleSidebar(!sidebar.classList.contains('active')); });
  if (overlay) overlay.addEventListener('click', function(){ toggleSidebar(false); });

  var cardEls = document.querySelectorAll('.card[data-target]');
  cardEls.forEach(function(card){
    var pid = card.getAttribute('data-target');
    card.addEventListener('click', function(){ showPage(pid); });
    card.addEventListener('keypress', function(e){ if (e.key==='Enter'||e.key===' ') showPage(pid); });
  });

  var siteLogo = document.getElementById('siteLogo');
  if (siteLogo) {
    siteLogo.addEventListener('click', function(){ showPage('homePage'); });
    siteLogo.addEventListener('keypress', function(e){ if (e.key==='Enter' || e.key===' ') showPage('homePage'); });
  }

  var navLinks = document.querySelectorAll('[data-page]');
  navLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      navLinks.forEach(function(l){ l.classList.remove('active'); });
      link.classList.add('active');
      showPage(link.getAttribute('data-page'));
      toggleSidebar(false);
    });
  });

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = contactForm.querySelector('.btn') || contactForm.querySelector('button[type="submit"]');
      if (typeof gsap !== 'undefined') {
        gsap.to(btn,{backgroundColor:'#4CAF50',duration:0.25,onComplete:function(){
          alert('¡Gracias! Mensaje enviado. Nos contactaremos pronto.');
          contactForm.reset();
          gsap.to(btn,{backgroundColor:'',delay:0.5,duration:0.4});
        }});
      } else {
        alert('¡Gracias! Mensaje enviado. Nos contactaremos pronto.');
        contactForm.reset();
      }
    });
  }

  function pageIdToHash(pageId) {
    if (!pageId) return '#/';
    if (pageId === 'homePage') return '#/';
    var slug = pageId.replace(/Page$/i, '').toLowerCase();
    return '#/' + slug;
  }

  function hashToPageId(hash) {
    var raw = String(hash || location.hash || '').replace(/^#/, '');
    var clean = raw.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!clean) return 'homePage';
    var map = {'sobre-nosotros':'aboutPage','about':'aboutPage'};
    if (map[clean]) return map[clean];
    if (clean.endsWith('page')) return clean;
    if (document.getElementById(clean + 'Page')) return clean + 'Page';
    return clean + 'Page';
  }

  window.addEventListener('hashchange', function() {
    var pid = hashToPageId(location.hash);
    showPage(pid, false);
  });

  var initialPage = hashToPageId(location.hash);
  showPage(initialPage, false);
});

function showPage(pageId, pushState = true) {
  if (!pageId) return;
  var pid = pageId;
  if (!pid.toLowerCase().endsWith('page') && document.getElementById(pid + 'Page')) pid = pid + 'Page';
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(p){ p.classList.remove('active'); });
  var target = document.getElementById(pid);
  if (target) {
    target.classList.add('active');
    if (typeof gsap !== 'undefined') gsap.fromTo(target,{opacity:0,y:-12},{opacity:1,y:0,duration:0.45,ease:'power2.out'});
    window.scrollTo({top:0,behavior:'smooth'});
    if (pushState) {
      var newHash = (function(id){
        if (!id) return '#/';
        if (id === 'homePage') return '#/';
        return '#/' + id.replace(/Page$/i,'').toLowerCase();
      })(pid);
      if (location.hash !== newHash) location.hash = newHash;
    }
  } else {
    var home = document.getElementById('homePage');
    if (home) home.classList.add('active');
  }
}

window.addEventListener('popstate', function(e) {
  var pageId = e.state?.pageId || (function(){ var h = location.hash; return h ? h.replace(/^#\/?/, '').replace(/\/$/,'') + 'Page' : 'homePage'; })();
  if (pageId && !document.getElementById(pageId)) pageId = pageId.replace(/\/?Page$/i,'Page');
  showPage(pageId, false);
});
