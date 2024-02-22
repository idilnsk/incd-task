import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Artist } from '../types/artist';
import { mapArtistToCsvRecord } from '../types/mapper'; 
import path from 'path';

// This function writes artist data to a CSV file. It takes an array of Artist objects and a CSV file name as input.

export const writeArtistsToCSV = async (artists: Artist[], csvFileName: string) => {
  // Resolve the file path for the CSV file using the given file name
  const filePath = path.resolve(__dirname, '..', '..', 'artistData', csvFileName);    console.log(`About to write artists to CSV at path: ${filePath}`);
  // Create a CSV writer with the specified file path and headers.
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
  // Define the headers for the CSV file.
      { id: 'name', title: 'NAME' },
      { id: 'mbid', title: 'MBID' },
      { id: 'listeners', title: 'LISTENERS' },
      { id: 'url', title: 'URL' },
      { id: 'streamable', title: 'STREAMABLE' },
      { id: 'image_small', title: 'IMAGE_SMALL' },
      { id: 'image_large', title: 'IMAGE_LARGE' },
    ],
  });

  // Apply transformation to each artist object to convert into a CSV record format.
  const records = artists.map(artist => mapArtistToCsvRecord(artist));

  console.log(JSON.stringify(records, null, 2));
  console.log('Writing artist data to CSV:', csvFileName);

  await csvWriter.writeRecords(records);
};