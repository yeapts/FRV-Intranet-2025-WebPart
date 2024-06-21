import { SPHttpClient } from '@microsoft/sp-http';
import { getUserId } from './UGetUseId';
import { IState } from './IState';
import { readAllItems } from './UReadAllItems';

interface Props {
  spHttpClient: SPHttpClient;
  absoluteUrl: string;
}

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

export const createItem = async (props: Props, inputEmailValue: string, setAddDialogIsOpen:React.Dispatch<React.SetStateAction<boolean>>, setState: React.Dispatch<React.SetStateAction<IState>>): Promise<void> => {
  try {
    const latestUserId = await getUserId(props.spHttpClient, props.absoluteUrl, inputEmailValue);
    
    if (latestUserId === -1) {
      throw new Error('No user found in the list');
    }    

    console.log(`Loading information about user ID: ${latestUserId}...`);

    const response = await props.spHttpClient.get(`${props.absoluteUrl}/_api/web/lists/getByTitle('Contacts')/items?$filter=NameId eq ${latestUserId}`, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    });

    console.log('Response status:', response.status);
    console.log(`Adding... Email - value: ${inputEmailValue}`);

    const body: string = JSON.stringify({  
      'Title': "",
      'NameId': latestUserId,
      'Sort': 0,
    }); 

    await props.spHttpClient.post(`${props.absoluteUrl}/_api/web/lists/getByTitle('Contacts')/items`, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
      },
      body: body
    });   

    console.log(`Item added`);
    setState({ status: 'successfully added', items: [] });
    try {
      await readAllItems(props, setState);
      // Additional code after the promise is resolved
    } catch (error) {
      // Handle any errors that occurred during the promise execution
      console.error('An error occurred:', error);
    }

  } catch (error) {
    handleError(error);
    console.log(`Error adding item: ${error}`);
    alert("Unable to add contact. Check email address is entered correctly.");
  }

  setAddDialogIsOpen(false);
};
