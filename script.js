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

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет → строка остаётся русской. */
var KZ = {
"m.title":"Алматыда жылжымайтын мүлік пен мүлікті бағалау: банк, сот, ІІБ және нотариус үшін - ЖБК",
"m.desc":"Жоғары Бағалау Компаниясы, Алматы: пәтер, үй, жер учаскесі, коммерциялық жылжымайтын мүлік, бизнес пен жабдықты банк, сот, ІІБ, салық органы және мұрагерлік үшін бағалау. № 313-RE лицензиясы, есеп 12-36 сағатта, бүкіл Қазақстан бойынша шығу.",
"m.ogt":"Мақсатыңызға сай жылжымайтын мүлік пен мүлікті бағалау - ЖБК, Алматы",
"m.ogd":"Банк, сот, ІІБ, салық органы, мұрагерлік және мүлікті бөлу үшін. № 313-RE лицензиясы, есеп 12-36 сағатта, демалыссыз шығу.",
"a.home":"Жоғары Бағалау Компаниясы, басты бетке","a.mark":"ЖБК белгісі: зәулім үйлер, өсу көрсеткісі және таразы",
"a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір","a.mnav":"Мобильді мәзір",
"br.1":"Жоғары Бағалау","br.2":"Компаниясы",
"nav.1":"Мақсаттар","nav.2":"Нысандар","nav.3":"Заңдастыру","nav.4":"Бағалар","nav.5":"Сұрақтар","nav.6":"Байланыс",
"nav.1b":"Мақсатыңызға сай бағалау","nav.2b":"Нені бағалаймыз","nav.3b":"Заңдастыру және сүйемелдеу","nav.7b":"Бағалау қалай өтеді","nav.4b":"Бағалар","nav.5b":"Сұрақтар мен жауаптар","nav.6b":"Байланыс және өтінім",
"b.wa":"WhatsApp-қа жазу","b.wa2":"WhatsApp-қа жазу","b.calc":"Құнын есептеу","b.goal":"Осы мақсат бойынша жазу","b.vyezd":"Шығу уақытын келісу","b.otchet":"Есепке тапсырыс беру","b.docs":"Қандай құжаттар керек","b.ask":"Нысан бойынша нақтылау","b.2gis":"2ГИС-те ашу","b.call":"Қоңырау шалу",
"u.m":"м",

"h.a":"Алматы: Іле Алатауы аясындағы тұрғын үй кешендері мен биік ғимараттар",
"h.k":"Алматы · № 313-RE лицензиясы · Бүкіл Қазақстан бойынша шығу",
"h.1":"Жылжымайтын мүлікті","h.2":"<em>мақсатыңызға сай</em> бағалау",
"h.l":"Есеп 12-36 сағатта дайын. Екінші деңгейдегі банктер, соттар, ІІБ, салық органы және нотариустар қабылдайды. Нысанға шығу - демалыссыз.",
"h.vk":"Дайын есеп","h.vu":"сағат ішінде · мөрі мен бағалаушының қолы бар",

"c.k":"Бағалау мақсаттары","c.h":"Есеп не үшін керек екенін айтыңыз - қалғанын біз жасаймыз",
"c.s":"Есептің нысаны, қосымшалар құрамы мен мерзімі оны кім оқитынына байланысты: банк, сот, нотариус немесе салық органы.",
"l.doc":"Құжат","l.term":"Мерзім",
"g1.h":"Банк пен ипотека үшін","g1.p":"Кепілге, ипотекаға немесе қайта қаржыландыруға арналған пәтер, үй, коммерциялық нысан.","g1.d":"Екінші деңгейдегі банктер стандарты бойынша есеп","g1.t":"12-36 сағат","g1.pr":"20 000 теңгеден",
"g2.h":"Сот үшін","g2.p":"Азаматтық істер бойынша жылжымайтын мүлік, үлестер, мүлік және жалдау.","g2.d":"Іс материалдарына қосуға арналған есеп","g2.t":"24 сағаттан","g2.pr":"30 000 теңгеден",
"g3.h":"ІІБ және полиция үшін","g3.p":"Тергеу немесе анықтау сұрауы бойынша мүлік пен залал құны.","g3.d":"Орган сұрауы бойынша есептеуі мен фотосы бар есеп","g3.t":"24 сағаттан","g3.pr":"25 000 теңгеден",
"g4.h":"Салық органы үшін","g4.p":"Мәміле, сыйға тарту және мүлікті декларациялау кезіндегі нарықтық құн.","g4.d":"Белгілі бір күнгі нарықтық құн туралы есеп","g4.t":"24 сағаттан","g4.pr":"25 000 теңгеден",
"g5.h":"Мұрагерлік пен нотариус үшін","g5.p":"Мұра ашылған күнгі пәтер, үй, жер учаскесі немесе көлік.","g5.d":"Нотариусқа және мемлекеттік баж есебіне арналған есеп","g5.t":"24 сағаттан","g5.pr":"25 000 теңгеден",
"g6.h":"Мүлікті бөлу","g6.p":"Ажырасу кезіндегі ортақ мүлік: жылжымайтын мүлік, үлестер, бизнес және көлік.","g6.d":"Сотқа немесе бітімгершілік келісімге арналған есеп","g6.t":"24 сағаттан","g6.pr":"25 000 теңгеден",
"g7.h":"Автокөлікті бағалау","g7.p":"Жеңіл, жүк көліктері және арнайы техника: нотариус, банк, сот немесе сату.","g7.d":"Көліктің нарықтық құны туралы есеп","g7.t":"12 сағаттан","g7.pr":"20 000 теңгеден",
"g8.h":"Келтірілген залалды бағалау","g8.p":"Жол оқиғасынан, су басудан немесе өрттен кейінгі залал: автокөлік және жылжымайтын мүлік.","g8.d":"Фототіркеуі бар залал мөлшері туралы есеп","g8.t":"24 сағаттан","g8.pr":"35 000 теңгеден",

"o.a":"Сары балкондары бар тұрғын үй: өлшеу кезіндегі бағалау нысаны","o.f":"Қасбет","o.e":"9 қабат",
"o.k":"Шығу және өлшеу","o.h":"Барамыз, өлшейміз, тіркейміз",
"o.s":"Қарау мен фототіркеу - өтініш түскен күні. Алматы мен бүкіл Қазақстан бойынша демалыссыз шығамыз.",

"ob.k":"Нені бағалаймыз","ob.h":"Жылжымайтын мүлік, бизнес және кәсіпорын мүлкі",
"ob.s":"Төмендегі баға - бастапқы. Нақты құн мен мерзім - құжаттар мен нысанды қарағаннан кейін.",
"k1.a":"Қалаға қарайтын панорамалық терезесі бар пәтер интерьері","k1.h":"Пәтер","k1.p":"Ипотека, кепіл, сот, мұрагерлік","k1.pr":"20 000 теңгеден","k1.t":"12-36 сағат","k1.wa":"WhatsApp-қа жазу: пәтерді бағалау",
"k2.a":"Учаскесі бар жеке тұрғын үй","k2.h":"Тұрғын үй","k2.p":"Учаскесімен және құрылыстарымен","k2.pr":"30 000 теңгеден","k2.t":"24 сағаттан","k2.wa":"WhatsApp-қа жазу: үйді бағалау",
"k3.a":"Биіктен түсірілген жер учаскелері: егістік пен елді мекен","k3.h":"Жер учаскесі","k3.p":"ЖТҚ, коммерциялық, ауыл шаруашылығы","k3.pr":"30 000 теңгеден","k3.t":"24 сағаттан","k3.wa":"WhatsApp-қа жазу: жер учаскесін бағалау",
"k4.a":"Коммерциялық үй-жай: шыны қалқалары бар кеңселер дәлізі","k4.h":"Коммерциялық жылжымайтын мүлік","k4.p":"Кеңселер, дүкендер, қоймалар, СО","k4.pr":"50 000 теңгеден","k4.t":"3-5 күн","k4.wa":"WhatsApp-қа жазу: коммерциялық жылжымайтын мүлікті бағалау",
"k5.a":"Зауыттың өндірістік желісі","k5.h":"Зауыттар мен өндірістер","k5.p":"Мүліктік кешендер толығымен","k5.pr":"70 000 теңгеден","k5.t":"5 күннен","k5.wa":"WhatsApp-қа жазу: зауытты бағалау",
"k6.a":"Цехтағы өнеркәсіптік жабдық пен станоктар","k6.h":"Негізгі құралдар","k6.p":"Жабдық, станоктар, көлік","k6.pr":"70 000 теңгеден","k6.t":"3-7 күн","k6.wa":"WhatsApp-қа жазу: негізгі құралдарды бағалау",
"k7.a":"Жұмыс істеп тұрған бизнестің кеңсесі","k7.h":"Бизнес пен үлестер","k7.p":"Жұмыс істеп тұрған кәсіпорын, ЖШС-дегі үлес","k7.pr":"көлеміне қарай","k7.t":"5 күннен","k7.wa":"WhatsApp-қа жазу: бизнесті бағалау",
"k8.h":"Өз нысаныңызды таппадыңыз ба?","k8.p":"Нені және кім үшін бағалау керек екенін жазыңыз - бағасы мен мерзімін айтамыз.",
"av.t":"Сондай-ақ: автокөлік, арнайы техника және залалды бағалау","av.pr":"20 000 теңгеден · 12 сағаттан","av.l":"жазу",

"r.a":"Үстел басында құжаттарға қол қою: бағалау есебін беру","r.f":"№ 313-RE лицензиясы · 28.11.2025","r.e":"Жауапкершілік сақтандырылған",
"r.k":"Есеп","r.h":"Банктер, соттар мен нотариустар қабылдайтын есеп",
"r.s":"Мөр, бағалаушының қолы, фототіркеу мен есептеуі бар қосымшалар. Кеңседен аласыз немесе сканын жібереміз.",

"u.k":"Заңдастыру және сүйемелдеу","u.h":"Нысанды бағалап қана қоймай, рәсімдеу керек болғанда",
"u.s":"Құжаттарды жинаймыз, келісімдерден өтеміз және қорытындыларды сіз үшін аламыз.",
"u1.h":"Нысандар мен өз бетімен салынған құрылысты заңдастыру","u1.p":"СЖТ, сейсмикалық қорытынды, тұрғын үй қорынан шығару","u1.pr":"80 000 теңгеден","u1.t":"10 күннен",
"u2.h":"Қайта жоспарлау және мақсатын өзгерту","u2.p":"Жоба, келісу, жаңа техникалық паспорт","u2.pr":"60 000 теңгеден","u2.t":"7 күннен",
"u3.h":"Жердің нысаналы мақсаты","u3.p":"Учаскенің нысаналы мақсатын рәсімдеу және өзгерту","u3.pr":"70 000 теңгеден","u3.t":"14 күннен",
"u4.h":"Құрылысқа рұқсат және пайдалануға беру","u4.p":"Рұқсаттан пайдалануға беру актісіне дейін","u4.pr":"100 000 теңгеден","u4.t":"20 күннен",

"p.k":"Бағалау қалай өтеді","p.h":"Өтінімнен қолыңыздағы есепке дейінгі бес қадам",
"p1.h":"Өтінім","p1.p":"WhatsApp-қа жазасыз немесе қоңырау шаласыз: нысан, бағалау мақсаты, мекенжай.",
"p2.h":"Шығу","p2.p":"Қарау, өлшеу және фототіркеу - өтініш түскен күні, демалыссыз.",
"p3.h":"Есептеу","p3.p":"Нарықты талдау және құнды есептеу - бір жұмыс күні.",
"p4.h":"Есеп","p4.p":"Мөр, бағалаушының қолы, қосымшалар. 12-36 сағатта дайын.",
"p5.h":"Беру","p5.p":"Сәтбаев 30Б, 327-кабинеттегі кеңседен аласыз немесе сканын жібереміз.",

"d.k":"Бізге неге сенеді","d.h":"Лицензия, сақтандыру және тәжірибесі жеті жылдан асатын бағалаушылар",
"d1.b":"Бағалау қызметіне лицензия","d1.s":"28.11.2025 жылғы",
"d2.b":"жыл бағалау саласында","d2.s":"тәжірибесі 7-10 жыл үш бағалаушы",
"d3.b":"сағатта есеп дайын","d3.s":"Алматыдағы пәтерлер бойынша",
"d4.b":"жауапкершілік сақтандырылған","d4.s":"БСН 260140001340",
"d.bt":"Есептерді Қазақстан Республикасының екінші деңгейдегі банктері қабылдайды:",

"pr.k":"Бағалар","pr.h":"Бастапқы құн мен мерзімдер","pr.c1":"Бағалау","pr.c2":"Заңдастыру және сүйемелдеу",
"pr.th1":"Қызмет","pr.th2":"Бағасы","pr.th3":"Мерзімі",
"pr1":"Пәтерді бағалау","pr1t":"12-36 сағат","pr2":"Тұрғын үйді бағалау","pr2t":"24 сағаттан","pr3":"Жер учаскесін бағалау","pr3t":"24 сағаттан",
"pr4":"Коммерциялық жылжымайтын мүлікті бағалау","pr4t":"3-5 күн","pr5":"Зауыттар мен өндірістерді бағалау","pr5t":"5 күннен",
"pr6":"Негізгі құралдарды бағалау","pr6t":"3-7 күн","pr7":"Автокөлік пен арнайы техниканы бағалау","pr7t":"12 сағаттан","pr7b":"Келтірілген залалды бағалау (көлік, жылжымайтын мүлік)","pr7bt":"24 сағаттан",
"pr8":"Нысандарды заңдастыру","pr8t":"10 күннен","pr9":"Қайта жоспарлау және мақсатын өзгерту","pr9t":"7 күннен",
"pr10":"Жердің нысаналы мақсаты","pr10t":"14 күннен","pr11":"Құрылысқа рұқсат және пайдалануға беру","pr11t":"20 күннен",
"pr1.p":"20 000 теңгеден","pr2.p":"30 000 теңгеден","pr3.p":"30 000 теңгеден","pr4.p":"50 000 теңгеден","pr5.p":"70 000 теңгеден","pr6.p":"70 000 теңгеден","pr7.p":"20 000 теңгеден","pr7b.p":"35 000 теңгеден",
"pr8.p":"80 000 теңгеден","pr9.p":"60 000 теңгеден","pr10.p":"70 000 теңгеден","pr11.p":"100 000 теңгеден",
"pr.n":"Баға есептің мақсатына да байланысты: банк пен ипотека үшін - 20 000 теңгеден, сот үшін - 30 000 теңгеден, залалды бағалау - 35 000 теңгеден, қалған мақсаттар - 25 000 теңгеден. Нақты құн - нысанды талдағаннан кейін: сипаттамасы, орналасқан жері, шұғылдығы.",

"dk.k":"Бағалауға қажет құжаттар","dk.h":"Шығуға дейін не дайындау керек",
"dk1.h":"Пәтер, үй, коммерциялық нысан","dk1.1":"Құқық белгілейтін құжат: шарт, куәлік, акт","dk1.2":"Нысанның техникалық паспорты","dk1.3":"Тапсырыс берушінің жеке куәлігі",
"dk2.h":"Жер учаскесі","dk2.1":"Меншік немесе жер пайдалану құқығына акт","dk2.2":"Учаскенің сәйкестендіру құжаты","dk2.3":"Тапсырыс берушінің жеке куәлігі",
"dk3.h":"Жабдық, көлік, бизнес","dk3.1":"Техникалық паспорт немесе тіркеу куәлігі","dk3.2":"Түгендеу карточкалары, жүкқұжаттар, шарттар","dk3.3":"Құрылтай құжаттары мен баланс - бизнес үшін",
"dk.n":"Қандай да бір құжат жоқ болса - жазыңыз, немен алмастыруға болатынын айтамыз.",

"f.k":"Сұрақтар мен жауаптар","f.h":"Тапсырыс алдында не сұрайды",
"f1.q":"Сіздің есебіңізді банктер қабылдай ма?","f1.a":"Иә. № 313-RE лицензиясы, жауапкершілікті сақтандыру, ҚР екінші деңгейдегі банктерінің стандарты бойынша есеп. Банктің нысанға өз талаптары болса - ескереміз.",
"f2.q":"Пәтерді бағалау қанша тұрады?","f2.a":"20 000 теңгеден. Нақты сомасы ауданына, орналасқан жеріне және шұғылдығына байланысты - құжаттарды қарағаннан кейін айтамыз.",
"f3.q":"Есеп қаншалықты тез дайын болады?","f3.a":"Пәтер - 12-36 сағат, үй мен жер учаскесі - 24 сағаттан, коммерциялық нысан - 3-5 күн, өндіріс пен жабдық - 5 күннен.",
"f4.q":"Сот сараптамасын жасайсыздар ма?","f4.a":"Жоқ. Біз мүлікті бағалаумен айналысамыз. Сот сараптамасын - құрылыс-техникалық, автотехникалық - жүргізбейміз.",
"f5.q":"Нысанға шығу міндетті ме?","f5.a":"Иә, қарау мен фототіркеу - есептің міндетті бөлігі. Алматы мен бүкіл Қазақстан бойынша демалыссыз шығамыз.",
"f6.q":"Бастау үшін не керек?","f6.a":"Құқық белгілейтін құжат, техникалық паспорт және жеке куәлік. WhatsApp-қа нені және кім үшін бағалайтынымызды жазыңыз - қалғанын айтамыз.",
"f7.q":"Дайын есепті қалай алуға болады?","f7.a":"Кеңседе: Алматы, Қаныш Сәтбаев көшесі 30Б, 3-қабат, 327-кабинет, дс-жм 09:00-18:00. Сканын поштаға немесе WhatsApp-қа жібереміз.",

"z.k":"Өтінім","z.h":"Бағалау құнын есептеу","z.l1":"Нені бағалаймыз",
"z.o0":"Нысанды таңдаңыз","z.o1":"Пәтер","z.o2":"Тұрғын үй","z.o3":"Жер учаскесі","z.o4":"Коммерциялық жылжымайтын мүлік","z.o5":"Зауыт, өндіріс","z.o6":"Жабдық, негізгі құралдар","z.o7":"Бизнес, үлес","z.o8":"Автокөлік, арнайы техника","z.o9":"Басқа",
"z.l2":"Бағалау мақсаты","z.g0":"Мақсатты таңдаңыз","z.g1":"Банк үшін, ипотека немесе кепіл","z.g2":"Сот үшін","z.g3":"ІІБ, полиция үшін","z.g4":"Салық органы үшін","z.g5":"Мұрагерлік, нотариус","z.g6":"Мүлікті бөлу","z.g7":"Сатып алу-сату","z.g8":"Басқа",
"z.l3":"Телефон","z.b":"WhatsApp-қа жіберу","z.e":"Нысанды, мақсатты таңдап, телефон нөмірін көрсетіңіз.",
"z.ok":"Рақмет! Өтінім WhatsApp-та ашылды - хабарламаны жіберіңіз, біз жауап береміз.","z.n":"Біз бағалау жасаймыз. Сот сараптамасын жүргізбейміз.",
"kt.k":"Байланыс","kt.h":"Алматыдағы кеңсе","kt.a":"Қаныш Сәтбаев көшесі, 30Б, 3-қабат, 327-кабинет","kt.h1":"Дс-жм 09:00-18:00","kt.h2":"Шығу - демалыссыз",
"kt.map":"2ГИС-тегі жол сілтемесі","kt.ml":"Сәтбаев 30Б","kt.ms":"3-қабат · 327-каб.",
"ft.1":"«Жоғары Бағалау Компаниясы» ЖШС · БСН 260140001340",
"ft.2":"Бағалау қызметіне 28.11.2025 жылғы № 313-RE лицензиясы · бағалаушының жауапкершілігі сақтандырылған",
"ft.3":"Алматы қ., Қаныш Сәтбаев көшесі, 30Б, 3-қабат, 327-каб. · дс-жм 09:00-18:00"
};

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
},
kk:{
hero:"Сәлеметсіз бе! Жылжымайтын мүлікті бағалау керек.\nНысан: (пәтер / үй / жер учаскесі / коммерциялық)\nМақсаты: (банк / сот / нотариус / салық)\nҚала: Алматы",
banka:"Сәлеметсіз бе! Банк үшін бағалау керек (ипотека / кепіл).\nНысан: пәтер немесе үй, Алматы.\nҚұны мен мерзімін айтыңызшы.",
suda:"Сәлеметсіз бе! Сот үшін бағалау керек.\nНысан: жылжымайтын мүлік / мүлік.\nҚұны мен мерзімін айтыңызшы.",
ruvd:"Сәлеметсіз бе! ІІБ үшін бағалау керек (орган сұрауы бойынша).\nНысан: мүлік / залал.\nҚұны мен мерзімін айтыңызшы.",
nalog:"Сәлеметсіз бе! Салық органы үшін бағалау керек.\nНысан: жылжымайтын мүлік.\nҚұны мен мерзімін айтыңызшы.",
nasled:"Сәлеметсіз бе! Нотариус үшін бағалау керек (мұрагерлік).\nНысан: пәтер / үй / жер учаскесі / көлік.\nҚұны мен мерзімін айтыңызшы.",
razdel:"Сәлеметсіз бе! Мүлікті бөлу үшін бағалау керек.\nНысан: жылжымайтын мүлік / үлестер / бизнес.\nҚұны мен мерзімін айтыңызшы.",
vyezd:"Сәлеметсіз бе! Бағалаушының шығу уақытын келіскім келеді.\nНысан: ...\nМекенжай: Алматы, ...\nБағалау мақсаты: ...",
kvartira:"Сәлеметсіз бе! Пәтерді бағалау керек.\nМақсаты: (банк / сот / нотариус / салық)\nМекенжай: Алматы, ...",
dom:"Сәлеметсіз бе! Учаскесі бар тұрғын үйді бағалау керек.\nМақсаты: (банк / сот / нотариус / салық)\nМекенжай: ...",
zemlya:"Сәлеметсіз бе! Жер учаскесін бағалау керек.\nМақсаты: (банк / сот / нотариус / салық)\nМекенжай: ...",
kommerciya:"Сәлеметсіз бе! Коммерциялық жылжымайтын мүлікті бағалау керек (кеңсе / дүкен / қойма).\nМақсаты: (банк / сот / мәміле)\nМекенжай: ...",
zavod:"Сәлеметсіз бе! Зауытты / өндірістік кешенді бағалау керек.\nМақсаты: (банк / мәміле / сот)\nМекенжай: ...",
os:"Сәлеметсіз бе! Негізгі құралдарды бағалау керек (жабдық / станоктар / көлік).\nМақсаты: (банк / баланс / сот)\nБірлік саны: ...",
biznes:"Сәлеметсіз бе! Бизнесті / ЖШС-дегі үлесті бағалау керек.\nМақсаты: (мәміле / банк / сот)\nҚызмет саласы: ...",
avto:"Сәлеметсіз бе! Автокөлікті / арнайы техниканы бағалау керек.\nМақсаты: (банк / нотариус / сот / залал)\nМаркасы, жылы: ...",
ushcherb:"Сәлеметсіз бе! Келтірілген залалды бағалау керек.\nНысан: (жол оқиғасынан кейінгі көлік / су басқан пәтер / басқа)\nНе болды және қашан: ...",
otchet:"Сәлеметсіз бе! Бағалау есебіне тапсырыс бергім келеді.\nНысан: ...\nМақсаты: (банк / сот / нотариус / салық)\nМекенжай: Алматы, ...",
uzak:"Сәлеметсіз бе! Нысанды заңдастыру керек (өз бетімен салынған құрылыс / тұрғын үй қорынан шығару).\nНысан мен мекенжай: ...",
pereplan:"Сәлеметсіз бе! Қайта жоспарлауды заңдастыру / үй-жайдың мақсатын өзгерту керек.\nНысан мен мекенжай: ...",
celevoe:"Сәлеметсіз бе! Жердің нысаналы мақсатын рәсімдеу / өзгерту керек.\nУчаске мен мекенжай: ...",
vvod:"Сәлеметсіз бе! Құрылысқа рұқсат / пайдалануға беру керек.\nНысан мен мекенжай: ..."
}};

var TICK = ["Для банка и ипотеки","Автотранспорт","Для РУВД","Для налоговой","Для наследства","Раздел имущества","Для суда","Оценка ущерба","Квартиры и дома","Земельные участки","Коммерция","Заводы и оборудование","Узаконение","Перепланировка"];
var TICK_KZ = ["Банк пен ипотека үшін","Автокөлік","ІІБ үшін","Салық органы үшін","Мұрагерлік үшін","Мүлікті бөлу","Сот үшін","Залалды бағалау","Пәтерлер мен үйлер","Жер учаскелері","Коммерциялық нысандар","Зауыттар мен жабдық","Заңдастыру","Қайта жоспарлау"];
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
    var t = WA_TXT[L][a.dataset.wa] || WA_TXT[L].hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
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
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
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
  fillStrip("ticker", curLang() === "kk" ? TICK_KZ : TICK, "--tkw");
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
  var t = (L === "kk"
    ? "Сәлеметсіз бе! Сайттан өтінім.\nНысан: " + objT + "\nБағалау мақсаты: " + goalT + "\nТелефон: " + phone
    : "Здравствуйте! Заявка с сайта.\nОбъект: " + objT + "\nЦель оценки: " + goalT + "\nТелефон: " + phone);
  ok.hidden = false;
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
