export interface Artist {
  name: string;
  mbid: string;
  listeners: string;
  url: string;
  streamable: string;
  image: Image[];
}

export interface Image {
  "#text": string;
  size: string; // 'small', 'medium', 'large', 'extralarge'
}

export type CsvArtistRecord = {
  name: string;
  mbid: string;
  listeners: string;
  url: string;
  streamable: string;
  image_small: string; // URL of the small image
  image_large: string; // URL of the large image
};


export interface IArtistData {
  results: {
    artistmatches: {
      artist: Artist[]
    }
  }
}
