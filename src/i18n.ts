import type { Lang } from './types'

// Interface (UI) translations. Separate from carousel content language.
export interface UIStrings {
  appTitle: string
  appSubtitle: string
  topicLabel: string
  topicPlaceholder: string
  slidesCountLabel: string
  uiLangLabel: string
  contentLangLabel: string
  accentColorLabel: string
  createButton: string
  regenerateAllButton: string
  downloadAllHint: string
  emptyTitle: string
  emptyText: string
  slideWord: string
  regenerate: string
  download: string
  deleteSlide: string
  addSlide: string
  moveLeft: string
  moveRight: string
  editHint: string
  titlePlaceholder: string
  bodyPlaceholder: string
  ofWord: string
  topicRequired: string
  footer: string
}

export const UI: Record<Lang, UIStrings> = {
  ru: {
    appTitle: 'Мастер каруселей',
    appSubtitle: 'Создавайте красивые Instagram-карусели за пару минут',
    topicLabel: 'Тема карусели',
    topicPlaceholder: 'Например: 5 привычек для продуктивного утра',
    slidesCountLabel: 'Количество слайдов',
    uiLangLabel: 'Язык интерфейса',
    contentLangLabel: 'Язык карусели',
    accentColorLabel: 'Акцентный цвет',
    createButton: 'Создать карусель',
    regenerateAllButton: 'Перегенерировать всё',
    downloadAllHint: 'Скачивайте каждый слайд отдельной кнопкой ниже',
    emptyTitle: 'Пока ничего нет',
    emptyText: 'Введите тему, выберите количество слайдов и нажмите «Создать карусель».',
    slideWord: 'Слайд',
    regenerate: 'Перегенерировать',
    download: 'Скачать PNG',
    deleteSlide: 'Удалить слайд',
    addSlide: 'Добавить слайд',
    moveLeft: 'Влево',
    moveRight: 'Вправо',
    editHint: 'Нажмите на текст, чтобы отредактировать',
    titlePlaceholder: 'Заголовок слайда',
    bodyPlaceholder: 'Текст слайда',
    ofWord: 'из',
    topicRequired: 'Пожалуйста, введите тему карусели',
    footer: 'Работает офлайн. Без внешних AI-сервисов.',
  },
  uk: {
    appTitle: 'Майстер каруселей',
    appSubtitle: 'Створюйте гарні Instagram-каруселі за кілька хвилин',
    topicLabel: 'Тема каруселі',
    topicPlaceholder: 'Наприклад: 5 звичок для продуктивного ранку',
    slidesCountLabel: 'Кількість слайдів',
    uiLangLabel: 'Мова інтерфейсу',
    contentLangLabel: 'Мова каруселі',
    accentColorLabel: 'Акцентний колір',
    createButton: 'Створити карусель',
    regenerateAllButton: 'Перегенерувати все',
    downloadAllHint: 'Завантажуйте кожен слайд окремою кнопкою нижче',
    emptyTitle: 'Поки що нічого немає',
    emptyText: 'Введіть тему, оберіть кількість слайдів і натисніть «Створити карусель».',
    slideWord: 'Слайд',
    regenerate: 'Перегенерувати',
    download: 'Завантажити PNG',
    deleteSlide: 'Видалити слайд',
    addSlide: 'Додати слайд',
    moveLeft: 'Вліво',
    moveRight: 'Вправо',
    editHint: 'Натисніть на текст, щоб відредагувати',
    titlePlaceholder: 'Заголовок слайда',
    bodyPlaceholder: 'Текст слайда',
    ofWord: 'з',
    topicRequired: 'Будь ласка, введіть тему каруселі',
    footer: 'Працює офлайн. Без зовнішніх AI-сервісів.',
  },
  en: {
    appTitle: 'Carousel Master',
    appSubtitle: 'Create beautiful Instagram carousels in minutes',
    topicLabel: 'Carousel topic',
    topicPlaceholder: 'For example: 5 habits for a productive morning',
    slidesCountLabel: 'Number of slides',
    uiLangLabel: 'Interface language',
    contentLangLabel: 'Carousel language',
    accentColorLabel: 'Accent color',
    createButton: 'Create carousel',
    regenerateAllButton: 'Regenerate all',
    downloadAllHint: 'Download each slide with its own button below',
    emptyTitle: 'Nothing here yet',
    emptyText: 'Enter a topic, pick the number of slides and press “Create carousel”.',
    slideWord: 'Slide',
    regenerate: 'Regenerate',
    download: 'Download PNG',
    deleteSlide: 'Delete slide',
    addSlide: 'Add slide',
    moveLeft: 'Left',
    moveRight: 'Right',
    editHint: 'Click the text to edit it',
    titlePlaceholder: 'Slide title',
    bodyPlaceholder: 'Slide text',
    ofWord: 'of',
    topicRequired: 'Please enter a carousel topic',
    footer: 'Works offline. No external AI services.',
  },
  pl: {
    appTitle: 'Mistrz karuzeli',
    appSubtitle: 'Twórz piękne karuzele na Instagram w kilka minut',
    topicLabel: 'Temat karuzeli',
    topicPlaceholder: 'Na przykład: 5 nawyków na produktywny poranek',
    slidesCountLabel: 'Liczba slajdów',
    uiLangLabel: 'Język interfejsu',
    contentLangLabel: 'Język karuzeli',
    accentColorLabel: 'Kolor akcentu',
    createButton: 'Utwórz karuzelę',
    regenerateAllButton: 'Wygeneruj wszystko od nowa',
    downloadAllHint: 'Pobieraj każdy slajd osobnym przyciskiem poniżej',
    emptyTitle: 'Jeszcze nic tu nie ma',
    emptyText: 'Wpisz temat, wybierz liczbę slajdów i naciśnij „Utwórz karuzelę”.',
    slideWord: 'Slajd',
    regenerate: 'Wygeneruj ponownie',
    download: 'Pobierz PNG',
    deleteSlide: 'Usuń slajd',
    addSlide: 'Dodaj slajd',
    moveLeft: 'W lewo',
    moveRight: 'W prawo',
    editHint: 'Kliknij tekst, aby go edytować',
    titlePlaceholder: 'Tytuł slajdu',
    bodyPlaceholder: 'Tekst slajdu',
    ofWord: 'z',
    topicRequired: 'Proszę wpisać temat karuzeli',
    footer: 'Działa offline. Bez zewnętrznych usług AI.',
  },
}
