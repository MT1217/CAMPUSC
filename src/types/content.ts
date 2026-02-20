export interface MenuItem {
  label: string;
  path: string | null;
  icon: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  path: string;
  adminOnly?: boolean;
}

export interface Navigation {
  logo: string;
  menuItems: MenuItem[];
}

export interface Action {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

export interface BaseCard {
  title: string;
  description: string;
  icon: string;
  adminOnly?: boolean;
}

export interface RegularCard extends BaseCard {
  path: string;
  buttonText: string;
  actions?: never;
}

export interface ActionCard extends BaseCard {
  path?: never;
  buttonText?: never;
  actions: Action[];
}

export type Card = RegularCard | ActionCard;

export interface HomeContent {
  title: string;
  subtitle: string;
  description: string;
  cards: Card[];
}

export interface Rooms {
  types: string[];
  status: string[];
}

export interface StudySpots {
  locations: string[];
  amenities: string[];
}

export interface Events {
  types: string[];
  status: string[];
}

export interface Content {
  navigation: Navigation;
  home: HomeContent;
  rooms: Rooms;
  studySpots: StudySpots;
  events: Events;
} 