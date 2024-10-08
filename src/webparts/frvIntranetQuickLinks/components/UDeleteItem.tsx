
import { SPHttpClient } from '@microsoft/sp-http';
import { readAllItems } from './UReadAllItems';
import { QuicklinkState } from  '../../../models/QuicklinkState';

interface Props {
  absoluteUrl: string;
  spHttpClient: SPHttpClient;
  webpartTitle : string;
  pageFileName: string;
  webpartType: string;
}

const handleError = (error: Error): void => {  
    console.error(error);  // Log the error or send it to an error reporting service here
  };

  const handleReadAllItems = async (props: Props, setState: React.Dispatch<React.SetStateAction<QuicklinkState>>): Promise<void> => {
    await readAllItems(props, setState);
  };
  

const DeleteItem = async (props: Props, setState: React.Dispatch<React.SetStateAction<QuicklinkState>>, itemId: number): Promise<void> => {
  try {
    console.log(`Deleting... ${itemId}`);
    await props.spHttpClient.post(
      `${props.absoluteUrl}/_api/web/lists/getByTitle('QuickLinks')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=verbose',
          'odata-version': '',
          'IF-MATCH': "*",
          'X-HTTP-Method': 'DELETE'
        }
      }
    );
    console.log(`Item with ID: ${itemId} successfully deleted`);
    setState({ status: 'successfully deleted', items: [] });
    await handleReadAllItems(props, setState);
  } catch (error) {
    handleError(error);
    console.log(`Error deleting item: ${error}`);
    setState({ status: 'error deleting', items: [] });
  }
  console.log(`Deleted... ${itemId}`);
};

export default DeleteItem;
