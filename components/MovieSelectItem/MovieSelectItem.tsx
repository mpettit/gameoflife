import React from 'react';
import { Card, Image } from 'antd';
import { MovieSearchResult } from '../../models/movie/movie-search-result';
import styles from './MovieSelectItem.module.scss';

const { Meta } = Card;

interface MoviePosterSelectProps {
    item: MovieSearchResult;
    selected: boolean;
    onClick: () => void;
}

export default function MoviePosterSelect({ item, selected, onClick }: MovieSearchResultProps): JSX.Element {
    const { Title: title, Poster: posterUrl } = item;

    const titleSafe = title.length > 20 ? `${title.substring(0, 20)}...` : title;

    return (
        <div className={selected ? styles.selected : styles.item} onClick={onClick}>
            <img src={posterUrl} height={180} />
            <div className={styles.title}>{titleSafe}</div>
        </div>
    );
}
