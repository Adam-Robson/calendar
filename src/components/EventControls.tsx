/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSession } from '@supabase/auth-helpers-react';
import { EventType } from '../lib/types';

export default function EventControls() {

  const [event, setEvent] = useState<EventType>({
    id: '',
    createdAt: new Date(),
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    createdBy: ''
  });

  const session = useSession();

  async function createCalendarEvent(): Promise<void> {
    const newEvent: {
      summary: string;
      description: string;
      startDate: {
        dateTime: string | undefined;
        timeZone: string;
      };
      endDate: {
        dateTime: string | undefined;
        timeZone: string;
      };
      location: string;
      createdBy: string;
    } = {
      summary: event.title ?? '',
      description: event.description,
      startDate: {
        dateTime: event.startDate?.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      endDate: {
        dateTime: event.endDate?.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      location: event.location,
      createdBy: session?.user?.email ?? ''

    };

    try {
      const res = await fetch('https://googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.provider_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      await res.json();
    } catch (error) {
      console.error('An error occurred while fetching the data: ', error);
    }
  }

  return (
    <>
      <div className="w-80">
        <label className="text-xs/5 md:text-sm/7 subpixel-antialiased">Start Date</label>
        <DateTimePicker
          name="startDate"
          onChange={(newDate) => setEvent({ ...event, startDate: newDate ?? new Date() })}
          value={event.startDate}
        />
      </div>

      <div className="w-80">
        <label className="text-xs/5 md:text-sm/7 subpixel-antialiased">End Date</label>
        <DateTimePicker
          name="endDate"
          onChange={(newDate) => setEvent({ ...event, endDate: newDate ?? new Date() })}
          value={event.endDate} />
      </div>

      <div className="w-80">
        <label className="text-xs/5 md:text-sm/7 subpixel-antialiased">Title</label>
        <input type="text" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
      </div>

      <div className="w-80">
        <label className="text-xs/5 md:text-sm/7 subpixel-antialiased">Description</label>
        <input type="text" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
      </div>

      <div className="w-80">
        <label className="text-xs/5 md:text-sm/7 subpixel-antialiased">Location</label>
        <input type="text" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} />
      </div>

      <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>

      <hr />


    </>
  );
}
