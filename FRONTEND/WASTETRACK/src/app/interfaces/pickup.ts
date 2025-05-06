export interface Pickup {
  pickup_id?: string; // For active pickups
  id?: string;        // For history (from Collections)
  pickup_date?: string; // For active pickups
  date?: string;       // For history
  collector: string | null;
  category: string;
  status: string;
}