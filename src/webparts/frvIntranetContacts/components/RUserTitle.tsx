import * as React from "react";
import { Text,    } from "@fluentui/react-components";
import { useStyles } from './Styles';
//import { customLightTheme } from './Theme';

interface Props {
    usertitle: string | undefined;
    nametitle: string;
  }
  
  const UserTitle = ({ usertitle, nametitle }: Props): JSX.Element => {
    const classes = useStyles();
    //const tooltipContent = usertitle ?? nametitle;  
    //        <Tooltip appearance="inverted" positioning="above-start" content={tooltipContent} relationship="label">
    //        </Tooltip>
    if (usertitle !== null) {    
      return (
          <Text className={classes.textStyle} truncate wrap={true} weight="medium" size={200}>{usertitle}</Text>   
      );
    } else {
      return (   
          <Text className={classes.textStyle} truncate wrap={true} weight="medium" size={200}>{nametitle}</Text> 
      );
    }
  };
  
  export default UserTitle;