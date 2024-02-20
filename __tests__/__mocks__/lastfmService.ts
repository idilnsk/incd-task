
/**
 * Mock for searchArtistByName function.
 * 
 * This mock is used to simulate the behavior of the searchArtistByName function without 
 * actually making calls to the Last.fm API. It helps in isolating the controller logic 
 * for unit testing by providing controlled responses based on the input.

**/

const searchArtistByName = jest.fn(async (artistName) => {
  const lowerCaseArtistName = artistName.toLowerCase();

  if (lowerCaseArtistName === 'adele') {
    return {
      results: {
        artistmatches: {
          artist: [{ name: 'Adele', listeners: '1234567' }]
        }
      }
    };
  } else {
    return { artistFound: false, artist: [] };
  }
});

export { searchArtistByName };
