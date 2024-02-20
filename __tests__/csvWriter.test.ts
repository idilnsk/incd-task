import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { writeArtistsToCSV } from '../src/utils/csvWriter';
import { Artist } from '../src/types/artist';

const testOutputDir = path.join(__dirname, 'test_output');
const testFilePath = path.join(testOutputDir, 'test_artists.csv');



function generateArtists(numberOfArtists: number): Artist[] {
    return Array.from({ length: numberOfArtists }, (_, i) => ({
        name: `Artist ${i + 1}`,
        mbid: `mbid-${i + 1}`,
        listeners: `Listeners ${i + 1}`, 
        url: `http://example.com/artist${i + 1}`,
        streamable: i % 2 === 0 ? '1' : '0', 
        image: [{ // Ensuring that 'image' is an array of 'Image' type
            "#text": `http://image.com/artist${i + 1}.jpg`,
            size: 'large'
          }],
    }));
}

beforeEach(() => {
    if (!fs.existsSync(testOutputDir)) {
        fs.mkdirSync(testOutputDir);
    }
});

afterEach(() => {
    if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
    }
});



describe('writeArtistsToCSV', () => {
    it('should write artist data to a CSV file and verify content with CSV parsing', async () => {
        const artists = generateArtists(2); // Dynamically generate two artists
   
        
        await writeArtistsToCSV(artists, testFilePath);

        // Check that the file was created
        expect(fs.existsSync(testFilePath)).toBe(true);

        // Prepare to parse the CSV file and collect the records
        await new Promise<void>((resolve, reject) => {
            const results: any[] = [];
            fs.createReadStream(testFilePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    console.log(results); 
                    try {
                      expect(results.length).toBe(artists.length);
                      artists.forEach(artist => {
                        expect(results).toEqual(
                          expect.arrayContaining([
                            expect.objectContaining({
                              NAME: artist.name,// Expect the original case as received
                              MBID: artist.mbid,
                              LISTENERS:artist.listeners,
                              URL: artist.url,
                              STREAMABLE:artist.streamable,
                              IMAGE_SMALL: artist.image.find(img => img.size === 'small')?.['#text'] ?? '',
                              IMAGE_LARGE: artist.image.find(img => img.size === 'large')?.['#text'] ?? '',
                            })
                          ])
                        );
                      });
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', reject);
        });
    });
});