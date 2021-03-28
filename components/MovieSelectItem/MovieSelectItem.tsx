import React from 'react';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import styles from './MovieSelectItem.module.scss';
interface MoviePosterSelectProps {
    item: MovieSearchResult;
    selected: boolean;
    onClick: () => void;
}

export default function MoviePosterSelect({ item, selected, onClick }: MoviePosterSelectProps): JSX.Element {
    const { Title: title, Poster: posterUrl } = item;

    const titleSafe = title.length > 17 ? `${title.substring(0, 17)}...` : title;

    return (
        <div className={selected ? styles.selected : styles.item} onClick={onClick}>
            <img src={posterUrl} height={180} />
            <div className={styles.title}>{titleSafe}</div>
        </div>
    );
}
