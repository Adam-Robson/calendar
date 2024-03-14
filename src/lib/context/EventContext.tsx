import { createContext, useContext, useState } from 'react';
import {
  EventContextPropType,
  EventProviderPropType,
  EventType
} from '../types';

export const EventContext = createContext<EventContextPropType>({
  events: [],
  addEvent: (event: EventType) => {
    console.log('Add event called');
    return event;
  }
});

export function EventProvider({ children }: EventProviderPropType) {

  const [events, setEvents] = useState<EventType[]>([]);

  function addEvent(event: EventType) {
    setEvents([...events, event]);
  }

  const value = {
    events,
    addEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}


export function useEventContext() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }

  return context;

}

