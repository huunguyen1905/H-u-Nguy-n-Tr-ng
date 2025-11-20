export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // URL or identifier
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  imageUrl: string;
  result: string; // e.g., "+150% Leads"
  description: string; // Full case study details
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  imageUrl: string;
  date: string;
  content?: string; // Optional full content
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  CLOSED = 'CLOSED',
  LOST = 'LOST'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  details: string;
  createdAt: string;
  status?: LeadStatus;
}

export enum AdminView {
  DASHBOARD = 'DASHBOARD',
  SERVICES = 'SERVICES',
  PROJECTS = 'PROJECTS',
  NEWS = 'NEWS',
  LEADS = 'LEADS'
}

export interface AlertState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}