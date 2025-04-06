import type { mediaTypes } from "~/types/mediaTypes";

export interface mediaItem {
    'Title': string,
    'Year': string
    'imdbID': string,
    'Type': mediaTypes,
    'Poster': string,
}