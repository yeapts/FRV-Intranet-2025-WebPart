import { Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";

export const customLightTheme: Theme = {
  ...webLightTheme,
  colorBrandBackground: '#0c2340', 
  colorCompoundBrandStroke: '#0c2340', 
  colorNeutralBackground1: 'var(--bodyBackground)',
};  

export const customDarkTheme: Theme = {
  ...webDarkTheme,
  colorBrandBackground: '#0c2340', 
  colorCompoundBrandStroke: '#0c2340', 
  colorNeutralBackground1: 'var(--bodyBackground)',
  colorSubtleBackgroundHover: '#14355f', 
  colorNeutralBackground1Hover: '#14355f', 
};  