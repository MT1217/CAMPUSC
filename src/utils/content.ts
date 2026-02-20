import contentData from '../data/content.json';
import { Content } from '../types/content';

export const content: Content = contentData as Content;

type PathsToStringProps<T> = T extends string ? '' : {
  [K in keyof T]: T[K] extends object
    ? `${string & K}.${PathsToStringProps<T[K]>}`
    : string & K;
}[keyof T];

type Paths = PathsToStringProps<Content>;

export const getContent = (path: Paths): any => {
  return path.split('.').reduce((obj: any, key) => obj[key], content);
};

export const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    HomeIcon: require('@mui/icons-material/Home').default,
    CalendarMonthIcon: require('@mui/icons-material/CalendarMonth').default,
    SchoolIcon: require('@mui/icons-material/School').default,
    ClassIcon: require('@mui/icons-material/Class').default,
    EventNoteIcon: require('@mui/icons-material/EventNote').default,
  };
  return icons[iconName] || null;
}; 