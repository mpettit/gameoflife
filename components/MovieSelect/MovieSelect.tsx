import React from 'react';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import { Typography } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import MovieSelectItem from '../MovieSelectItem/MovieSelectItem';
import styles from './MovieSelect.module.scss';

const { Text } = Typography;

export interface MovieSelectProps {
    options: MovieSearchResult[];
    value?: MovieSearchResult;
    onSelect: (movie: MovieSearchResult) => void;
}

export default function MovieSelect({ options, value, onSelect }: MovieSelectProps): JSX.Element {
    if (options.length === 0) {
        //TODO: flashes no results when collapsible opens
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
                        item={option}
                        selected={value?.imdbID === option.imdbID}
                        onClick={() => onSelect(option)}
                    />
                ))}
            </div>
            <Text type="secondary">Data Provided by OMDb API</Text>
        </div>
    );
}
