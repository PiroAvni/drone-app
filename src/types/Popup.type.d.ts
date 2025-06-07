import type { DronePopup } from './DronePopup.type';
import type { LeakPopup } from './LeakPopup.type';
import type { TechPopup } from './TechPopup.type';
import type { MeterPopup } from './MeterPopup.type';
import type { LoggerPopup } from './LoggerPopup.type';

export type Popup =
  | DronePopup
  | LeakPopup
  | TechPopup
  | MeterPopup
  | LoggerPopup
  | null;
