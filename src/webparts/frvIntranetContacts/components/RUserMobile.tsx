import { Tooltip, Text,   } from "@fluentui/react-components";
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

        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Mobile Phone" relationship="label">
            <ViewDesktopMobile24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Mobile Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false}>{usermobile}</Text> 
          </Tooltip> 
        </span>

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