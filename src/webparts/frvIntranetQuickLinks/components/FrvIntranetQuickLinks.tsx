import * as React from 'react';
import styles from './FrvIntranetQuickLinks.module.scss';
import type { IFrvIntranetQuickLinksProps } from './IFrvIntranetQuickLinksProps';
import { useStyles } from './Styles';
import { QuicklinkState } from  '../../../models/QuicklinkState';
import { IconState } from  '../../../models/IconState';
import { readAllItems } from './UReadAllItems';
import { customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import { Text, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, FluentProvider, IdPrefixProvider, Input, InputProps, Theme, webDarkTheme } from '@fluentui/react-components';
import { AddRegular, DeleteRegular, EditRegular, ImageEditRegular } from '@fluentui/react-icons';
import { createItem } from './UCreateItem';
import Icon from './RIcon';
import Title from './RTitle';
import DeleteItem from './UDeleteItem';
import { editItem } from './UEditItem';
import { editItemImage } from './UEditItemImage';
import { readAllIcons } from './UReadAllIcons';
import IconCompact from './RIconCompact';

import TileDisplay from '../../../components/Container/TileDisplay/TileDisplay';

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
  const [state, setState] = React.useState<QuicklinkState>({ items: [], status: '', });
  const [iconState, setIconState] = React.useState<IconState>({ icons: [], status: '', });
  const {webpartTitle, isEditor,  pageFileName, webpartType } = props;
  const [isAddDialogOpen, setAddDialogIsOpen] = React.useState(false);
  const [isEditDialogOpen, setEditDialogIsOpen] = React.useState(false);
  const [isEditImageDialogOpen, setEditImageDialogIsOpen] = React.useState(false);
  const [URLvalueError,setURLValueError ] = React.useState("");
  const [itemID, setItemID] = React.useState<number | 0>(0);
  const [itemTitle, setItemTitle] = React.useState<string>("");
  const [itemUrl, setItemUrl] = React.useState<string>("https://");
  const [itemImageUrl, setItemImageUrl] = React.useState<string>("https://");
  const classes = useStyles ();

  const clearItemData = ():void => {
    setItemID (0);
    setItemTitle("");
    setItemUrl("https://");
    setItemImageUrl("https://");
  }

  const handleOpenAddDialog = ():void => {
    setAddDialogIsOpen(true);
  };
  const handleCloseAddDialog = ():void => {
    setAddDialogIsOpen(false);
    setItemUrl ("https://");
  };

  const handleOpenEditDialog = (pitemID: number, pitemTitle: string, pitemUrl: string ):void => {
    setItemID(pitemID);
    setItemTitle(pitemTitle);
    setItemUrl(pitemUrl);
    setEditDialogIsOpen(true);
  };

  const handleReadAllIcons = async (): Promise<void> => {
    await readAllIcons(props, setIconState);
    
  };

  const handleOpenEditImageDialog = (pitemID: number, pitemUrl: string ):void => {
    setItemID(pitemID);
    setItemImageUrl(pitemUrl);
    handleReadAllIcons().catch(handleError);
    setEditImageDialogIsOpen(true);
  };

  const handleCloseEditDialog = ():void => {
    setEditDialogIsOpen(false);
  };

  const handleCloseEditImageDialog = ():void => {
    setEditImageDialogIsOpen(false);
  };
  const handleReadAllItems = async (): Promise<void> => {
    await readAllItems(props, setState);
    clearItemData();
  };


  const handleCreateItem = async (): Promise<void> => {
    //const inputTitle = document.getElementById('inputTitle')as HTMLInputElement; 
    //const inputURL = document.getElementById('inputURL')as HTMLInputElement; 
    if (itemUrl.indexOf("https://") === -1) {
      alert("your url must start with https://");
      console.error('Input element "https" not found');
      return;
    }  
    try {
      await createItem(props, itemTitle , itemUrl , webpartType , pageFileName , webpartTitle, setAddDialogIsOpen, setState);
      setItemUrl ("https://");
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

  const handleEditItem = (): (() => Promise<void>) => async () => {
    //const inputTitle = document.getElementById('inputTitle')as HTMLInputElement; 
    //const inputURL = document.getElementById('inputURL')as HTMLInputElement;
    //if (!inputTitle) {
    //  console.error('Input element "Title" not found');
    //  return;
    //}  
    try {
      await editItem( props, itemID, itemTitle, itemUrl, webpartType, pageFileName, webpartTitle, setAddDialogIsOpen, setState );
    } catch (error) {
      handleError(error);
      console.log(`Error Edit item: ${error}`);
    }
    setEditDialogIsOpen(false);
  };

  const handleEditItemImage = ( pIconUrl:string): (() => Promise<void>) => async () => {
    const iconUrl= "https://firerescuevictoria.sharepoint.com"+ pIconUrl;
    console.log(pIconUrl);
    try {
      await editItemImage( props, itemID, iconUrl, setAddDialogIsOpen, setState );
    } catch (error) {
      handleError(error);
      console.log(`Error Edit item: ${error}`);
    }
    setEditImageDialogIsOpen(false);
  };

  const handleCancelItem = (): (() => Promise<void>) => async () => {
    setItemUrl("https://");
  };
  const handleCancelItemImage = (): (() => Promise<void>) => async () => {
    setItemImageUrl ("https://");
  };
  React.useEffect(() => {
    handleReadAllItems().catch(handleError);
  }, []);

  const onChangeTitle: InputProps["onChange"] = ( ev, data) => {
    setItemTitle(data.value);
  };

  const onChangeURL: InputProps["onChange"] = ( ev, data) => {
    const isValid = data.value.search("https://");
    setURLValueError(isValid ? "Incorrect URL" : "");
    setItemUrl(data.value);
  };

  const onChangeImageURL: InputProps["onChange"] = ( ev, data) => {
    const isValid = data.value.search("https://");
    setURLValueError(isValid ? "Incorrect URL" : "");
    setItemImageUrl(data.value);
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
                  <Button size="large" className={classes.button} onClick={()=>handleOpenEditImageDialog(item.ID , item.Icon)} ><ImageEditRegular /></Button>
                  <Button size="large" className={classes.button} onClick={()=>handleOpenEditDialog(item.ID , item.Title, item.Url)}><EditRegular /></Button>
                  <Button size="large" className={classes.button} onClick={handleDeleteItem(item.ID)}><DeleteRegular /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <TileDisplay siteUrl={props.absoluteUrl} listName={'QuickLinks'}  />
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
                <Input type="text" id="inputTitle"  onChange={onChangeTitle} className={classes.inputField} />
                <Field label="URL" hint="Enter webpage or document's URL" className={classes.inputField} />
                <Input type="url" id="inputUrl" onChange={onChangeURL}  className={classes.inputField} />
                <Text>{URLvalueError}</Text>
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={handleCreateItem}>Add</Button>
                <DialogTrigger disableButtonEnhancement>
                  <Button onClick={handleCancelItem}>Cancel</Button>
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
                <Input type="text" id="inputTitle" onChange={onChangeTitle} value={itemTitle} className={classes.inputField} />
                <Field label="URL" hint="Enter webpage or document's URL" className={classes.inputField} />
                <Input type="url" id="inputUrl" onChange={onChangeURL} value={itemUrl} className={classes.inputField} />
                <Text>{URLvalueError}</Text>
              </DialogContent>
              <DialogActions>
                <Button appearance="primary" onClick={handleEditItem()}>Update</Button>
                <DialogTrigger disableButtonEnhancement>
                  <Button onClick={()=>handleCancelItem()}>Cancel</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
        <Dialog open={isEditImageDialogOpen} onOpenChange={handleCloseEditImageDialog}>
          <DialogSurface className={classes.dialogSurface}>
            <DialogBody>
              <DialogTitle className={classes.inputField}>Edit Icon</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <Field label="URL" hint="Enter image URL" className={classes.inputField} />
                <Input type="url" id="inputImageUrl" onChange={onChangeImageURL} value={itemImageUrl} className={classes.inputField} />
                <Text>{URLvalueError}</Text>
                <div className={classes.listSection}>
                  {iconState.icons.map((icon) => (
                    <div className={`${styles.quicklinkSection}`} key={icon.ID}>
                      <div className={currentIconCell}>
                        <div className={classes.itemDetailCompact} onClick={handleEditItemImage(icon.FileRef)}>
                          <IconCompact url={`https://firerescuevictoria.sharepoint.com${icon.FileRef}`} />
                          <Title url={icon.FileRef} title={icon.Title} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button onClick={()=>handleCancelItemImage()}>Cancel</Button>
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