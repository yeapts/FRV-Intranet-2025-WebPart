import { Tooltip, Text,   } from "@fluentui/react-components";
import { CallTransfer24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";


interface Props {
    userquickdial: string | undefined;
  }
  
  const UserQuickdial = ({ userquickdial }: Props): JSX.Element => {
    const classes = useStyles();
    if (userquickdial) {
      return (

        <span >
          <Tooltip  appearance="inverted" withArrow  positioning="above-start" content="Quick Dial" relationship="label">
            <CallTransfer24Filled className={classes.contactIcon} />
          </Tooltip> 
          <Tooltip appearance="inverted" withArrow  positioning="above-start" content="Quick Dial" relationship="label">  
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{userquickdial}</Text> 
          </Tooltip> 
        </span>

      );
    } else {
      return (
        <span>
           {userquickdial}
        </span>
      );
    }
  };
  
  export default UserQuickdial;