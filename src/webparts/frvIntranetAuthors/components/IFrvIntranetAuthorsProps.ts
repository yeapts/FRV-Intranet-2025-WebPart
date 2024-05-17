import { SPHttpClient } from '@microsoft/sp-http';
export interface IFrvIntranetAuthorsProps {
  webpartTitle: string;
  absoluteUrl: string;
  spHttpClient: SPHttpClient; 
  isEditor: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
