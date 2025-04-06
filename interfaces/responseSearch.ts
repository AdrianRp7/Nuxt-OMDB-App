import type { mediaItem } from "./mediaItem";

export interface responseSearch {
    Search: mediaItem[],
    totalResults: string,
    Response: string, //It is a boolean string
}

export interface responseSearchError {
    Response: string,
    Error: string
}