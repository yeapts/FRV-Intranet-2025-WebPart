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
    //const tooltipContent = userphone ? `Phone: ${userphone}`: `Phone: ${namephone}` ;
    if (userphone) {
      return (
        <div className={classes.contactPhoneExtension}>
          <Tooltip  appearance="inverted" positioning="above-start" content="Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip  appearance="inverted" positioning="above-start" content="Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{userphone}</Text> 
          </Tooltip> 
        </div>
      );
    } else if (namephone) {
      return (
        <div className={classes.contactPhoneExtension}>
          <Tooltip  appearance="inverted" positioning="above-start" content="Phone" relationship="label">
            <Call24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip  appearance="inverted" positioning="above-start" content="Phone" relationship="label">    
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{namephone}</Text> 
          </Tooltip> 
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  };
  
  export default UserPhone;