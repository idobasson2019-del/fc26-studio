import type { Player, Team, League, Manager, Stadium, Mod, Transfer, Activity, Continent } from '../types';

export const CONTINENTS: { name: Continent; icon: string; countries: number }[] = [
  { name: 'אירופה', icon: '🌍', countries: 55 },
  { name: 'דרום אמריקה', icon: '🌎', countries: 10 },
  { name: 'צפון אמריקה', icon: '🌎', countries: 41 },
  { name: 'אסיה', icon: '🌏', countries: 47 },
  { name: 'אפריקה', icon: '🌍', countries: 54 },
  { name: 'אוקיאניה', icon: '🌏', countries: 14 },
];

export const COUNTRIES: Record<string, { flag: string; continent: Continent }> = {
  'אנגליה': { flag: '🏴', continent: 'אירופה' },
  'ספרד': { flag: '🇪🇸', continent: 'אירופה' },
  'איטליה': { flag: '🇮🇹', continent: 'אירופה' },
  'גרמניה': { flag: '🇩🇪', continent: 'אירופה' },
  'צרפת': { flag: '🇫🇷', continent: 'אירופה' },
  'פורטוגל': { flag: '🇵🇹', continent: 'אירופה' },
  'הולנד': { flag: '🇳🇱', continent: 'אירופה' },
  'ברזיל': { flag: '🇧🇷', continent: 'דרום אמריקה' },
  'ארגנטינה': { flag: '🇦🇷', continent: 'דרום אמריקה' },
  'ישראל': { flag: '🇮🇱', continent: 'אסיה' },
  'בלגיה': { flag: '🇧🇪', continent: 'אירופה' },
  'קרואטיה': { flag: '🇭🇷', continent: 'אירופה' },
  'אורוגוואי': { flag: '🇺🇾', continent: 'דרום אמריקה' },
  'מרוקו': { flag: '🇲🇦', continent: 'אפריקה' },
  'ארה"ב': { flag: '🇺🇸', continent: 'צפון אמריקה' },
};

const ATTR_TEMPLATE = (base: number): Record<string, number> => ({
  'מהירות': base + 3, 'Acceleration': base + 2, 'Sprint Speed': base + 4,
  'Finishing': base + 1, 'Shot Power': base, 'Long Shots': base - 4,
  'Passing': base - 1, 'Crossing': base - 3, 'Vision': base + 2, 'Short Passing': base + 3, 'Long Passing': base - 2,
  'Dribbling': base + 4, 'Ball Control': base + 3, 'Agility': base + 5, 'Balance': base + 2, 'Reactions': base + 1,
  'Defending': base - 25, 'Standing Tackle': base - 24, 'Sliding Tackle': base - 26,
  'Strength': base - 6, 'Stamina': base + 1, 'Aggression': base - 10, 'Jumping': base - 3,
});

export const PLAYERS: Player[] = [
  {
    id: 'p1', firstName: 'ליאו', lastName: 'סילבה', commonName: 'סילבינהו', nationality: 'ברזיל', flag: '🇧🇷',
    age: 24, height: 178, weight: 72, foot: 'שמאל', position: 'RW', altPositions: ['LW', 'ST'],
    club: 'ריברסייד FC', clubCrest: '🔵', league: 'ליגת העל', number: 10, overall: 87, potential: 92,
    skillMoves: 5, weakFoot: 4, value: 78_000_000, wage: 145_000, contractUntil: 2029, releaseClause: 120_000_000,
    playStyles: ['Technical', 'Rapid', 'Flair'], attributes: ATTR_TEMPLATE(85),
  },
  {
    id: 'p2', firstName: 'מרקו', lastName: 'רוסי', nationality: 'איטליה', flag: '🇮🇹',
    age: 29, height: 185, weight: 80, foot: 'ימין', position: 'CB', altPositions: ['RB'],
    club: 'נורת\'גייט', clubCrest: '⚫', league: 'סרייה חדשה', number: 4, overall: 84, potential: 84,
    skillMoves: 2, weakFoot: 3, value: 34_000_000, wage: 98_000, contractUntil: 2027,
    playStyles: ['Anticipate', 'Block', 'Aerial'], attributes: { ...ATTR_TEMPLATE(70), 'Defending': 87, 'Standing Tackle': 88, 'Strength': 86, 'Jumping': 84 },
  },
  {
    id: 'p3', firstName: 'קווין', lastName: 'דה בוס', nationality: 'בלגיה', flag: '🇧🇪',
    age: 31, height: 181, weight: 76, foot: 'ימין', position: 'CM', altPositions: ['CAM'],
    club: 'סיטי לייטס', clubCrest: '🔷', league: 'ליגת העל', number: 17, overall: 89, potential: 89,
    skillMoves: 4, weakFoot: 5, value: 62_000_000, wage: 210_000, contractUntil: 2026,
    playStyles: ['Incisive Pass', 'Long Ball', 'Pinged Pass', 'Vision'], attributes: { ...ATTR_TEMPLATE(84), 'Passing': 93, 'Vision': 94, 'Long Passing': 92 },
  },
  {
    id: 'p4', firstName: 'יוסי', lastName: 'כהן', commonName: 'כהן', nationality: 'ישראל', flag: '🇮🇱',
    age: 22, height: 176, weight: 70, foot: 'ימין', position: 'CAM', altPositions: ['CM', 'RW'],
    club: 'מכבי צפון', clubCrest: '🟡', league: 'ליגת ישראל', number: 8, overall: 79, potential: 88,
    skillMoves: 4, weakFoot: 3, value: 18_500_000, wage: 42_000, contractUntil: 2028,
    playStyles: ['Technical', 'Flair'], attributes: ATTR_TEMPLATE(78),
  },
  {
    id: 'p5', firstName: 'ארלינג', lastName: 'נורד', nationality: 'הולנד', flag: '🇳🇱',
    age: 25, height: 194, weight: 88, foot: 'שמאל', position: 'ST', altPositions: [],
    club: 'סיטי לייטס', clubCrest: '🔷', league: 'ליגת העל', number: 9, overall: 91, potential: 93,
    skillMoves: 3, weakFoot: 4, value: 180_000_000, wage: 320_000, contractUntil: 2030, releaseClause: 250_000_000,
    playStyles: ['Power Shot', 'Aerial', 'Acrobatic'], attributes: { ...ATTR_TEMPLATE(88), 'Finishing': 94, 'Shot Power': 95, 'Strength': 93 },
  },
  {
    id: 'p6', firstName: 'תיאו', lastName: 'מנדס', nationality: 'פורטוגל', flag: '🇵🇹',
    age: 27, height: 183, weight: 78, foot: 'ימין', position: 'RB', altPositions: ['RWB', 'RM'],
    club: 'ריברסייד FC', clubCrest: '🔵', league: 'ליגת העל', number: 22, overall: 83, potential: 85,
    skillMoves: 3, weakFoot: 3, value: 40_000_000, wage: 88_000, contractUntil: 2027,
    playStyles: ['Whipped Pass', 'Rapid'], attributes: ATTR_TEMPLATE(80),
  },
  {
    id: 'p7', firstName: 'אמיל', lastName: 'סורנסן', nationality: 'גרמניה', flag: '🇩🇪',
    age: 20, height: 189, weight: 82, foot: 'ימין', position: 'GK', altPositions: [],
    club: 'נורת\'גייט', clubCrest: '⚫', league: 'סרייה חדשה', number: 1, overall: 78, potential: 90,
    skillMoves: 1, weakFoot: 2, value: 22_000_000, wage: 35_000, contractUntil: 2029,
    playStyles: ['Cross Claimer', 'Rush Out'], attributes: { 'Diving': 79, 'Handling': 77, 'Kicking': 74, 'Reflexes': 81, 'Speed': 58, 'Positioning': 78 },
  },
  {
    id: 'p8', firstName: 'סרחיו', lastName: 'גוררו', nationality: 'ארגנטינה', flag: '🇦🇷',
    age: 33, height: 172, weight: 74, foot: 'ימין', position: 'ST', altPositions: ['CF'],
    club: 'סאות\'סייד', clubCrest: '🔴', league: 'סרייה חדשה', number: 10, overall: 82, potential: 82,
    skillMoves: 4, weakFoot: 4, value: 15_000_000, wage: 76_000, contractUntil: 2026,
    playStyles: ['Finesse Shot', 'Trickster'], attributes: ATTR_TEMPLATE(81),
  },
];

export const TEAMS: Team[] = [
  { id: 't1', name: 'ריברסייד FC', shortName: 'RIV', crest: '🔵', country: 'אנגליה', continent: 'אירופה', league: 'ליגת העל', overall: 84, founded: 1902, stadium: 'ריברסייד ארנה', colors: ['#1e63d6', '#ffffff'] },
  { id: 't2', name: 'סיטי לייטס', shortName: 'CTL', crest: '🔷', country: 'אנגליה', continent: 'אירופה', league: 'ליגת העל', overall: 88, founded: 1894, stadium: 'לייטס פארק', colors: ['#6cb4ee', '#0a2240'] },
  { id: 't3', name: 'נורת\'גייט', shortName: 'NTH', crest: '⚫', country: 'איטליה', continent: 'אירופה', league: 'סרייה חדשה', overall: 82, founded: 1908, stadium: 'סטדיו נורד', colors: ['#111111', '#c0a062'] },
  { id: 't4', name: 'סאות\'סייד', shortName: 'STH', crest: '🔴', country: 'איטליה', continent: 'אירופה', league: 'סרייה חדשה', overall: 80, founded: 1919, stadium: 'אריאנה סוד', colors: ['#c8102e', '#ffffff'] },
  { id: 't5', name: 'מכבי צפון', shortName: 'MCF', crest: '🟡', country: 'ישראל', continent: 'אסיה', league: 'ליגת ישראל', overall: 74, founded: 1936, stadium: 'אצטדיון הצפון', colors: ['#f5c518', '#003b6f'] },
  { id: 't6', name: 'לוס בלנקוס', shortName: 'LBL', crest: '⚪', country: 'ספרד', continent: 'אירופה', league: 'לה ליגה נובה', overall: 89, founded: 1902, stadium: 'אל טמפלו', colors: ['#ffffff', '#d4af37'] },
  { id: 't7', name: 'בלאו גראנה', shortName: 'BLG', crest: '🔵', country: 'ספרד', continent: 'אירופה', league: 'לה ליגה נובה', overall: 87, founded: 1899, stadium: 'קמפ נו-ואבו', colors: ['#a50044', '#004d98'] },
  { id: 't8', name: 'באיירן זוד', shortName: 'BYS', crest: '🔴', country: 'גרמניה', continent: 'אירופה', league: 'בונדס נובה', overall: 88, founded: 1900, stadium: 'אליאנץ דום', colors: ['#dc052d', '#ffffff'] },
  { id: 't9', name: 'סמבה SC', shortName: 'SMB', crest: '🟢', country: 'ברזיל', continent: 'דרום אמריקה', league: 'בראזיליירו', overall: 78, founded: 1910, stadium: 'אסטדיו סמבה', colors: ['#00a859', '#ffdf00'] },
  { id: 't10', name: 'טנגו יונייטד', shortName: 'TNG', crest: '🔵', country: 'ארגנטינה', continent: 'דרום אמריקה', league: 'ליגה אלביסלסטה', overall: 79, founded: 1905, stadium: 'לה בומבונרה', colors: ['#75aadb', '#ffffff'] },
  { id: 't11', name: 'אורנייה', shortName: 'ORN', crest: '🟠', country: 'הולנד', continent: 'אירופה', league: 'ארדיביזי', overall: 81, founded: 1900, stadium: 'דה קופ', colors: ['#ff6b1a', '#ffffff'] },
  { id: 't12', name: 'ליסבון סטארס', shortName: 'LSB', crest: '🟢', country: 'פורטוגל', continent: 'אירופה', league: 'פרימיירה נובה', overall: 83, founded: 1904, stadium: 'אסטדיו דה לוז', colors: ['#009639', '#ffffff'] },
];

export const LEAGUES: League[] = [
  { id: 'l1', name: 'ליגת העל', country: 'אנגליה', continent: 'אירופה', teams: 20, tier: 1, logo: '🏴' },
  { id: 'l2', name: 'סרייה חדשה', country: 'איטליה', continent: 'אירופה', teams: 20, tier: 1, logo: '🇮🇹' },
  { id: 'l3', name: 'לה ליגה נובה', country: 'ספרד', continent: 'אירופה', teams: 20, tier: 1, logo: '🇪🇸' },
  { id: 'l4', name: 'בונדס נובה', country: 'גרמניה', continent: 'אירופה', teams: 18, tier: 1, logo: '🇩🇪' },
  { id: 'l5', name: 'ליגת ישראל', country: 'ישראל', continent: 'אסיה', teams: 14, tier: 1, logo: '🇮🇱' },
  { id: 'l6', name: 'בראזיליירו', country: 'ברזיל', continent: 'דרום אמריקה', teams: 20, tier: 1, logo: '🇧🇷' },
];

export const MANAGERS: Manager[] = [
  { id: 'm1', name: 'פפ אנריקה', nationality: 'ספרד', flag: '🇪🇸', age: 53, club: 'סיטי לייטס', formation: '4-3-3', style: 'שליטה', overall: 92, contractUntil: 2027 },
  { id: 'm2', name: 'קרלו אנצו', nationality: 'איטליה', flag: '🇮🇹', age: 65, club: 'לוס בלנקוס', formation: '4-2-3-1', style: 'מאוזן', overall: 90, contractUntil: 2026 },
  { id: 'm3', name: 'יורגן קלין', nationality: 'גרמניה', flag: '🇩🇪', age: 57, club: null, formation: '4-3-3', style: 'לחץ גבוה', overall: 89 },
  { id: 'm4', name: 'דני רועי', nationality: 'ישראל', flag: '🇮🇱', age: 45, club: 'מכבי צפון', formation: '3-5-2', style: 'התקפי', overall: 78, contractUntil: 2026 },
  { id: 'm5', name: 'אנטוניו סבה', nationality: 'פורטוגל', flag: '🇵🇹', age: 49, club: null, formation: '4-4-2', style: 'הגנתי', overall: 84 },
];

export const STADIUMS: Stadium[] = [
  { id: 's1', name: 'ריברסייד ארנה', city: 'לונדון', country: 'אנגליה', capacity: 62000, homeTeam: 'ריברסייד FC', roof: false, built: 2016 },
  { id: 's2', name: 'לייטס פארק', city: 'מנצ\'סטר', country: 'אנגליה', capacity: 55000, homeTeam: 'סיטי לייטס', roof: true, built: 2003 },
  { id: 's3', name: 'אל טמפלו', city: 'מדריד', country: 'ספרד', capacity: 81000, homeTeam: 'לוס בלנקוס', roof: true, built: 1947 },
  { id: 's4', name: 'אליאנץ דום', city: 'מינכן', country: 'גרמניה', capacity: 75000, homeTeam: 'באיירן זוד', roof: true, built: 2005 },
  { id: 's5', name: 'אצטדיון הצפון', city: 'חיפה', country: 'ישראל', capacity: 30000, homeTeam: 'מכבי צפון', roof: false, built: 2014 },
  { id: 's6', name: 'לה בומבונרה', city: 'בואנוס איירס', country: 'ארגנטינה', capacity: 54000, homeTeam: 'טנגו יונייטד', roof: false, built: 1940 },
];

export const MODS: Mod[] = [
  { id: 'md1', name: 'עונת 2026/27 מלאה', type: 'Database', version: '2.4.1', author: 'אתה', gameVersion: 'FC 26 · 1.8', updated: 'לפני שעתיים', installed: true, status: 'בפיתוח', cover: 'a', size: '840 MB', conflict: 'none' },
  { id: 'md2', name: 'ליגת העל הישראלית', type: 'ליגה', version: '1.2.0', author: 'אתה', gameVersion: 'FC 26 · 1.8', updated: 'אתמול', installed: true, status: 'פורסם', cover: 'b', size: '210 MB', conflict: 'possible' },
  { id: 'md3', name: 'אגדות כל הזמנים', type: 'שחקנים', version: '3.0.0', author: 'אתה', gameVersion: 'FC 26 · 1.7', updated: 'לפני 3 ימים', installed: false, status: 'בפיתוח', cover: 'c', size: '95 MB', conflict: 'critical' },
  { id: 'md4', name: 'מדים 26/27 פרימיום', type: 'מדים', version: '1.0.4', author: 'אתה', gameVersion: 'FC 26 · 1.8', updated: 'לפני שבוע', installed: true, status: 'פורסם', cover: 'd', size: '320 MB', conflict: 'none' },
  { id: 'md5', name: 'אצטדיונים מחודשים', type: 'אצטדיון', version: '0.9.2', author: 'אתה', gameVersion: 'FC 26 · 1.8', updated: 'לפני שבועיים', installed: false, status: 'טיוטה', cover: 'e', size: '1.2 GB', conflict: 'none' },
];

export const MARKET_MODS: Mod[] = [
  { id: 'mk1', name: 'Ultimate Graphics Overhaul', type: 'Visual', version: '5.1', author: 'PitchPerfect', gameVersion: 'FC 26', updated: 'היום', installed: false, status: 'פורסם', cover: 'a', size: '2.8 GB', downloads: 184000, rating: 4.9 },
  { id: 'mk2', name: 'Real Broadcast Pack', type: 'שידור', version: '2.0', author: 'BroadcastPro', gameVersion: 'FC 26', updated: 'לפני יומיים', installed: false, status: 'פורסם', cover: 'b', size: '640 MB', downloads: 97400, rating: 4.7 },
  { id: 'mk3', name: 'World Legends Squad', type: 'שחקנים', version: '3.4', author: 'RetroFC', gameVersion: 'FC 26', updated: 'לפני שבוע', installed: false, status: 'פורסם', cover: 'c', size: '120 MB', downloads: 251000, rating: 4.8 },
  { id: 'mk4', name: 'Stadium Atmosphere+', type: 'אודיו', version: '1.6', author: 'CrowdFX', gameVersion: 'FC 26', updated: 'לפני 3 ימים', installed: true, status: 'פורסם', cover: 'd', size: '410 MB', downloads: 63200, rating: 4.6 },
  { id: 'mk5', name: 'Custom Boots Megapack', type: 'נעליים', version: '4.2', author: 'BootLab', gameVersion: 'FC 26', updated: 'אתמול', installed: false, status: 'פורסם', cover: 'e', size: '780 MB', downloads: 142000, rating: 4.5 },
  { id: 'mk6', name: 'Career Realism Suite', type: 'Gameplay', version: '2.3', author: 'DeepPlay', gameVersion: 'FC 26', updated: 'היום', installed: false, status: 'פורסם', cover: 'f', size: '48 MB', downloads: 209000, rating: 4.9 },
];

export const TRANSFERS: Transfer[] = [
  { id: 'tr1', player: 'ליאו סילבה', from: 'ריברסייד FC', to: 'לוס בלנקוס', fee: 120_000_000, type: 'מכירה', date: '01/07/2026', window: 'קיץ 2026' },
  { id: 'tr2', player: 'יוסי כהן', from: 'מכבי צפון', to: 'אורנייה', fee: 18_500_000, type: 'מכירה', date: '15/07/2026', window: 'קיץ 2026' },
  { id: 'tr3', player: 'סרחיו גוררו', from: 'סאות\'סייד', to: 'טנגו יונייטד', fee: 0, type: 'Free Transfer', date: '01/07/2026', window: 'קיץ 2026' },
  { id: 'tr4', player: 'אמיל סורנסן', from: 'נורת\'גייט', to: 'באיירן זוד', fee: 45_000_000, type: 'השאלה עם חובה', date: '20/07/2026', window: 'קיץ 2026' },
];

export const ACTIVITIES: Activity[] = [
  { id: 'a1', icon: 'save', text: 'שמרת שינויים ב"עונת 2026/27 מלאה"', time: 'לפני 12 דקות', color: 'var(--accent)' },
  { id: 'a2', icon: 'user-plus', text: 'יצרת שחקן חדש: ליאו סילבה', time: 'לפני שעה', color: 'var(--blue)' },
  { id: 'a3', icon: 'shirt', text: 'עדכנת מדי בית עבור ריברסייד FC', time: 'לפני 3 שעות', color: 'var(--purple)' },
  { id: 'a4', icon: 'package', text: 'Build הושלם: ליגת העל הישראלית v1.2.0', time: 'אתמול', color: 'var(--green)' },
  { id: 'a5', icon: 'arrow-left-right', text: 'ביצעת העברה: יוסי כהן → אורנייה', time: 'אתמול', color: 'var(--orange)' },
];

export const POSITIONS = ['GK', 'RB', 'CB', 'LB', 'RWB', 'LWB', 'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'CF', 'ST'];
export const PLAYSTYLES = ['Technical', 'Rapid', 'Flair', 'Power Shot', 'Finesse Shot', 'Incisive Pass', 'Long Ball', 'Aerial', 'Block', 'Anticipate', 'Trickster', 'First Touch', 'Whipped Pass', 'Dead Ball', 'Acrobatic'];

export const fmtMoney = (n: number) =>
  n >= 1_000_000 ? `€${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  : n >= 1000 ? `€${(n / 1000).toFixed(0)}K` : `€${n}`;

export const fmtNum = (n: number) => n.toLocaleString('en-US');
