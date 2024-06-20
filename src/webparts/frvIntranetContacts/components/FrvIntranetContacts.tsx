import * as React from 'react';
import styles from './FrvIntranetContacts.module.scss';
import type { IFrvIntranetContactsProps } from './IFrvIntranetContactsProps';
import { IState } from './IState'; 
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Item } from './IItem';
import UserName from './RUserName';
import UserTitle from './RUserTitle';
import UserMobile from './RUserMobile';
import UserPhone from './RUserPhone';
import UserQuickdial from './RUserQuickdial';
import UserEmail from './RUserEmail';
import { useStyles } from './Styles';
//import { customLightTheme } from './Theme';
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, FluentProvider, IdPrefixProvider, Input, Image} from '@fluentui/react-components';
import { AddRegular} from "@fluentui/react-icons";
import { customDarkTheme, customLightTheme } from '../../frvIntranetAuthors/components/Theme';
//import { Theme } from '@fluentui/react';

const handleDelete = (DeleteItem: (id: number) => Promise<void>, id: number): () => Promise<void> => async () => {
  await DeleteItem(id);
};

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
  const fetchItems = async (): Promise<Item[]> => {
    const endpoint = `${props.absoluteUrl}/_api/web/lists/GetByTitle('Contacts')/Items?$expand=Name&$select=Name/Title,Name/EMail,Name/Department,Name/JobTitle,Name/WorkPhone,Name/FirstName,Name/MobilePhone,Name/Modified,Name/Created,Name/LastName,ID,QuickDial,Title,Mobile,Phone,Sort,JobTitle&$orderby=Sort asc`;
    const response = await props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
    const { value = [] } = await response.json();
    return value;
  };

  const readAllItems = async (): Promise<void> => {
    try {
      setState({ status: 'Loading all items...', items: [] });
      const items = await fetchItems();
      setState({ status: 'Items loaded', items });
      console.log({ items });
    } catch (error) {
      handleError(error);
      setState({ status: `Loading failed: ${error}`, items: [] });
    }
  };

  const DeleteItem = async (itemId:number): Promise<void> => {
    try {
      console.log (`Deleting... ${itemId}`);
      await props.spHttpClient.post(`${props.absoluteUrl}/_api/web/lists/getByTitle('Contacts')/items(${itemId})`,SPHttpClient.configurations.v1,
      {headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': '',
        'IF-MATCH': "*",
        'X-HTTP-Method': 'DELETE'
      }});
      console.log(`Item with ID: ${itemId} successfully deleted`);
      setState({ status: 'successfully deleted', items: [] });
      readAllItems().catch(handleError);
    } catch (error) {
      handleError(error);
      console.log(`Error deleting item: ${error}`);
      setState({ status: 'error deleting', items: [] });
    }
    console.log (`Deleted... ${itemId}`);
  }



  const getLatestUserId = (inputEmailValue:string): Promise<number> => {
    return new Promise<number>((resolve: (userId: number) => void, reject: (error: Error) => void): void => {
      props.spHttpClient.get(`${props.absoluteUrl}/_api/web/siteusers?$filter=UserPrincipalName eq '${inputEmailValue.toLowerCase()}'`, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: SPHttpClientResponse): Promise<{ value: { Id: number }[] }> => {
          return response.json();
        }, (error: Error): void => {
          console.log(`Error getting user ... ${inputEmailValue.toLowerCase()}`);
          reject(error);
        })
        .then((response: { value: { Id: number }[] }): void => {
          if (response.value.length === 0) {
            console.log(`Nout found user ... ${inputEmailValue.toLowerCase()}`);
            resolve(-1);
          }
          else {
            resolve(response.value[0].Id);
            console.log(`Found user ... ${inputEmailValue.toLowerCase()}`);
          }
        })
        .catch((error: Error): void => {
          console.log(`Error getting user ID ... ${inputEmailValue.toLowerCase()}`);
          reject(error);
        });
    });
  };

  const createItem = async (): Promise<void> =>
    {
      const inputEmail = document.getElementById('inputEmail') as HTMLInputElement;
      const inputEmailValue = inputEmail.value;
      try {
        const latestUserId = await getLatestUserId(inputEmailValue);
        if (latestUserId === -1) { throw new Error('No user found in the list'); }    
        console.log(`Loading information about user ID: ${latestUserId}...`);
        const response = await props.spHttpClient.get(`${props.absoluteUrl}/_api/web/lists/getByTitle('Contacts')/items?$filter=NameId eq ${latestUserId}`, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        });
        console.log('Response status:', response.status);
        console.log(`Adding... ${inputEmail} - value: ${inputEmailValue}`);
        const body: string = JSON.stringify({  
          'Title': "",
          'NameId': latestUserId,
          'Sort': 0,
        }); 
        await props.spHttpClient.post(`${props.absoluteUrl}/_api/web/lists/getByTitle('Contacts')/items`, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=nometadata',
            'odata-version': '',
          },
          body: body
        });   
        console.log(`Item added`);
        setState({ status: 'successfully added', items: [] });
        readAllItems().catch(handleError);
      } catch (error) {
        handleError(error);
        console.log(`Error adding item: ${error}`);
        alert("Unable to add contact. Check email address is entered correctly.")
      }
      handleCloseAddDialog();
    }

  React.useEffect(() => {
    readAllItems().catch(handleError);
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
            <Button size="small" icon={<AddRegular />}  className={classes.button} appearance="subtle" onClick={()=>addDialog()}>Add Author</Button>
          </div>
          <div>
            {state.items.map((item) => (
                <div className={`${styles.contactSection} ${classes.contactSection}`} key={item.ID}>               
                  <Image className={classes.contactPhotoImage} src={`${props.absoluteUrl}/_layouts/15/userphoto.aspx?size=S&username=${encodeURIComponent(item.Name.EMail)}`} {...props} fit="center" shape="circular" />
                  <div className={classes.contactDetails}>
                    <div><UserName username={item.Title} nametitle={item.Name.Title}/></div>
                    <div><UserTitle usertitle={item.JobTitle} nametitle={item.Name.JobTitle}/></div>
                    <div className={classes.contactPhoneDetails}>
                      <span className={classes.contactPhoneExtension}><UserPhone userphone={item.Phone} namephone={item.Name.WorkPhone}/></span>
                      <span className={classes.contactPhoneQuickdial}><UserQuickdial userquickdial={item.QuickDial}/></span>   
                      <span><UserMobile usermobile={item.Mobile} namemobile={item.Name.MobilePhone}/></span>                     
                    </div>                  
                    <div><UserEmail useremail={item.Name.EMail} /></div>
                  </div>
                  <div className={`${styles.itemAction} ${classes.itemAction}`}>                 
                    <Button size="small" className={classes.button} onClick={handleDelete(DeleteItem, item.ID)}>Remove</Button>
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
                    <Button appearance="primary"  onClick={()=>createItem()} >Add</Button>                  
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

          <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
          <div>
            {state.items.map((item) => (
                <div className={classes.itemSection} key={item.ID}>
                  <div><UserName username={item.Title} nametitle={item.Name.Title}/></div>
                  <div><UserTitle usertitle={item.JobTitle} nametitle={item.Name.JobTitle}/></div>
                  <div><UserMobile usermobile={item.Mobile} namemobile={item.Name.MobilePhone}/></div>
                  <div><UserQuickdial userquickdial={item.QuickDial}/></div>
                  <div><UserPhone userphone={item.Phone} namephone={item.Name.WorkPhone}/></div>
                  <div><UserEmail useremail={item.Name.EMail} /></div>
                </div>
              ))}
          </div>

        </section>
        </div>
      )
    }
  }

export default FrvIntranetContacts;