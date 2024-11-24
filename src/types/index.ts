export interface Candidate {
  id: number;
  name: string;
  party: string;
  imageUrl: string;
  votes: number;
}

export interface Election {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  candidates: Candidate[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}