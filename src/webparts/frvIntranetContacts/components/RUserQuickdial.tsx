import { Tooltip, Text, makeStyles, FluentProvider } from "@fluentui/react-components";
import { CallTransfer24Filled} from "@fluentui/react-icons";

import * as React from "react";


interface Props {
    userquickdial: string | undefined;
  }
  
const useStyles = makeStyles({  
    contactIcon:{
        paddingLeft:"0px",
        paddingRight:"5px",
        paddingBottom:"0px",
        width:"12px",
        height:"12px",
        color: 'var(--bodyText) !important',
      },
    }
)

  const UserQuickdial = ({ userquickdial }: Props): JSX.Element => {
    const classes = useStyles();
    if (userquickdial !== null) {
      return (
        <FluentProvider>
        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content={{ children: "Quick Dial" }} relationship="label">
            <div>
              <CallTransfer24Filled className={classes.contactIcon} />        
              <Text truncate wrap={false}>{userquickdial}</Text> 
            </div>
          </Tooltip> 
        </span>
        </FluentProvider>
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