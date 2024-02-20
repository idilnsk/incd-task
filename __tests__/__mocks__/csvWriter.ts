// __mocks__/src/utils/csvWriter.ts
const writeArtistsToCSV = jest.fn().mockResolvedValue(undefined);

module.exports = { writeArtistsToCSV };

export { writeArtistsToCSV };