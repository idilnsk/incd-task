
const mockArtists = [
  { name: 'Metallica' },
  { name: 'Iron Maiden' },
];

export const getRandomArtistFromJSON = jest.fn(() => {
  const randomIndex = Math.floor(Math.random() * mockArtists.length);
  return { name: mockArtists[randomIndex].name };
});


export {mockArtists };