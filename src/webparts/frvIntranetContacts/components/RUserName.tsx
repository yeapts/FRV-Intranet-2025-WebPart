import { Text} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  username: string | undefined;
  nametitle: string;
  }

  const UserName = ({ username, nametitle }: Props): JSX.Element => {
    const classes = useStyles ();
    if (username) {
      return (

        <span >
            <Text size={300} weight="medium" className={classes.textStyle} truncate wrap={false}>{username}</Text> 
        </span>

      );
    } else {
      return (
  
        <span >
            <Text size={300} weight="medium" className={classes.textStyle} truncate wrap={false}>{nametitle}</Text> 
        </span>

      );
    }
  };
  
  export default UserName;