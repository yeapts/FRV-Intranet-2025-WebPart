
import * as React from "react";
import * as ListService from '../../../services/ListService';
import { ListItem } from '../../../models/ListItem';
import styles from './TileDisplay.module.scss';
import Card from '../../Presentational/Card/Card';
import { useEffect, useState } from 'react';

interface TileDisplayProps {
    siteUrl: string;
    listName: string;
  }

const TileDisplay: React.FC<TileDisplayProps> = ({ siteUrl, listName }) => {
  const [items, setItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      try {
        const items = await ListService.getItems(siteUrl,listName);
        setItems(items);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems().catch(error => console.error('Error in fetchItems:', error));
  }, []);

  return (
    <div className={styles.listDisplay}>
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default TileDisplay;