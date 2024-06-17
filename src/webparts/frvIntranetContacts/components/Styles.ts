import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
  webpartStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
  },
  textStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
  },
  toolTip:{
    backgroundColor: "white",
  }  ,
    contactIcon:{
        paddingLeft:"0px",
        paddingRight:"5px",
        paddingBottom:"0px",
        width:"12px",
        height:"12px",
        color: 'var(--bodyText) !important',
      },
    itemSection:{
      paddingTop: "5px",
      paddingBottom: "5px",
    },
    itemAction:{
      alignContent: 'center',
      textAlign: 'right',
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