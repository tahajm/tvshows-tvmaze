interface Image {
  medium: string;
  original: string;
}

interface Rating {
  average: number | null;
}

interface Resolution {
  url: string;
  width: number;
  height: number;
}

interface ImageFull {
  id: number;
  type: 'poster' | 'background';
  resolutions: {
    original: Resolution;
    medium: Resolution;
  };
}

export interface Cast {
  person: {
    id: number;
    name: string;
    image?: Image;
  };
  character: {
    id: number;
    name: string;
    image?: Image;
  };
}
export interface Episode {
  id: number;
  name: string;
  airdate: string;
  runtime: number;
  rating: Rating;
  image: Image;
  summary: string;
  season: number;
  number: number;
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
  averageRuntime: number;
  network: {
    name: string;
  };
  _embedded?: {
    episodes?: Episode[];
    cast?: Cast[];
    images?: ImageFull[];
  };
}
