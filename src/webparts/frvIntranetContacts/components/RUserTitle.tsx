import * as React from "react";
import { Text, Tooltip,   } from "@fluentui/react-components";
import { useStyles } from './Styles';
//import { customLightTheme } from './Theme';

interface Props {
    usertitle: string | undefined;
    nametitle: string;
  }
  
  const UserTitle = ({ usertitle, nametitle }: Props): JSX.Element => {
    const classes = useStyles();
    const tooltipContent = usertitle ?? nametitle;  
    if (usertitle !== null) {    
      return (
        <Tooltip appearance="inverted" positioning="above-start" content={tooltipContent} relationship="label">
          <Text className={classes.textStyle} truncate wrap={false} size={200}>{usertitle}</Text>   
        </Tooltip>
      );
    } else {
      return (   
        <Tooltip  appearance="inverted" positioning="above-start" content={tooltipContent} relationship="label">
          <Text className={classes.textStyle} truncate wrap={false} size={200}>{nametitle}</Text> 
        </Tooltip>
      );
    }
  };
  
  export default UserTitle;