import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISearchResult {
  Title: string;
  Author: string;
  Path:string;
}

export async function searchService(context: WebPartContext, query: string): Promise<ISearchResult[]> {
  const endpoint: string = `${context.pageContext.web.absoluteUrl}/_api/search/query?querytext='${query}'&selectproperties='Title,Author,Path'&rowlimit=10`;
  
  const response: SPHttpClientResponse = await context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
  const data = await response.json();
  
  return data.PrimaryQueryResult.RelevantResults.Table.Rows.map((row: { Cells: { Key: string; Value: string }[] }) => {
    let title = '';
    let author = '';
    let path = '';
    
    for (const cell of row.Cells) {
      if (cell.Key === 'Title') {
        title = cell.Value;
      } else if (cell.Key === 'Author') {
        author = cell.Value;
      } else if (cell.Key === 'Path'){
        path = cell.Value;
      }
    }
    
    return {
      Title: title,
      Author: author,
      Path: path
    };
  });
}
