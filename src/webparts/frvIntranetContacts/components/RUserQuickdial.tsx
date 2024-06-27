import { Tooltip, Text,   } from "@fluentui/react-components";
import { CallTransfer24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";


interface Props {
    userquickdial: string | undefined;
  }
  
  const UserQuickdial = ({ userquickdial }: Props): JSX.Element => {
    const classes = useStyles();
    const tooltipContent = `Quick Dial: ${userquickdial}`;
    if (userquickdial) {
      return (
        <div className={classes.contactPhoneQuickdial}>
          <Tooltip  appearance="inverted"   positioning="above-start" content={tooltipContent} relationship="label">
            <CallTransfer24Filled className={classes.contactIcon} />
          </Tooltip> 
          <Tooltip appearance="inverted"   positioning="above-start" content={tooltipContent} relationship="label">  
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{userquickdial}</Text> 
          </Tooltip> 
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  };
  
  export default UserQuickdial;