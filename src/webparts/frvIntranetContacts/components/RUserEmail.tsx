import { Tooltip, Text } from "@fluentui/react-components";
import { Mail24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";


interface Props {
    useremail: string | undefined;
  }

  const UserEmail = ({ useremail }: Props): JSX.Element => {
    const classes = useStyles();
    if (useremail) {
      return (

        <span >
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Email" relationship="label">
            <Mail24Filled className={classes.contactIcon} />        
          </Tooltip> 
          <Tooltip withArrow appearance="inverted" positioning="above-start" content="Email" relationship="label">      
            <Text className={classes.textStyle} truncate wrap={false}>{useremail}</Text> 
          </Tooltip> 
        </span>

      );
    } else {
      return (
        <span>
           {useremail}
        </span>
      );
    }
  };
  
  export default UserEmail;