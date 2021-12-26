import styled from "@emotion/styled";
import { FC, useEffect, useRef } from "react";
import type { Clone } from "@/types";
import { initCalendar } from "./init-calender";

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
`;

export type HeatmapCalendarProps = {
  clones: Clone[];
};

export const HeatmapCalendar: FC<HeatmapCalendarProps> = ({ clones }) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initCalendar(calendarRef.current, { clones });
  }, [clones]);

  return <Wrapper ref={calendarRef} />;
};
