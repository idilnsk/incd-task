import fs from 'fs';
import supertest from 'supertest';
import app from "../src/App";
import { writeArtistsToCSV } from '../src/utils/csvWriter';
import axios from 'axios';
import * as randomArtistModule from '../src/utils/randomArtist';

jest.mock('axios');
// Mocking fs
jest.mock('fs');
// Manually telling Jest to use the mock for lastfmService
jest.mock('../src/services/lastfmService', () => require('./__mocks__/lastfmService'));
// Manually telling Jest to use the mock for csvWriter
jest.mock('../src/utils/csvWriter', () => require('./__mocks__/csvWriter'));
jest.mock('../src/utils/randomArtist',()=>require('./__mocks__/randomArtist'));

const request = supertest(app);


describe(`GET /api/artists`, () => {
  beforeEach(() => {
    jest.resetModules(); 
    jest.restoreAllMocks(); 
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        results: {
          artistmatches: {
            artist: [{
              name: 'Adele',
              mbid: 'some-mbid',
              listeners: '1234567',
              url: 'http://www.last.fm/music/Adele',
              image: [{
                "#text": "http://image.com/adele.jpg",
                size: 'large'
              }]
            }]
          }
        }
      }
    });
  });

  it('should use the provided filename for CSV writing', async () => {
    const artistName = 'Adele';
    const customFilename = 'custom_filename';
  
    const response = await request.get(`/api/artists?artistName=${artistName}&filename=${customFilename}`);
    expect(response.statusCode).toEqual(200);
  
    expect(writeArtistsToCSV).toHaveBeenCalledWith(
      expect.any(Array),
      expect.stringContaining(`${customFilename}.csv`)
    );
  });
  
  
  it('should use the default filename when no filename is provided', async () => {
    const artistName='Adele'; 
    const response = await request.get(`/api/artists?artistName=${artistName}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('success', true); // Check for the success property
    expect(response.body).toHaveProperty('statusCode', 200);
    expect(response.body).toHaveProperty('artist');
    
    expect(writeArtistsToCSV).toHaveBeenCalledWith(
      expect.any(Array),
      expect.stringContaining(`artist-data.csv`)
      );
    });
    
    
    it('should return a random artist and write to specified CSV when no artist is found', async () => {
      const getRandomArtistSpy = jest.spyOn(randomArtistModule, 'getRandomArtistFromJSON');
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          results: {
            artistmatches: {
              artist: [] 
            }
          }
        }       
      });

      const artistName='asdfds'; 
      const customFilename = 'custom_filename';
      const response = await request.get(`/api/artists?artistName=${artistName}&filename=${customFilename}`);
    expect(response.statusCode).toBe(200);

    
    expect(response.body.message).toBe('Random artist data written to CSV');
    expect(getRandomArtistSpy).toHaveBeenCalled();
    const randomArtistName = getRandomArtistSpy.mock.results[0].value.name;


    expect(writeArtistsToCSV).toHaveBeenCalledWith(
      [{ name: randomArtistName  }],  // The artist returned by getRandomArtistFromJSON
      expect.stringContaining(customFilename)
    );
  });
  });
  it('should return a random artist and write to default CSV when no artist is found', async () => {
    const artistName = 'asdfds';
  
    const response = await request.get(`/api/artists?artistName=${artistName}`);
    expect(response.statusCode).toEqual(200);
  
    expect(writeArtistsToCSV).toHaveBeenCalledWith(
      expect.any(Array),
      expect.stringContaining(`artist-data.csv`)
    );
  });

  

  it('should return a message when no artist name is provided', async () => {
    console.log("Test started:display a message to enter an artist name");
    const response = await request.get('/api/artists/');
    expect(response.status).toBe(400); // Expect a 400 Bad Request status
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Please include an "artistName" query parameter');
    // Add additional assertions as needed
  });

  it('should handle errors gracefully', async () => {
    console.log("Test started:error is handled");
    const response = await request.get('/api/artists/');
    expect(response.statusCode).toEqual(400);

  });
