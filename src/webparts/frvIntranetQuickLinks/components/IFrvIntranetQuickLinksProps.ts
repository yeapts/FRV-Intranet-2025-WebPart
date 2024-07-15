import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from '@microsoft/sp-http';

export interface IFrvIntranetQuickLinksProps {
  webpartTitle: string;
  webpartType:string;
  webpartImage: string;
  absoluteUrl: string;
  spHttpClient: SPHttpClient; 
  isEditor: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  instanceId: string;
  webpartWidth: number;
  pageFileName:string;
}
