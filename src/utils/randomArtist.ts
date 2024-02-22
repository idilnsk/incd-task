import fs from 'fs';
import { Artist } from '../types/artist';
import path from 'path';


export const getRandomArtistFromJSON = (): Artist | null => {
  const ARTISTS_FILE = path.join(__dirname, '../../artists.json'); 
    try {
      console.log('Reading artists from:', ARTISTS_FILE);
    // Read the content of the JSON file synchronously.
      const fileData = fs.readFileSync(ARTISTS_FILE, 'utf-8');
    // Parse the JSON file content into an array of Artist objects.
      const artists: Artist[] = JSON.parse(fileData);
    // Generate a random index based on the length of the artists array.
      const randomIndex = Math.floor(Math.random() * artists.length);
      return artists[randomIndex];
    } catch (error) {
      console.error('Failed to read random artists file:', error);
      return null;
    }
  };