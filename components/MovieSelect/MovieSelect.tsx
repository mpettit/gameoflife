import React from 'react';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import { ExclamationOutlined } from '@ant-design/icons';
import MovieSelectItem from '../MovieSelectItem/MovieSelectItem';
import styles from './MovieSelect.module.scss';

export interface MovieSelectProps {
    options: MovieSearchResult[];
    value: MovieSearchResult;
    onSelect: (movie: MovieSearchResult) => void;
}

export default function MovieSelect({ options, value, onSelect }: MovieSelectProps): JSX.Element {
    if (options.length === 0) {
        return (
            <div className={styles.noResultContainer}>
                <ExclamationOutlined className={styles.icon} />
                <div>No results.</div>
            </div>
        );
    }

    return (
        <div>
            <p>Select one</p>
            <div className={styles.itemContainer}>
                {options.map((option) => (
                    <MovieSelectItem
                        key={option.imdbID}
                        className={styles.margin5}
                        item={option}
                        selected={value?.imdbID === option.imdbID}
                        onClick={() => onSelect(option)}
                    />
                ))}
            </div>
        </div>
    );
}
