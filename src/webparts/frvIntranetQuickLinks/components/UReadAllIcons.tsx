// ReadAllItems.ts
import { SPHttpClient } from '@microsoft/sp-http';
import { getAllIcons } from './UGetAllIcons'; // Import the getAllItems function from the API file
import { IconItem } from  '../../../models/IconItem';

export interface IIconState {
  icons: IconItem[];
  status: string;
}

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

export const readAllIcons = async (props: Props, setState: React.Dispatch<React.SetStateAction<IIconState>>): Promise<void> => {
  try {
    setState({ status: 'Loading all items...', icons: [] });
    const icons = await getAllIcons(props);
    setState({ status: 'Items loaded', icons });
    console.log({ icons });
  } catch (error) {
    handleError(error);
    setState({ status: `Loading failed: ${error}`, icons: [] });
  }
};
