interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: number | null;
}

export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  rating: Rating;
  image: Image | null;
  summary: string | null;
  status: 'Running' | 'Ended';
}
