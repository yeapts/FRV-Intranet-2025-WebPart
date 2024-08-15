import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'FrvIntranetContactsWebPartStrings';
import FrvIntranetContacts from './components/FrvIntranetContacts';
import { IFrvIntranetContactsProps } from './components/IFrvIntranetContactsProps';
//import {   IReadonlyTheme } from '@microsoft/sp-component-base';
import { SPPermission } from '@microsoft/sp-page-context';
//import { FluentProvider, FluentProviderProps,    webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { IReadonlyTheme } from '@microsoft/sp-component-base';


export interface IFrvIntranetContactsWebPartProps {
  webparttitle: string;
  description: string;
}

export default class FrvIntranetContactsWebPart extends BaseClientSideWebPart<IFrvIntranetContactsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _isEditor: boolean = false;
  private _pageFilename : string ='';

  //private _themeProvider: ThemeProvider;
 // private _themeVariant: IReadonlyTheme | undefined;
  //private _appMode: AppMode = AppMode.SharePoint;

  public render(): void {

    this._isEditor = this.checkEditorPermission();

    const element: React.ReactElement<IFrvIntranetContactsProps> = React.createElement(
      FrvIntranetContacts,
      {
        webpartTitle: this.properties.webparttitle,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient,
        isEditor: this._isEditor,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        instanceId: this.context.instanceId,
        //appMode: this._appMode,
        context: this.context,
       // themeVariant: this._themeVariant,
       pageFileName: this._pageFilename,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private checkEditorPermission = ():boolean => {
    //Editor group can add item on list/library via addListItems permission
    const permission = new SPPermission(this.context.pageContext.web.permissions.value);
    const isMemberPermission = permission.hasPermission(SPPermission.addListItems);
    return isMemberPermission;
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  //private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
  //  this._themeVariant = args.theme;
  //  this.render();
  //}

  protected async onInit(): Promise<void> {

    // Consume the new ThemeProvider service
    //this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    //this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    //this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    const { serverRequestPath } = this.context.pageContext.site;
    const { serverRelativeUrl } = this.context.pageContext.web;    
    this._pageFilename = serverRequestPath.toLowerCase()
        .replace(serverRelativeUrl.toLowerCase(), "")
        .replace("/sitepages/", "")
        .replace("/pages/", "");

    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) { return; }
    this._isDarkTheme = !!currentTheme.isInverted;
    
   // this._theme = createV9Theme(currentTheme as undefined, webLightTheme);
    const {semanticColors} = currentTheme;
    if (semanticColors) {
  //    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
  //    this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--bodyBackground', semanticColors.bodyBackground || null);
  //    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webparttitle', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
