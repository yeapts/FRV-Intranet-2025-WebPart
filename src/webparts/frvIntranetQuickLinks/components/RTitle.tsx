import { Text} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  title: string | undefined;
  url: string | undefined;
  }

  const UserName = ({ title, url }: Props): JSX.Element => {
    const classes = useStyles ();
    if (title) {
      return (
        <div className={classes.iconCell}>
          <a href={url}>
            <Text size={300} weight="medium" className={classes.textStyle} truncate wrap={false}>{title}</Text> 
          </a>
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  };
  
  export default UserName;