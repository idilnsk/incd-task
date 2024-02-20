import fs from 'fs';
import { Artist } from '../types/artist';
import path from 'path';


export const getRandomArtistFromJSON = (): Artist | null => {
  const ARTISTS_FILE = path.join(__dirname, '../../artists.json'); 
    try {
      console.log('Reading artists from:', ARTISTS_FILE);
      const fileData = fs.readFileSync(ARTISTS_FILE, 'utf-8');
      const artists: Artist[] = JSON.parse(fileData);
      const randomIndex = Math.floor(Math.random() * artists.length);
      return artists[randomIndex];
    } catch (error) {
      console.error('Failed to read random artists file:', error);
      return null;
    }
  };