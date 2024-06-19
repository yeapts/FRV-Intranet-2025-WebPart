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
    backgroundColor: 'var(--bodyBackground)',
    color: 'var(--bodyText)',
    minWidth: 'fit-content',
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
  },
  itemAction:{
    alignContent: 'center',
    textAlign: 'right',
  },
  list:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
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