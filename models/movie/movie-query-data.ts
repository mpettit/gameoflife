import { MovieSearchResult } from './movie-search-result';

export interface MovieQueryData {
    results: MovieSearchResult[];
    timesQueried: number;
    timeAddedAt: string;
    lastQueriedAt: string;
}
