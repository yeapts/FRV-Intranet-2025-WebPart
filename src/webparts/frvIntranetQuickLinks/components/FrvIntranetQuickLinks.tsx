import * as React from 'react';
import styles from './FrvIntranetQuickLinks.module.scss';
import type { IFrvIntranetQuickLinksProps } from './IFrvIntranetQuickLinksProps';
import { useStyles } from './Styles';
import { IState } from './IState'; 
import { readAllItems } from './UReadAllItems';
import { customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import { Text, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, FluentProvider, IdPrefixProvider, Input, InputProps, Theme, webDarkTheme } from '@fluentui/react-components';
import { AddRegular, DeleteRegular, EditRegular, ImageEditRegular } from '@fluentui/react-icons';
import { createItem } from './UCreateItem';
import Icon from './RIcon';
import Title from './RTitle';
import DeleteItem from './UDeleteItem';
import { editItem } from './UEditItem';

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
  const {webpartTitle, isEditor,  pageFileName, webpartType } = props;
  const [isAddDialogOpen, setAddDialogIsOpen] = React.useState(false);
  const [isEditDialogOpen, setEditDialogIsOpen] = React.useState(false);
  const [URLvalue, setURLValue] = React.useState("https://");
  const [URLvalueError, setURLValueError] = React.useState("");
  const [itemID, setItemID] = React.useState<number | 0>(0);
  const classes = useStyles ();

  const handleOpenAddDialog = ():void => {
    setAddDialogIsOpen(true);
  };
  const handleCloseAddDialog = ():void => {
    setAddDialogIsOpen(false);
    setURLValue ("https://");
  };

  const handleOpenEditDialog = (itemID: number):void => {
    setItemID(itemID);
    setEditDialogIsOpen(true);
  };
  const handleCloseEditDialog = ():void => {
    setEditDialogIsOpen(false);
  };

  const handleReadAllItems = async (): Promise<void> => {
    await readAllItems(props, setState);
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

  const handleDeleteItem = ( id: number): (() => Promise<void>) => async () => {
    try {
      await DeleteItem( props, setState, id);
    } catch (error) {
      handleError(error);
      console.log(`Error deleting item: ${error}`);
    }
  };

  const handleEditItem = ( id: number): (() => Promise<void>) => async () => {
    const inputTitle = document.getElementById('inputTitle')as HTMLInputElement; 
    if (!inputTitle) {
      console.error('Input element "Title" not found');
      return;
    }  
    try {
      await editItem( props, id, inputTitle.value , URLvalue, webpartType , pageFileName , webpartTitle, setAddDialogIsOpen, setState );
    } catch (error) {
      handleError(error);
      console.log(`Error Edit item: ${error}`);
    }
    setEditDialogIsOpen(false);
  };

  const handleCancelItem = (): (() => Promise<void>) => async () => {
    setURLValue("https://");
  };

  React.useEffect(() => {
    handleReadAllItems().catch(handleError);
  }, []);

  const onChange: InputProps["onChange"] = (ev, data) => {
    const isValid = data.value.search("https://");
    setURLValueError(isValid ? "Incorrect URL" : "");
    setURLValue(data.value);
  };

 const currentTheme = props.isDarkTheme ? customQuickLinksTheme : customLightTheme;

 const getIconCellClass = (): string => {
  switch (webpartType) {
    case "Applications":
      return classes.iconRedCell;
    case "I Want To":
      return classes.iconGreenCell;
    case "Documents":
    case "Sites":
      return props.isDarkTheme ? classes.iconCellDark : classes.iconBlueCell;
    case "Topics":
      return classes.iconOrangeCell;
    case "News":
      return classes.iconYellowCell;
    case "External Websites":
      return classes.iconGrayCell;
    default:
      return props.isDarkTheme ? classes.iconCellDark : classes.iconBlueCell;
  }
};

const currentIconCell = getIconCellClass();

const renderEditorView = (): JSX.Element => (
  <section className={styles.links}>
    <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
      <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <div className={classes.webpartTitle}>{webpartTitle}</div>
        <div >
          <Button size="small" icon={<AddRegular />} className={classes.actionButton} appearance="subtle" onClick={handleOpenAddDialog}>Add Link</Button>
        </div>
        <div className={classes.listSection}>
          {state.items.map((item) => (
            <div className={`${styles.quicklinkSection}`} key={item.ID}>
              <div className={currentIconCell}>
                <div className={classes.itemDetail}>
                  <Icon url={item.Url} icon={item.Icon} image={item.Image} wpimage={props.webpartImage} isdarkmode={props.isDarkTheme} webpartType={props.webpartType} />
                  <Title url={item.Url} title={item.Title} />
                </div>
                <div className={`${styles.itemAction} ${classes.itemAction}`}>
                  <Button size="large" className={classes.button}><ImageEditRegular /></Button>
                  <Button size="large" className={classes.button} onClick={() => handleOpenEditDialog(item.ID)}><EditRegular /></Button>
                  <Button size="large" className={classes.button} onClick={() => handleDeleteItem(item.ID)}><DeleteRegular /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FluentProvider>
    </IdPrefixProvider>
    <IdPrefixProvider value={`frv-quicklink-dialog-${props.instanceId}-`}>
      <FluentProvider theme={customLightTheme} className={classes.fluentProvider}>
        <Dialog open={isAddDialogOpen} onOpenChange={handleCloseAddDialog}>
          <DialogSurface className={classes.dialogSurface}>
            <DialogBody>
              <DialogTitle className={classes.inputField}>Add Quick Link</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <Field label="Title" hint="Enter display title" className={classes.inputField} />
                <Input type="text" id="inputTitle" className={classes.inputField} />
                <Field label="URL" hint="Enter webpage or document's URL" className={classes.inputField} />
                <Input type="url" id="inputUrl" onChange={onChange} value={URLvalue} className={classes.inputField} />
                <Text>{URLvalueError}</Text>
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={handleCreateItem}>Add</Button>
                <DialogTrigger disableButtonEnhancement>
                  <Button onClick={()=>handleCancelItem()}>Cancel</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
        <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEditDialog}>
          <DialogSurface className={classes.dialogSurface}>
            <DialogBody>
              <DialogTitle className={classes.inputField}>Edit Quick Link</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <Field label="Title" hint="Enter display title" className={classes.inputField} />
                <Input type="text" id="inputTitle" className={classes.inputField} />
                <Field label="URL" hint="Enter webpage or document's URL" className={classes.inputField} />
                <Input type="url" id="inputUrl" onChange={onChange} value={URLvalue} className={classes.inputField} />
                <Text>{URLvalueError}</Text>
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={()=>handleEditItem(itemID)}>Update</Button>
                <DialogTrigger disableButtonEnhancement>
                  <Button onClick={()=>handleCancelItem()}>Cancel</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </FluentProvider>
    </IdPrefixProvider>
  </section>
);

const renderViewerView = (): JSX.Element => (
  <section className={styles.links}>
    <IdPrefixProvider value={`frv-quicklinks-${props.instanceId}-`}>
      <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
      <div className={classes.webpartTitle}>{webpartTitle}</div>
        <div className={classes.listSection}>
          {state.items.map((item) => (
            <div className={`${styles.quicklinkSection} `} key={item.ID}>
              <div className={currentIconCell}>
                <div className={classes.itemDetail}>
                  <Icon url={item.Url} icon={item.Icon} image={item.Image} wpimage={props.webpartImage} isdarkmode={props.isDarkTheme} webpartType={props.webpartType} />
                  <Title url={item.Url} title={item.Title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </FluentProvider>
    </IdPrefixProvider>
  </section>
);

return isEditor ? renderEditorView() : renderViewerView();
};

export default FrvIntranetQuickLinks;