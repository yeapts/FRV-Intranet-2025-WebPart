import { Theme, webLightTheme } from "@fluentui/react-components";

export const customLightTheme: Theme = {
    ...webLightTheme,
    colorBrandBackground: '#0c2340', // overriden token
    colorCompoundBrandStroke: '#0c2340', // overriden token
    colorNeutralBackground1: 'var(--bodyBackground)',
    colorNeutralForeground1: 'var(--bodyBackground)',
  };