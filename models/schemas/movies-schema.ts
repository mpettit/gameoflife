import { MovieSearchResult } from '../movie/movie-search-result';

export interface MoviesSchema extends MovieSearchResult {
    timeAddedAt: string;
}
