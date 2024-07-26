import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({  
  iconCellHover:{
    display: "flex",
    maxWidth: "114px",
    minHeight: "114px",

  },
  iconRedCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#D6001C',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#D6001Cde',
    },
  },
  iconBlueCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#0c2340',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#0c2340de',
    },
  },
  iconCellDark:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#3A597F',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#3A597Fde',
    },
  },
  iconYellowCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#FFC845',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#FFC845de',
    },
  },
  iconOrangeCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#FF7500',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#FF7500de',
    },
  },
  iconGreenCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#1a6d09',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#1a6d09de',
    },
  },
  iconGrayCell:{
    maxWidth: "114px",
    minHeight: "114px",
    overflow: "hidden",
    backgroundColor: '#818181',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#818181de',
    },
  },

  iconCellTitle:{
    overflow: "hidden",
    paddingBotton: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    textDecoration: "none",
  },

  listSection :{
    marginTop: "0px",
    marginBottom: "0px",
    display:"flex",
    flexDirection:"row",
    rowGap: "10px",
    flexWrap:"wrap",
    position:'relative',
    columnGap: "10px",
  },

  iconThumbnail:{
    width:'100%', 
  },

  iconImage:{
    width:'65%',   
    paddingTop: "10px", 
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
  },

  iconImageDark:{
    width:'100%',  
    padding: "10px",
  },

itemDetail:{
  display: 'flex',
  flexDirection: 'column',  
  textAlign: 'center',
  alignContent: 'center',
  position: 'relative',
  maxWidth: '400px',  

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
    color: 'white',
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