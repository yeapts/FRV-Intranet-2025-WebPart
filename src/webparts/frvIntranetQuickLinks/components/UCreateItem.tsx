import { SPHttpClient } from '@microsoft/sp-http';
import { QuicklinkState } from  '../../../models/QuicklinkState';
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

export const createItem = async (props:Props, title:string, url:string, webpart:string, page:string, section:string, setAddDialogIsOpen:React.Dispatch<React.SetStateAction<boolean>>, setState: React.Dispatch<React.SetStateAction<QuicklinkState>>): Promise<void> => {
  try {
  
    const body: string = JSON.stringify({  
      'Title': title,
      'Url': url,
      'Webpart': webpart,
      'Page' : page,
      'Sort': 0,
      'Section' : section,
    }); 

    await props.spHttpClient.post(`${props.absoluteUrl}/_api/web/lists/getByTitle('QuickLinks')/items`, SPHttpClient.configurations.v1, {
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
    alert("Unable to add shortcut. Check url is entered correctly.");
  }

  setAddDialogIsOpen(false);
};
