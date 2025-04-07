import type { mediaTypes } from "~/types/mediaTypes"

// {
//     "Title": "The Avengers",
//     "Year": "2012",
//     "Rated": "PG-13",
//     "Released": "04 May 2012",
//     "Runtime": "143 min",
//     "Genre": "Action, Sci-Fi",
//     "Director": "Joss Whedon",
//     "Writer": "Joss Whedon, Zak Penn",
//     "Actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
//     "Plot": "Loki, the adopted brother of Thor, teams-up with the Chitauri Army and uses the Tesseract's power to travel from Asgard to Midgard to plot the invasion of Earth and become a king. The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining Tony Stark a.k.a. the Iron Man; Steve Rogers, a.k.a. Captain America; Bruce Banner, a.k.a. The Hulk; Thor; Natasha Romanoff, a.k.a. Black Widow; and Clint Barton, a.k.a. Hawkeye, to save the world from the powerful Loki and the alien invasion.",
//     "Language": "English, Russian",
//     "Country": "United States",
//     "Awards": "Nominated for 1 Oscar. 39 wins & 81 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg",
//     "Ratings": [
//       {
//         "Source": "Internet Movie Database",
//         "Value": "8.0/10"
//       },
//       {
//         "Source": "Rotten Tomatoes",
//         "Value": "91%"
//       },
//       {
//         "Source": "Metacritic",
//         "Value": "69/100"
//       }
//     ],
//     "Metascore": "69",
//     "imdbRating": "8.0",
//     "imdbVotes": "1,500,024",
//     "imdbID": "tt0848228",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "$623,357,910",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
//   }

export interface responseDescription {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: Rating[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: mediaTypes
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

export interface Rating {
    Source: string
    Value: string
}