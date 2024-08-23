// ReadAllItems.ts
import { SPHttpClient } from '@microsoft/sp-http';
import { getAllItems } from './UGetAllItems'; // Import the getAllItems function from the API file
import { QuicklinkState } from  '../../../models/QuicklinkState';

const handleError = (error: Error): void => {  
    console.error(error);  // Log the error or send it to an error reporting service here
  };

  interface Props {
    absoluteUrl: string;
    spHttpClient: SPHttpClient;
    webpartTitle : string;
    pageFileName: string;
    webpartType: string;
  }

export const readAllItems = async (props: Props, setState: React.Dispatch<React.SetStateAction<QuicklinkState>>): Promise<void> => {
  try {
    setState({ status: 'Loading all items...', items: [] });
    const items = await getAllItems(props);
    setState({ status: 'Items loaded', items });
    console.log({ items });
  } catch (error) {
    handleError(error);
    setState({ status: `Loading failed: ${error}`, items: [] });
  }
};
