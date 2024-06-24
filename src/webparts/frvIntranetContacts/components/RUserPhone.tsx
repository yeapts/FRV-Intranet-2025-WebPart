import { Tooltip, Text,   } from "@fluentui/react-components";
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
        <div className={classes.contactPhoneExtension}>
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{userphone}</Text> 
          </Tooltip> 
        </div>
      );
    } else {
      return (
        <div className={classes.contactPhoneExtension}>
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Work Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{namephone}</Text> 
          </Tooltip> 
        </div>
      );
    }
  };
  
  export default UserPhone;