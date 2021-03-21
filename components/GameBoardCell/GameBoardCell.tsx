import React from 'react'
import styles from './GameBoardCell.module.scss'

export default function GameBoardCell({
    isAlive,
}: {
    isAlive: boolean
}): JSX.Element {
    return <div className={isAlive ? styles.cellAlive : styles.cellDead}></div>
}
