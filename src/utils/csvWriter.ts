import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Artist } from '../types/artist';
import { mapArtistToCsvRecord } from '../types/mapper'; 


export const writeArtistsToCSV = async (artists: Artist[], csvFileName: string) => {
  
  const csvWriter = createCsvWriter({
    path: csvFileName,
    header: [
      { id: 'name', title: 'NAME' },
      { id: 'mbid', title: 'MBID' },
      { id: 'listeners', title: 'LISTENERS' },
      { id: 'url', title: 'URL' },
      { id: 'streamable', title: 'STREAMABLE' },
      { id: 'image_small', title: 'IMAGE_SMALL' },
      { id: 'image_large', title: 'IMAGE_LARGE' },
    ],
  });
  const records = artists.map(artist => mapArtistToCsvRecord(artist));

  console.log(JSON.stringify(records, null, 2));
  console.log('Writing artist data to CSV:', csvFileName);

  await csvWriter.writeRecords(records); // Returns a promise
};