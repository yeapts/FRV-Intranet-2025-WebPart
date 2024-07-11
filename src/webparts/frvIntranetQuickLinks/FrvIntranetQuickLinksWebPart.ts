import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FrvIntranetQuickLinksWebPartStrings';
import FrvIntranetQuickLinks from './components/FrvIntranetQuickLinks';
import { IFrvIntranetQuickLinksProps } from './components/IFrvIntranetQuickLinksProps';
import { SPPermission } from '@microsoft/sp-page-context';

export interface IFrvIntranetQuickLinksWebPartProps {
  webparttitle: string;
  description: string;
}

export default class FrvIntranetQuickLinksWebPart extends BaseClientSideWebPart<IFrvIntranetQuickLinksWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _isEditor: boolean = false;

  public render(): void {

    this._isEditor = this.checkEditorPermission();

    const element: React.ReactElement<IFrvIntranetQuickLinksProps> = React.createElement(
      FrvIntranetQuickLinks,
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
        context: this.context,
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

  protected onInit(): Promise<void> {
    //return this._getEnvironmentMessage().then(message => {
    //  this._environmentMessage = message;
    // });
    return super.onInit();
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
      this.domElement.style.setProperty('--bodyBackground', semanticColors.bodyBackground || null);
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
