import axios from 'axios';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { formatISO } from 'date-fns';
import { MoviesSchema } from '../../models/schemas/movies-schema';
import { QueriesSchema } from '../../models/schemas/queries-schema';
const firestore = firebase.firestore();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse<{ results: MovieSearchResult[] }>) {

    if (req.method === 'GET') {
        const title = (req.query.title as string).toLowerCase();

        if (!title) {
            res.status(400).send('Bad Request!');
        }

        // check if results already in db
        console.log(`Querying for query ${title} from db...`);
        return await firestore.runTransaction((transaction) => {
            const queryDocRef = firestore.collection('queries').doc(title);

            return transaction
                .get(queryDocRef)
                .then((querySnapshot: DocumentSnapshot<QueriesSchema>) => {
                    const currentTimestamp = formatISO(Date.now());

                    // if query already exists, return increment times queried + return data
                    if (querySnapshot.exists) {
                        const queryData: QueriesSchema = querySnapshot.data();
                        const { imdbIDs } = queryData;

                        console.log(`Received ${imdbIDs.length} ids for query "${title}" from db.`);

                        transaction.update(queryDocRef, {
                            ...queryData,
                            timesQueried: queryData.timesQueried + 1,
                            lastQueriedAt: currentTimestamp,
                        });

                        //TODO: sort these?
                        return firestore
                            .collection('movies')
                            .where('imdbID', 'in', imdbIDs)
                            .get()
                            .then((movieQuerySnapshot) => {
                                return movieQuerySnapshot.docs.map((snapshot) => snapshot.data());
                            });
                    } else {
                        // otherwise, make api query, update db, and return results
                        console.log(`No results for query ${title} from db. Querying OMDB API`);
                        const movieDataURL = `${process.env.OMDB_API_URL}?apiKey=${process.env.OMDB_API_KEY}&s=${title}&type=movie`;
                        return axios.get(movieDataURL).then((movieResponse) => {
                            const results: MovieSearchResult[] = movieResponse.data?.Search || [];

                            console.log(`Received ${results.length} results for query "${title}" from OMDB API. Saving to db...`);

                            if (results.length > 0) {
                                console.log(`Received ${results.length} results for query "${title}" from OMDB API. Saving to db...`);

                                // add all search results to movies collection
                                results.forEach((result) => {
                                    const movieRef = firestore.collection('movies').doc(result.imdbID);
                                    transaction.set(movieRef, { ...result, timeAddedAt: currentTimestamp } as MoviesSchema, {
                                        merge: true,
                                    });
                                });

                                // finally, tag movie results to query in queries collection
                                transaction.set(queryDocRef, {
                                    imdbIDs: results.map((result) => result.imdbID),
                                    timesQueried: 1,
                                    timeAddedAt: currentTimestamp,
                                    lastQueriedAt: currentTimestamp,
                                } as QueriesSchema);
                            } else {
                                console.log(`Received ${results.length} results for query "${title}" from OMDB API. No save necessary.`);
                            }

                            return results;
                        });
                    }
                })
                .then((results: MovieSearchResult[]) => {
                    res.status(200).json({ results });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        });
    } else {
        res.status(405).send('Unsupported Operation');
        return Promise.resolve();
    }
}

//     .collection("queries")
//         .ref(`/queries/${title}`)
//         .once('value')
//         .then(async (snapshot) => {
//             const currentTimestamp = formatISO(Date.now());

//             if (snapshot.exists()) {
//                 // if query already exists, return increment times queried + return data
//                 const queryData: MovieQueryData = snapshot.val();
//                 const results = queryData.results;

//                 console.log(`Received ${results.length} results for query "${title}" from db.`);

//                 database.ref(`/queries/${title}`).update(
//                     {
//                         ...queryData,
//                         timesQueriedAt: queryData.timesQueriedAt + 1,
//                         lastQueriedAt: currentTimestamp,
//                     },
//                     (error) => {
//                         if (error) {
//                             console.log(`Error incrementing timesQueried for query "${title}": ${error}`);
//                             res.status(500).end(); //TODO: add error message?
//                         } else {
//                             res.status(200).json({ results });
//                         }
//                     }
//                 );
//             } else {
//                 // otherwise, make api query, update db, and return results
//                 console.log(`No results for query ${title} from db. Querying OMDB API`);

//                 const movieDataURL = `${process.env.OMDB_API_URL}?apiKey=${process.env.OMDB_API_KEY}&s=${title}&type=movie`;
//                 const movieResponse = await axios.get(movieDataURL);
//                 const results: MovieSearchResult[] = movieResponse.data?.Search || [];

//                 console.log(`Received ${results.length} results for query "${title}" from OMDB API. Saving to db...`);

//                 database.ref(`/queries/${title}`).set(
//                     {
//                         results,
//                         timesQueried: 1,
//                         timeAddedAt: currentTimestamp,
//                         lastQueriedAt: currentTimestamp,
//                     },
//                     (error) => {
//                         if (error) {
//                             console.log(`Error saving query results for "${title}" to db: ${error}`);
//                             res.status(500).end(); //TODO: add error message?
//                         } else {
//                             res.status(200).json({ results });
//                         }
//                     }
//                 );
//             }
//         });
// } else {
//     res.status(405).end();
