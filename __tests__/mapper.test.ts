import { mapArtistToCsvRecord } from '../src/types/mapper'; 
import { Artist,CsvArtistRecord } from '../src/types/artist'; 

describe('mapArtistToCsvRecord function with mock data', () => {
  const mockArtists: Artist[] = [
    {
      name: 'Artist Name',
      mbid: 'some_mbid',
      listeners: '1234567',
      url: 'https://www.last.fm/music/Artist+Name',
      streamable: '3',
      image: [
        { '#text': 'small_image_url', size: 'small' },
        { '#text': 'large_image_url', size: 'large' },
      ],
    },

  ];

  mockArtists.forEach(mockArtist => {
    it(`should map the artist ${mockArtist.name} to a CsvArtistRecord object`, () => {
      const expectedRecord: CsvArtistRecord = {
        name: mockArtist.name,
        mbid: mockArtist.mbid,
        listeners: mockArtist.listeners,
        url: mockArtist.url,
        streamable:mockArtist.streamable,
        image_small: mockArtist.image.find(img => img.size === 'small')?.['#text'] || '',
        image_large: mockArtist.image.find(img => img.size === 'large')?.['#text'] || '',
      };

      const csvRecord = mapArtistToCsvRecord(mockArtist);
      console.log('CsvRecord:', csvRecord); 

      expect(csvRecord).toEqual(expectedRecord);
    });
  });
});
