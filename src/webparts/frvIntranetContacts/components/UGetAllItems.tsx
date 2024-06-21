import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Item } from './IItem';

interface Props {
  absoluteUrl: string;
  spHttpClient: SPHttpClient;
}

export const getAllItems = async (props: Props): Promise<Item[]> => {
  const endpoint = `${props.absoluteUrl}/_api/web/lists/GetByTitle('Contacts')/Items?$expand=Name&$select=Name/Title,Name/EMail,Name/Department,Name/JobTitle,Name/WorkPhone,Name/FirstName,Name/MobilePhone,Name/Modified,Name/Created,Name/LastName,ID,QuickDial,Title,Mobile,Phone,Sort,JobTitle&$orderby=Sort asc`;

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
