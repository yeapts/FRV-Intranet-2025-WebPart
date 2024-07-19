import { Image} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  url: string | undefined;
  icon: string | undefined;
  isdarkmode: boolean;
  webpartType: string;
  }


  const Icon = ({ url, icon, isdarkmode, webpartType }: Props): JSX.Element => {
    const classes = useStyles ();
    
    let currentIconCell ;

    if(webpartType==="Applications"){
       currentIconCell =  classes.iconRedCell ;
    }else if (isdarkmode) {
     currentIconCell =  classes.iconCellDark ;
    }else {
       currentIconCell =  classes.iconCell;
    }

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