export interface Point {
  x: number;
  y: string;
}

export interface ApiPoint {
  last_changed: string;
  last_updated: string;
  state: string;
  entity_id: string;
  attributes: Attributes;
}

interface Attributes {
  [Key: string]: string;
}

export interface Repartition {
  ok: number;
  ko: number;
  none: number;
}

export interface Period {
  from: number;
  to: number;
}

export interface CacheData {
  points: Point[];
  lastFetched: number;
  lastChanged: number;
  hoursToShow: number;
}

export interface BarData {
  period: Period;
  repartition: Repartition;
  index: number;
}

export interface Threshold {
  value: number;
  color: string;
}
