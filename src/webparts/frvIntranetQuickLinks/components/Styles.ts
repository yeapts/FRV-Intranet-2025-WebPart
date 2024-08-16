import { makeStyles, shorthands } from "@fluentui/react-components";

const cellStyles = {
  minWidth:"107px",
  maxWidth: "114px",
  minHeight: "114px",
  borderRadius: "4px",
  overflow: "hidden",  
};

export const useStyles = makeStyles({  

  webpartTitle:{
    fontSize: '20px',
    fontWeight: '600',
    paddingBottom: '7px',
  },

  iconCellHover:{
    display: "flex",
    maxWidth: "114px",
    minHeight: "114px",
  },
  iconRedCell:{
    ...cellStyles,    
    display: "flex",
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#D6001C',
    '&:hover': {
      backgroundColor: '#D6001Cde',
    },
  },
  iconBlueCell:{
    ...cellStyles, 
    backgroundColor: '#0c2340',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#0c2340de',
    },
  },
  iconCellDark:{
    ...cellStyles, 
    backgroundColor: '#3A597F',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#3A597Fde',
    },
  },
  iconYellowCell:{
    ...cellStyles, 
    backgroundColor: '#FFC845',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#FFC845de',
    },
  },
  iconOrangeCell:{
    ...cellStyles, 
    backgroundColor: '#FF7500',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#FF7500de',
    },
  },
  iconGreenCell:{
    ...cellStyles, 
    backgroundColor: '#1a6d09',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#1a6d09de',
    },
  },
  iconGrayCell:{
    ...cellStyles, 
    backgroundColor: '#818181',
    display: 'flex',
    flexDirection: 'column',  
    position: 'relative',
    '&:hover': {
      backgroundColor: '#818181de',
    },
  },

  thumbnail:{
    width: '100%',

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
    paddingTop: '7px',
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
    width:'60%',   
    paddingTop: "10px", 
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "5px",
  },
  iconImageCompact:{
    width:'100%',   
    paddingTop: "10px", 
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "5px",
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

itemDetailCompact:{
  display: 'flex',
  flexDirection: 'column',  
  textAlign: 'center',
  alignContent: 'center',
  position: 'relative',
  maxWidth: '80px',  
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
    actionSection:{
      height: '18px',
    },
    actionButton:{
      paddingLeft:'0px',
      minWidth: 'fit-content',
      backgroundColor: 'var(--bodyBackground)',
      color: 'var(--bodyText)',
      '&:hover': {
        backgroundColor: 'var(--bodyBackground)',
        color: 'var(--bodyText)',
      },
      '&:hover .fui-Button__icon': {
        backgroundColor: 'var(--bodyBackground)',
        color: 'var(--bodyText)',
      },
    },
    button:{
      backgroundColor: 'white',
      color: 'black',
      minWidth: 'fit-content',
      padding: '7px',
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