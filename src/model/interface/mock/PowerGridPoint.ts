import { PowerGridPointStatus } from './StatusEnum.ts';

export interface PowerGridPoint {
  id: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  average_monthly_consumption: number;
  date_installed: string;
  events: string[];
  highest_month_consumption: number;
  last_month_consumption: number;
  name: string;
  status: PowerGridPointStatus;
  tariff: 'dynamic' | 'flexible';
  usage_group: 'street lights' | 'traffic lights';
}
