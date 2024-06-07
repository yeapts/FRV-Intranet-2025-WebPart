import { WebPartContext } from "@microsoft/sp-webpart-base";

import { SPHttpClient } from '@microsoft/sp-http';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IFrvIntranetContactsProps {
  webpartTitle: string;
  absoluteUrl: string;
  spHttpClient: SPHttpClient; 
  isEditor: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  themeVariant: IReadonlyTheme | undefined;
}
