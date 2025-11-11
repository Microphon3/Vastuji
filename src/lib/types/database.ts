export interface Analysis {
  id: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;

  // Input data
  propertyType: 'home' | 'office' | 'shop' | 'factory' | 'plot';
  selectedGoals?: string[];
  videoUrl: string;
  compassHeading: number;

  // Processing status
  status: 'uploading' | 'processing' | 'complete' | 'failed';

  // Generated outputs
  floorPlan?: FloorPlan;
  zones?: Zone[];
  summary?: AnalysisSummary;
  detailedReport?: DetailedReport;
}

export interface FloorPlan {
  svg: string;
  bounds: { width: number; height: number };
  scale: number; // meters per pixel
}

export interface Zone {
  id: number; // 1-16
  direction: Direction;
  directionSanskrit: string;
  score: number; // 0-100
  status: 'optimal' | 'attention' | 'critical';
  rooms: string[];
  briefInsight: string;
  detailedAnalysis?: string;
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface AnalysisSummary {
  topInsights: Insight[];
  overallScore: number; // 0-100
}

export interface Insight {
  title: string;
  severity: 'good' | 'warning' | 'critical';
  description: string;
  zone: number;
}

export interface DetailedReport {
  roomAnalysis: RoomAnalysis[];
  remedies: Remedy[];
  geometricMetrics: GeometricData;
  physicsMetrics: PhysicsData;
}

export interface RoomAnalysis {
  roomName: string;
  zone: number;
  score: number;
  issues: string[];
  recommendations: string[];
}

export interface Remedy {
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  cost: 'free' | 'low' | 'medium' | 'high';
}

export interface GeometricData {
  symmetryScore: number;
  proportionRatio: number;
  goldenRatioCompliance: number;
}

export interface PhysicsData {
  solarOrientation: string;
  naturalLightScore: number;
  airflowPatternScore: number;
}

// Database helper types
export type AnalysisInsert = Omit<Analysis, 'id' | 'createdAt' | 'updatedAt'>;
export type AnalysisUpdate = Partial<Omit<Analysis, 'id' | 'createdAt'>>;

export interface Booking {
  id: string;
  analysisId: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;

  // Contact info
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;

  // Scheduling
  scheduledTime: string;
  timezone: string;

  // Payment
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  amount: number; // in paise

  // Consultation
  consultantId?: string;
  consultationStatus: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export type BookingInsert = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
export type BookingUpdate = Partial<Omit<Booking, 'id' | 'createdAt'>>;
