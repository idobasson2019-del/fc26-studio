import {
  LayoutDashboard, PlusSquare, FolderGit2, Trophy, Shield, Shirt, UserPlus,
  UserCog, Star, GraduationCap, ScanFace, Building2, MapPin, Music, Briefcase,
  ArrowLeftRight, UserSearch, UserRoundPlus, Landmark, Database, Award, Footprints,
  MonitorPlay, CloudSun, ScrollText, Bot, Store, PackageCheck, Plug, Settings,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface NavItem { key: string; path: string; icon: ComponentType<any>; }
export interface NavSection { title: string; items: NavItem[]; }

export const NAV: NavSection[] = [
  { title: 'section_main', items: [
    { key: 'dashboard', path: '/', icon: LayoutDashboard },
    { key: 'createMod', path: '/create-mod', icon: PlusSquare },
    { key: 'myMods', path: '/my-mods', icon: FolderGit2 },
  ]},
  { title: 'section_build', items: [
    { key: 'leagueBuilder', path: '/league-builder', icon: Trophy },
    { key: 'competitionBuilder', path: '/competition-builder', icon: Award },
    { key: 'teamEditor', path: '/team-editor', icon: Shield },
    { key: 'kitDesigner', path: '/kit-designer', icon: Shirt },
    { key: 'stadiumCreator', path: '/stadium-creator', icon: Building2 },
    { key: 'stadiumAssign', path: '/stadium-assign', icon: MapPin },
    { key: 'audioFans', path: '/audio', icon: Music },
  ]},
  { title: 'section_players', items: [
    { key: 'playerCreator', path: '/player-creator', icon: UserPlus },
    { key: 'playerEditor', path: '/player-editor', icon: UserCog },
    { key: 'legends', path: '/legends', icon: Star },
    { key: 'youthAcademy', path: '/youth-academy', icon: GraduationCap },
    { key: 'faceCreator', path: '/face-creator', icon: ScanFace },
    { key: 'aiScout', path: '/ai-scout', icon: Bot },
  ]},
  { title: 'section_career', items: [
    { key: 'career', path: '/career', icon: Briefcase },
    { key: 'transfers', path: '/transfers', icon: ArrowLeftRight },
    { key: 'managerMarket', path: '/manager-market', icon: UserSearch },
    { key: 'managerCreator', path: '/manager-creator', icon: UserRoundPlus },
    { key: 'clubManagement', path: '/club-management', icon: Landmark },
  ]},
  { title: 'section_data', items: [
    { key: 'databaseEditor', path: '/database', icon: Database },
    { key: 'trophyCreator', path: '/trophy-creator', icon: Trophy },
    { key: 'bootEditor', path: '/boot-editor', icon: Footprints },
    { key: 'broadcastEditor', path: '/broadcast', icon: MonitorPlay },
    { key: 'weather', path: '/weather', icon: CloudSun },
    { key: 'matchRules', path: '/match-rules', icon: ScrollText },
  ]},
  { title: 'section_mods', items: [
    { key: 'marketplace', path: '/marketplace', icon: Store },
    { key: 'installedMods', path: '/installed-mods', icon: PackageCheck },
    { key: 'modManager', path: '/mod-manager', icon: Plug },
    { key: 'settings', path: '/settings', icon: Settings },
  ]},
];

export const ALL_ITEMS = NAV.flatMap((s) => s.items);
