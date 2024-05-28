export interface ConsultationCardType {
  id: string;
  physicianProfile: PhysicianProfile;
  status: boolean;
  createdAt: string;
  lastMessage?: LastMessage;
}
export interface MessageType {
  id: number;
  physicianProfile: PhysicianProfile;
  userType: number;
  createdAt: string;
  text : string
}
export interface PhysicianProfile {
  id: string;
  firstName: string;
  lastName: string;
}

export interface LastMessage {
  id: number;
  text: string;
  createdAt: string;
}
