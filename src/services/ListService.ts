import { ListItem } from "../models/ListItem";

export const getItems = async (siteUrl: string, listName: string, orderBy: string = 'ID desc', filter?: string): Promise<ListItem[]> => {
  try {

    let query = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items?$orderby=${orderBy}`;

    if (filter) {
      query += `&$filter=${filter}`;
    }

    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose'
      }
    });
    const data = await response.json();
    return data.d.results as ListItem[];
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addItem = async (siteUrl: string, listName: string, item: ListItem): Promise<void> => {
  try {
    const response = await fetch(`${siteUrl}/_api/web/lists/getByTitle('${listName}')/items`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error("Error adding item");
    }
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const updateItem = async (siteUrl: string, listName: string, itemId: number, item: Partial<ListItem>): Promise<void> => {
  try {
    const response = await fetch(`${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`, {
      method: 'MERGE',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value,
        'IF-MATCH': '*'
      },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error("Error updating item");
    }
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (siteUrl: string, listName: string, itemId: number): Promise<void> => {
  try {
    const response = await fetch(`${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${itemId})`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': (document.getElementById('__REQUESTDIGEST') as HTMLInputElement).value,
        'IF-MATCH': '*'
      }
    });
    if (!response.ok) {
      throw new Error("Error deleting item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};