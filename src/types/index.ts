export type Continent = 'אירופה' | 'אסיה' | 'אפריקה' | 'צפון אמריקה' | 'דרום אמריקה' | 'אוקיאניה';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  commonName?: string;
  nationality: string;
  flag: string;
  age: number;
  height: number;      // cm
  weight: number;      // kg
  foot: 'ימין' | 'שמאל';
  position: string;
  altPositions: string[];
  club: string;
  clubCrest: string;
  league: string;
  number: number;
  overall: number;
  potential: number;
  skillMoves: number;  // 1-5
  weakFoot: number;    // 1-5
  value: number;       // € — independent from overall
  wage: number;        // € per week
  contractUntil: number;
  releaseClause?: number;
  playStyles: string[];
  attributes: Record<string, number>;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  crest: string;       // emoji / placeholder
  country: string;
  continent: Continent;
  league: string;
  overall: number;
  founded: number;
  stadium: string;
  colors: [string, string];
}

export interface League {
  id: string;
  name: string;
  country: string;
  continent: Continent;
  teams: number;
  tier: number;
  logo: string;
}

export interface Manager {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  age: number;
  club: string | null;   // null = free agent
  formation: string;
  style: string;
  overall: number;
  contractUntil?: number;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  homeTeam: string;
  roof: boolean;
  built: number;
}

export interface Mod {
  id: string;
  name: string;
  type: string;
  version: string;
  author: string;
  gameVersion: string;
  updated: string;
  installed: boolean;
  status: 'בפיתוח' | 'פורסם' | 'טיוטה';
  cover: string;       // gradient key
  size: string;
  downloads?: number;
  rating?: number;
  conflict?: 'none' | 'possible' | 'critical';
}

export interface Transfer {
  id: string;
  player: string;
  from: string;
  to: string;
  fee: number;
  type: string;
  date: string;
  window: string;
}

export interface Activity {
  id: string;
  icon: string;
  text: string;
  time: string;
  color: string;
}
