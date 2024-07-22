import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
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
  webpartimage: string;
  webparttype: string;
  description: string;
}

export default class FrvIntranetQuickLinksWebPart extends BaseClientSideWebPart<IFrvIntranetQuickLinksWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _isEditor: boolean = false;
  private _webpartWidth: number = 0;
  private _pageFilename : string ='';

  public render(): void {

    this._isEditor = this.checkEditorPermission();

    const element: React.ReactElement<IFrvIntranetQuickLinksProps> = React.createElement(
      FrvIntranetQuickLinks,
      {
        webpartTitle: this.properties.webparttitle,
        webpartType: this.properties.webparttype,
        webpartImage: this.properties.webpartimage,
        absoluteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient,
        isEditor: this._isEditor,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        instanceId: this.context.instanceId,
        context: this.context,
        pageFileName: this._pageFilename,
        webpartWidth: this._webpartWidth,
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
    // Set the CSS property for the web part width
    this.domElement.style.setProperty('--webpartWidth', String(this.width) + "px" || null);

    const { serverRequestPath } = this.context.pageContext.site;
    const { serverRelativeUrl } = this.context.pageContext.web;    
    this._pageFilename = serverRequestPath.toLowerCase()
        .replace(serverRelativeUrl.toLowerCase(), "")
        .replace("/sitepages/", "")
        .replace("/pages/", "");

    //return this._getEnvironmentMessage().then(message => {
    //  this._environmentMessage = message;
    // });
    this._webpartWidth = this.width;
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

  protected onAfterResize(newWidth: number):void {
    console.log("New web part width: " + newWidth);
    this.domElement.style.setProperty('--webpartWidth', String(this.width)+"px"  || null);
    this._webpartWidth = newWidth;
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
                }),
                PropertyPaneDropdown('webparttype', {
                  label: 'Web Part Type',
                  options: [{
                    key: 'Documents',
                    text: 'Documents'
                  },
                  {
                    key: 'Topics',
                    text: 'Topics'
                  },
                  {
                    key: 'News',
                    text: 'News'
                  },
                  {
                    key: 'I Want To',
                    text: 'I Want To'
                  },
                  {
                    key: 'Sites',
                    text: 'Sites'
                  },
                  {
                    key: 'External Websites',
                    text: 'External Websites'
                  },
                  {
                    key: 'Applications',
                    text: 'Applications'
                  }]
                }),
                PropertyPaneDropdown('webpartimage', {
                  label: 'Web Part Image',
                  options: [{
                    key: 'Icons',
                    text: 'Icons'
                  },
                  {
                    key: 'Pictures',
                    text: 'Pictures'
                  }]
                }),
                PropertyPaneTextField('webpartid', {
                  label: 'Web Part ID',
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
