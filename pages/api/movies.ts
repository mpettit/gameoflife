import axios from 'axios';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<MovieSearchResult[]>) {
    if (req.method == 'GET') {
        const { title } = req.query;
        const movieDataURL = `${process.env.OMDB_API_URL}?apiKey=${process.env.OMDB_API_KEY}&s=${title}&type=movie`;

        console.log('Requesting data from api');
        console.log(movieDataURL);

        const movieResponse = await axios.get(movieDataURL);
        const results: MovieSearchResult[] = movieResponse.data?.Search?.slice(0, 5) || [];

        res.status(200).json({ results });
    }

    res.status(405).end();
}
