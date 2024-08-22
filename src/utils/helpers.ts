// Function to format dates in a readable format
export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  // Function to capitalize the first letter of a string
  export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Function to check if an object is empty
  export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
    return Object.keys(obj).length === 0;
  };
  
  // Function to generate a unique identifier
  export const generateUniqueId = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  
// Function to debounce another function
export const debounce = (func: (...args: unknown[]) => void, wait: number): (...args: unknown[]) => void => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };