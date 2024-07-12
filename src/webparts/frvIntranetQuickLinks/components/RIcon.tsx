import { Image} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  url: string | undefined;
  icon: string | undefined;
  isdarkmode: boolean;
  }


  const Icon = ({ url, icon, isdarkmode }: Props): JSX.Element => {
    const classes = useStyles ();
    const currentIconCell =  isdarkmode ? classes.iconCellDark : classes.iconCell;

    if (icon) {
      return (
        <div className={currentIconCell}>
          <a href={url}>
            <Image className={classes.iconImage} src={icon}/> 
          </a>
        </div>
      );
    } else {
      return (  
        <div className={currentIconCell}>
          <a href={url}>
            <Image className={classes.iconImage} src={require('../assets/documents.svg')}/> 
          </a>
        </div>
      );
    }
  };
  
  export default Icon;