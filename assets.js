// DURDOM AI STUDIO — единый конфиг медиа.
// Впиши сюда свои ссылки (Cloudinary) и пути. Пустые поля покажут "COMING SOON".
window.DURDOM_ASSETS = {
  heroVideo:    "https://res.cloudinary.com/dxrureyha/video/upload/v1784269945/IMG_8949_oefkrw.mp4", // презентационное видео для hero (loop, muted) — Cloudinary URL
  heroPoster:   "/img/hero-poster.jpg",     // первый кадр hero-видео
  presentation: "",                         // полный шоурил СО ЗВУКОМ (для полноэкранного оверлея)

  // Featured-кейс OG Buda (вертикаль, звук по клику)
  ogBuda: { video: "", poster: "/img/ogbuda-poster.jpg", vertical: true, sound: true, title: "OG Buda — Dark Fantasy" },

  // Портфолио AI Studio (главная + works.html). type: "video" | "image", tag: Клипы|Промо|AI-образы|Сцена
  works: [
    // { type: "video", src: "", poster: "/img/work-01.jpg", title: "", tag: "Клипы" },
    // { type: "image", src: "/img/work-02.jpg", title: "", tag: "AI-образы" },
  ],

  // Арсенал / OFM медиа (arsenal.html). nsfw:true покажет плашку 18+
  arsenalMedia: [
    // { type: "image", src: "/img/arsenal-01.jpg", title: "", nsfw: false },
  ],

  // Превью-изображения для 5 интерактивных услуг (если пусто, будет стандартный темный градиент)
  // Порядок соответствует: 1. AI-аватары, 2. Видео и клипы, 3. Баннеры и визуал, 4. Шоу-продакшн, 5. Lipsync
  services: [
    { preview: "cover-service-avatars.png" }, // 1. AI-аватары
    { preview: "cover-service-video.png" },    // 2. Видео и клипы
    { preview: "cover-service-banners.png" },  // 3. Баннеры и визуал
    { preview: "cover-service-show.png" },     // 4. Шоу-продакшн
    { preview: "cover-service-lipsync.png" }   // 5. Lipsync
  ],

  // Превью-изображения для карточек Google Drive в блоке портфолио (Task 4)
  portfolioLinks: {
    photo: { preview: "cover-drive-photo.png" }, // Ссылка: ФОТО — смотреть архив
    video: { preview: "cover-drive-video.png" }  // Ссылка: ВИДЕО — смотреть архив
  }
};
