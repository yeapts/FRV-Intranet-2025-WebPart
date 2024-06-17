import {FluentProvider, Subtitle2Stronger} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
import { customLightTheme } from "./Theme";

interface Props {
  username: string | undefined;
  nametitle: string;
  }

  const UserName = ({ username, nametitle }: Props): JSX.Element => {
    const classes = useStyles ();
    if (username) {
      return (
        <FluentProvider theme={customLightTheme}> 
        <span >
            <Subtitle2Stronger className={classes.textStyle} truncate wrap={false}>{username}</Subtitle2Stronger> 
        </span>
        </FluentProvider>
      );
    } else {
      return (
        <FluentProvider theme={customLightTheme}> 
        <span >
            <Subtitle2Stronger className={classes.textStyle} truncate wrap={false}>{nametitle}</Subtitle2Stronger> 
        </span>
        </FluentProvider>
      );
    }
  };
  
  export default UserName;