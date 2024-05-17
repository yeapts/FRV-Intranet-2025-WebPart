import * as React from 'react';
import styles from './FrvIntranet2025WebPart.module.scss';
import type { IFrvIntranet2025WebPartProps } from './IFrvIntranet2025WebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class FrvIntranet2025WebPart extends React.Component<IFrvIntranet2025WebPartProps, {}> {
  public render(): React.ReactElement<IFrvIntranet2025WebPartProps> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.frvIntranet2025WebPart} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>          
          <div>{escape(userDisplayName)}</div>          
        </div>
        <div className={styles.helpToolbar}>
          <div className={styles.item}>
            <div className={styles.links}>
              <a href="https://firerescuevictoria.sharepoint.com/SitePages/Intranet-Help-Home-Page.aspx" target="_blank" rel="noreferrer">
                <img alt="" src={isDarkTheme ? require('../assets/help.png') : require('../assets/help.png')} className={styles.icon} />
              </a>
            </div>
            <div>Help</div>
          </div>          
        </div>
        <div className={styles.message}>
          <div>{environmentMessage}</div>
        </div>
      </section>
    );
  }
}
