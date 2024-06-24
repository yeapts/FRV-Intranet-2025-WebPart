import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
  webpartStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    //color: 'var(--bodyText)',
  },
  textStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    //color: 'var(--bodyText)',
    overflow: "hidden",
    display: "block",
  },
  fluentProvider:{
    backgroundColor: '#ffffff00',
  },
  toolTip:{
    backgroundColor: "white",
  }  ,
    contactIcon:{
        //paddingLeft:"0px",
        //paddingRight:"5px",
        //paddingBottom:"0px",
        width:"12px",
        height:"12px",
        //color: 'var(--bodyText) !important',
      },
    itemSection:{
      marginTop: "5px",
      marginBottom: "5px",
    },
    contactSection:{
      marginTop: "5px",
      marginBottom: "5px",
      display:"flex",
      '&:hover': {
        backgroundColor: '#a1a1a133',
      },
    },
    itemAction: {
      alignContent: 'center',
      textAlign: 'right',
      display:'none',
    },  
    contactDetails:{
      display: 'flex',
      flexDirection: 'column',  
      flexGrow: 8,
      textAlign: 'left',
      alignContent: 'center',
      paddingLeft: '12px',
    },
    contactPhoneDetails:{
      display: 'flex',
    },
    contactPhoneExtension:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
    },
    contactPhoneQuickdial:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
    },
    contactEmail:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
    },
    contactMobilePhone:{
      display: 'flex',
      flexDirection: 'row',  
    },
    contactPhotoImage: {
      width:"45px",
      height:"45px",
    },

    button:{
      backgroundColor: 'var(--bodyBackground)',
      color: 'var(--bodyText)',
      minWidth: 'fit-content',
    },
    listAction:{
      marginBlockEnd: '1em',
    },
    dialogSurface: {
      backgroundColor: 'white',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      ...shorthands.gap("2px"),
      backgroundColor: 'white !important',
      color: 'black',
      Width: '100%',
    },
    inputField: {
      backgroundColor: 'white !important',
      color: 'black !important',
    },
    }
)