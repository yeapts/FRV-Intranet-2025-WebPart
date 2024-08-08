import { SPHttpClient } from '@microsoft/sp-http';
import { IState } from './IState';
import { readAllItems } from './UReadAllItems';

interface Props {
  spHttpClient: SPHttpClient;
  absoluteUrl: string;
  webpartTitle : string;
  pageFileName: string;
  webpartType: string;
}

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

export const editItemImage = async (props:Props, itemId:number, url:string, setEditImageDialogIsOpen:React.Dispatch<React.SetStateAction<boolean>>, setState: React.Dispatch<React.SetStateAction<IState>>): Promise<void> => {
  try {
  
    const body: string = JSON.stringify({  
      'Icon': url,
    }); 

    await props.spHttpClient.post(`${props.absoluteUrl}/_api/web/lists/getByTitle('QuickLinks')/items(${itemId})`, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE'
      },
      body: body
    });   
    
    console.log(`Item edited`);
    setState({ status: 'successfully edited', items: [] });
    try {
      await readAllItems(props, setState);
      // Additional code after the promise is resolved
    } catch (error) {
      // Handle any errors that occurred during the promise execution
      console.error('An error occurred:', error);
    }

  } catch (error) {
    handleError(error);
    console.log(`Error editing item: ${error}`);
    alert("Unable to add shortcut. Check url is entered correctly.");
  }

  setEditImageDialogIsOpen(false);
};
