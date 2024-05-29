import * as React from 'react';
import styles from './FrvIntranetAuthors.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IListItem } from './IListItem'; // Assuming IListItem is defined in this file
import { IFrvIntranetAuthorsProps } from './IFrvIntranetAuthorsProps';
import { makeStyles, Button  } from '@fluentui/react-components';

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
  const semanticColors = props.themeVariant?.semanticColors;
  const useStyles = makeStyles({
    webpartStyle:{
      backgroundColor: semanticColors?.bodyBackground,
      color: semanticColors?.bodyText,
    },
    }
  );
  const classes =useStyles ();

  const readAllItem =  ():void => {
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
        (error: Error) => { console.log({ status: 'Loading failed: ' + error, items: [] });  }
      );
  };
  React.useEffect(() => { readAllItem(); }, []);

  const DeleteItem = (itemId:string): void => {
    console.log (`Deleting... ${itemId}`);
    props.spHttpClient.post(`${props.absoluteUrl}/_api/Web/SiteGroups/GetById(5)/Users/removeById(${itemId})`,SPHttpClient.configurations.v1,
    {headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=verbose',
      'odata-version': '',
      'IF-MATCH': "*",
      'X-HTTP-Method': 'DELETE'
    }})
    .then((response: SPHttpClientResponse): void => {
      console.log(`Item with ID: ${itemId} successfully deleted`);
      setState({ status: 'successfuly deleted', items: [] });
      readAllItem();
    }, (error: Error): void => {
      console.log(`Error deleting item: ${error}`);
      setState({ status: 'error deleting', items: [] });
    });
    console.log (`Deleted... ${itemId}`);
  }

  const { webpartTitle, isEditor } = props;

  if (isEditor === true) {
    return (
      <div className={classes.webpartStyle}>
      <section className={styles.section}>
        <h3>{escape(webpartTitle)}</h3>
        <div>
          <p>
            <Button shape="square">Add Author</Button>
          </p>
          <ul>
            {state.items.map((item) => (
              <li key={item.Id}>
                {escape(item.Title)}  <a onClick={() => DeleteItem(item.Id)} >Delete</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
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