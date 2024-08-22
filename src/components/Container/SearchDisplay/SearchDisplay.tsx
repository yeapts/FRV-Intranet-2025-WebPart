import * as React from "react";
import { searchService, ISearchResult } from "../../../services/SearchService";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IMyWebPartProps {
  context: WebPartContext;
}

export interface IMyWebPartState {
  results: ISearchResult[];
}

const MyWebPart: React.FC<IMyWebPartProps> = (props) => {
  const [results, setResults] = React.useState<ISearchResult[]>([]);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const searchResults = await searchService(props.context, "SharePoint");
        setResults(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData().catch(error => console.error("Error in fetchData:", error));
  }, [props.context]);

  return (
    <div>
      <h2>Search Results</h2>
      {results.map(result => (
        <div key={result.Title}>
          <h3>{result.Title}</h3>
          <p>{result.Author}</p>
          <p>{result.Path}</p>
        </div>
      ))}
    </div>
  );
};

export default MyWebPart;