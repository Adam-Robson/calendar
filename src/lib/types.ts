export interface SignInType {
  email: string;
  password: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  location: string;
}

export interface EventFormProps {
  event?: Event;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
}
