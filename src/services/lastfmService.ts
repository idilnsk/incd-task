import axios from 'axios';
import { HttpError } from '../utils/HttpError';
import { mapArtistToCsvRecord } from '../types/mapper';
import { Artist  } from '../types/artist';

const LASTFM_API_KEY = process.env.LASTFM_API_KEY || '';
const BASE_URL = `https://ws.audioscrobbler.com/2.0/?api_key=${LASTFM_API_KEY}&format=json&method=artist.search`;

export const searchArtistByName = async (artistName: string) => {
  const searchUrl = `${BASE_URL}&artist=${encodeURIComponent(artistName)}`;
  
  try {
    const response = await axios.get(searchUrl);
    const artistMatches = response.data.results?.artistmatches?.artist;

    if (artistMatches && artistMatches.length > 0) {
      const artists = artistMatches.map((artist: Artist) => mapArtistToCsvRecord(artist));  
      return { artistFound: true, artist: artists };
    } else {
      return { artistFound: false, artist: [] };
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new HttpError('Last.fm API error', 500);
    } else {
      throw new HttpError('Internal server error', 500);
    }
  }
};
