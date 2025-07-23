import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import embed from "vega-embed";
import chartConfig from "../shared/chart-config";

import mapJsonSpec from "../assets/data/italy-regions-circles.vl.json";
// import { formatTooltip } from "@/shared/formatTooltip";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

// type Props = {
//   categorySignal: string;
// };
const spec = toVegaLiteSpec(mapJsonSpec);

const MapChart = () => {
  //   const { data, isPending, isLoading } = useDashboardData();
  //   const [data, setData] = useState(null);
  //   const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     fetch(
  //       "https://gist.githubusercontent.com/StefanoFrontini/b256d34084b3fe98c295b0a2d3beb42e/raw/71f3945d4ed66e56d9abbed800e95e752fcac487/dashboard-io.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setData(data));
  //   }, []);

  useEffect(() => {
    if (!chartContent.current) return;
    // const tooltipOptions = {
    //   formatTooltip: formatTooltip("regione", "count_serv"),
    // };
    const options = {
      ...chartConfig,
      //   tooltip: tooltipOptions,
    };
    embed(chartContent.current, spec, options).then((chart) => {
      chart.view.resize().runAsync();
    });
  }, []);

  //   useEffect(() => {
  //     if (chart === null) return;
  //     chart.view.signal("category", categorySignal).runAsync();
  //   }, [chart, categorySignal]);

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
