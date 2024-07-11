import { Image} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  url: string | undefined;
  icon: string | undefined;
  }

  const Icon = ({ url, icon }: Props): JSX.Element => {
    const classes = useStyles ();
    if (icon) {
      return (
        <div className={classes.iconCell}>
          <a href={url}>
            <Image className={classes.iconImage} src={icon}/> 
          </a>
        </div>
      );
    } else {
      return (  
        <div className={classes.iconCell}>
          <a href={url}>
            <Image className={classes.iconImage} src={require('../assets/document-file-office-svgrepo-com.svg')}/> 
          </a>
        </div>
      );
    }
  };
  
  export default Icon;