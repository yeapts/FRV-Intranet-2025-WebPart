import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
iconCell:{
  maxWidth: "100px",
},
listSection :{
  marginTop: "5px",
  marginBottom: "15px",
  display:"flex",
  flexDirection:"row",
  flexWrap:"wrap",
  '&:hover': {
    backgroundColor: '#a1a1a133',
  },
  position:'relative',

},
iconImage:{
width:'100%',
},
itemDetail:{
  display: 'flex',
  flexDirection: 'column',  
  textAlign: 'left',
  alignContent: 'center',
  maxWidth: '300px',
},


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
      maxWidth: "300px",
    },
    contactSection:{
      marginTop: "5px",
      marginBottom: "15px",
      display:"flex",
      '&:hover': {
        backgroundColor: '#a1a1a133',
      },
      position:'relative',
    },
    itemAction: {
      alignContent: 'center',
      textAlign: 'right',
      display:'none',
      position:'absolute',
      right: '5px',
      bottom: '5px',
    },  
    contactDetails:{
      display: 'flex',
      flexDirection: 'column',  
      flexGrow: 8,
      textAlign: 'left',
      alignContent: 'center',
      paddingLeft: '12px',
      maxWidth: '80%',
    },
    contactPhotoDetails:{
      flexGrow: 0,
      
    },
    contactPhoneDetails:{
      display: 'flex',
      paddingTop: '3px',
      paddingBottom: '3px',
    },
    contactPhoneExtension:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
    },
    contactPhoneQuickdial:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
    },
    contactEmail:{
      paddingRight:'10px',
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
      '& span':{
          paddingLeft: '5px', 
      }
    },
    contactMobilePhone:{
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
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