import * as React from 'react';
import { ListItem } from '../../../models/ListItem';
import styles from './Card.module.scss';

interface CardProps {
  item: ListItem;
}

const Card: React.FC<CardProps> = ({ item }) => (
  <div className={styles.card}>
    <h3>{item.Title}</h3>
    <p>{item.description}</p>
  </div>
);

export default Card;