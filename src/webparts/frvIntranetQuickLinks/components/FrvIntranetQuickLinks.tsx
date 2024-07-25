import * as React from 'react';
import styles from './FrvIntranetQuickLinks.module.scss';
import type { IFrvIntranetQuickLinksProps } from './IFrvIntranetQuickLinksProps';
import { useStyles } from './Styles';
import { IState } from './IState'; 
import { readAllItems } from './UReadAllItems';
import {  customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import {Text, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, FluentProvider, IdPrefixProvider, Input, InputProps, Theme, webDarkTheme } from '@fluentui/react-components';
import Icon from './RIcon';
import Title from './RTitle';
import { AddRegular } from '@fluentui/react-icons';
import { createItem } from './UCreateItem';
import DeleteItem from './UDeleteItem';

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
  const { webpartTitle, isEditor,  pageFileName, webpartType } = props;
  const [isAddDialogOpen, setAddDialogIsOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [URLvalue, setURLValue] = React.useState("https://");
  const [URLvalueError, setURLValueError] = React.useState("");
  const classes = useStyles ();

  const handleOpenAddDialog = ():void => {
    setAddDialogIsOpen(true);
  };
  const addDialog = (): void => {
    handleOpenAddDialog();
  }
  const handleCloseAddDialog = ():void => {
    setAddDialogIsOpen(false);
    setURLValue ("https://");
  };

  const handleClose = ():void => {
    setIsOpen(false);
  };

  const handleReadAllItems = async (): Promise<void> => {
    await readAllItems(props, setState);
  };
  const handleDelete = ( id: number): (() => Promise<void>) => async () => {
    try {
      await DeleteItem( props, setState, id);
    } catch (error) {
      handleError(error);
      console.log(`Error deleting item: ${error}`);
    }
  };
  const handleCreateItem = async (): Promise<void> => {
    const inputTitle = document.getElementById('inputTitle')as HTMLInputElement; 
    if (!inputTitle) {
      console.error('Input element "Title" not found');
      return;
    }
    
  
    try {
      await createItem(props, inputTitle.value , URLvalue, webpartType , pageFileName , webpartTitle, setAddDialogIsOpen, setState);
      setURLValue ("https://");
    } catch (error) {
      handleError(error);
      console.log(`Error creating item: ${error}`);
    }
  };

  React.useEffect(() => {
    handleReadAllItems().catch(handleError);
  }, []);

  const onChange: InputProps["onChange"] = (ev, data) => {
    // The controlled input pattern can be used for other purposes besides validation,
    // but validation is a useful example
    if (data.value.search("https://") === -1) {
      setURLValueError("Incorrect URL");
    }else{
      setURLValueError("Correct URL");
    }
    setURLValue(data.value);
  };

 const currentTheme = props.isDarkTheme ? customQuickLinksTheme : customLightTheme;

  if (isEditor === true) 
    {
    return (
      <section className={styles.links}>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div className={classes.listAction}>
            <Button size="small" icon={<AddRegular />}  className={classes.button} appearance="subtle" onClick={()=>addDialog()}>Add Link</Button>
          </div>
        <div className={classes.listSection}>
            {state.items.map((item) => (
                <div className={`${styles.quicklinkSection} ${classes.itemDetail}`} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon} image={item.Image} wpimage={props.webpartImage} isdarkmode={props.isDarkTheme} webpartType={props.webpartType}/>
                  <Title url={item.Url} title={item.Title}/>
                  <div className={`${styles.itemAction} ${classes.itemAction}`}>                 
                    <Button size="small" className={classes.button} onClick={handleDelete ( item.ID)}>Remove</Button>
                  </div>   
                </div>
              ))}
        </div>
      </FluentProvider>
      </IdPrefixProvider>
      <IdPrefixProvider value={`frv-quicklink-dialog-${props.instanceId}-`}>
        <FluentProvider theme={customLightTheme} className={classes.fluentProvider}>
          <Dialog open={isAddDialogOpen} onOpenChange={handleCloseAddDialog} >
              <DialogSurface className={classes.dialogSurface}>
                <DialogBody>
                  <DialogTitle className={classes.inputField}>Add Quick Link</DialogTitle>
                  <DialogContent className={classes.dialogContent}>
                    <Field label="Title" hint="Enter display title" className={classes.inputField}/>
                    <Input type="text" id="inputTitle" className={classes.inputField}/>
                    <Field label="URL" hint="Enter webpage or document's URL" className={classes.inputField}/>
                    <Input type="url" id="inputUrl" onChange={onChange} value={URLvalue} className={classes.inputField}/>    
                    <Text>{URLvalueError}</Text>                
                  </DialogContent>
                  <DialogActions>
                    <Button appearance="primary"  onClick={()=>handleCreateItem()} >Add</Button>                  
                    <DialogTrigger disableButtonEnhancement>
                      <Button >Cancel</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
          </Dialog>
          <Dialog open={isOpen} onOpenChange={handleClose} >
              <DialogSurface >
                <DialogBody>
                  <DialogTitle>Delete</DialogTitle>
                  <DialogContent >
                    Are you sure you want to delete? 
                  </DialogContent>
                  <DialogActions>
                    <Button appearance="primary">Delete</Button>
                    <DialogTrigger disableButtonEnhancement>
                      <Button >Cancel</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
          </Dialog>
          </FluentProvider>
        </IdPrefixProvider>
      </section>
    );
  } else{
    return (
      <section className={styles.links}>
        <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
        <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div className={classes.listSection}>
            {state.items.map((item) => (
                <div className={`${styles.quicklinkSection} ${classes.itemDetail}`} key={item.ID}>
                  <Icon url={item.Url} icon={item.Icon} image={item.Image} wpimage={props.webpartImage} isdarkmode={props.isDarkTheme} webpartType={props.webpartType}/>
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