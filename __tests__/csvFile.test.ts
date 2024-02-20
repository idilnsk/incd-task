import { generateArtistCSVFile } from '../src/utils/csvFile';
import { writeArtistsToCSV } from '../src/utils/csvWriter';

jest.mock('../src/utils/csvWriter', () => ({
  writeArtistsToCSV: jest.fn(),
}));

describe('generateArtistCSVFile', () => {
  // Test case for custom filename
  it('should generate a CSV file with a custom filename', async () => {
    const artists = [{ name: 'Artist1' }, { name: 'Artist2' }];
    const filename = 'custom_filename';

    const generatedFilename = await generateArtistCSVFile(artists, filename);

    expect(generatedFilename).toEqual(`${filename}.csv`);
    expect(writeArtistsToCSV).toHaveBeenCalledWith(artists, `${filename}.csv`);
  });

  // Test case for default filename
  it('should generate a CSV file with a default filename when no filename is provided', async () => {
    const artists = [{ name: 'Artist1' }, { name: 'Artist2' }];

    const generatedFilename = await generateArtistCSVFile(artists);

    expect(generatedFilename).toEqual('artist-data.csv');
    expect(writeArtistsToCSV).toHaveBeenCalledWith(artists, 'artist-data.csv');
  });
});
