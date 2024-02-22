import { Artist, CsvArtistRecord } from "./artist";

// Transforms an artist object into a CSV record format, ensuring each field has a default value if the original artist object lacks certain properties.

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
