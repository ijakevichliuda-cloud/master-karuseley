import type { Lang, Slide, SlideRole } from './types'

// ---------------------------------------------------------------------------
// Offline carousel text generator.
//
// There is no external AI service. Instead each language has banks of phrase
// templates for every slide role (intro / point / outro). A slide is built by
// picking one variant from each relevant bank. "Regenerate" simply rolls a new
// random seed, so the same slide gets a fresh variant while topic, language and
// overall style stay the same.
// ---------------------------------------------------------------------------

interface Bank {
  introTitle: string[]
  introBody: string[]
  // Point titles may use {n} (number) and {topic}.
  pointTitle: string[]
  pointBody: string[]
  outroTitle: string[]
  outroBody: string[]
}

const BANKS: Record<Lang, Bank> = {
  ru: {
    introTitle: [
      '{topic}',
      '{topic}: с чего начать',
      'Гид: {topic}',
      'Разбираемся: {topic}',
      '{topic} — простыми словами',
    ],
    introBody: [
      'Листайте карусель до конца — собрали самое важное.',
      'Короткий и понятный разбор в нескольких слайдах.',
      'Сохраните, чтобы не потерять и вернуться позже.',
      'Всё, что стоит знать, — на следующих слайдах.',
      'Только по делу, без воды. Погнали!',
    ],
    pointTitle: [
      'Шаг {n}',
      'Пункт {n}',
      'Идея {n}',
      'Совет {n}',
      'Что важно #{n}',
    ],
    pointBody: [
      'Начните с малого и делайте это регулярно — стабильность важнее рывков.',
      'Сфокусируйтесь на одном действии за раз, чтобы не распыляться.',
      'Заранее уберите то, что вас отвлекает, — так проще держать темп.',
      'Отмечайте прогресс: даже небольшой результат мотивирует двигаться дальше.',
      'Не стремитесь к идеалу сразу — сначала сделайте, потом улучшайте.',
      'Планируйте наперёд: пять минут подготовки экономят час работы.',
      'Задавайте себе простой вопрос: приближает ли это меня к цели?',
      'Повторяйте то, что работает, и спокойно отказывайтесь от лишнего.',
    ],
    outroTitle: [
      'Готово!',
      'Ваш ход',
      'Сохраняйте и применяйте',
      'Подведём итог',
    ],
    outroBody: [
      'Понравилось? Ставьте лайк, сохраняйте и делитесь с друзьями.',
      'Напишите в комментариях, что попробуете первым.',
      'Подписывайтесь, чтобы не пропустить новые разборы.',
      'Сохраните карусель и вернитесь к ней, когда будет нужно.',
    ],
  },
  uk: {
    introTitle: [
      '{topic}',
      '{topic}: з чого почати',
      'Гід: {topic}',
      'Розбираємось: {topic}',
      '{topic} — простими словами',
    ],
    introBody: [
      'Гортайте карусель до кінця — зібрали найважливіше.',
      'Короткий і зрозумілий розбір у кількох слайдах.',
      'Збережіть, щоб не загубити й повернутися пізніше.',
      'Усе, що варто знати, — на наступних слайдах.',
      'Тільки по суті, без води. Поїхали!',
    ],
    pointTitle: [
      'Крок {n}',
      'Пункт {n}',
      'Ідея {n}',
      'Порада {n}',
      'Що важливо #{n}',
    ],
    pointBody: [
      'Починайте з малого й робіть це регулярно — стабільність важливіша за ривки.',
      'Зосередьтесь на одній дії за раз, щоб не розпорошуватися.',
      'Заздалегідь приберіть те, що вас відволікає, — так легше тримати темп.',
      'Відзначайте прогрес: навіть невеликий результат мотивує рухатися далі.',
      'Не прагніть ідеалу одразу — спершу зробіть, потім покращуйте.',
      'Плануйте наперед: п’ять хвилин підготовки економлять годину роботи.',
      'Ставте собі просте запитання: чи наближає це мене до мети?',
      'Повторюйте те, що працює, і спокійно відмовляйтеся від зайвого.',
    ],
    outroTitle: [
      'Готово!',
      'Ваш хід',
      'Зберігайте та застосовуйте',
      'Підсумуємо',
    ],
    outroBody: [
      'Сподобалось? Ставте лайк, зберігайте й діліться з друзями.',
      'Напишіть у коментарях, що спробуєте першим.',
      'Підписуйтесь, щоб не пропустити нові розбори.',
      'Збережіть карусель і поверніться до неї, коли буде потрібно.',
    ],
  },
  en: {
    introTitle: [
      '{topic}',
      '{topic}: where to start',
      'A guide to {topic}',
      'Let’s break down: {topic}',
      '{topic} — made simple',
    ],
    introBody: [
      'Swipe to the end — we gathered the essentials.',
      'A short and clear breakdown in a few slides.',
      'Save it so you can come back to it later.',
      'Everything worth knowing is on the next slides.',
      'Straight to the point, no fluff. Let’s go!',
    ],
    pointTitle: [
      'Step {n}',
      'Point {n}',
      'Idea {n}',
      'Tip {n}',
      'Key thing #{n}',
    ],
    pointBody: [
      'Start small and do it consistently — steadiness beats sudden bursts.',
      'Focus on one action at a time so you don’t spread yourself thin.',
      'Remove distractions in advance — it’s easier to keep the pace.',
      'Track your progress: even a small win keeps you motivated.',
      'Don’t chase perfection first — do it, then improve it.',
      'Plan ahead: five minutes of prep saves an hour of work.',
      'Ask yourself a simple question: does this move me toward my goal?',
      'Repeat what works and calmly drop what doesn’t.',
    ],
    outroTitle: [
      'That’s it!',
      'Your turn',
      'Save & apply',
      'Wrapping up',
    ],
    outroBody: [
      'Liked it? Give it a like, save it and share with a friend.',
      'Tell us in the comments what you’ll try first.',
      'Follow along so you don’t miss the next breakdown.',
      'Save this carousel and revisit it whenever you need.',
    ],
  },
  pl: {
    introTitle: [
      '{topic}',
      '{topic}: od czego zacząć',
      'Przewodnik: {topic}',
      'Rozkładamy na czynniki: {topic}',
      '{topic} — po prostu',
    ],
    introBody: [
      'Przewiń do końca — zebraliśmy najważniejsze rzeczy.',
      'Krótkie i jasne omówienie w kilku slajdach.',
      'Zapisz, aby wrócić do tego później.',
      'Wszystko, co warto wiedzieć, jest na kolejnych slajdach.',
      'Prosto do rzeczy, bez lania wody. Zaczynamy!',
    ],
    pointTitle: [
      'Krok {n}',
      'Punkt {n}',
      'Pomysł {n}',
      'Wskazówka {n}',
      'Co ważne #{n}',
    ],
    pointBody: [
      'Zacznij od małych kroków i rób to regularnie — stałość jest ważniejsza niż zrywy.',
      'Skup się na jednej czynności naraz, żeby się nie rozpraszać.',
      'Usuń wcześniej to, co Cię rozprasza — łatwiej utrzymać tempo.',
      'Notuj postępy: nawet mały sukces dodaje motywacji.',
      'Nie goń od razu za ideałem — najpierw zrób, potem ulepszaj.',
      'Planuj z wyprzedzeniem: pięć minut przygotowań oszczędza godzinę pracy.',
      'Zadaj sobie proste pytanie: czy to przybliża mnie do celu?',
      'Powtarzaj to, co działa, i spokojnie rezygnuj z tego, co zbędne.',
    ],
    outroTitle: [
      'Gotowe!',
      'Twój ruch',
      'Zapisz i wdrażaj',
      'Podsumowanie',
    ],
    outroBody: [
      'Podobało się? Zostaw lajka, zapisz i podziel się ze znajomymi.',
      'Napisz w komentarzu, co wypróbujesz najpierw.',
      'Obserwuj, aby nie przegapić kolejnych omówień.',
      'Zapisz tę karuzelę i wróć do niej, gdy będzie potrzebna.',
    ],
  },
}

// Deterministic pick from an array based on a seed — same seed => same result.
function pick<T>(arr: T[], seed: number): T {
  const idx = Math.abs(Math.floor(seed)) % arr.length
  return arr[idx]
}

function cleanTopic(topic: string): string {
  const t = topic.trim()
  return t.length ? t : '…'
}

function fill(template: string, topic: string, n: number): string {
  return template.replaceAll('{topic}', topic).replaceAll('{n}', String(n))
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000)
}

let idCounter = 0
export function newId(): string {
  idCounter += 1
  return `slide-${Date.now().toString(36)}-${idCounter}`
}

// Build the text of a single slide from its role, topic, language and seed.
// pointNumber is the 1-based index among point slides (used for "Step 1" etc.).
export function buildSlideText(
  role: SlideRole,
  topic: string,
  lang: Lang,
  seed: number,
  pointNumber: number,
): { title: string; body: string } {
  const bank = BANKS[lang]
  const t = cleanTopic(topic)

  if (role === 'intro') {
    return {
      title: fill(pick(bank.introTitle, seed), t, pointNumber),
      body: fill(pick(bank.introBody, seed >> 3), t, pointNumber),
    }
  }
  if (role === 'outro') {
    return {
      title: fill(pick(bank.outroTitle, seed), t, pointNumber),
      body: fill(pick(bank.outroBody, seed >> 3), t, pointNumber),
    }
  }
  // point
  return {
    title: fill(pick(bank.pointTitle, seed), t, pointNumber),
    body: fill(pick(bank.pointBody, seed >> 3), t, pointNumber),
  }
}

// Generate a whole carousel: first slide intro, last slide outro, the rest points.
export function generateCarousel(topic: string, lang: Lang, count: number): Slide[] {
  const slides: Slide[] = []
  let pointNumber = 0

  for (let i = 0; i < count; i++) {
    let role: SlideRole = 'point'
    if (i === 0) role = 'intro'
    else if (i === count - 1) role = 'outro'

    if (role === 'point') pointNumber += 1

    // Spread seeds so intro/points/outro don't all pick variant 0.
    const seed = randomSeed() + i * 101
    const text = buildSlideText(role, topic, lang, seed, pointNumber)

    slides.push({
      id: newId(),
      role,
      title: text.title,
      body: text.body,
      variantSeed: seed,
    })
  }

  return slides
}
