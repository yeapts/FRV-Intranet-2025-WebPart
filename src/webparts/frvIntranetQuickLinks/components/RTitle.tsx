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
        <div className={classes.iconCellTitle}>
          <a href={url} >
            <Text align="center" size={200} weight="regular" truncate={true} className={classes.textStyle}  wrap={true}>{title}</Text> 
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