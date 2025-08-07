import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import barChartSpec from "../assets/data/bar_chart.vl.json";

type Props = {
  filterSignal: string;
  yearSignal: number | null;
};

const NotificationsTrendBarChart = ({ filterSignal, yearSignal }: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    embed(chartContent.current, barChartSpec as TopLevelSpec, chartConfig)
      .then(setChart)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (chart === null) {
      return;
    }
    chart.view
      .signal("notification_type", filterSignal)
      .runAsync()
      .catch(console.error);
  }, [chart, filterSignal]);

  useEffect(() => {
    if (chart === null) {
      return;
    }
    chart.view.signal("year", yearSignal).runAsync().catch(console.error);
  }, [chart, yearSignal]);

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      ref={chartContent}
      id="chart-content"
    ></Box>
  );
};

export default NotificationsTrendBarChart;
