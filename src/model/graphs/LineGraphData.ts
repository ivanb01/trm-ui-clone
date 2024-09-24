export interface LineGraphData {
  id: string;
  [key: string]: any;
  color?: string;
  data: { x: string; y: number }[];
}
