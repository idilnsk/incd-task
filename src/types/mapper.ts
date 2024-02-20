import { CsvArtistRecord } from "./csvArtistRecord";
import { Artist } from "./artist";

export const mapArtistToCsvRecord = (artist: Artist): CsvArtistRecord => {
  const smallImageUrl = artist.image.find(img => img.size === 'small')?.["#text"] || '';
  const largeImageUrl = artist.image.find(img => img.size === 'large')?.["#text"] || '';

  return {
    name: artist.name,
    mbid: artist.mbid || '',
    listeners: artist.listeners || '',
    url: artist.url,
    streamable: artist.streamable || '',
    image_small: smallImageUrl,
    image_large: largeImageUrl,
  };
};
