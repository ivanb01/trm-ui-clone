interface Metric {
  Metric: string;
  Value: string;
}

interface Reason {
  Reason: string;
}

interface Insight {
  id: number;
  criticalityId: number;
  criticalityName: string;
  insightType: string;
  insightTypeDescription: string;
  meter: string;
  meterId: number;
  metrics: string;
  reasons: string;
  rlaName: string;
  startDt: string;
  stopDt: string;
  usagePoint: string;
  usagePointId: number;
}
