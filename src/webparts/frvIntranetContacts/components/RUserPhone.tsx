import { Tooltip, Text,  FluentProvider } from "@fluentui/react-components";
import { Call24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";

interface Props {
    userphone: string | undefined;
    namephone: string;
  }
    const UserPhone = ({ userphone, namephone }: Props): JSX.Element => {
    const classes = useStyles();
    if (userphone) {
      return (
        <FluentProvider>
        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false}>{userphone}</Text> 
          </Tooltip> 
        </span>
        </FluentProvider>
      );
    } else {
      return (
        <FluentProvider>
        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false}>{namephone}</Text> 
          </Tooltip> 
        </span>
        </FluentProvider>
      );
    }
  };
  
  export default UserPhone;