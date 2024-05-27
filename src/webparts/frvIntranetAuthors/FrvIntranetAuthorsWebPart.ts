import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'FrvIntranetAuthorsWebPartStrings';
import FrvIntranetAuthors from './components/FrvIntranetAuthors';
import { IFrvIntranetAuthorsProps } from './components/IFrvIntranetAuthorsProps';
import { SPPermission } from '@microsoft/sp-page-context';
export interface IFrvIntranetAuthorsWebPartProps {
  webparttitle: string;
}

export default class FrvIntranetAuthorsWebPart extends BaseClientSideWebPart<IFrvIntranetAuthorsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _isEditor: boolean = false;

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
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  private checkEditorPermission = ():boolean => {
    //Editor group can add item on list/library via addListItems permission
    const permission = new SPPermission(this.context.pageContext.web.permissions.value);
    const isMemberPermission = permission.hasPermission(SPPermission.addListItems);
    return isMemberPermission;
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
