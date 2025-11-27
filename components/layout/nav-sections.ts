import * as Icons from 'lucide-react';

export const navSections = [
  {
    id: 'site',
    title: 'Сайт',
    icon: Icons.Map,
    items: [
      {
        title: 'Главная',
        href: '/',
        icon: Icons.Home,
      },
      {
        title: 'Сравнить раскладки',
        href: '/compare-layouts',
        icon: Icons.Columns2,
      }
    ]
  },
  {
    id: 'database',
    title: 'База данных',
    icon: Icons.Database,
    items: [
      {
        title: 'Корпуса',
        href: '/corpora',
        icon: Icons.BookText,
      },
      {
        title: 'Клавиатуры',
        href: '/keyboards',
        icon: Icons.Keyboard,
      },
      {
        title: 'Раскладки',
        href: '/layouts',
        icon: Icons.Layers2,
      },
      {
        title: 'Метрики',
        href: '/metrics',
        icon: Icons.BarChart3,
      },
    ],
  },
  {
    id: 'topics',
    title: 'Статьи',
    icon: Icons.BookOpen,
    items: [
      {
        title: 'Другие раскладки',
        href: '/topics/about',
        icon: Icons.Info,
      },
      {
        title: 'Лучшие раскладки',
        href: '/topics/best-layouts',
        icon: Icons.BookOpen,
      },
      {
        title: 'Программы',
        href: '/topics/programs',
        icon: Icons.BookOpen,
      },
    ],
  },
  {
    id: 'reference',
    title: 'Справка',
    icon: Icons.Bookmark,
    items: [
      {
        title: 'О метриках',
        href: '/reference/about-metrics',
        icon: Icons.BookOpen,
      },
      {
        title: 'Дистанция рук',
        href: '/reference/hand-distance',
        icon: Icons.BookOpen,
      },
      {
        title: 'Использование пальцев',
        href: '/reference/finger-usage',
        icon: Icons.BookOpen,
      },
      {
        title: 'Использование рядов',
        href: '/reference/row-usage',
        icon: Icons.BookOpen,
      },
      {
        title: 'Биграммные метрики',
        href: '/reference/bigram-metrics',
        icon: Icons.BookOpen,
      },
      {
        title: 'Триграммные метрики',
        href: '/reference/trigram-metrics',
        icon: Icons.BookOpen,
      },
    ]
  }
];

export default navSections;
