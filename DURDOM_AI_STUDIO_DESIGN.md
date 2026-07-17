# DESIGN.md — DURDOM AI STUDIO

> Design-system контекст для AI-агента.
> Формат по спецификации google-labs-code/design-md.

## 1. Product tone & principles

DURDOM AI STUDIO — AI-продакшн студия для артистов, шоу и брендов.
Тон: кинематографичный, тёмный, дерзко-премиальный, серьёзный.
Ощущение — «пост-продакшн студия, которая делает визуал для сцены и клипов», а не инфобизнес-лендинг.

**Принципы:**
- Тьма как холст, красный как единственный акцент. Контент (видео/кадры) — главный герой, интерфейс — тихая рама.
- Крупная дисплейная типографика, много воздуха, графичная строгость.
- Кинематографичность > декоративность. Каждый эффект работает на «дорого и серьёзно».
- Доказательства делом: работы, спеки, пайплайн. Ноль воды про «заработай миллион».

## 2. Colors

| Token | Hex | Role |
|-------|-----|------|
| Void | `#08080a` | Самый глубокий фон, подложка, футер |
| Base | `#0d0d0f` | Основной фон страницы |
| Surface | `#16161a` | Карточки, панели, модалки |
| Red | `#e11d2a` | ЕДИНСТВЕННЫЙ акцент |
| Red Deep | `#8f1319` | Hover-состояния, глубина, градиентные хвосты |
| Ink | `#f2f2f4` | Заголовки и основной текст |
| Muted | `#a8a8b0` | Вторичный текст, подписи |
| Line | `#2a2a30` | Границы карточек, разделители |

Красным закрашено ≤10% площади экрана. Никаких вторых акцентных цветов.

## 3. Typography

- **Display** — `Unbounded` (700–800), UPPERCASE, tracking плотный. Hero 72–96px, line-height 0.96. H2 40–56px.
- **Body** — `Inter` (400–600), 16–18px, line-height 1.6, Muted для абзацев, Ink для акцентов.
- **Mono / tech-label** — `JetBrains Mono` (500), 12–13px, UPPERCASE, letter-spacing 0.2em, Red. Для надзаголовков (`01 · ПРОДАКШН`), тех-спеков.

## 4. Spacing

Базовая сетка 8px. Токены: 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Карточки padding: 24–32
- Секции вертикальный ритм: 96–128 (desktop), 56–72 (mobile)
- Контейнер max-width 1200px, боковые поля 24 (mobile) / 48+ (desktop)

## 5. Components

- **Buttons** — капсульные (radius 100px). Primary: Red заливка, hover → Red Deep + glow. Secondary: border Line, hover → border Red. Высота 48–56.
- **Cards** — Surface фон, border 1px Line, radius 14. Hover: border Red, translateY(-4px), glow `0 0 28px rgba(225,29,42,.18)`.
- **Nav** — sticky, Base + blur backdrop, border-bottom Line. Логотип слева, пункты центр/право.
- **Tabs** — pill, активный Red заливка, неактивные Muted + border Line.
- **Accordion** — Line разделители, иконка +/− Red, плавное раскрытие.
- **Tech-spec chips** — mono-плашки с border Line.
- **Section label** — mono Red + номер (`03 · РАБОТЫ`).

## 6. Layout

Одноколоночный поток с крупными секциями. Сетки: услуги 3col / 1col(mobile); портфолио 2–3col; арсенал 2–3col.

## 7. Motion

GSAP + ScrollTrigger + Lenis. Только transform/opacity, will-change.
- Hero: mask-reveal по буквам, cursor-параллакс
- Reveal-on-scroll: split на слова, поднимаются из-под маски
- Pinned horizontal showreel
- Магнитные карточки + micro-tilt + красный glow
- Count-up, marquee, clip-path вайпы, cursor-trail
- `prefers-reduced-motion` обязательно
- Тайминги: 400–600ms, ease `power3.out`

## 8. Accessibility

- Контраст ≥ 4.5:1
- Focus-состояния: красная обводка 2px
- Aria на аккордеоне, каруселе, модалке, табах
- Видео без автозвука, с контролами
- Уважать reduced-motion

## 9. Do-not-use

- Никаких вторых акцентных цветов, синих/фиолетовых AI-градиентов
- Никаких светлых фонов и «Tailwind-стартер» дефолтов
- Никакого инфобизнес-глянца
- Не заливать красным крупные площади
- 18+/OFM-контент НЕ в основное портфолио — только в «Арсенал»
