import {  Text } from "@fluentui/react-components";
import { Mail24Filled} from "@fluentui/react-icons";
import { useStyles } from './Styles';
import * as React from "react";


interface Props {
    useremail: string | undefined;
  }

  const UserEmail = ({ useremail }: Props): JSX.Element => {
    const classes = useStyles();
    //const tooltipContent = `Email: ${useremail}`;
    //          <Tooltip  appearance="inverted" positioning="above-start" content={tooltipContent} relationship="label">   
    //          </Tooltip> 
    if (useremail) {
      return (
        <div className={classes.contactEmail}>
            <Mail24Filled className={classes.contactIcon} />           
            <Text className={classes.textStyle} truncate wrap={false} size={200}>{useremail}</Text> 
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  };
  
  export default UserEmail;