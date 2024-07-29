import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
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
  button:{
    backgroundColor: 'white',
    color: 'black',
    minWidth: 'fit-content',
    padding: '7px',
  },
  listAction:{
    marginBlockEnd: '1em',
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
    marginTop: "5px",
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