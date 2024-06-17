import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'FrvIntranetAuthorsWebPartStrings';
import FrvIntranetAuthors from './components/FrvIntranetAuthors';
import { IFrvIntranetAuthorsProps } from './components/IFrvIntranetAuthorsProps';
import { SPPermission } from '@microsoft/sp-page-context';

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal, Office, OfficeLocal, Outlook, OutlookLocal
}

export interface IFrvIntranetAuthorsWebPartProps {
  webparttitle: string;
  sharepointGroupID: number;
}

export default class FrvIntranetAuthorsWebPart extends BaseClientSideWebPart<IFrvIntranetAuthorsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _isEditor: boolean = false;

  private _appMode: AppMode = AppMode.SharePoint;


  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit(): Promise<void> {
    const _l = this.context.isServedFromLocalhost;
    if (!!this.context.sdks.microsoftTeams) {
      const teamsContext = await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case 'teams': this._appMode = _l ? AppMode.TeamsLocal : AppMode.Teams; break;
        case 'office': this._appMode = _l ? AppMode.OfficeLocal : AppMode.Office; break;
        case 'outlook': this._appMode = _l ? AppMode.OutlookLocal : AppMode.Outlook; break;
        default: throw new Error('Unknown host');
      }
    } else this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint;

    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  public render(): void {

    this._isEditor = this.checkEditorPermission();
    console.log(`Editor: ${this._isEditor}`);

    const element: React.ReactElement<IFrvIntranetAuthorsProps> = React.createElement(
      FrvIntranetAuthors,
      {
        webpartTitle: this.properties.webparttitle,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient,
        isEditor: this._isEditor,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        appMode: this._appMode,
        themeVariant: this._themeVariant,
        sharepointGroupID: Number(this.properties.sharepointGroupID),
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
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {

    if (!currentTheme) { return; }
    this._isDarkTheme = !!currentTheme.isInverted;


    
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--bodyBackground', semanticColors.bodyBackground || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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
                  label: strings.WebPartTitleFieldLabel
                }),
                PropertyPaneTextField('sharepointGroupID',
                {
                  label:"SharePoint Group ID",                  
                  description: "The ID of the Author's SharePoint Group",
                  onGetErrorMessage: this.validateNumberOnly,
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  private validateNumberOnly(value: string): string {
    const validNumberRegex = /^[0-9]*$/;
    return validNumberRegex.test(value) ? '' : 'Please enter number only';
  }

}
