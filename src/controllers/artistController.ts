import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import { writeArtistsToCSV } from '../../src/utils/csvWriter';
import { getRandomArtistFromJSON } from '../../src/utils/randomArtist';
import { searchArtistByName } from '../services/lastfmService';
import { generateArtistCSVFile  } from '../utils/csvFile';

class ArtistController {
  async handleArtistSearchRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const artistName = req.query.artistName as string;
      if (!artistName || artistName.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Please include an "artistName" query parameter'
        });
      }

      const result = await searchArtistByName(artistName);
      let artistData = result.artist;

      if (!result.artistFound || artistData.length === 0) {
        const randomArtist = getRandomArtistFromJSON();
        if (!randomArtist) {
          throw new HttpError('Failed to fetch a random artist', 500);
        }
        artistData = [randomArtist];
      }

      const csvFileName = generateArtistCSVFile (artistData, req.query.filename as string);
      console.log('CSV File Name:', csvFileName);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Random artist data written to CSV",
        csvFileName: csvFileName,
        artist: artistData
      });

    } catch (error: any) {
      next(error);
    }
  }
}

export default new ArtistController();
