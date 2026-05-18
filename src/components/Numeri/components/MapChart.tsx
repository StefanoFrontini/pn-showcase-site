import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import { removeGraphicsSymbolRole } from "../shared/removeGraphicsSymbolRole";

type Props = {
  spec: TopLevelSpec;
  yearSignal?: number | null;
};

const MapChart = ({ spec, yearSignal }: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    const options = {
      ...chartConfig,
    };
    embed(chartContent.current, spec, options)
      .then((result) => {
        setChart(result);
        result.view
          .resize()
          .runAsync()
          .then(() => {
            setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, [spec]);

  useEffect(() => {
    if (chart === null || yearSignal === undefined) {
      return;
    }
    chart.view
      .signal("year", yearSignal)
      .resize()
      .runAsync()
      .then(() => {
        setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
      })
      .catch(console.error);
  }, [chart, yearSignal]);

  return (
    <Box
      sx={{
        height: { xs: "25rem", sm: "37rem" },
        width: "100%",
        pt: { xs: "1rem", sm: "2rem" },
      }}
      ref={chartContent}
    ></Box>
  );
};
export default MapChart;
