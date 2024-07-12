import * as React from 'react';
import styles from './FrvIntranetQuickLinks.module.scss';
import type { IFrvIntranetQuickLinksProps } from './IFrvIntranetQuickLinksProps';
import { useStyles } from './Styles';
import { IState } from './IState'; 
import { readAllItems } from './UReadAllItems';
import {  customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import { FluentProvider, IdPrefixProvider, Theme, webDarkTheme } from '@fluentui/react-components';
import Icon from './RIcon';
import Title from './RTitle';

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
}; 

const customQuickLinksTheme: Theme = {
  ...webDarkTheme,
  colorBrandBackground: '#3A597F', 
  colorCompoundBrandStroke: '#3A597F', 
  colorNeutralBackground1: 'var(--bodyBackground)',
  colorSubtleBackgroundHover: '#14355f', //Button Hover
  colorNeutralBackground1Hover: '#14355f',  //Dialog Buton Hover
  colorNeutralStroke1Hover: 'white', // Button border color
  colorNeutralForeground1Hover: 'white', // Button Text color
  colorNeutralForeground2Hover: 'white', // Button Text color
  colorNeutralForeground2BrandHover: 'white', // Button icon color
  colorNeutralBackgroundStatic: '#3A597F' ,
};  

const FrvIntranetQuickLinks: React.FC<IFrvIntranetQuickLinksProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });
  const { webpartTitle, isEditor } = props;
  const classes = useStyles ();

  const handleReadAllItems = async (): Promise<void> => {
    await readAllItems(props, setState);
  };

  React.useEffect(() => {
    handleReadAllItems().catch(handleError);
  }, []);

 const currentTheme = props.isDarkTheme ? customQuickLinksTheme : customLightTheme;

  if (isEditor === true) 
    {
    return (
      <section className={styles.links}>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div className={classes.listSection}>
            {state.items.map((item) => (
                <div className={classes.itemDetail} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon} isdarkmode={props.isDarkTheme}/>
                  <Title url={item.Url} title={item.Title}/>
                </div>
              ))}
          </div>
      </FluentProvider>
      </IdPrefixProvider>
      </section>
    );
  } else{
    return (
      <section className={styles.section}>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div className={classes.listSection}>
            {state.items.map((item) => (
                <div className={classes.itemSection} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon} isdarkmode={props.isDarkTheme}/>
                  <Title url={item.Url} title={item.Title}/>
                </div>
              ))}
          </div>
      </FluentProvider>
      </IdPrefixProvider>
      </section>
    );
  }
  }

export default FrvIntranetQuickLinks;