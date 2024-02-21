# Node.js Music Artist Search API

This is a Node.js REST API application that allows users to search for music artists by name and writes the search results to a CSV file. If no results are found, the application retrieves artist names from a predefined JSON dictionary and repeats the search.
Features

● Search for artists by name using the artist.search endpoint.
●Write search results to a user-specified CSV file.
●CSV includes artist name, MusicBrainz Identifier (mbid), URL, and images.
●Fallback to a JSON dictionary of artist names if the search yields no results.


# Installation

To install the application, follow these steps:

    Clone the repository: git clone https://github.com/idilnsk/incd-task.git

Navigate to the application directory:

    cd incd-task

Install the required packages:

    npm install

To run the application, execute:

    npm start

# Using the API

After launching the application, you can utilize the API to perform artist searches by name and  export the results to a CSV file. The API offers a straightforward endpoint for this functionality:

Search for Artists and  Export to CSV

Endpoint: GET /api/artists
Parameters:
    ● artistName: The name of the artist you wish to search for.
    ● filename: (Optional) The name of the CSV file where you want to save the search results. If not provided, the  aritst will be saved in default artist-data.csv file.
    Usage:
    ● To search for an artist, provide their name as the artistName parameter.
    ● Add the filename parameter with your desired CSV file name.

#  Search for an Artist and Export to CSV:

To search for "Adele" and export the results to a CSV file named "pop.csv", use the URL: http://localhost:3000/api/artists?artistName=adele&filename=pop
