import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { QuicklinkItem } from '../../../models/QuicklinkItem';

interface Props {
  absoluteUrl: string;
  spHttpClient: SPHttpClient;
  webpartTitle : string;
  pageFileName: string;
  webpartType: string;
}

export const getAllItems = async (props: Props): Promise<QuicklinkItem[]> => {
  const endpoint = `${props.absoluteUrl}/_api/web/lists/GetByTitle('QuickLinks')/Items?$select=ID,Title,Sort,Url,Section,Image,Webpart,Page,Icon&$orderby=Sort asc&$filter=Section eq '${props.webpartTitle}'`;

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
