import { Tooltip, Text,  FluentProvider } from "@fluentui/react-components";
import { ViewDesktopMobile24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";

interface Props {
  usermobile: string | undefined;
  namemobile: string;
  }
  
  const UserMobile = ({ usermobile, namemobile }: Props): JSX.Element => {
    const classes = useStyles();
    if (usermobile) {
      return (
        <FluentProvider>
        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Mobile Phone" relationship="label">
            <ViewDesktopMobile24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Mobile Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false}>{usermobile}</Text> 
          </Tooltip> 
        </span>
        </FluentProvider>
      );
    } else {
      return (
        <span>
          {namemobile}
        </span>
      );
    }
  };
  
  export default UserMobile;