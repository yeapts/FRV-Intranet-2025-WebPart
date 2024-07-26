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
    


    const thumbnail = `https://firerescuevictoria.sharepoint.com/_layouts/15/getpreview.ashx?path=${url}`;
    if(wpimage==='Pictures'){
      if (image) {
        return (
          <div >
            <a href={url}>
              <Image className={classes.iconThumbnail}  fit="contain" src={image}/> 
            </a>
          </div>
        );
      } else {
        return (  
          <div >
            <a href={url}>
              <Image className={classes.iconThumbnail}  fit="contain" src={thumbnail}/> 
            </a>
          </div>
        );
      }
    } else {
      if (icon) {
        return (
          <div >
            <a href={url}>
              <Image className={classes.iconImage}  src={icon}/> 
            </a>
          </div>
        );
      } else {
        return (  
          <div >
            <a href={url}>
              <Image className={classes.iconImage}  src={require('../assets/documents.svg')}/> 
            </a>
          </div>
        );
      }
    }



  };
  
  export default Icon;