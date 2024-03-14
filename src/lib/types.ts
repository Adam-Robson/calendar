export interface SignInWithPasswordPropType {
  email: string;
  password: string;
}

export interface EventType {
  id?: string;
  createdAt: Date;
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  location: string;
  createdBy: string;
}

export interface EventContextPropType {
  events: EventType[];
  addEvent: (event: EventType) => void;
}

export interface EventProviderPropType {
  children: React.ReactNode;
}

export interface EventFormPropType {
  event?: Event;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
}
