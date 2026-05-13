from fastapi import APIRouter
from datetime import date

router = APIRouter()

SITE = {
    'domain': 'tazy.pro',
    'org': 'ОО «Найза»',
    'mission': 'Национальная цифровая платформа породы тазы: реестр, доказательная база, защита и продвижение породы внутри Казахстана и в мире.',
    'launch_date': '2026-05-17',
    'day_of_tazy': '2026-09-03',
    'languages': ['kk', 'ru', 'en'],
    'contacts': {'email': 'admin@tazy.pro', 'org': 'ОО «Найза»', 'country': 'Kazakhstan'},
}

TIMELINE = [
    {'date': '2026-05-17', 'title': 'Запуск платформы TAZY.PRO', 'kind': 'launch',
     'description': 'Публичный запуск национальной платформы породы тазы: реестр, доказательная база, открытые данные.'},
    {'date': '2026-09-03', 'title': 'День Тазы', 'kind': 'holiday',
     'description': 'Национальный день породы тазы. Полевые мероприятия, выставки, церемонии регистрации в реестре.'},
]

PILLARS = [
    {'code': 'registry', 'title': 'Национальный реестр тазы',
     'description': 'Единый реестр собак, владельцев и питомников с верифицируемыми записями о происхождении и здоровье.'},
    {'code': 'evidence', 'title': 'Доказательная база породы',
     'description': 'Родословные, ДНК-профили, ветеринарные записи, полевые испытания — пригодные для подачи в FCI.'},
    {'code': 'fci', 'title': 'Подготовка к признанию FCI',
     'description': 'Сбор и систематизация данных популяции, генетики и стандартов под международные требования.'},
    {'code': 'media', 'title': 'Медиапроекты',
     'description': 'Спецпроекты на крупных казахстанских и российских медиа о породе тазы, её истории и современности.'},
    {'code': 'community', 'title': 'Сообщество и культура',
     'description': 'Заводчики, охотники, кинологи, краеведы и музеи — единая среда для людей вокруг породы.'},
]

MEDIA_PROJECTS = [
    {'partner': 'Tengrinews', 'country': 'KZ', 'format': 'спецпроект', 'status': 'planned'},
    {'partner': 'Informburo', 'country': 'KZ', 'format': 'лонгрид', 'status': 'planned'},
    {'partner': 'Qazaqstan TV', 'country': 'KZ', 'format': 'документальный цикл', 'status': 'planned'},
    {'partner': 'РИА Новости', 'country': 'RU', 'format': 'фотопроект', 'status': 'planned'},
    {'partner': 'ТАСС', 'country': 'RU', 'format': 'спецпроект', 'status': 'planned'},
    {'partner': 'Коммерсантъ', 'country': 'RU', 'format': 'очерк', 'status': 'planned'},
]

STATS = {
    'dogs_registered': 0,
    'breeders': 0,
    'owners': 0,
    'pedigrees': 0,
    'evidence_records': 0,
    'updated_at': date.today().isoformat(),
}

@router.get('/')
async def public_root():
    return {'site': SITE, 'pillars': PILLARS}

@router.get('/site')
async def site():
    return SITE

@router.get('/timeline')
async def timeline():
    return {'items': TIMELINE}

@router.get('/pillars')
async def pillars():
    return {'items': PILLARS}

@router.get('/media-projects')
async def media_projects():
    return {'items': MEDIA_PROJECTS}

@router.get('/stats')
async def stats():
    return STATS

@router.get('/manifesto')
async def manifesto():
    return {
        'title': 'Манифест породы тазы',
        'paragraphs': [
            'Тазы — древняя казахская борзая, неотделимая от истории степи, охоты и быта народа.',
            'Сегодня порода нуждается в системной защите: реестре, генетике, стандартах, признании.',
            'TAZY.PRO — национальная цифровая инфраструктура для этой работы. Прозрачная, проверяемая, открытая.',
            'Платформа строится ОО «Найза» вместе с заводчиками, охотниками, учёными и государством.',
        ],
    }
