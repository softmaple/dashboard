import { useEffect, useRef } from "react";
import { initCalendar } from "./init-calender";

export const HeatmapCalendar = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initCalendar(calendarRef.current);
  }, []);

  return <div ref={calendarRef} style={{ width: "600px", height: "600px" }} />;
};
