import { Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";

export const customLightTheme: Theme = {
  ...webLightTheme,
  colorBrandBackground: '#0c2340', 
  colorCompoundBrandStroke: '#0c2340', 
  colorNeutralBackground1: 'var(--bodyBackground)',
  colorSubtleBackgroundHover: '#14355f',  //Button Hover
  colorNeutralBackground1Hover: '#14355f',  //Dialog Buton Hover
  colorNeutralStroke1Hover: 'white', // Button border color
  colorNeutralForeground1Hover: 'white', // Button Text color
  colorNeutralForeground2Hover: 'white', // Button Text color
  colorNeutralForeground2BrandHover: 'white', // Button icon color
  colorNeutralBackgroundStatic: '#0c2340' ,
};  

export const customDarkTheme: Theme = {
  ...webDarkTheme,
  colorBrandBackground: '#0c2340', 
  colorCompoundBrandStroke: '#0c2340', 
  colorNeutralBackground1: 'var(--bodyBackground)',
  colorSubtleBackgroundHover: '#14355f', //Button Hover
  colorNeutralBackground1Hover: '#14355f',  //Dialog Buton Hover
  colorNeutralStroke1Hover: 'white', // Button border color
  colorNeutralForeground1Hover: 'white', // Button Text color
  colorNeutralForeground2Hover: 'white', // Button Text color
  colorNeutralForeground2BrandHover: 'white', // Button icon color
  colorNeutralBackgroundStatic: '#0c2340' ,
};  