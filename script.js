(function () {
  'use strict';

  /* ============================================================
     DURDOM AI STUDIO — Shared Script v4
     Works across: index.html, works.html, arsenal.html
     Tasks: 1 (products), 3 (services), 8 (hero+helmet+cursor)
     Preserves: crypto-payment, form, FAQ, reviews, lightbox
     ============================================================ */

  const TELEGRAM_URL = 'https://t.me/Pravaka';
  const A = window.DURDOM_ASSETS || {};

  function showToast(message) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add('is-show');
    setTimeout(() => {
      t.classList.remove('is-show');
    }, 4000);
  }

  /* ================================================================
     TASK 1 — PRODUCT DATA (Arsenal page)
     Removed: freeguide
     Added: fansly, verification, consultation
     ================================================================ */
  const products = {
    higgsfield: {
      id: 'higgsfield', category: 'COURSE / VIDEO', title: 'Higgsfield AI Video Course', cardTitle: 'HIGGSFIELD COURSE',
      price: 50, oldPrice: 70, badges: ['COURSE', 'NEW'],
      short: 'Практический курс по генерации AI-видео в Higgsfield: сцены, движение камеры, референсы, промпты. Выходишь с готовым пайплайном под контент.',
      coverLabel: 'HIGGSFIELD\nCOURSE', coverImage: 'cover-higgsfield.png',
      tags: ['Higgsfield', 'AI video', 'Motion', 'Prompts', 'Reels', 'TikTok'],
      description: 'Практические видео-уроки по Higgsfield — от основ до продвинутых техник. Научишься управлять сценами, движением камеры, работать с референсами и писать точные промпты. На выходе — рабочий пайплайн под коммерческий AI-контент.',
      features: ['Основы Higgsfield: интерфейс, логика, возможности', 'Генерация видео по референсам и без', 'Управление движением камеры и персонажей', 'Сцены, композиция, переходы', 'Промпты под разные форматы: Reels, TikTok, Shorts', 'Разбор ошибок новичков', 'Полный пайплайн под AI-контент', 'Примеры под коммерческое использование'],
      runs: 'Higgsfield платформа (облако)',
      forWhom: 'AI-креаторы, Reels/TikTok creators, SMM-специалисты, все кто хочет делать AI-видео',
      access: 'Доступ к видео-урокам сразу после оплаты. Постоянный.'
    },
    animator1: {
      id: 'animator1', category: 'WORKFLOW / VIDEO', title: 'Animator V1', cardTitle: 'ANIMATOR V1',
      price: 70, oldPrice: 100, badges: ['SALE'],
      short: 'Базовая версия видео-пайплайна: image-to-video, motion, динамичные сцены. Идеальный старт для генерации AI-видео под Reels и TikTok.',
      coverLabel: 'ANIMATOR\nV1', coverImage: 'cover-animator.png',
      tags: ['Video', 'Lipsync', 'I2V', 'Basic motion', 'ComfyUI'],
      description: 'Animator V1 — стабильная базовая версия видео-пайплайна в ComfyUI. Image-to-video, базовый motion, динамичные сцены. Подходит для старта: быстро разворачиваешь, получаешь результат, набиваешь руку.',
      features: ['Image-to-Video генерация', 'Базовый motion и динамика', 'Lipsync и мимика лица', 'Стабильный результат на каждом запуске', 'Простые сцены и движения', 'NSFW без ограничений', 'Работает на доступных GPU (RTX 3090+)', 'Подходит для старта и обучения'],
      runs: 'Vast.ai — RTX 3090 / RTX 4090 / A5000 / 24+ GB VRAM',
      forWhom: 'Новички в AI-видео, креаторы с ограниченным бюджетом, те кто хочет попробовать перед V2.1',
      access: 'Workflow + template-система. Доступ постоянный.'
    },
    animator21: {
      id: 'animator21', category: 'WORKFLOW / VIDEO', title: 'Animator V2.1', cardTitle: 'ANIMATOR V2.1',
      price: 100, oldPrice: 200, badges: ['HIT', 'SALE'],
      short: 'Топовый видео-пайплайн: lipsync, мимика, motion, танцы. Готовые ComfyUI-workflow под Vast.ai, template-система без ручной сборки нод.',
      coverLabel: 'ANIMATOR\nV2.1', coverImage: 'cover-animator.png',
      tags: ['Video animation', 'Lipsync', 'Dance', 'Image-to-Video', 'ComfyUI', 'Vast.ai'],
      description: 'Animator V2.1 — флагманский видео-пайплайн DURDOM. Реалистичные видео до 30 секунд в ComfyUI: lipsync, мимика, танцы, image-to-video, сложные динамические сцены. Template-система — запускаешь без ручной сборки нод.',
      features: ['Видео до 30 секунд с высокой стабильностью', 'Фотореализм: кожа, волосы, одежда, свет, отражения', 'Lipsync и мимика лица', 'Image-to-Video любого референса', 'Танцы, динамика, разговорные сцены', 'Работает без обязательного LoRA', 'NSFW без ограничений', 'Template-система: запуск без ручной сборки'],
      runs: 'Vast.ai — RTX PRO 6000 / RTX 6000 Ada / 48+ GB VRAM',
      forWhom: 'Reels / TikTok / Shorts, AI-персонажи, SMM и бренды, NSFW-креаторы',
      access: 'Доступ через токены. Внутри — template-система. Доступ постоянный.'
    },
    xmode: {
      id: 'xmode', category: 'WORKFLOW / IMAGE', title: 'X-MODE V2.1', cardTitle: 'X-MODE V2.1',
      price: 100, oldPrice: 200, badges: ['HIT', '18+', 'SALE'],
      short: 'Фотореалистичная генерация: работа с референсами, LoRA, детальный контроль позы и света. Уровень реализма студийного качества.',
      coverLabel: 'X-MODE\nV2.1', coverImage: 'cover-xmode.png',
      tags: ['Image', 'NSFW', 'Photorealism', 'T2I', 'I2I', 'LoRA', 'Upscaling'],
      description: 'X-MODE V2.1 — система генерации фотореалистичных изображений студийного уровня. Работа через LoRA, точный контроль позы, света, композиции. Кожа, глаза, волосы — всё на уровне, который не отличишь от реального фото.',
      features: ['Фотореализм: кожа, глаза, волосы, текстуры, свет', 'Высокая точность относительно референса', 'Работа через кастомные LoRA', 'Text-to-Image и Image-to-Image', 'Улучшенная детализация глаз и кожи', 'Апскейл и постобработка', 'Полный контроль позы, света и композиции', 'NSFW без ограничений'],
      runs: 'Vast.ai — RTX 5090 / L40S / 48+ GB VRAM',
      forWhom: 'Instagram / TikTok / Telegram, AI-персонажи, Fanvue / Fansly, NSFW-креаторы',
      access: 'Система встроена в template. Доступ постоянный.'
    },
    community: {
      id: 'community', category: 'COMMUNITY / ACCESS', title: 'Private Community', cardTitle: 'PRIVATE COMMUNITY',
      price: 190, oldPrice: 400, badges: ['CORE', 'SALE'],
      short: 'Закрытый доступ к экосистеме DURDOM: все материалы, обновления, поддержка, разборы рабочих связок и кейсов.',
      coverLabel: 'CORE\nACCESS', coverImage: 'cover-community.png',
      tags: ['Community', 'Workflows', 'Guides', 'Support', 'AI OFM', 'Updates'],
      description: 'Private Community — полный доступ к экосистеме DURDOM. Все workflows, гайды, обновления, закрытый чат, поддержка. Не просто «канал с файлами» — это рабочая система с разборами кейсов и живой помощью.',
      features: ['Доступ к Animator V2.1', 'Доступ к X-MODE V2.1', 'Гайды по LoRA-тренингу', 'Гайды по AI OFM и монетизации', 'Гайды по Fanvue / Fansly / чаттингу', 'Разборы рабочих кейсов', 'Инструкции по VPN и инфраструктуре', 'Регулярные обновления', 'Закрытый чат с участниками', 'Прямая поддержка'],
      runs: 'Приватный Telegram-канал + закрытый чат',
      forWhom: 'Все, кто хочет полный доступ к системе DURDOM целиком',
      access: 'Доступ к системе целиком. Постоянный.'
    },
    fansly: {
      id: 'fansly', category: 'SYSTEM / TRAFFIC', title: 'Fansly-связка: прямой трафик без инсты', cardTitle: 'FANSLY-СВЯЗКА',
      price: 100, oldPrice: null, badges: ['NEW'],
      short: 'Внутренняя система FYP Fansly: прямой трафик клиентов в нише без прогрева инсты. Быстрый выход на заработок с AI-аватаром.',
      coverLabel: 'FANSLY\nСВЯЗКА', coverImage: 'cover-fansly.png',
      tags: ['Fansly', 'FYP', 'Traffic', 'AI OFM', 'Monetization', 'System'],
      description: 'Связка по внутренней системе FYP Fansly — прямой трафик клиентов в нише без прогрева инсты и лишней мороки. Быстрый выход на заработок. Внутри: настройка связки + тонкости и обход подводных камней с ограничениями по AI-реализму.',
      features: ['Настройка связки под Fansly FYP', 'Прямой трафик без Instagram', 'Обход ограничений по AI-реализму', 'Быстрый выход на первых клиентов', 'Тонкости и подводные камни', 'Формат: созвон или переписка'],
      runs: null,
      forWhom: 'AI OFM-креаторы, те кто хочет монетизировать AI-аватар без сложных воронок',
      access: 'Формат: спишемся или созвонимся — объясню и помогу внедрить.'
    },
    verification: {
      id: 'verification', category: 'SERVICE / VERIFY', title: 'Верификации: Fanvue / Fansly / Stacked', cardTitle: 'ВЕРИФИКАЦИИ',
      price: null, oldPrice: null, badges: ['NEW'],
      short: 'Помощь с прохождением верификаций аккаунтов на платформах: Fanvue, Fansly, Stacked и других.',
      coverLabel: 'VERIFY\nACCESS', coverImage: 'cover-verification.png',
      tags: ['Verification', 'Fanvue', 'Fansly', 'Stacked', 'AI OFM'],
      description: 'Помощь с прохождением верификаций аккаунтов на платформах. Знаем подводные камни, обходы и рабочие схемы. Каждая платформа — свои нюансы, помогаем пройти без отказов.',
      features: ['Верификация на Fanvue', 'Верификация на Fansly', 'Верификация на Stacked', 'Помощь с другими платформами', 'Знание подводных камней и обходов', 'Индивидуальный подход к каждый кейсу'],
      runs: null,
      forWhom: 'AI OFM-креаторы, все кто застрял на этапе верификации',
      access: 'Цена по запросу. Напиши — обсудим.'
    },
    consultation: {
      id: 'consultation', category: 'SERVICE / PERSONAL', title: 'Консультация', cardTitle: 'КОНСУЛЬТАЦИЯ',
      price: null, oldPrice: null, badges: [],
      short: 'Персональный разбор твоей задачи или системы. Созвон или переписка — разберём конкретно твою ситуацию.',
      coverLabel: 'CONSULT', coverImage: 'cover-consultation.png',
      tags: ['Consultation', 'Personal', 'Strategy', 'AI OFM', 'System'],
      description: 'Персональная консультация — разбор конкретно твоей задачи, системы или проблемы. Не шаблонный совет, а анализ твоей ситуации с конкретными рекомендациями и планом действий.',
      features: ['Анализ текущей ситуации', 'Конкретные рекомендации под твой кейс', 'Разбор узких мест и ошибок', 'План действий', 'Формат: созвон 30–60 минут или переписка'],
      runs: null,
      forWhom: 'Те, кому нужен персональный разбор без покупки полного доступа',
      access: 'Цена по запросу. Напиши в Telegram — договоримся.'
    }
  };
  const productOrder = ['higgsfield', 'animator1', 'animator21', 'xmode', 'community', 'fansly', 'verification', 'consultation'];

  /* ================================================================
     TASK 3 — SERVICES DATA (index.html)
     ================================================================ */
  const services = {
    avatars: {
      id: 'avatars', icon: '👤', title: 'Создание AI-аватаров', cardTitle: 'AI-АВАТАРЫ',
      short: 'Цифровые персоны под бренд, артиста или проект — от образа до контент-системы.',
      cardPrice: 'от $55',
      description: 'Создаём цифровые AI-персоны с нуля: консистентный образ, фото и видео-контент, полная контент-система. Тренируем LoRA под лицо, настраиваем пайплайн генерации, передаём готовую систему.',
      features: ['Разработка образа: внешность, стиль, сеттинг', 'LoRA-тренинг под конкретное лицо', 'Консистентный фото-контент: одно лицо, разные сцены', 'Видео-контент с аватаром: motion, lipsync', 'Настройка контент-системы под самостоятельную работу', 'Обучение работе с системой'],
      tags: ['AI Avatar', 'LoRA', 'Content System', 'Brand', 'Persona'],
      pricing: [
        { title: 'Согласованный персонаж', price: '$55', desc: 'Создание персонажа без обучения LoRA: собираем базу образа — внешность, лицо, стиль, одежду, визуальную подачу — согласовываем, и от утверждённого образа дальше делаются новые фото и видео. Подходит, если нужен красивый и понятный AI-аватар, быстрый старт и регулярная генерация контента без долгого технического этапа.' },
        { title: 'Персонаж через LoRA', price: '$100', desc: 'Обучаем отдельную модель под лицо и образ персонажа в ComfyUI, дальше работаем через кастомные инструменты студии. Плюсы: выше консистентность, лучше контроль внешности в разных сценах, больше вариаций по ракурсам, одежде, стилю и окружению; база под регулярное и долгосрочное производство контента и более свободные форматы работы.' }
      ],
      pricingNote: 'Просто: вариант 1 — быстрый способ получить постоянного персонажа. Вариант 2 — серьёзная техническая база под долгую работу и масштабирование.'
    },
    video: {
      id: 'video', icon: '🎬', title: 'Монтаж и видеоряд с ИИ + клипы и промо', cardTitle: 'ВИДЕО И КЛИПЫ',
      short: 'Полный видео-продакшн: генерация, композитинг, цветокор, финал под любую площадку.',
      cardPrice: 'от $35 / 15 сек',
      description: 'Полный цикл видео-продакшна на базе AI: от генерации сырого материала до финального файла. Клипы, промо-ролики, атмосферные видеоряды, motion-графика. Финал — под любой формат и площадку.',
      features: ['AI-генерация видеоряда: Kling, Seedance, ComfyUI', 'Монтаж и композитинг', 'Цветокоррекция и грейдинг', 'Музыкальные клипы и промо', 'Motion-графика и атмосферные концепции', 'Финал в любом формате: вертикаль, 4K, LED'],
      tags: ['Video', 'Clips', 'Promo', 'Compositing', 'Color grading'],
      pricing: [
        { title: 'AI-генерация ролика', price: '$35 / 15 сек', desc: 'Полная AI-генерация видеоряда без финального монтажного продакшена: концепт, генерация сцен, сборка черновой последовательности. Подходит, если монтаж делаешь сам или нужен материал под свой проект.' },
        { title: 'Под ключ', price: '$50 / 15 сек', desc: 'Полностью готовый итоговый продукт: генерация + монтаж, композитинг, цветокор, саунд, финал под спеки площадки. Отдаём файл, который сразу публикуется.' }
      ],
      pricingNote: null
    },
    banners: {
      id: 'banners', icon: '🖼️', title: 'Баннеры и визуал для проектов', cardTitle: 'БАННЕРЫ И ВИЗУАЛ',
      short: 'Ключевые визуалы, афиши, обложки, креативы — для шоу, бизнеса и любой коммерции.',
      cardPrice: 'от $100',
      description: 'Создаём ключевые визуалы для любых задач: афиши концертов, обложки альбомов, баннеры для маркетплейсов, креативы для рекламы. От концепта до финальных макетов в нужных форматах.',
      features: ['Афиши и постеры для шоу и концертов', 'Обложки альбомов и синглов', 'Баннеры для маркетплейсов и e-com', 'Рекламные креативы и UGC', 'Визуалы для социальных сетей', 'Финальные макеты в нужных форматах'],
      tags: ['Banners', 'Posters', 'Covers', 'Creatives', 'Visual'],
      pricing: [
        { title: 'Баннеры и визуал', price: 'от $100', desc: 'Ключевые визуалы, афиши, обложки, креативы для шоу, бизнеса и коммерции в любой нише. Финальная цена зависит от количества макетов, сложности и сроков.' }
      ],
      pricingNote: null
    },
    show: {
      id: 'show', icon: '🎭', title: 'Продакшн под шоу', cardTitle: 'ШОУ-ПРОДАКШН',
      short: 'Сценический визуал, контент для концертов и LED-экранов. Полный цикл под спеки площадки.',
      cardPrice: 'от $500 / проект',
      description: 'AI-визуал для сцены: контент под LED-экраны, видеопроекции, концертный визуал. Работаем под конкретные спеки площадки — разрешение, кодек, fps. Полный цикл от концепта до готового файла.',
      features: ['Визуал под LED-экраны любого формата', 'Видеопроекции и атмосферный контент', 'Работа под спеки конкретной площадки', 'Кодек, разрешение, fps — как нужно', '4K и выше, Hap, LED-ready', 'Полный цикл от концепта до файла'],
      tags: ['LED', 'Stage', 'Concert', 'Visual', '4K'],
      pricing: [
        { title: 'Продакшн под шоу', price: 'от $500', desc: 'Сценический визуал и контент для концертов и LED-экранов: концепт, генерация, сборка, финал под спеки площадки. Цена зависит от хронометража, количества сцен и требований площадки.' }
      ],
      pricingNote: null
    },
    lipsync: {
      id: 'lipsync', icon: '🗣️', title: 'Lipsync / оживление', cardTitle: 'LIPSYNC',
      short: 'Оживление персонажей: смена костюма и фона с сохранением лица, мимики и синхрона.',
      cardPrice: '$30 / 15 сек',
      description: 'Lipsync и face-work: оживляем статичные образы, меняем костюм и фон с сохранением лица и синхрона. Артист с чёрного фона → полноценная сцена с реалистичной мимикой.',
      features: ['Lipsync: синхрон губ под аудио', 'Перенос мимики и выражений лица', 'Смена костюма и окружения', 'Сохранение идентичности лица', 'Face-work: ретушь, улучшение, стилизация', 'Оживление статичных AI-образов'],
      tags: ['Lipsync', 'Face-work', 'Motion', 'Animation'],
      pricing: [
        { title: 'Lipsync и оживление', price: '$30 / 15 сек', desc: 'Оживление персонажа/фото, синхрон губ под трек или речь, сохранение лица. Хронометраж считается по финальному ролику.' }
      ],
      pricingNote: null
    }
  };
  const serviceOrder = ['avatars', 'video', 'banners', 'show', 'lipsync'];

  /* ================================================================
     GLOBAL CANVAS (wavy lines — all pages)
     Task 8: enhanced cursor interaction
     ================================================================ */
  function initGlobalCanvas() {
    const c = document.getElementById('global-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, mx = -999, my = -999;
    const LINES = 18, SEG = 80, PUSH_RADIUS = 200, PUSH_STRENGTH = 55;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const isTouch = 'ontouchstart' in window;
    if (!isTouch) {
      window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    }
    window.addEventListener('scroll', () => { mx = -999; my = -999; }, { passive: true });
    const time = { v: 0 };
    (function loop() {
      requestAnimationFrame(loop);
      time.v += 0.003;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < LINES; i++) {
        const baseY = (H / (LINES + 1)) * (i + 1);
        ctx.beginPath();
        for (let x = 0; x <= W; x += SEG) {
          let y = baseY + Math.sin(x * 0.003 + time.v + i * 0.7) * 18;
          const dx = x - mx, dy = y - my, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PUSH_RADIUS) {
            const force = PUSH_STRENGTH * (1 - dist / PUSH_RADIUS);
            y += (dy / (dist || 1)) * force;
          }
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const alpha = 0.04 + (i % 3 === 0 ? 0.03 : 0);
        ctx.strokeStyle = i % 4 === 0 ? `rgba(225,29,42,${alpha + 0.02})` : `rgba(242,242,244,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    })();
  }

  /* === HERO PARTICLES (ember field) === */
  function initHeroCanvas() {
    const cv = document.getElementById('hero-canvas');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, parts = [], mx = 0.5, my = 0.5;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    function resize() {
      w = cv.width = cv.parentElement.clientWidth * devicePixelRatio;
      h = cv.height = cv.parentElement.clientHeight * devicePixelRatio;
      cv.style.width = cv.parentElement.clientWidth + 'px';
      cv.style.height = cv.parentElement.clientHeight + 'px';
    }
    resize();
    window.addEventListener('resize', resize);
    function seed() {
      const n = Math.min(120, Math.floor(innerWidth / 12));
      parts = [];
      for (let i = 0; i < n; i++) {
        parts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .15 * devicePixelRatio, vy: (-Math.random() * .35 - .05) * devicePixelRatio, r: (Math.random() * 1.6 + .4) * devicePixelRatio, a: Math.random() * .5 + .2 });
      }
    }
    seed();
    window.addEventListener('mousemove', e => { mx = e.clientX / innerWidth; my = e.clientY / innerHeight; });
    function tick() {
      ctx.clearRect(0, 0, w, h);
      const ox = (mx - .5) * 30 * devicePixelRatio, oy = (my - .5) * 30 * devicePixelRatio;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
          if (d < 110 * devicePixelRatio) {
            ctx.strokeStyle = 'rgba(225,29,42,' + (0.10 * (1 - d / (110 * devicePixelRatio))) + ')';
            ctx.lineWidth = devicePixelRatio * .6;
            ctx.beginPath(); ctx.moveTo(p.x + ox, p.y + oy); ctx.lineTo(q.x + ox, q.y + oy); ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x + ox, p.y + oy, 0, p.x + ox, p.y + oy, p.r * 4);
        g.addColorStop(0, 'rgba(225,29,42,' + p.a + ')');
        g.addColorStop(1, 'rgba(225,29,42,0)');
        ctx.fillStyle = g;
        ctx.arc(p.x + ox, p.y + oy, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    if (!reduce) tick();
    else { for (const p of parts) { ctx.fillStyle = 'rgba(225,29,42,' + p.a + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2); ctx.fill(); } }
  }

  /* === HERO WORDMARK REVEAL === */
  function initWordmark() {
    const wm = document.getElementById('wm-title');
    if (!wm) return;
    const word = 'DURDOM';
    [...word].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'reveal-letter';
      s.textContent = ch;
      s.style.animationDelay = (0.15 + i * 0.05) + 's';
      wm.appendChild(s);
    });
  }

  /* === HERO VIDEO BACKGROUND === */
  function initHeroVideo() {
    const wrap = document.getElementById('hero-video-wrap');
    const vid = document.getElementById('hero-bg-video');
    if (!wrap || !vid) return;
    if (A.heroVideo) {
      vid.src = A.heroVideo;
      if (A.heroPoster) vid.poster = A.heroPoster;
      vid.play().catch(() => {});
    } else if (A.heroPoster) {
      wrap.style.background = `url(${A.heroPoster}) center/cover no-repeat`;
      vid.style.display = 'none';
    } else {
      wrap.style.display = 'none';
    }
  }

  /* === TASK 8: HERO MUTE TOGGLE === */
  function initHeroMute() {
    const btn = document.getElementById('hero-mute-toggle');
    const vid = document.getElementById('hero-bg-video');
    if (!btn || !vid) return;
    btn.addEventListener('click', () => {
      vid.muted = !vid.muted;
      btn.textContent = vid.muted ? '🔇' : '🔊';
      btn.setAttribute('aria-label', vid.muted ? 'Включить звук' : 'Выключить звук');
    });
  }

  /* === SHOWREEL OVERLAY === */
  function initShowreelOverlay() {
    const btn = document.getElementById('showreel-play-btn');
    const overlay = document.getElementById('showreel-overlay');
    const closeBtn = document.getElementById('showreel-close');
    const video = document.getElementById('showreel-video');
    if (!btn || !overlay || !video) return;
    function open() {
      if (A.presentation) {
        video.src = A.presentation;
        overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        video.play().catch(() => {});
      } else {
        document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    function close() {
      overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      video.pause(); video.src = '';
    }
    btn.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('is-open')) close(); });
  }

  /* === STICKY NAV === */
  function initNav() {
    const nav = document.getElementById('site-nav');
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        mobileMenu.setAttribute('aria-hidden', !open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mobileMenu.querySelectorAll('[data-mobile-nav]').forEach(a => {
        a.addEventListener('click', () => {
          mobileMenu.classList.remove('is-open');
          burger.classList.remove('is-open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ================================================================
     TASK 1 — RENDER PRODUCTS (Arsenal page)
     Handles price:null → «По запросу»
     ================================================================ */
  function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = productOrder.map(id => {
      const p = products[id];
      if (!p) return '';
      const badges = p.badges.map(b => `<span class="badge badge--${b.toLowerCase().replace('+','')}">${b}</span>`).join('');
      const tags = p.tags.slice(0, 4).map(t => `<span class="product-card__tag">${t}</span>`).join('');
      const priceStr = p.price === null ? 'По запросу' : (p.price === 0 ? 'FREE' : `$${p.price}`);
      const oldStr = p.oldPrice ? `<s>$${p.oldPrice}</s>` : '';
      return `<article class="product-card" data-product-open="${p.id}">
        <div class="product-card__cover">
          <img class="product-card__cover-img" src="${p.coverImage}" alt="${p.title}" loading="lazy" />
          <div class="product-card__badges">${badges}</div>
        </div>
        <div class="product-card__body">
          <div class="product-card__price"><strong>${priceStr}</strong>${oldStr}</div>
          <h3 style="font-family:var(--font-display);font-size:16px;text-transform:uppercase;margin-bottom:6px">${p.cardTitle}</h3>
          <p class="product-card__short">${p.short}</p>
          <div class="product-card__tags">${tags}</div>
          <div class="product-card__cta">Подробнее →</div>
        </div>
      </article>`;
    }).join('');
  }

  /* === PRODUCT MODAL (Arsenal page) === */
  function initModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    function openProduct(id) {
      const p = products[id];
      if (!p) return;
      document.getElementById('modal-title').textContent = p.title;
      document.getElementById('modal-category').textContent = p.category;
      const priceEl = document.getElementById('modal-price');
      priceEl.textContent = p.price === null ? 'По запросу' : (p.price === 0 ? 'FREE' : `$${p.price}`);
      const oldEl = document.getElementById('modal-old-price');
      oldEl.textContent = p.oldPrice ? `$${p.oldPrice}` : '';
      oldEl.style.display = p.oldPrice ? '' : 'none';
      document.getElementById('modal-discount').style.display = p.oldPrice ? '' : 'none';
      document.getElementById('modal-description').textContent = p.description;
      document.getElementById('modal-features').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
      document.getElementById('modal-tags').innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
      const img = document.getElementById('modal-cover-img');
      img.src = p.coverImage; img.alt = p.title;
      const runsS = document.getElementById('modal-runs-section');
      const runsP = document.getElementById('modal-runs');
      if (p.runs) { runsS.style.display = ''; runsP.textContent = p.runs; } else { runsS.style.display = 'none'; }
      const forS = document.getElementById('modal-for-section');
      const forP = document.getElementById('modal-for');
      if (p.forWhom) { forS.style.display = ''; forP.textContent = p.forWhom; } else { forS.style.display = 'none'; }
      const accS = document.getElementById('modal-access-section');
      const accP = document.getElementById('modal-access');
      if (p.access) { accS.style.display = ''; accP.textContent = p.access; } else { accS.style.display = 'none'; }
      // Buy button: change text for "по запросу" items
      const buyBtn = document.getElementById('modal-buy');
      const trustBadge = document.getElementById('modal-trust-badge');
      if (buyBtn) {
        if (p.price === null) {
          buyBtn.innerHTML = 'Написать в Telegram <span>→</span>';
          buyBtn.dataset.action = 'telegram';
          if (trustBadge) trustBadge.style.display = 'none';
        } else {
          buyBtn.innerHTML = 'Оплатить криптой <span>→</span>';
          buyBtn.dataset.action = 'buy';
          if (trustBadge) trustBadge.style.display = 'flex';
        }
      }
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    }
    document.addEventListener('click', e => {
      const card = e.target.closest('[data-product-open]');
      if (card) openProduct(card.dataset.productOpen);
    });
    modal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
    const buyBtn = document.getElementById('modal-buy');
    if (buyBtn) {
      buyBtn.addEventListener('click', async () => {
        // Telegram action
        if (buyBtn.dataset.action === 'telegram') {
          window.open(TELEGRAM_URL, '_blank');
          return;
        }
        const title = document.getElementById('modal-title').textContent;
        const prod = Object.values(products).find(p => p.title === title);
        if (!prod) return;
        if (prod.price === 0) { close(); document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' }); return; }
        buyBtn.disabled = true; buyBtn.innerHTML = 'Создаём платёж... <span class="spinner"></span>';
        
        const apiIdMap = {
          'higgsfield': 'higgsfield_course',
          'animator1': 'animator_v1',
          'animator21': 'animator_v21',
          'xmode': 'xmode_v21',
          'community': 'private_community',
          'fansly': 'fansly_bundle'
        };
        const itemId = apiIdMap[prod.id] || prod.id;

        try {
          const res = await fetch('/api/create-payment', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId })
          });
          const data = await res.json();
          if (data.success && data.url) { window.location.href = data.url; }
          else { showToast('Не получилось создать счёт, напиши в Telegram @Pravaka'); }
        } catch (err) { showToast('Не получилось создать счёт, напиши в Telegram @Pravaka'); }
        finally { buyBtn.disabled = false; buyBtn.innerHTML = 'Оплатить криптой <span>→</span>'; }
      });
    }
  }

  /* ================================================================
     TASK 3 — RENDER SERVICES (index.html)
     ================================================================ */
  function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = serviceOrder.map((id, idx) => {
      const s = services[id];
      if (!s) return '';
      const tags = s.tags.slice(0, 3).map(t => `<span class="product-card__tag">${t}</span>`).join('');
      return `<article class="product-card" data-service-open="${s.id}">
        <div class="product-card__cover service-cover-bg">
          <div class="service-cover-title">${s.cardTitle || s.title}</div>
        </div>
        <div class="product-card__body">
          <h3 style="font-family:var(--font-display);font-size:16px;text-transform:uppercase;margin-bottom:6px">${s.title}</h3>
          <p class="product-card__short">${s.short}</p>
          <div class="product-card__tags">${tags}</div>
          <div class="svc-card-price">${s.cardPrice}</div>
          <div class="product-card__cta">Подробнее →</div>
        </div>
      </article>`;
    }).join('');
  }

  /* === SERVICE MODAL (index.html) === */
  function initServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    function openService(id) {
      const s = services[id];
      if (!s) return;
      document.getElementById('svc-modal-title').textContent = s.title;
      document.getElementById('svc-modal-description').textContent = s.description;
      document.getElementById('svc-modal-features').innerHTML = s.features.map(f => `<li>${f}</li>`).join('');
      document.getElementById('svc-modal-tags').innerHTML = s.tags.map(t => `<span>${t}</span>`).join('');

      // Pricing block
      const pricingEl = document.getElementById('svc-modal-pricing');
      const mainBtn = document.getElementById('svc-modal-main-btn');
      if (mainBtn) mainBtn.style.display = 'none';

      if (pricingEl && s.pricing) {
        let html = '';
        if (s.id === 'avatars') {
          html = `
            <div class="svc-modal-variants">
              <div class="pricing-variant">
                <div class="pricing-variant__head">
                  <span class="pricing-variant__name">Вариант 1 — ${s.pricing[0].title}</span>
                  <span class="pricing-variant__price">${s.pricing[0].price}</span>
                </div>
                <p class="pricing-variant__desc">${s.pricing[0].desc}</p>
                <div class="pricing-variant__action" style="margin-top: 16px;">
                  <button class="btn btn--primary btn--full svc-pay-btn" data-item-id="avatar_basic" data-base-price="55" data-qty="1">Оплатить $55 <span>→</span></button>
                </div>
              </div>
              <div class="pricing-variant">
                <div class="pricing-variant__head">
                  <span class="pricing-variant__name">Вариант 2 — ${s.pricing[1].title}</span>
                  <span class="pricing-variant__price">${s.pricing[1].price}</span>
                </div>
                <p class="pricing-variant__desc">${s.pricing[1].desc}</p>
                <div class="pricing-variant__action" style="margin-top: 16px;">
                  <button class="btn btn--primary btn--full svc-pay-btn" data-item-id="avatar_lora" data-base-price="100" data-qty="1">Оплатить $100 <span>→</span></button>
                </div>
              </div>
            </div>
            <p class="pricing-note">${s.pricingNote}</p>
            <p class="pricing-disclaimer">Точный расчёт — после брифа. Минимальный заказ — $70.</p>
            <div class="pricing-footnote-sec">Оплата cryptocurrency через Cryptomus. Доступ выдаётся вручную в Telegram после оплаты.</div>
          `;
        } else if (s.id === 'video') {
          html = `
            <div class="duration-selector-wrap" style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
              <label for="duration-select" style="font-family: var(--font-mono); font-size: 12px; color: var(--muted); text-transform: uppercase;">Длительность ролика:</label>
              <select id="duration-select" class="duration-select" style="background: var(--surface); border: 1px solid var(--line); color: var(--ink); padding: 6px 12px; border-radius: 6px; font-family: var(--font-mono);">
                <option value="1">15 сек</option>
                <option value="2">30 сек</option>
                <option value="3">45 сек</option>
                <option value="4">60 сек</option>
                <option value="6">90 сек</option>
                <option value="8">120 сек</option>
              </select>
            </div>
            <div class="svc-modal-variants">
              <div class="pricing-variant">
                <div class="pricing-variant__head">
                  <span class="pricing-variant__name">Вариант 1 — ${s.pricing[0].title}</span>
                  <span class="pricing-variant__price" id="price-val-video-gen">$35</span>
                </div>
                <p class="pricing-variant__desc">${s.pricing[0].desc}</p>
                <div class="pricing-variant__action" style="margin-top: 16px;">
                  <button class="btn btn--primary btn--full svc-pay-btn" id="pay-btn-video-gen" data-item-id="video_gen_15s" data-base-price="35" data-qty="1">Оплатить $35 <span>→</span></button>
                </div>
              </div>
              <div class="pricing-variant">
                <div class="pricing-variant__head">
                  <span class="pricing-variant__name">Вариант 2 — ${s.pricing[1].title}</span>
                  <span class="pricing-variant__price" id="price-val-video-turnkey">$50</span>
                </div>
                <p class="pricing-variant__desc">${s.pricing[1].desc}</p>
                <div class="pricing-variant__action" style="margin-top: 16px;">
                  <button class="btn btn--primary btn--full svc-pay-btn" id="pay-btn-video-turnkey" data-item-id="video_turnkey_15s" data-base-price="50" data-qty="1">Оплатить $50 <span>→</span></button>
                </div>
              </div>
            </div>
            <p class="pricing-disclaimer">Точный расчёт — после брифа. Минимальный заказ — $70.</p>
            <div class="pricing-footnote-sec">Оплата криптовалютой через Cryptomus. Доступ выдаётся вручную в Telegram после оплаты.</div>
          `;
        } else if (s.id === 'lipsync') {
          html = `
            <div class="duration-selector-wrap" style="margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
              <label for="duration-select" style="font-family: var(--font-mono); font-size: 12px; color: var(--muted); text-transform: uppercase;">Длительность ролика:</label>
              <select id="duration-select" class="duration-select" style="background: var(--surface); border: 1px solid var(--line); color: var(--ink); padding: 6px 12px; border-radius: 6px; font-family: var(--font-mono);">
                <option value="1">15 сек</option>
                <option value="2">30 сек</option>
                <option value="3">45 сек</option>
                <option value="4">60 сек</option>
                <option value="6">90 сек</option>
                <option value="8">120 сек</option>
              </select>
            </div>
            <div class="svc-modal-variants">
              <div class="pricing-variant">
                <div class="pricing-variant__head">
                  <span class="pricing-variant__name">${s.pricing[0].title}</span>
                  <span class="pricing-variant__price" id="price-val-lipsync">$30</span>
                </div>
                <p class="pricing-variant__desc">${s.pricing[0].desc}</p>
                <div class="pricing-variant__action" style="margin-top: 16px;">
                  <button class="btn btn--primary btn--full svc-pay-btn" id="pay-btn-lipsync" data-item-id="lipsync_15s" data-base-price="30" data-qty="1">Оплатить $30 <span>→</span></button>
                </div>
              </div>
            </div>
            <p class="pricing-disclaimer">Точный расчёт — после брифа. Минимальный заказ — $70.</p>
            <div class="pricing-footnote-sec">Оплата криптовалютой через Cryptomus. Доступ выдаётся вручную в Telegram после оплаты.</div>
          `;
        } else {
          html = `
            <div class="pricing-variant">
              <p class="pricing-variant__desc" style="margin-top:0">${s.pricing[0].desc}</p>
              <div class="pricing-variant__action" style="margin-top: 16px;">
                <a class="btn btn--primary btn--full" href="https://t.me/Pravaka" target="_blank" rel="noopener">Обсудить в Telegram <span>→</span></a>
              </div>
            </div>
            <p class="pricing-disclaimer">Финальная стоимость согласовывается индивидуально.</p>
          `;
        }
        pricingEl.innerHTML = html;

        // Dynamic select updates
        const select = pricingEl.querySelector('#duration-select');
        if (select) {
          select.addEventListener('change', () => {
            const qty = parseInt(select.value, 10) || 1;
            pricingEl.querySelectorAll('.svc-pay-btn').forEach(btn => {
              const basePrice = parseInt(btn.dataset.basePrice, 10);
              const total = basePrice * qty;
              btn.dataset.qty = qty;
              btn.innerHTML = `Оплатить $${total} <span>→</span>`;
              
              if (btn.id === 'pay-btn-video-gen') {
                document.getElementById('price-val-video-gen').textContent = `$${total}`;
              } else if (btn.id === 'pay-btn-video-turnkey') {
                document.getElementById('price-val-video-turnkey').textContent = `$${total}`;
              } else if (btn.id === 'pay-btn-lipsync') {
                document.getElementById('price-val-lipsync').textContent = `$${total}`;
              }
            });
          });
        }
      }

      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      // GSAP entrance
      if (typeof gsap !== 'undefined' && window.location.protocol !== 'file:') {
        const dialog = modal.querySelector('.modal__dialog');
        gsap.fromTo(dialog, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
        gsap.fromTo(modal.querySelectorAll('.modal__section, .modal__content h2, .modal__content .btn'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power3.out', delay: 0.15 });
      }
    }
    document.addEventListener('click', e => {
      const card = e.target.closest('[data-service-open]');
      if (card) openService(card.dataset.serviceOpen);
    });
    modal.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });

    // Delegate service pay button click
    document.addEventListener('click', async e => {
      const payBtn = e.target.closest('.svc-pay-btn');
      if (payBtn) {
        const itemId = payBtn.dataset.itemId;
        const qty = parseInt(payBtn.dataset.qty || 1, 10);
        
        payBtn.disabled = true;
        const originalHTML = payBtn.innerHTML;
        payBtn.innerHTML = 'Создаём платёж... <span class="spinner"></span>';
        
        try {
          const res = await fetch('/api/create-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, qty })
          });
          const data = await res.json();
          if (data.success && data.url) {
            window.location.href = data.url;
          } else {
            showToast('Не получилось создать счёт, напиши в Telegram @Pravaka');
          }
        } catch (err) {
          showToast('Не получилось создать счёт, напиши в Telegram @Pravaka');
        } finally {
          payBtn.disabled = false;
          payBtn.innerHTML = originalHTML;
        }
      }
    });
  }

  /* === LEAD FORM === */
  function initLeadForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const submitText = document.getElementById('submit-text');
      const data = { name: form.name.value, telegram: form.telegram.value, product: form.product.value, message: form.message.value };
      submitText.textContent = 'Отправка...';
      try {
        const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (res.ok) { status.textContent = '✓ Заявка отправлена!'; status.className = 'form-status success'; form.reset(); }
        else { status.textContent = 'Ошибка. Попробуйте позже.'; status.className = 'form-status error'; }
      } catch { status.textContent = 'Ошибка сети.'; status.className = 'form-status error'; }
      finally { submitText.textContent = 'Отправить заявку'; }
    });
  }

  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  /* === PORTFOLIO TABS === */
  function initShowreelTabs() {
    const tabs = document.querySelectorAll('.showreel-tab');
    if (!tabs.length) return;
    const grids = [document.getElementById('showreel-grid'), document.getElementById('works-full-grid')].filter(Boolean);
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const filter = tab.dataset.filter;
        grids.forEach(grid => {
          grid.querySelectorAll('[data-category]').forEach(c => {
            c.style.display = (filter === 'all' || c.dataset.category === filter) ? '' : 'none';
          });
        });
      });
    });
  }

  /* === RENDER WORKS FROM ASSETS === */
  function renderWorks() {
    const previewGrid = document.getElementById('showreel-grid');
    const fullGrid = document.getElementById('works-full-grid');
    const featuredCase = document.getElementById('featured-case');
    const works = A.works || [];
    // OG Buda featured case
    if (featuredCase && A.ogBuda && A.ogBuda.video) {
      const og = A.ogBuda;
      featuredCase.innerHTML = `<div class="featured-card" id="og-buda-card">
        <div class="featured-card__video">
          <video src="${og.video}" muted loop playsinline preload="metadata" ${og.poster ? `poster="${og.poster}"` : ''}></video>
          <div class="featured-card__play"><span>▶</span></div>
        </div>
        <div class="featured-card__info">
          <div class="section-label">FEATURED</div>
          <h3>${og.title || 'OG Buda'}</h3>
          <p>AI-визуал для артиста. Click to play со звуком.</p>
        </div>
      </div>`;
      const card = document.getElementById('og-buda-card');
      const vid = card?.querySelector('video');
      if (card && vid) {
        card.addEventListener('mouseenter', () => { vid.play().catch(() => {}); });
        card.addEventListener('mouseleave', () => vid.pause());
        card.addEventListener('click', () => {
          const lb = document.getElementById('photo-lightbox');
          if (!lb) return;
          const lbImg = lb.querySelector('img');
          if (lbImg) lbImg.style.display = 'none';
          let lbVid = lb.querySelector('video');
          if (!lbVid) { lbVid = document.createElement('video'); lbVid.className = 'lightbox-video'; lbVid.controls = true; lbVid.playsInline = true; lb.insertBefore(lbVid, lb.querySelector('.photo-lightbox__close')?.nextSibling); }
          lbVid.src = og.video; lbVid.muted = false; lbVid.style.display = 'block';
          lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
          lbVid.play().catch(() => {});
        });
      }
    } else if (featuredCase) { featuredCase.innerHTML = ''; }
    function renderGrid(grid, limit) {
      if (!grid) return;
      if (!works.length) {
        if (!grid.querySelector('.showreel-placeholder')) {
          grid.innerHTML = `<div class="showreel-placeholder reveal"><div class="section-label">COMING SOON</div><p>Портфолио пополняется. Здесь будут кейсы: клипы, промо, AI-образы артистов.</p></div>`;
        }
        return;
      }
      const subset = limit ? works.slice(0, limit) : works;
      grid.innerHTML = subset.map(w => {
        const catMap = { 'Клипы': 'clips', 'Промо': 'promo', 'AI-образы': 'aifaces', 'Сцена': 'scene' };
        const cat = catMap[w.tag] || 'all';
        if (w.type === 'video') {
          return `<div class="showreel-card" data-category="${cat}">
            <video src="${w.src}" muted loop playsinline preload="metadata" ${w.poster ? `poster="${w.poster}"` : ''}></video>
            <div class="showreel-card__play"><span>▶</span></div>
            <div class="showreel-card__overlay"><span>${w.tag || ''}</span><p>${w.title || ''}</p></div>
          </div>`;
        } else {
          return `<div class="showreel-card" data-category="${cat}">
            <img src="${w.src}" alt="${w.title || 'Work'}" loading="lazy" />
            <div class="showreel-card__overlay"><span>${w.tag || ''}</span><p>${w.title || ''}</p></div>
          </div>`;
        }
      }).join('');
    }
    renderGrid(previewGrid, 6);
    renderGrid(fullGrid, null);

    // Google Drive previews from assets.js (Task 4)
    document.querySelectorAll('.drive-card').forEach(el => {
      const isPhoto = el.id === 'drive-photo';
      const previewUrl = isPhoto ? A.portfolioLinks?.photo?.preview : A.portfolioLinks?.video?.preview;
      if (previewUrl) {
        const previewEl = el.querySelector('.drive-card__preview');
        if (previewEl) {
          previewEl.style.backgroundImage = `url(${previewUrl})`;
        }
      }
    });
  }

  /* === RENDER ARSENAL DYNAMIC MEDIA === */
  function renderArsenalDynamic() {
    const grid = document.getElementById('arsenal-dynamic-grid');
    if (!grid) return;
    const media = A.arsenalMedia || [];
    if (!media.length) return;
    grid.innerHTML = '<h3 style="grid-column:1/-1;margin-bottom:8px">Дополнительное портфолио</h3>' +
      media.map(m => {
        if (m.nsfw) {
          return `<div class="nsfw-card nsfw-blur"><img src="${m.src}" alt="${m.title || ''}" loading="lazy" /><div class="nsfw-overlay"><svg class="nsfw-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="1" y1="1" x2="23" y2="23"/></svg><span>NSFW 18+</span></div><b>${m.title || ''}</b></div>`;
        }
        if (m.type === 'video') {
          return `<div class="nsfw-card video-card"><video src="${m.src}" muted loop playsinline preload="metadata"></video><div class="video-scanline"></div><span class="play-icon">▶</span><b>${m.title || ''}</b></div>`;
        }
        return `<div class="nsfw-card"><img src="${m.src}" alt="${m.title || ''}" loading="lazy" /><b>${m.title || ''}</b></div>`;
      }).join('');
  }

  /* === REVIEWS SLIDER === */
  function initReviewsSlider() {
    const slider = document.getElementById('reviews-slider');
    const prev = document.getElementById('reviews-prev');
    const next = document.getElementById('reviews-next');
    if (!slider) return;
    const scrollAmount = () => { const card = slider.querySelector('.review-card'); return card ? card.offsetWidth + 20 : 300; };
    prev?.addEventListener('click', () => slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    next?.addEventListener('click', () => slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  }

  /* === FAQ ACCORDION === */
  function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item.is-open').forEach(i => { i.classList.remove('is-open'); i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false'); });
        if (!isOpen) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  /* === PORTFOLIO MEDIA (NSFW blur + video lightbox) === */
  function initPortfolioMedia() {
    const lb = document.getElementById('photo-lightbox');
    if (!lb) return;
    const lbClose = lb.querySelector('.photo-lightbox__close');
    const lbImg = lb.querySelector('img');
    function openLightbox(src, isVideo, withSound) {
      if (isVideo) {
        let vid = lb.querySelector('video');
        if (lbImg) lbImg.style.display = 'none';
        if (!vid) { vid = document.createElement('video'); vid.className = 'lightbox-video'; vid.controls = true; vid.autoplay = true; vid.playsInline = true; lb.insertBefore(vid, lbClose?.nextSibling); }
        vid.src = src; vid.muted = !withSound; vid.style.display = 'block'; vid.play().catch(() => {});
      } else {
        let vid = lb.querySelector('video'); if (vid) { vid.pause(); vid.style.display = 'none'; }
        if (lbImg) { lbImg.src = src; lbImg.style.display = 'block'; }
      }
      lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('is-open'); document.body.style.overflow = '';
      let vid = lb.querySelector('video'); if (vid) { vid.pause(); vid.style.display = 'none'; }
    }
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    document.querySelectorAll('.nsfw-blur').forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('revealed')) { card.classList.add('revealed'); return; }
        const img = card.querySelector('img');
        if (img) openLightbox(img.src, false, false);
      });
    });
    document.querySelectorAll('.video-card').forEach(card => {
      const video = card.querySelector('video');
      if (!video) return;
      card.addEventListener('mouseenter', () => { video.play().catch(() => {}); card.classList.add('is-playing'); });
      card.addEventListener('mouseleave', () => { video.pause(); card.classList.remove('is-playing'); });
      card.addEventListener('click', () => { openLightbox(video.src, true, false); });
    });
    document.querySelectorAll('.showreel-card').forEach(card => {
      card.addEventListener('click', () => {
        const vid = card.querySelector('video');
        const img = card.querySelector('img');
        if (vid) openLightbox(vid.src, true, true);
        else if (img) openLightbox(img.src, false, false);
      });
      const vid = card.querySelector('video');
      if (vid) {
        card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
        card.addEventListener('mouseleave', () => vid.pause());
      }
    });
  }



  /* ================================================================
     TASK 8 — CURSOR TRAIL (red dot + ember trail, desktop only)
     ================================================================ */
  function initCursorTrail() {
    if ('ontouchstart' in window) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    const trail = [];
    const TRAIL_LENGTH = 12;
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const t = document.createElement('div');
      t.className = 'cursor-trail-particle';
      t.style.opacity = (1 - i / TRAIL_LENGTH) * 0.6;
      t.style.width = t.style.height = Math.max(2, 6 - i * 0.4) + 'px';
      document.body.appendChild(t);
      trail.push({ el: t, x: 0, y: 0 });
    }
    let curX = 0, curY = 0;
    document.addEventListener('mousemove', e => { curX = e.clientX; curY = e.clientY; });
    function tick() {
      dot.style.transform = `translate(${curX - 5}px, ${curY - 5}px)`;
      let prevX = curX, prevY = curY;
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        t.x += (prevX - t.x) * 0.35;
        t.y += (prevY - t.y) * 0.35;
        t.el.style.transform = `translate(${t.x - 3}px, ${t.y - 3}px)`;
        prevX = t.x;
        prevY = t.y;
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* === GSAP ANIMATIONS === */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section-head h2').forEach(el => {
      gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    gsap.utils.toArray('.process-step').forEach((el, i) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true } });
    });
    // Service cards v2
    gsap.utils.toArray('.service-card-v2').forEach((el, i) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true } });
    });
    // Product cards
    gsap.utils.toArray('.product-card').forEach((el, i) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true } });
    });
    // Stack rows
    gsap.utils.toArray('.stack-row').forEach((el, i) => {
      gsap.from(el, { x: -30, opacity: 0, duration: 0.5, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true } });
    });
    // OFM blocks
    gsap.utils.toArray('.ofm-card, .problem-col, .system-item, .audience-card').forEach((el, i) => {
      gsap.from(el, { y: 25, opacity: 0, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: el.parentElement, start: 'top 85%', once: true } });
    });
    // Drive cards
    gsap.utils.toArray('.drive-card').forEach((el, i) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
  }

  /* === INIT === */
  document.addEventListener('DOMContentLoaded', () => {
    // Shared across all pages
    initGlobalCanvas();
    initNav();

    // index.html specific
    initHeroCanvas();
    initWordmark();
    initHeroVideo();
    initHeroMute();
    initShowreelOverlay();
    renderServices();
    initServiceModal();

    // Works rendering (index preview + works.html full)
    renderWorks();

    // Arsenal page specific
    renderProducts();
    initModal();
    renderArsenalDynamic();

    // Shared interactive
    initLeadForm();
    initShowreelTabs();
    initReviewsSlider();
    initFAQ();
    initPortfolioMedia();

    // Task 8: cursor trail
    initCursorTrail();

    // Intersection observer reveal AFTER rendering cards
    initReveal();

    // GSAP after libs loaded
    setTimeout(initGSAP, 100);
  });
})();
