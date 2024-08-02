import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({

  webpartTitle:{
    fontSize: '20px',
    fontWeight: '600',
    paddingBottom: '7px',
  },

  webpartStyle:{
    //backgroundColor: 'var(--bodyBackground)',
    //color: 'var(--bodyText)',
  },
  textStyle:{
    //color: 'var(--bodyText)',
  },
  fluentProvider:{
    backgroundColor: '#ffffff00',
  },
  actionSection:{
    height: '18px',
    paddingTop: '5px',
  },
  actionButton: {
    paddingLeft:'0px',
    backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
    minWidth: 'fit-content',
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

  itemTitle:{
    flexGrow: 8,
    textAlign: 'left',
    alignContent: 'center',
    color: 'var(--bodyText)',
  },
  itemIcon:{
    alignContent: 'center',
    paddingRight: '0.25em',
    color: 'var(--bodyText)',
    height: '32px',
  },
  itemAction: {
    alignContent: 'center',
    textAlign: 'right',
    display:'none',
  }, 
  list:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  authorSection:{
    marginTop: "7px",
    marginBottom: "5px",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    display:"flex",
    '&:hover': {
      backgroundColor: '#a1a1a133',
    },
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
})