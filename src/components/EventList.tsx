import { useEventContext } from '../lib/context/EventContext';

export default function EventList() {
  const { events } = useEventContext();

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Description: {event.description}</p>
            <p>Start Date: {event.startDate?.toLocaleString()}</p>
            <p>End Date: {event.endDate?.toLocaleString()}</p>
            <p>Location: {event.location}</p>
            <p>Created By: {event.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
