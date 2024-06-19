import { WebPartContext } from "@microsoft/sp-webpart-base";
//import { AppMode } from "../FrvIntranetAuthorsWebPart";
import { SPHttpClient } from '@microsoft/sp-http';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IFrvIntranetAuthorsProps {
  webpartTitle: string;
  absoluteUrl: string;
  spHttpClient: SPHttpClient; 
  isEditor: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  instanceId:string;
 // appMode: AppMode;
//  themeVariant: IReadonlyTheme | undefined;
  sharepointGroupID: number;
}
