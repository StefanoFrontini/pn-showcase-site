import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
const CumulativeChart = ({
  spec,
  cumulativeSignal,
  filterSignal,
  yearSignal,
}: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  const { t } = useTranslation(["numeri"]);

  function translateTooltip(spec: TopLevelSpec) {
    // Type guard to check if this is a layer spec
    if (!("layer" in spec) || !Array.isArray(spec.layer)) {
      return spec;
    }

    // Safely check all required properties exist
    if (!spec.layer[0]?.encoding?.tooltip) {
      return spec;
    }

    const tooltips = spec.layer[0].encoding.tooltip;
    if (!Array.isArray(tooltips) || tooltips.length < 3) {
      return spec;
    }

    // Proceed with translation if all checks pass
    const barChartTooltip = [
      { ...tooltips[0], title: t("sent_notifications.trend.tooltip.month") },
      {
        ...tooltips[1],
        title: t("sent_notifications.trend.tooltip.aggregate"),
      },
      { ...tooltips[2], title: t("sent_notifications.trend.tooltip.monthly") },
    ];

    // Check if layer 1 exists and has tooltips
    let lineChartTooltip;
    if (
      spec.layer[1]?.encoding?.tooltip &&
      Array.isArray(spec.layer[1].encoding.tooltip)
    ) {
      lineChartTooltip = [
        {
          ...spec.layer[1].encoding.tooltip[0],
          title: t("sent_notifications.trend.tooltip.month"),
        },
        {
          ...spec.layer[1].encoding.tooltip[1],
          title: t("sent_notifications.trend.tooltip.aggregate"),
        },
        {
          ...spec.layer[1].encoding.tooltip[2],
          title: t("sent_notifications.trend.tooltip.monthly"),
        },
      ];
    }

    return {
      ...spec,
      layer: [
        {
          ...spec.layer[0],
          encoding: {
            ...spec.layer[0].encoding,
            tooltip: barChartTooltip,
          },
        },
        ...(spec.layer[1] && spec.layer[1].encoding
          ? [
              {
                ...spec.layer[1],
                encoding: {
                  ...spec.layer[1].encoding,
                  tooltip: lineChartTooltip || spec.layer[1].encoding?.tooltip,
                },
              },
            ]
          : []),
        ...(spec.layer.slice(2) || []),
      ],
    } as TopLevelSpec;
  }

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, translateTooltip(spec), chartConfig).then(
      setChart
    );
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
export default CumulativeChart;
