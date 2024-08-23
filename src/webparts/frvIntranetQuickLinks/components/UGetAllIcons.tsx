import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IconItem } from  '../../../models/IconItem';

interface Props {
  absoluteUrl: string;
  spHttpClient: SPHttpClient;
}

export const getAllIcons = async (props: Props): Promise<IconItem[]> => {
  const endpoint = `https://firerescuevictoria.sharepoint.com/_api/web/lists/GetByTitle('Icons')/Items?$select=ID,Title,FileRef&$orderby=Title asc`;

  try {
    const response: SPHttpClientResponse = await props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
    if (response.ok) {
      const data = await response.json();
      const { value = [] } = data;
      return value;
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};
