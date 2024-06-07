import * as React from 'react';
import styles from './FrvIntranetContacts.module.scss';
import type { IFrvIntranetContactsProps } from './IFrvIntranetContactsProps';
import { IState } from './IState'; 
import { SPHttpClient } from '@microsoft/sp-http';
import { Item } from './IItem';
import UserName from './RUserName';
import UserTitle from './RUserTitle';
import UserMobile from './RUserMobile';
import UserPhone from './RUserPhone';
import UserQuickdial from './RUserQuickdial';

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

const FrvIntranetContacts: React.FC<IFrvIntranetContactsProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });
  const { webpartTitle, isEditor } = props;

  const fetchItems = async (): Promise<Item[]> => {
    const endpoint = `${props.absoluteUrl}/_api/web/lists/GetByTitle('Contacts')/Items?$expand=Name&$select=Name/Title,Name/EMail,Name/Department,Name/JobTitle,Name/WorkPhone,Name/FirstName,Name/MobilePhone,Name/Modified,Name/Created,Name/LastName,ID,QuickDial,Title,Mobile,Phone,Sort,JobTitle&$orderby=Sort asc`;
    const response = await props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
    const { value = [] } = await response.json();
    return value;
  };

  const readAllItems = async (): Promise<void> => {
    try {
      setState({ status: 'Loading all items...', items: [] });
      const items = await fetchItems();
      setState({ status: 'Items loaded', items });
      console.log({ items });
    } catch (error) {
      handleError(error);
      setState({ status: `Loading failed: ${error}`, items: [] });
    }
  };

  React.useEffect(() => {
    readAllItems().catch(handleError);
  }, []);

  if (isEditor === true) 
    {
      return (
        <section className={styles.section}>
          <h3>{(webpartTitle)}</h3>
          <div>
            {state.items.map((item) => (
                <div key={item.ID}>
                  <div><UserName username={item.Title} nametitle={item.Name.Title}/></div>
                  <div><UserTitle usertitle={item.JobTitle} nametitle={item.Name.JobTitle}/></div>
                  <div><UserMobile usermobile={item.Mobile} namemobile={item.Name.MobilePhone}/></div>
                  <div><UserQuickdial userquickdial={item.QuickDial}/></div>
                  <div><UserPhone userphone={item.Phone} namephone={item.Name.WorkPhone}/></div>
                  <div>{item.Name.EMail}</div>
                </div>
              ))}
          </div>
        </section>
      )
    }
  else
    {
      return (
        <section className={styles.section}>
          <h3>{(webpartTitle)}</h3>
          <div>
            nothing
          </div>
        </section>
      )
    }
  }

export default FrvIntranetContacts;