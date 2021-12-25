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

// TODO: remove this when the feature is stable
const dummyData: HeatmapCalendarProps = {
  clones: [
    {
      _id: "dummy_id",
      name: RepoType.EORG,
      timestamp: "2021-01-01",
      count: 1,
      uniques: 1,
    },
  ],
};

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
  const myChart = echarts.init(chartDom);
  const title: RepoType = RepoType["EORG"];

  // TODO: add more repo data
  const realData = sampleData.clones.filter(
    (clone) => clone.name === RepoType["EORG"]
  );

  const max =
    realData.length > 0 ? Math.max(...realData.map((clone) => clone.count)) : 1;

  function getRealData(year: string, sample: Clone[]) {
    let data = [];

    sample.forEach((clone) =>
      data.push([
        // TODO: new version of `echarts.time.format` has some bug, just use the old version
        echarts.format.formatTime("yyyy-MM-dd", clone.timestamp),
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
    title: {
      top: 10,
      left: "center",
      text: `${title} repo git clones`,
    },
    tooltip: {},
    visualMap: {
      show: false,
      min: 0,
      max,
    },
    calendar: {
      range: "2021",
      cellSize: ["auto", 10],
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: getRealData(
        "2021",
        realData.length > 0 ? realData : dummyData.clones
      ),
    },
  };

  option && myChart.setOption(option);
};
