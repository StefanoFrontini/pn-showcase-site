import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "src/hook/useTranslation";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  yearSignal: number | null;
};

const PieChart = ({ spec, yearSignal }: Props): JSX.Element => {
  const { t } = useTranslation(["numeri"]);
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  function translateTooltip(spec: TopLevelSpec) {
    if (
      "encoding" in spec &&
      spec.encoding &&
      "tooltip" in spec.encoding &&
      spec.encoding.tooltip &&
      Array.isArray(spec.encoding.tooltip)
    ) {
      const tooltip = [];
      tooltip[0] = {
        ...spec.encoding.tooltip[0],
        title: t("sent_notifications.pieChart.tooltip.type"),
      };
      tooltip[1] = {
        ...spec.encoding.tooltip[1],

        title: t("sent_notifications.pieChart.tooltip.number"),
      };
      return {
        ...spec,
        encoding: {
          ...spec.encoding,
          tooltip,
        },
      } as TopLevelSpec;
    }
    return spec;
  }
  const translatedTooltip = useMemo(() => translateTooltip(spec), []);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, translatedTooltip, chartConfig).then(setChart);
  }, [spec]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("year", yearSignal).runAsync();
  }, [chart, yearSignal]);

  return <Box ref={chartContent} id="chart-content"></Box>;
};

export default PieChart;
