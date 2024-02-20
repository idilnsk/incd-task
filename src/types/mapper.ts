import { Artist, CsvArtistRecord } from "./artist";

export const mapArtistToCsvRecord = (artist: Artist): CsvArtistRecord => {
  return {
    name: artist.name,
    mbid: artist.mbid || '',
    listeners: artist.listeners || '',
    url: artist.url,
    streamable: artist.streamable || '',
    image_small: artist.image_small || '',
    image_large: artist.image_large || '',
  };
};
