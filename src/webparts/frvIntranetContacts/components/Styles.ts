import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
  webpartStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    //color: 'var(--bodyText)',
  },
  textStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    //color: 'var(--bodyText)',
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
      paddingTop: "5px",
      paddingBottom: "5px",
    },
    contactSection:{
      paddingTop: "5px",
      paddingBottom: "5px",
      display:"flex",
      '&:hover': {
        backgroundColor: '#e6e6e6',
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
    },
    contactPhoneDetails:{
      display: 'flex',
    },
    contactPhoneExtension:{
      paddingRight:'10px',
    },
    contactPhoneQuickdial:{
      paddingRight:'10px',
    },
    contactPhotoImage: {
      width:"45px",
      height:"45px",
      margin:"5px",
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
    }
    }
)