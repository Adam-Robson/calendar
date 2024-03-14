import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../../services/client';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  EventContextPropType,
  EventProviderPropType,
  EventType
} from '../types';
import { User } from '@supabase/supabase-js';

export const EventContext = createContext<EventContextPropType>({
  events: [],
  addEvent: (event: EventType) => {
    console.log('Add event called');
    return event;
  },
  user: null,
  setUser: (user: User | null) => {
    console.log('Set user called');
    return user;
  }
});

export function EventProvider({ children }: EventProviderPropType) {

  const [events, setEvents] = useState<EventType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error } = await (client as SupabaseClient).from('events').select('*');
      if (error instanceof Error) {
        console.error('Error fetching events from Supabase: ', error);
      } else {
        setEvents(events ?? []);
      }
    };

    void fetchEvents();
  }, []);

  async function addEvent(event: EventType) {

    const { data, error } = await client
      .from('events')
      .insert([{
        ...event,
        id: Number(event.id)
      }]);

    if (error) {
      console.error('error adding event:', error);
    } else {
      if (data && data[0]) {
        setEvents([...events, data[0] as EventType]);
      }
    }
  }

  const value = {
    events,
    addEvent,
    user,
    setUser
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

