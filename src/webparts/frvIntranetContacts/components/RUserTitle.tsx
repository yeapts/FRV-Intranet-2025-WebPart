import * as React from "react";
import { Text,   } from "@fluentui/react-components";
import { useStyles } from './Styles';
//import { customLightTheme } from './Theme';

interface Props {
    usertitle: string | undefined;
    nametitle: string;
  }
  
  const UserTitle = ({ usertitle, nametitle }: Props): JSX.Element => {
    const classes = useStyles();
    if (usertitle !== null) {
      return (

        <span>
        <Text className={classes.textStyle} truncate wrap={false}>{usertitle}</Text>   
        </span>

      );
    } else {
      return (
    
        <span>
        <Text className={classes.textStyle} truncate wrap={false}>{nametitle}</Text> 
        </span>

      );
    }
  };
  
  export default UserTitle;