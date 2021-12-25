import { FC, useEffect, useRef } from "react";
import type { Clone } from "@/types";
import { initCalendar } from "./init-calender";

export type HeatmapCalendarProps = {
  clones: Clone[];
};

export const HeatmapCalendar: FC<HeatmapCalendarProps> = ({ clones }) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initCalendar(calendarRef.current, { clones });
  }, [clones]);

  return <div ref={calendarRef} style={{ width: "600px", height: "600px" }} />;
};
