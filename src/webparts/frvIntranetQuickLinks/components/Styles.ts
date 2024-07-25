import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
  iconRedCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#D6001C',
  },
  iconCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
  },
  iconBlueCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#0c2340',
    },
  iconCellDark:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#3A597F',
  },
  iconYellowCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#FFC845',
  },
  iconOrangeCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#FF7500',
  },
  iconWhiteCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#FFFFFF',
  },
  iconGreenCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#1a6d09',
  },
  iconGrayCell:{
    maxWidth: "100px",
    maxHeight: "100px",
    overflow: "hidden",
    backgroundColor: '#818181',
  },


  iconCellTitle:{
    maxWidth: "100px",
    overflow: "hidden",
    marginTop:"5px",
  },

  listSection :{
    marginTop: "5px",
    marginBottom: "15px",
    display:"flex",
    flexDirection:"row",
    rowGap: "15px",
    flexWrap:"wrap",
    position:'relative',
    columnGap: "32px",
  },

  iconThumbnail:{
    width:'100%', 
  },

  iconImage:{
    width:'100%',
    filter:  'invert(98%) sepia(98%) saturate(7%) hue-rotate(155deg) brightness(102%) contrast(106%)',
    padding: "10px",
  },

  iconImageDark:{
    width:'100%',  
    padding: "10px",
  },

itemDetail:{
  display: 'flex',
  flexDirection: 'column',  
  textAlign: 'left',
  alignContent: 'center',
  position: 'relative',
  maxWidth: '300px',  
  '&:hover': {
    backgroundColor: '#a1a1a133',
  },
},

itemAction: {
  alignContent: 'center',
  textAlign: 'right',
  display:'none',
  position:'absolute',
  right: '5px',
  bottom: '5px',
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
      margin: "5px",
      maxWidth: "300px",
      '&:hover': {
        backgroundColor: '#a1a1a133',
      },
    },
    contactSection:{
      marginTop: "5px",
      marginBottom: "15px",
      display:"flex",

      position:'relative',
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