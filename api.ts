export interface Corpus {
  id: number;
  name: string;
  description: string | null;
  unique_symbols: number;
  size: number;
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