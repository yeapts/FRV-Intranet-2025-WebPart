import { Image} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  url: string | undefined;
  }

  const IconCompact = ({url}: Props): JSX.Element => {
    const classes = useStyles ();
      if (url) {
        return (
          <div className={classes.thumbnail}>
              <Image className={classes.iconImageCompact}  src={url}/> 
          </div>
        );
      } else {
        return (  
          <div className={classes.thumbnail}>
              <Image className={classes.iconImageCompact}  src={require('../assets/documents.svg')}/> 
          </div>
        );
      }
  };
  
  export default IconCompact;