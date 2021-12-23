import * as echarts from "echarts/core";
import {
  CalendarComponent,
  CalendarComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from "echarts/components";
import { HeatmapChart, HeatmapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  CalendarComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  CalendarComponentOption | VisualMapComponentOption | HeatmapSeriesOption
>;

/**
 * An example from https://echarts.apache.org/examples/en/editor.html?c=calendar-simple&lang=ts
 * @param chartDom
 */
export const initCalendar = (chartDom: HTMLDivElement) => {
  const myChart = echarts.init(chartDom);

  function getVirtulData(year: string) {
    year = year || "2017";
    var date = +echarts.number.parseDate(year + "-01-01");
    var end = +echarts.number.parseDate(year + "-12-31");
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time <= end; time += dayTime) {
      data.push([
        echarts.format.formatTime("yyyy-MM-dd", time),
        Math.floor(Math.random() * 10000),
      ]);
    }
    return data;
  }

  /**
   * TODO: integrate with data from server
   * the default color from echarts is good (maple leaf color)
   */
  const option: EChartsOption = {
    visualMap: {
      show: false,
      min: 0,
      max: 10000,
    },
    calendar: {
      range: "2017",
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      // data: [["2017-01-01", 9]],
      data: getVirtulData("2017"),
    },
  };

  option && myChart.setOption(option);
};
