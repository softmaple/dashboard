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
import type { HeatmapCalendarProps } from "./heatmap-calendar";
import { RepoType } from "@/types";
import type { Clone } from "@/types";

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
 * TODO: description
 *
 * @param chartDom HTMLDivElement
 * @param sampleData HeatmapCalendarProps
 */
export const initCalendar = (
  chartDom: HTMLDivElement,
  sampleData: HeatmapCalendarProps
) => {
  const myChart = echarts.init(
    chartDom,
    sampleData.isDarkMode ? "dark" : "light"
  );

  const eorgData = sampleData.clones.filter(
    (clone) => clone.name === RepoType.EORG
  );

  const docsData = sampleData.clones.filter(
    (clone) => clone.name === RepoType.DOCS
  );

  const editorData = sampleData.clones.filter(
    (clone) => clone.name === RepoType.EDITOR
  );

  const max = Math.max(
    ...eorgData.map((clone) => clone.count),
    ...docsData.map((clone) => clone.count),
    ...editorData.map((clone) => clone.count)
  );

  function getRealData(year: string, sample: Clone[]) {
    let data = [];

    sample.forEach((clone) =>
      data.push([
        echarts.time.format("{yyyy}-{MM}-{dd}", clone.timestamp, true),
        clone.count,
      ])
    );

    return data;
  }

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
        data: getRealData("2021", eorgData),
      },
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 1,
        data: getRealData("2021", docsData),
      },
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 2,
        data: getRealData("2021", editorData),
      },
    ],
  };

  option && myChart.setOption(option);
};
