import * as React from 'react';
import styles from './FrvIntranetAuthors.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IListItem } from './IListItem'; // Assuming IListItem is defined in this file
import { IFrvIntranetAuthorsProps } from './IFrvIntranetAuthorsProps';

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

const FrvIntranetAuthors: React.FC<IFrvIntranetAuthorsProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });

  const readAllItem = (): void => {
    setState({ status: 'Loading all items...', items: [] });
    props.spHttpClient
     .get(`${props.absoluteUrl}/_api/web/SiteGroups/GetById(5)/Users`,SPHttpClient.configurations.v1,{headers:{Accept:'application/json;odata=nometadata','odata-version':'',},})
     .then((response: SPHttpClientResponse) => response.json())
     .then((response: { value: IListItem[] }) => 
        {
          if (response.value.length === 0) { console.log({ status: 'No items' }); } else 
          { 
            console.log({ status: 'Items loaded', items: response.value });
            setState({ status: 'Latest items loaded', items: response.value });
          }
        },
        (error: Error) => { console.log({ status: 'Loading failed: ' + error, items: [] }); }
      );
  };

  React.useEffect(() => { readAllItem(); }, []);

  const { webpartTitle, isEditor } = props;

  if (isEditor === true) {
    return (
      <section className={styles.section}>
        <h3>{escape(webpartTitle)}</h3>
        <div>
          <p>
            Add Author
          </p>
          <ul>
            {state.items.map((item) => (
              <li key={item.Id}>
                {escape(item.Title)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.section}>
        <h3>{escape(webpartTitle)}</h3>
        <div>
          <p>
            Request to be author.
          </p>
          <ul>
          {state.items.map((item) => (
              <li key={item.Id}>
                {escape(item.Title)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
};

export default FrvIntranetAuthors;