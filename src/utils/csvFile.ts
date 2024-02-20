import { writeArtistsToCSV } from './csvWriter';

export const generateArtistCSVFile  = async (artists: any, filename?: string): Promise<string> => {
  const filenameRegex = /^[a-zA-Z0-9_.-]+$/;
  let csvFileName;

  if (filename && filenameRegex.test(filename)) {
    csvFileName = `${filename}.csv`;
  } else {
    csvFileName = 'artist-data.csv';
  }

  await writeArtistsToCSV(artists, csvFileName);
  return csvFileName;
};
