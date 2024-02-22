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

      const result = await searchArtistByName(artistName);   // Searches for an artist by name via LastFM api
      let artistData = result.artist;
      let message;

      if (!result.artistFound || artistData.length === 0) { // If there's no artist result,
        const randomArtist = getRandomArtistFromJSON();     // Gets a random artist.
        if (!randomArtist) {
          throw new HttpError('Failed to fetch a random artist', 500);
        }
        artistData = [randomArtist];
        message = "Random artist data written to CSV";
      } else {
        message = "Artist data written to CSV";
      }

      const csvFileName = await  generateArtistCSVFile (artistData, req.query.filename as string); // Creates a CSV file with the artist data.
      console.log('CSV File Name:', csvFileName);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: message,
        csvFileName: csvFileName, // Sends the generated CSV file name in the response.
        artist: artistData        // Sends the artist data in the response.
      });

    } catch (error: any) {
      next(error); // Passes any caught error to the next error handling middleware.
    }
  }
}

export default new ArtistController();

