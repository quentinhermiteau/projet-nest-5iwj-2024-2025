"use client";

import { useState } from "react";

export default function Events() {
  const [events, setEvents] = useState<MessageEvent[]>([]);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     process.env.NEXT_PUBLIC_API_URL + "/events/sse"
  //   );
  //   eventSource.onmessage = (event) => {
  //     setEvents((prev) => [...prev, JSON.parse(event.data)]);
  //   };
  // }, []);

  console.log(events[0]);
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>{event.message}</div>
      ))}
    </div>
  );
}
