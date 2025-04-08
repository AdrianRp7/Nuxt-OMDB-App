import type { mediaTypes } from "~/types/mediaTypes"

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
    Response: string,
    views?: number
}

export interface Rating {
    Source: string
    Value: string
}