import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  data: any;
};

const ChartServices = ({ spec, data }: Props): JSX.Element => {
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, spec, chartConfig).then((res) => {
      res.view.insert("myData", data).runAsync();
    });
  }, [spec]);

  return (
    <Box
      sx={{ height: "100%", width: "100%", mt: 3 }}
      ref={chartContent}
      id="chart-content"
    ></Box>
  );
};

export default ChartServices;
