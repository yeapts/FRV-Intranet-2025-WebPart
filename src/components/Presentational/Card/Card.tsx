import * as React from 'react';
import { ListItem } from '../../../models/ListItem';
import styles from './Card.module.scss';

interface CardProps {
  item: ListItem;
}

const Card: React.FC<CardProps> = ({ item }) => (
  <div className={styles.card}>
    <p>{item.Title}</p>
    <p>{item.description}</p>
  </div>
);

export default Card;