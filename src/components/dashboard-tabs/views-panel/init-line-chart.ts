import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { ViewsPanelProps } from "./views-panel";
import { getChartsData } from "../utils/get-charts-data";
import { RepoType } from "@/types";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

export const initLineChart = (
  chartDom: HTMLDivElement,
  { views, isDarkMode }: ViewsPanelProps
) => {
  const myChart = echarts.init(chartDom, isDarkMode ? "dark" : "light");

  const eorgData = views.filter((view) => view.name === RepoType.EORG);

  // TODO: add more data

  // const docsData = views.filter((view) => view.name === RepoType.DOCS);

  // const editorData = views.filter((view) => view.name === RepoType.EDITOR);

  const option: EChartsOption = {
    title: {
      left: "center",
      text: RepoType.EORG,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    series: {
      type: "line",
      data: getChartsData("2021", eorgData),
    },
    tooltip: {},
  };

  option && myChart.setOption(option);
};
