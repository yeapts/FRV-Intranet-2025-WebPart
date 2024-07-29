import * as React from 'react';
import styles from './FrvIntranetContacts.module.scss';
import type { IFrvIntranetContactsProps } from './IFrvIntranetContactsProps';
import { IState } from './IState'; 
import UserName from './RUserName';
import UserTitle from './RUserTitle';
import UserMobile from './RUserMobile';
import UserPhone from './RUserPhone';

import UserEmail from './RUserEmail';
import { useStyles } from './Styles';
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, FluentProvider, IdPrefixProvider, Input, Image} from '@fluentui/react-components';
import { AddRegular, DeleteRegular} from "@fluentui/react-icons";
import { customDarkTheme, customLightTheme } from '../../frvIntranet2025WebPart/components/Theme';
import { readAllItems } from './UReadAllItems';
import DeleteItem from './UDeleteItem';
import { createItem } from './UCreateItem';

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

const FrvIntranetContacts: React.FC<IFrvIntranetContactsProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });
  const [isAddDialogOpen, setAddDialogIsOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { webpartTitle, isEditor } = props;
  const classes = useStyles ();

  const handleOpenAddDialog = ():void => {
    setAddDialogIsOpen(true);
  };
  const addDialog = (): void => {
    handleOpenAddDialog();
  }
  const handleCloseAddDialog = ():void => {
    setAddDialogIsOpen(false);
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
    const inputEmail = document.getElementById('inputEmail') as HTMLInputElement | null;
    if (!inputEmail) {
      console.error('Input element with id "inputEmail" not found');
      return;
    }
    const inputEmailValue = inputEmail.value;
  
    try {
      await createItem(props, inputEmailValue, setAddDialogIsOpen, setState);
    } catch (error) {
      handleError(error);
      console.log(`Error creating item: ${error}`);
    }
  };

  React.useEffect(() => {
    handleReadAllItems().catch(handleError);
  }, []);

 const currentTheme = props.isDarkTheme ? customDarkTheme : customLightTheme;

  if (isEditor === true) 
    {
      return (
        <div className={classes.webpartStyle}>
        <section className={styles.section}>
        <IdPrefixProvider value={`frv-contact-${props.instanceId}-`}>
          <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
          <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
          <div className={classes.listAction}>
            <Button size="small" icon={<AddRegular />}  className={classes.button} appearance="subtle" onClick={()=>addDialog()}>Add Contact</Button>
          </div>
          <div>
            {state.items.map((item) => (
                <div className={`${styles.contactSection} ${classes.contactSectionHoverEffect}`} key={item.ID}>   
                  <div className={classes.contactPhotoDetails}>            
                  <Image className={classes.contactPhotoImage} src={`${props.absoluteUrl}/_layouts/15/userphoto.aspx?size=S&username=${encodeURIComponent(item.Name.EMail)}`} {...props} fit="center" shape="circular" />
                  </div>
                  <div className={classes.contactDetails}>
                    <div><UserName username={item.Title} nametitle={item.Name.Title}/></div>
                    <UserTitle usertitle={item.JobTitle} nametitle={item.Name.JobTitle} />
                    <div className={classes.contactPhoneDetails}>
                      <UserPhone userphone={item.Phone} namephone={item.Name.WorkPhone}/>
                      <UserMobile usermobile={item.Mobile} namemobile={item.Name.MobilePhone}/>                    
                    </div>                  
                    <UserEmail useremail={item.Name.EMail} />
                  </div>
                  <div className={`${styles.itemAction} ${classes.itemAction}`}>                 
                    <Button size="large" className={classes.button} onClick={handleDelete ( item.ID)}><DeleteRegular/></Button>
                  </div>   
                </div>
              ))}
          </div>
          </FluentProvider>
        </IdPrefixProvider>
        <IdPrefixProvider value={`frv-contacts-dialog-${props.instanceId}-`}>
        <FluentProvider theme={customLightTheme} className={classes.fluentProvider}>
          <Dialog open={isAddDialogOpen} onOpenChange={handleCloseAddDialog} >
              <DialogSurface className={classes.dialogSurface}>
                <DialogBody>
                  <DialogTitle className={classes.inputField}>Add author</DialogTitle>
                  <DialogContent className={classes.dialogContent}>
                    <Field label="Email" hint="Enter email address." className={classes.inputField}>
                    <Input type="email" id="inputEmail" className={classes.inputField}/>
                    </Field>
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
        </div>
      )
    }
  else
    {
      return (
        <div className={classes.webpartStyle}>
        <section className={styles.section}>
          <IdPrefixProvider value={`frv-contact-${props.instanceId}-`}>
            <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
              <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
              <div>
                {state.items.map((item) => (
                    <div className={classes.contactSection} key={item.ID}>
                      <div className={classes.contactPhotoDetails}>            
                      <Image className={classes.contactPhotoImage} src={`${props.absoluteUrl}/_layouts/15/userphoto.aspx?size=S&username=${encodeURIComponent(item.Name.EMail)}`} {...props} fit="center" shape="circular" />
                      </div>
                      <div className={classes.contactDetails}>
                        <div><UserName username={item.Title} nametitle={item.Name.Title}/></div>
                        <UserTitle usertitle={item.JobTitle} nametitle={item.Name.JobTitle} />
                        <div className={classes.contactPhoneDetails}>
                          <UserPhone userphone={item.Phone} namephone={item.Name.WorkPhone}/>
                          <UserMobile usermobile={item.Mobile} namemobile={item.Name.MobilePhone}/>                    
                        </div>                  
                        <UserEmail useremail={item.Name.EMail} />
                      </div>
                    </div>
                  ))}
              </div>
            </FluentProvider>
          </IdPrefixProvider>
        </section>
        </div>
      )
    }
  }

export default FrvIntranetContacts;