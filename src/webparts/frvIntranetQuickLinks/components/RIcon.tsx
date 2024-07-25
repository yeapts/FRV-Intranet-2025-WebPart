import { Image} from "@fluentui/react-components";
import { useStyles } from './Styles';
import * as React from "react";
//import { customLightTheme } from "./Theme";

interface Props {
  url: string | undefined;
  icon: string | undefined;
  image: string | undefined;
  isdarkmode: boolean;
  webpartType: string;
  wpimage: string;
  }


  const Icon = ({ url, icon, image, wpimage, isdarkmode, webpartType }: Props): JSX.Element => {
    const classes = useStyles ();
    
    let currentIconCell ;

    if(webpartType==="Applications"){
       currentIconCell =  classes.iconRedCell ;
    }else if(webpartType==="I Want To"){
      currentIconCell =  classes.iconGreenCell ;
    }else if(webpartType==="Documents"){
      if (isdarkmode) {
        currentIconCell =  classes.iconCellDark ;
       }else {
          currentIconCell =  classes.iconBlueCell;
       }
    }else if(webpartType==="Topics"){
      currentIconCell =  classes.iconOrangeCell ;
    }else if(webpartType==="Sites"){
      if (isdarkmode) {
        currentIconCell =  classes.iconCellDark ;
       }else {
          currentIconCell =  classes.iconBlueCell;
       }
    }else if(webpartType==="News"){
      currentIconCell =  classes.iconYellowCell ;
    }else if(webpartType==="External Websites"){
      currentIconCell =  classes.iconGrayCell ;
    }else if (isdarkmode) {
     currentIconCell =  classes.iconCellDark ;
    }else {
       currentIconCell =  classes.iconWhiteCell;
    }

    const thumbnail = `https://firerescuevictoria.sharepoint.com/_layouts/15/getpreview.ashx?path=${url}`;
    if(wpimage==='Pictures'){
      if (image) {
        return (
          <div className={currentIconCell}>
            <a href={url}>
              <Image className={classes.iconThumbnail}  shadow bordered fit="contain" src={image}/> 
            </a>
          </div>
        );
      } else {
        return (  
          <div className={currentIconCell}>
            <a href={url}>
              <Image className={classes.iconThumbnail} shadow bordered fit="contain" src={thumbnail}/> 
            </a>
          </div>
        );
      }
    } else {
      if (icon) {
        return (
          <div className={currentIconCell}>
            <a href={url}>
              <Image className={classes.iconImage} shadow bordered src={icon}/> 
            </a>
          </div>
        );
      } else {
        return (  
          <div className={currentIconCell}>
            <a href={url}>
              <Image className={classes.iconImage} shadow bordered src={require('../assets/documents.svg')}/> 
            </a>
          </div>
        );
      }
    }



  };
  
  export default Icon;