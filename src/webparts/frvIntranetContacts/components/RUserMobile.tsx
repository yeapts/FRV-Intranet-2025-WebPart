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
    //const tooltipContent = usermobile ? `Mobile: ${usermobile}`: `Mobile: ${namemobile}` ;
    if (usermobile) {
      return (
        <div className={classes.contactMobilePhone}>
          <Tooltip  appearance="inverted" positioning="above-start" content="Mobile" relationship="label">
            <ViewDesktopMobile24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip  appearance="inverted" positioning="above-start" content="Mobile"relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{usermobile}</Text> 
          </Tooltip> 
        </div>
      );
    } else if (namemobile) {
      return (
        <div className={classes.contactMobilePhone}>
          <Tooltip  appearance="inverted" positioning="above-start" content="Mobile" relationship="label">
            <ViewDesktopMobile24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip  appearance="inverted" positioning="above-start" content="Mobile"relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{namemobile}</Text> 
          </Tooltip> 
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  };
  
  export default UserMobile;