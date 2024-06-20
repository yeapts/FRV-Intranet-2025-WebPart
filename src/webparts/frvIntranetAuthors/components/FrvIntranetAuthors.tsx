import * as React from 'react';
import styles from './FrvIntranetAuthors.module.scss';
import { SPHttpClient } from '@microsoft/sp-http';
import { IState } from './IState'; 
import { IFrvIntranetAuthorsProps } from './IFrvIntranetAuthorsProps';
import {  Button ,  Dialog, 
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent, Input, Field,
   Text,
   IdPrefixProvider,
   FluentProvider,
   } from '@fluentui/react-components';
import { PersonEditRegular, AddRegular} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import { customDarkTheme, customLightTheme } from '../../frvIntranetContacts/components/Theme';
//import { customLightTheme } from './Theme';

const handleDelete = (DeleteItem: (id: string) => Promise<void>, id: string): () => Promise<void> => async () => {
  await DeleteItem(id);
};

const handleError = (error: Error): void => {  
  console.error(error);  // Log the error or send it to an error reporting service here
};

const FrvIntranetAuthors: React.FC<IFrvIntranetAuthorsProps> = (props) => {
  const [state, setState] = React.useState<IState>({ items: [], status: '', });
  const [isAddDialogOpen, setAddDialogIsOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
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
  const readAllItem = async (): Promise<void> => {
    try {
      setState({ status: 'Loading all items...', items: [] });
      const response = await props.spHttpClient.get(`${props.absoluteUrl}/_api/web/SiteGroups/GetById(${props.sharepointGroupID})/Users`,SPHttpClient.configurations.v1,{headers:{Accept:'application/json;odata=nometadata','odata-version':'',},});
      const data = await response.json();
      setState({ status: 'Items loaded', items: data?.value ?? [] });
    } catch (error) {
      handleError(error);
      setState({ status: `Loading failed: ${error}`, items: [] });
    }
  };
  React.useEffect(() => { readAllItem().catch(handleError); }, []);

  const DeleteItem = async (itemId:string): Promise<void> => {
    try {
      console.log (`Deleting... ${itemId}`);
      await props.spHttpClient.post(`${props.absoluteUrl}/_api/Web/SiteGroups/GetById(${props.sharepointGroupID})/Users/removeById(${itemId})`,SPHttpClient.configurations.v1,
      {headers: {
        'X-HTTP-Method': 'DELETE'
      }});
      console.log(`Item with ID: ${itemId} successfully deleted`);
      setState({ status: 'successfully deleted', items: [] });
      readAllItem().catch(handleError);
    } catch (error) {
      handleError(error);
      console.log(`Error deleting item: ${error}`);
      setState({ status: 'error deleting', items: [] });
    }
    console.log (`Deleted... ${itemId}`);
  }

  const createItem = async (): Promise<void> =>
  {
    const inputEmail = document.getElementById('inputEmail') as HTMLInputElement;
    const inputEmailValue = inputEmail.value;
    try {
      console.log (`adding... ${inputEmail} - value: ${inputEmailValue}`);
      const body: string = JSON.stringify({ 'LoginName': `i:0#.f|membership|${inputEmailValue}`, }); 
      await props.spHttpClient.post(`${props.absoluteUrl}/_api/Web/SiteGroups/GetById(${props.sharepointGroupID})/Users`,SPHttpClient.configurations.v1,
      {headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
        },
        body: body
      });
      console.log(`Item added`);
      setState({ status: 'successfully added', items: [] });
      readAllItem().catch(handleError);
    } catch (error) 
    {
        handleError(error);
        console.log(`Error adding item: ${error}`);
        setState({ status: 'error adding', items: [] });
    }
    handleCloseAddDialog();
  }
  
  const currentTheme = props.isDarkTheme ? customDarkTheme : customLightTheme;

  const { webpartTitle, isEditor } = props;

  if (isEditor === true) {
    return (
      <div className={classes.webpartStyle}>
      <section className={styles.section}>
      <IdPrefixProvider value={`frv-authors-${props.instanceId}-`}>
      <FluentProvider theme={currentTheme} className={classes.fluentProvider}>
        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div>
          <div className={classes.listAction}>
            <Button size="small" icon={<AddRegular />}  className={classes.button} appearance="subtle" onClick={()=>addDialog()}>Add Author</Button>
          </div>
          <div>
            {state.items.map((item) => (
              <div key={item.Id} className={classes.list}>
                <PersonEditRegular className={classes.itemIcon} />
                <Text className={classes.itemTitle} truncate wrap={false}>{item.Title}</Text>
                <Button size="small" className={classes.button} onClick={handleDelete(DeleteItem, item.Id)}>Remove</Button>
              </div>
            ))}
          </div>

        </div>
        </FluentProvider>
        </IdPrefixProvider>
        <IdPrefixProvider value={`frv-authors-dialog-${props.instanceId}-`}>
        <FluentProvider theme={customLightTheme} className={classes.fluentProvider}>
        <Dialog open={isAddDialogOpen} onOpenChange={handleCloseAddDialog} >
                <div>
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
                </div>
              </Dialog>

              <Dialog open={isOpen} onOpenChange={handleClose} >
              <div>
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
                </div>
              </Dialog>
              </FluentProvider>
        </IdPrefixProvider>
      </section>
      </div>
    );
  } else {
    return (
      <section className={styles.section}>

        <h3 className={classes.textStyle}>{(webpartTitle)}</h3>
        <div>
            {state.items.map((item) => (
              <div key={item.Id} className={classes.list}>
                <div><PersonEditRegular className={classes.itemIcon} /></div>
                <div><Text className={classes.itemTitle} truncate wrap={false}>{item.Title}</Text></div>
              </div>
            ))}
        </div>
    
      </section>
    );
  }
};

export default FrvIntranetAuthors;