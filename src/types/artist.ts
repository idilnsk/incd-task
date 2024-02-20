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
  image: string; // URL of the image, you might choose one size
};

export interface IArtistData {
  results: {
    artistmatches: {
      artist: Artist[]
    }
  }
}
