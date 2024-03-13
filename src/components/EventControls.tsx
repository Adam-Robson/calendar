/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSession } from '@supabase/auth-helpers-react';

export default function EventControls() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const session = useSession();

  async function createCalendarEvent(): Promise<void> {
    const newEvent = {
      "summary": title,
      "description": description,
      "start": {
        "dateTime": startDate?.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime": endDate?.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }

    const res = await fetch('https://googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${session?.provider_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    });
    await res.json();
  }

  return (
    <>
      <div>
        <label>Start Date</label>
        <DateTimePicker onChange={setStartDate} value={startDate} />
      </div>

      <div>
        <label>End Date</label>
        <DateTimePicker onChange={setEndDate} value={endDate} />
      </div>

      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <hr />

      <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>

    </>
  )
}
