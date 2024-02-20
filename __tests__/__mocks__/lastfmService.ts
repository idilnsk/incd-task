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
