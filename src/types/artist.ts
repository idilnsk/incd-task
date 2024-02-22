// Describes the structure of an artist object, including various properties.
export interface Artist {
  name: string;
  mbid: string;
  listeners: string;
  url: string;
  streamable: string;
  image_small: string; 
  image_large: string; 
}

// Represents an image object with a URL and size information.
export interface Image {
  "#text": string;
  size: string; 
}

// Represents a CSV record for an artist, including properties.
export type CsvArtistRecord = {
  name: string;
  mbid: string;
  listeners: string;
  url: string;
  streamable: string;
  image_small: string; 
  image_large: string; 
};


