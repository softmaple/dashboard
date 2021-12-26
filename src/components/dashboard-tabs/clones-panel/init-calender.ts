import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  CalendarComponent,
  CalendarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from "echarts/components";
import { HeatmapChart, HeatmapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import type { ClonesPanelProps } from "./clones-panel";
import { RepoType } from "@/types";
import { getChartsData } from "../utils/get-charts-data";

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | CalendarComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
  | HeatmapSeriesOption
>;

/**
 * Init Echarts Heatmap Calendar
 *
 * @param chartDom HTMLDivElement
 * @param param1 HeatmapCalendarProps
 */
export const initCalendar = (
  chartDom: HTMLDivElement,
  { clones, isDarkMode }: ClonesPanelProps
) => {
  const myChart = echarts.init(chartDom, isDarkMode ? "dark" : "light");

  const eorgData = clones.filter((clone) => clone.name === RepoType.EORG);

  const docsData = clones.filter((clone) => clone.name === RepoType.DOCS);

  const editorData = clones.filter((clone) => clone.name === RepoType.EDITOR);

  const max = Math.max(
    ...eorgData.map((clone) => clone.count),
    ...docsData.map((clone) => clone.count),
    ...editorData.map((clone) => clone.count)
  );

  /**
   * TODO: integrate with data from server
   * the default color from echarts is good (maple leaf color)
   */
  const option: EChartsOption = {
    title: [
      {
        top: 10,
        left: "center",
        text: RepoType.EORG,
      },
      {
        top: 200,
        left: "center",
        text: RepoType.DOCS,
      },
      {
        top: 400,
        left: "center",
        text: RepoType.EDITOR,
      },
    ],
    tooltip: {},
    visualMap: {
      show: false,
      min: 0,
      max,
      orient: "horizontal",
    },
    calendar: [
      {
        range: "2021",
        cellSize: ["auto", 10],
      },
      {
        top: 260,
        range: "2021",
        cellSize: ["auto", 10],
      },
      {
        top: 450,
        range: "2021",
        cellSize: ["auto", 10],
      },
    ],
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        data: getChartsData("2021", eorgData),
      },
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 1,
        data: getChartsData("2021", docsData),
      },
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 2,
        data: getChartsData("2021", editorData),
      },
    ],
  };

  option && myChart.setOption(option);
};
