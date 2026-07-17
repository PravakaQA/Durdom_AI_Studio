# DURDOM OFM Site V2 — Setup

## Что изменено
- Новый лендинг в стиле DURDOM OFM: hero, problem/solution, ecosystem, catalog/shop, portfolio, private community, reviews, FAQ, lead form, final CTA.
- Каталог продуктов работает через JS-объект в `script.js`.
- Модалка товара открывается по карточкам и отправляет платные продукты в Cryptomus.
- Форма заявки отправляет данные на `/api/lead`.
- Добавлены Vercel API endpoints:
  - `/api/lead`
  - `/api/cryptomus/create-payment`
  - `/api/cryptomus/webhook`
  - `/api/cryptomus/check-status`
  - `/api/telegram-invite`

## Vercel Environment Variables
Добавь в Vercel → Project → Settings → Environment Variables:

```text
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
CRYPTOMUS_MERCHANT_ID=...
CRYPTOMUS_API_KEY=...
SITE_URL=https://durdomofm.work
```

Для выдачи приватного инвайта позже:

```text
TELEGRAM_INVITE_BOT_TOKEN=...
TELEGRAM_INVITE_CHAT_ID=...
```

## Где менять товары
Открой `script.js`, объект `products` в начале файла.

## Где заменить портфолио
В `index.html`, секция `#portfolio`. Сейчас стоят CSS-placeholder блоки. Позже можно заменить их на `<video autoplay muted loop playsinline src="...">` или реальные изображения.
