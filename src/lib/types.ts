import { User } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from 'react';

export interface EventType {
  id: string | undefined;
  createdAt: Date | undefined;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  createdBy: string;
}

export interface EventContextPropType {
  events: EventType[];
  addEvent: (event: EventType) => void;
  user: User  | null;
  setUser: (user: User | null) => void;
}

export interface EventProviderPropType {
  children: React.ReactNode;
}

export interface EventFormPropType {
  event?: Event;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
}

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface AuthProviderPropType {
  children: React.ReactNode;
}

export interface AuthPropTypes {
  email: string;
  password: string;
}

export interface ParamsType {
  type?: string;
}
