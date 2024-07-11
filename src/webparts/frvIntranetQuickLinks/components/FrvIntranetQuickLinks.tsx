import * as React from 'react';
// import styles from './FrvIntranetQuickLinks.module.scss';
import type { IFrvIntranetQuickLinksProps } from './IFrvIntranetQuickLinksProps';
import { useStyles } from './Styles';
import { IState } from './IState'; 
import { readAllItems } from './UReadAllItems';
import { customDarkTheme, customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import { FluentProvider, IdPrefixProvider } from '@fluentui/react-components';
import Icon from './RIcon';
import Title from './RTitle';

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
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

 const currentTheme = props.isDarkTheme ? customDarkTheme : customLightTheme;

  if (isEditor === true) 
    {
    return (
      <section>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div className={classes.listSection}>
            {state.items.map((item) => (
                <div className={classes.itemDetail} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon}/>
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
      <section>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div>
            {state.items.map((item) => (
                <div className={classes.itemSection} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon}/>
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