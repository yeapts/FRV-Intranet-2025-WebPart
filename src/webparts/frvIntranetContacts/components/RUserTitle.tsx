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
        <Text className={classes.textStyle} truncate wrap={true} size={200}>{usertitle}</Text>   
      );
    } else {
      return (   
        <Text className={classes.textStyle} truncate wrap={true} size={200}>{nametitle}</Text> 
      );
    }
  };
  
  export default UserTitle;