import * as React from 'react';
import styles from './FrvIntranetAuthors.module.scss';
import type { IFrvIntranetAuthorsProps } from './IFrvIntranetAuthorsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

interface IState {
  items: IListItem[];
  status: string;
}

interface IListItem {
  Id: string;
  Title: string;
  // Add other properties as needed
}

export default class FrvIntranetAuthors extends React.Component<IFrvIntranetAuthorsProps, IState> {

  constructor(props: IFrvIntranetAuthorsProps) {
    super(props);
    this.state = {
      items: [],
      status: '',
    };
  }

  public componentDidMount(): void {
    this.readAllItem();
  }

  private readAllItem = (): void => {
    this.setState({ status: 'Loading all items...', items: [] });
    this.props.spHttpClient.get(
      `${this.props.absoluteUrl}/_api/web/SiteGroups/GetById(5)/Users`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: 'application/json;odata=nometadata',
          'odata-version': '',
        },
      }
    )
     .then((response: SPHttpClientResponse) => response.json())
     .then(
        (response: { value: IListItem[] }) => {
          if (response.value.length === 0) {
            console.log({ status: 'No items found in the list' });
          } else {
            console.log({ status: 'Latest items loaded', items: response.value });
          }
        },
        (error: Error) => {
          console.log({ status: 'Loading latest items failed with error: ' + error, items: [] });
        }
      );
  }

  public render(): React.ReactElement<IFrvIntranetAuthorsProps> {
    const {
      webpartTitle,
      isEditor,
      absoluteUrl,      
    } = this.props;


    if (isEditor === true) {
      return (
        // className={`${styles.frvIntranetAuthors} ${hasTeamsContext ? styles.teams : ''}`}
        <section className={styles.section}>
          <h3>{escape(webpartTitle)}</h3>
          <div>
            <p>
              Content for Editor.
              {escape(absoluteUrl)}
            </p>
            <ul>
          {this.state.items.map((item) => (
            <li key={item.Id}>{item.Title}</li>
          ))}
        </ul>
          </div>
        </section>      
      );
    } else {
      return (
        // className={`${styles.frvIntranetAuthors} ${hasTeamsContext ? styles.teams : ''}`}
        <section className={styles.section}>
          <h3>{escape(webpartTitle)}</h3>
          <div>
            <p>
              Content for viewer.
              {escape(absoluteUrl)}
            </p>
            <ul>
          {this.state.items.map((item) => (
            <li key={item.Id}>{item.Title}</li>
          ))}
        </ul>
          </div>
        </section>    
          
      );
    }
  }
}

