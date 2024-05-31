import * as React from 'react';
import styles from './FrvIntranetAuthors.module.scss';
import { SPHttpClient } from '@microsoft/sp-http';
import { IListItem } from './IListItem'; // Assuming IListItem is defined in this file
import { IFrvIntranetAuthorsProps } from './IFrvIntranetAuthorsProps';
import { makeStyles, Button  } from '@fluentui/react-components';
import { PersonEditRegular } from "@fluentui/react-icons";

interface IState {
  items: IListItem[];
  status: string;
}

const useStyles = makeStyles({
  webpartStyle:{
    backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
  },
  button:{
    backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
  },
  itemTitle:{
    flexGrow:8,
    textAlign: 'left',
    alignContent: 'center',
  },
  itemIcon:{
    alignContent: 'center',
  },
  itemAction:{
    flexGrow:1,
    alignContent: 'center',
  },
  list:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  }
});

const handleDelete = (DeleteItem: (id: string) => Promise<void>, id: string): () => Promise<void> => async () => {
  await DeleteItem(id);
};

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

const FrvIntranetAuthors: React.FC<IFrvIntranetAuthorsProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });

  const classes = useStyles ();

  const readAllItem = async (): Promise<void> => {
    try {
      setState({ status: 'Loading all items...', items: [] });
      const response = await props.spHttpClient.get(`${props.absoluteUrl}/_api/web/SiteGroups/GetById(5)/Users`,SPHttpClient.configurations.v1,{headers:{Accept:'application/json;odata=nometadata','odata-version':'',},});
      const data = await response.json();
      setState({ status: 'Items loaded', items: data?.value ?? [] });
    } catch (error) {
      handleError(error);
      setState({ status: `Loading failed: ${error}`, items: [] });
    }
  };
  React.useEffect(() => { readAllItem().catch(handleError); }, []);

  const DeleteItem = async (itemId:string): Promise<void> => {
    try {
      console.log (`Deleting... ${itemId}`);
      await props.spHttpClient.post(`${props.absoluteUrl}/_api/Web/SiteGroups/GetById(5)/Users/removeById(${itemId})`,SPHttpClient.configurations.v1,
      {headers: {
        'X-HTTP-Method': 'DELETE'
      }});
      console.log(`Item with ID: ${itemId} successfully deleted`);
      setState({ status: 'successfully deleted', items: [] });
      readAllItem().catch(handleError);
    } catch (error) {
      handleError(error);
      console.log(`Error deleting item: ${error}`);
      setState({ status: 'error deleting', items: [] });
    }
    console.log (`Deleted... ${itemId}`);
  }

  const { webpartTitle, isEditor } = props;

  if (isEditor === true) {
    return (
      <div className={classes.webpartStyle}>
      <section className={styles.section}>
        <h3>{(webpartTitle)}</h3>
        <div>
          <div >
            <Button shape="square" className={classes.button}>Add Author</Button>
          </div>
          <div>
            {state.items.map((item) => (
              <div key={item.Id} className={classes.list}>
                <div className={classes.itemIcon}><PersonEditRegular /></div>
                <div className={classes.itemTitle}>{(item.Title)} </div>
                <div className={classes.itemAction}><Button shape="square" className={classes.button} onClick={handleDelete(DeleteItem, item.Id)}>Delete</Button> </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    );
  } else {
    return (
      <section className={styles.section}>
        <h3>{(webpartTitle)}</h3>
        <div>
          <p>
            Request to be author.
          </p>
          <ul>
          {state.items.map((item) => (
              <li key={item.Id}>
                {(item.Title)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
};

export default FrvIntranetAuthors;