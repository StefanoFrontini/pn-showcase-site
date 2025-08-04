import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "src/hook/useTranslation";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  cumulativeSignal: boolean;
  filterSignal: string;
  yearSignal: number | null;
};
const NotificationsTrendChart = ({
  spec,
  cumulativeSignal,
  filterSignal,
  yearSignal,
}: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  const { t } = useTranslation(["numeri"]);

  function translateTooltip(spec: TopLevelSpec) {
    if (!("layer" in spec)) {
      return spec;
    }

    if (!Array.isArray(spec.layer)) {
      return spec;
    }

    return {
      ...spec,
      layer: spec.layer.map((layer) => {
        if (
          !layer?.encoding?.tooltip ||
          !Array.isArray(layer.encoding.tooltip)
        ) {
          return layer;
        }

        const tooltips = layer.encoding.tooltip;
        if (tooltips.length < 3) {
          return layer;
        }

        const translatedTooltip = [
          {
            ...tooltips[0],
            title: t("sent_notifications.trend.tooltip.month"),
          },
          {
            ...tooltips[1],
            title: t("sent_notifications.trend.tooltip.aggregate"),
          },
          {
            ...tooltips[2],
            title: t("sent_notifications.trend.tooltip.monthly"),
          },
        ];

        return {
          ...layer,
          encoding: {
            ...layer.encoding,
            tooltip: translatedTooltip,
          },
        };
      }),
    } as TopLevelSpec;
  }
  const translatedTooltip = useMemo(() => translateTooltip(spec), []);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, translatedTooltip, chartConfig).then(setChart);
  }, [spec]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("is_cumulative", cumulativeSignal).runAsync();
  }, [chart, cumulativeSignal]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("notification_type", filterSignal).runAsync();
  }, [chart, filterSignal]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("year", yearSignal).runAsync();
  }, [chart, yearSignal]);

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      ref={chartContent}
      id="chart-content"
    ></Box>
  );
};
export default NotificationsTrendChart;
