/* ============================================================
   ВЫСШАЯ ОЦЕНОЧНАЯ КОМПАНИЯ - скрипт страницы.
   Плиты и «обмер» (рамка, лента, счётчики) · цифра-барабан · перевод RU/KZ ·
   WhatsApp с готовым текстом по цели · меню · ленты · форма. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77761364445";                       /* WhatsApp ВОК */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Ярлыки заданы в index.html (window.VOC_CONV). Звонок - клик по tel:,
   контакт - клик по WhatsApp или почте, заявка - отправка формы.
   Переход не задерживаем: доставку события обеспечивает transport_type beacon. */
function conv(key){
  var id = (window.VOC_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {send_to: id, value: 1.0, currency: "USD", transport_type: "beacon"});
}

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Лежит в assets/lang/kk.js и грузится только когда человек сам выбрал KZ
   (или открыл ?lang=kk / выбрал раньше). В разметке и в этом файле казахского текста нет:
   проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
   Версия файла - из ?v= этого скрипта, бампается вместе с остальными ассетами.
   Ключа нет → строка остаётся русской. */
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
var KK = null;   /* window.SITE_KK после загрузки */
var KZ = {};
function loadKK(done){
  if (KK) return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){ if (window.SITE_KK){ KK = window.SITE_KK; KZ = KK.dict || {}; } done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}

/* ---------------- WHATSAPP: готовый текст по цели/объекту ---------------- */
var WA_TXT = {
ru:{
hero:"Здравствуйте! Нужна оценка недвижимости.\nОбъект: (квартира / дом / участок / коммерция)\nЦель: (банк / суд / нотариус / налоговая)\nГород: Алматы",
banka:"Здравствуйте! Нужна оценка для банка (ипотека / залог).\nОбъект: квартира или дом, Алматы.\nПодскажите стоимость и срок.",
suda:"Здравствуйте! Нужна оценка для суда.\nОбъект: недвижимость / имущество.\nПодскажите стоимость и срок.",
ruvd:"Здравствуйте! Нужна оценка для РУВД (по запросу органа).\nОбъект: имущество / ущерб.\nПодскажите стоимость и срок.",
nalog:"Здравствуйте! Нужна оценка для налоговой.\nОбъект: недвижимость.\nПодскажите стоимость и срок.",
nasled:"Здравствуйте! Нужна оценка для нотариуса (наследство).\nОбъект: квартира / дом / участок / авто.\nПодскажите стоимость и срок.",
razdel:"Здравствуйте! Нужна оценка при разделе имущества.\nОбъект: недвижимость / доли / бизнес.\nПодскажите стоимость и срок.",
vyezd:"Здравствуйте! Хочу договориться о выезде оценщика.\nОбъект: ...\nАдрес: Алматы, ...\nЦель оценки: ...",
kvartira:"Здравствуйте! Нужна оценка квартиры.\nЦель: (банк / суд / нотариус / налоговая)\nАдрес: Алматы, ...",
dom:"Здравствуйте! Нужна оценка жилого дома с участком.\nЦель: (банк / суд / нотариус / налоговая)\nАдрес: ...",
zemlya:"Здравствуйте! Нужна оценка земельного участка.\nЦель: (банк / суд / нотариус / налоговая)\nАдрес: ...",
kommerciya:"Здравствуйте! Нужна оценка коммерческой недвижимости (офис / магазин / склад).\nЦель: (банк / суд / сделка)\nАдрес: ...",
zavod:"Здравствуйте! Нужна оценка завода / производственного комплекса.\nЦель: (банк / сделка / суд)\nАдрес: ...",
os:"Здравствуйте! Нужна оценка основных средств (оборудование / станки / транспорт).\nЦель: (банк / баланс / суд)\nКоличество единиц: ...",
biznes:"Здравствуйте! Нужна оценка бизнеса / доли в ТОО.\nЦель: (сделка / банк / суд)\nСфера деятельности: ...",
avto:"Здравствуйте! Нужна оценка автомобиля / спецтехники.\nЦель: (банк / нотариус / суд / ущерб)\nМарка, год: ...",
ushcherb:"Здравствуйте! Нужна оценка нанесённого ущерба.\nОбъект: (авто после ДТП / квартира после залива / другое)\nЧто произошло и когда: ...",
otchet:"Здравствуйте! Хочу заказать отчёт об оценке.\nОбъект: ...\nЦель: (банк / суд / нотариус / налоговая)\nАдрес: Алматы, ...",
uzak:"Здравствуйте! Нужно узаконение объекта (самострой / вывод из жилого фонда).\nОбъект и адрес: ...",
pereplan:"Здравствуйте! Нужно узаконить перепланировку / изменить назначение помещения.\nОбъект и адрес: ...",
celevoe:"Здравствуйте! Нужно оформить / изменить целевое назначение земли.\nУчасток и адрес: ...",
vvod:"Здравствуйте! Нужно разрешение на строительство / ввод в эксплуатацию.\nОбъект и адрес: ..."
}};

var TICK = ["Для банка и ипотеки","Автотранспорт","Для РУВД","Для налоговой","Для наследства","Раздел имущества","Для суда","Оценка ущерба","Квартиры и дома","Земельные участки","Коммерция","Заводы и оборудование","Узаконение","Перепланировка"];
var BANKS = ["Halyk Bank","Kaspi Bank","Отбасы банк","ForteBank","Банк ЦентрКредит","Bank RBK","Freedom Bank","Евразийский банк","Jusan Bank","Bereke Bank","Home Credit Bank","Нурбанк"];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function setWaLinks(){
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var dict = (L === "kk" && KK && KK.wa) ? KK.wa : WA_TXT.ru;
    var t = dict[a.dataset.wa] || dict.hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk" && !!KK;       /* словарь не загрузился - остаёмся на русском */
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("voc-lang", kk ? "kk" : "ru"); } catch(e){}
  setWaLinks();
  fillTicker();
  requestAnimationFrame(fitText);
}
function initLang(){
  /* параметр URL важнее сохранённого выбора: по русскому объявлению
     не должна открыться казахская версия */
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("voc-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  /* язык по navigator.language не угадываем - казахский только явным выбором человека */
  setLang(lang);
}
function setLang(lang){
  if (lang === "kk") loadKK(function(){ applyLang("kk"); });
  else applyLang("ru");
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки героя: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  if (innerWidth <= 760) { document.querySelectorAll(".h1 .l1, .h1 .l2").forEach(function(el){ el.style.fontSize = ""; }); return; }
  document.querySelectorAll(".h1 .l1, .h1 .l2").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.5) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩИЕ ЛЕНТЫ ---------------- */
function fillStrip(id, list, varName){
  var el = document.getElementById(id); if (!el) return;
  var one = list.map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty(varName, w + "px");
}
function fillTicker(){
  fillStrip("ticker", (curLang() === "kk" && KK && KK.tick) ? KK.tick : TICK, "--tkw");
  fillStrip("banks", BANKS, "--bkw");
}
var rsTimer;
addEventListener("resize", function(){
  clearTimeout(rsTimer);
  rsTimer = setTimeout(function(){ fillTicker(); fitText(); update(); }, 200);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- ЦИФРА-БАРАБАН ----------------
   Разряды числа прокручиваются вверх и встают на место: оценка = итоговая цифра.
   В герое крутится от --hp (прогресс скролла), в блоке доверия - при появлении. */
function buildDrums(){
  document.querySelectorAll(".drum").forEach(function(d){
    var text = d.getAttribute("data-drum") || d.textContent;
    var html = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (/\d/.test(ch)) {
        var col = "";
        for (var k = 0; k < 20; k++) col += "<span>" + (k % 10) + "</span>";
        html += '<span class="dg" style="--d:' + ch + '"><span class="dg-in">' + col + "</span></span>";
      } else {
        html += '<span class="ch">' + (ch === " " ? "&nbsp;" : ch) + "</span>";
      }
    }
    d.innerHTML = html;
    d.setAttribute("aria-label", text);
  });
}
buildDrums();

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
function goTo(id, smooth){
  var t = document.getElementById(id); if (!t) return false;
  var isPw = t.classList.contains("pw");
  var isSec = t.classList.contains("sec");
  var off = isPw ? 0 : (isSec ? HH() : HH() + 18);
  var top = t.getBoundingClientRect().top + scrollY - off;
  scrollTo({ top: Math.max(0, top), behavior: (smooth && !RED) ? "smooth" : "auto" });
  if (!isPw && !isSec) { t.classList.remove("hl"); void t.offsetWidth; t.classList.add("hl"); }
  return true;
}
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  if (!document.getElementById(id)) return;
  e.preventDefault();
  closeMenu();
  goTo(id, true);
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ПЛИТЫ И ОБМЕР ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay, --open (лента обмера раскрывает фото слева направо),
   --fp (рамка обмера и выноски смыкаются в конце), герою ещё --hp.
   Счётчики [data-cnt] - «лента тянется, цифра растёт». Дальше всё делает CSS. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var heroPw = document.getElementById("top");
var hero = heroPw ? heroPw.querySelector(".hero") : null;
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true;
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function easeInOut(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
var cnts = {};
pws.forEach(function(pw){ cnts[pw.id] = [].slice.call(pw.querySelectorAll("[data-cnt]")); });
function fmt(v, dec){
  var s = v.toFixed(dec);
  return dec ? s.replace(".", ",") : s;
}
function setCounters(pw, p){
  var list = cnts[pw.id]; if (!list || !list.length) return;
  list.forEach(function(el){
    var target = parseFloat(el.getAttribute("data-cnt")) || 0;
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var s = fmt(target * p, dec);
    if (el.textContent !== s) el.textContent = s;
  });
}
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    var open  = easeInOut(clamp((enter - 0.18) / 0.8));
    var fp    = easeOut(clamp((open - 0.78) / 0.22));
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.style.setProperty("--open",  open.toFixed(3));
    pw.style.setProperty("--fp",    fp.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) {
      var hp = 0.55 * easeOut(introK) + 0.45 * easeInOut(clamp(stay * 1.25));
      pw.style.setProperty("--hp", hp.toFixed(3));
      setCounters(pw, hp);
    } else {
      setCounters(pw, open);
    }
  });
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  root.classList.add("no-intro");
  if (hero) hero.classList.add("on");
  pws.forEach(function(pw){ setCounters(pw, 1); });
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("load", update);
  /* интро: рамка обмера и выноски собираются 1250 мс; пропускаем при хэше / прокрутке */
  var skip = location.hash || scrollY > 80;
  if (skip) {
    root.classList.add("no-intro");
    if (heroPw) heroPw.classList.add("on");
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1250);
      introK = p;
      update();
      if (p < 1) requestAnimationFrame(step);
      else { introDone = true; if (heroPw) heroPw.classList.add("on"); }
    };
    requestAnimationFrame(step);
    setTimeout(function(){ if (heroPw) heroPw.classList.add("on"); }, 500);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; if (heroPw) heroPw.classList.add("on"); update(); };

/* прямой переход по якорю: встать на место (интро уже пропущено) */
function hashJump(){
  var id = location.hash.slice(1); if (!id) return;
  root.classList.add("no-intro");
  if (!document.getElementById(id)) return;
  setTimeout(function(){ goTo(id, false); update(); }, 60);
}
addEventListener("hashchange", hashJump);
if (location.hash) { try { history.scrollRestoration = "manual"; } catch(e){} hashJump(); addEventListener("load", function(){ goTo(location.hash.slice(1), false); update(); }); }

/* ---------------- ПОЯВЛЕНИЕ И БАРАБАНЫ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  var io2 = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("go"); io2.unobserve(e.target); } });
  }, {threshold:.5});
  document.querySelectorAll(".drum-io").forEach(function(el){ io2.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
  document.querySelectorAll(".drum-io").forEach(function(el){ el.classList.add("go"); });
}

/* ---------------- ФОРМА → WhatsApp ---------------- */
var FORM_RU = {hello:"Здравствуйте! Заявка с сайта.", obj:"Объект", goal:"Цель оценки", phone:"Телефон"};
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var obj = form.obj, goal = form.goal, phone = form.phone.value.trim();
  if (!obj.value || !goal.value || phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  var L = curLang();
  var objT = obj.options[obj.selectedIndex].textContent.trim();
  var goalT = goal.options[goal.selectedIndex].textContent.trim();
  var M = (L === "kk" && KK && KK.form) ? KK.form : FORM_RU;
  var t = M.hello + "\n" + M.obj + ": " + objT + "\n" + M.goal + ": " + goalT + "\n" + M.phone + ": " + phone;
  ok.hidden = false;
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
  conv("lead");
});

/* ---------------- КЛИКИ → КОНВЕРСИИ ----------------
   Фаза захвата на window: ссылки WhatsApp здесь не пересобираются, но так цель
   гарантированно срабатывает раньше любых обработчиков, отменяющих всплытие. */
window.addEventListener("click", function(e){
  var a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
  var href = a.getAttribute("href") || "";
  if (href.indexOf("tel:") === 0) conv("call");
  else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(a.href) || href.indexOf("mailto:") === 0) conv("contact");
}, true);

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
