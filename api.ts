export interface Corpus {
  id: number;
  name: string;
  description: string | null;
  unique_symbols: number;
  size: number;
  language: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Layout {
  id: number;
  name: string;
  description: string | null;
  language: string;
  layout_model: string; // URL к файлу
}

export interface LayoutPreview {
  id: number;
  keyboard: number; // ID клавиатуры
  layout: number; // ID раскладки
  layout_preview: string; // URL к изображению
}

export interface LayoutWithPreviews extends Layout {
  previews?: LayoutPreview[];
}

export interface Keyboard {
  id: number;
  name: string;
  description: string | null;
  form_factor: string;
  keys: number;
  rows: number;
  keyboard_model: string; // URL к файлу
  keyboard_preview: string; // URL к изображению
}

// ... существующие типы ...
export interface FilterState {
  corpus: string; // 'all' или ID корпуса
  keyboard: string; // 'all' или ID клавиатуры
}

export interface Metric {
  id: number;
  corpus: number; // ID корпуса
  keyboard: number; // ID клавиатуры
  layout: number; // ID раскладки
  frequency_heatmap: string; // URL к изображению

  // Основные метрики для отображения в карточке
  travel_distance: number;
  
  // Использование пальцев (%)
  finger_usage_1: number;
  finger_usage_2: number;
  finger_usage_3: number;
  finger_usage_4: number;
  finger_usage_5: number;
  finger_usage_6: number;
  finger_usage_7: number;
  finger_usage_8: number;
  finger_usage_9: number;
  finger_usage_10: number;

  // Использование рядов (%)
  row_usage_k: number;
  row_usage_e: number;
  row_usage_d: number;
  row_usage_c: number;
  row_usage_b: number;
  row_usage_a: number;

  // SFB и SFS
  same_finger_bigram_frequency: number;
  same_finger_skipgram_frequency: number;

  // Ножницы
  half_scissor_bigram_frequency: number;
  full_scissor_bigram_frequency: number;

  // Триграммы
  roll_frequency: number;
  alternate_frequency: number;
  onehand_frequency: number;
  redirect_frequency: number;

  // Остальные поля для полноты API
  travel_distance_finger_1: number;
  travel_distance_finger_2: number;
  travel_distance_finger_3: number;
  travel_distance_finger_4: number;
  travel_distance_finger_5: number;
  travel_distance_finger_6: number;
  travel_distance_finger_7: number;
  travel_distance_finger_8: number;
  travel_distance_finger_9: number;
  travel_distance_finger_10: number;
  same_finger_bigram_mean_distance: number;
  same_finger_skipgram_mean_distance: number;
  half_scissor_skipgram_frequency: number;
  full_scissor_skipgram_frequency: number;
  lateral_stretch_bigram_frequency: number;
  lateral_stretch_skipgram_frequency: number;
}

// Расширенный интерфейс с связанными объектами
export interface MetricWithRelations extends Metric {
  corpus_name?: string;
  keyboard_name?: string;
  layout_name?: string;
}

export interface MetricColumn {
  id: keyof Metric | 'layout_name' | 'keyboard_name' | 'corpus_name';
  label: string;
  isVisible: boolean;
  isNumeric: boolean;
}

export interface SortState {
  column: keyof Metric | 'layout_name' | 'keyboard_name' | 'corpus_name';
  direction: 'asc' | 'desc';
}