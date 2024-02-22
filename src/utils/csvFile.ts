import { writeArtistsToCSV } from './csvWriter';


// This function generates a CSV file from artist data and returns the file name.

export const generateArtistCSVFile  = async (artists: any, filename?: string): 

Promise<string> => {
// Regex to validate the provided filename.
  const filenameRegex = /^[a-zA-Z0-9_.-]+$/;
  let csvFileName;
// If a valid filename is provided, append '.csv' to it. Otherwise, use a default name.
  if (filename && filenameRegex.test(filename)) {
    csvFileName = `${filename}.csv`;
  } else {
    csvFileName = 'artist-data.csv';
  }
 // Call the function to write the artist data to a CSV file.
  await writeArtistsToCSV(artists, csvFileName);
  return csvFileName;
};
