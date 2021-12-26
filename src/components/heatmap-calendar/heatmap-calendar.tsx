import styled from "@emotion/styled";
import { FC, useEffect, useRef } from "react";
import type { Clone } from "@/types";
import { initCalendar } from "./init-calender";

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
`;

const LightWrapper = styled(Wrapper)``;

const DarkWrapper = styled(Wrapper)``;

export type HeatmapCalendarProps = {
  clones: Clone[];
  isDarkMode: boolean;
};

export const HeatmapCalendar: FC<HeatmapCalendarProps> = ({
  clones,
  isDarkMode,
}) => {
  const lightWrapperRef = useRef<HTMLDivElement | null>(null);
  const darkWrapperRef = useRef<HTMLDivElement | null>(null);

  const calendarRef = isDarkMode ? darkWrapperRef : lightWrapperRef;

  useEffect(() => {
    initCalendar(calendarRef.current, { clones, isDarkMode });
  }, [calendarRef, clones, isDarkMode]);

  return isDarkMode ? (
    <DarkWrapper ref={darkWrapperRef} />
  ) : (
    <LightWrapper ref={lightWrapperRef} />
  );
};
