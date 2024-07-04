import { Box } from "@mui/material";
import { TotaleNotifiche } from "model/numbers.models";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  yearSignal: number | null;
  data: TotaleNotifiche[];
};

const PieChart = ({ spec, yearSignal, data }: Props): JSX.Element => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, spec, chartConfig).then((res) => {
      res.view.insert("myData", data);
      setChart(res);
    });
  }, [spec]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("year", yearSignal).runAsync();
  }, [chart, yearSignal]);

  return <Box ref={chartContent} id="chart-content"></Box>;
};

export default PieChart;
