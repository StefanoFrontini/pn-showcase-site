import { Box } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "src/hook/useTranslation";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

import mapJsonSpec from "../assets/data/italy-regions-circles.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

const spec = toVegaLiteSpec(mapJsonSpec);

const MapChart = () => {
  const chartContent = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(["numeri"]);

  function translateMapTooltip(spec: TopLevelSpec) {
    if (
      !("layer" in spec) ||
      !Array.isArray(spec.layer) ||
      spec.layer.length < 2
    ) {
      return spec;
    }

    const layer = spec.layer[1];
    if (!layer?.encoding?.tooltip) {
      return spec;
    }

    const tooltips = layer.encoding.tooltip;
    if (!Array.isArray(tooltips)) {
      return spec;
    }

    const translatedTooltips = tooltips.map((tooltip) => {
      if (tooltip.field === "regione") {
        return { ...tooltip, title: t("entities.active.tooltip.region") };
      }
      if (tooltip.field === "num_comuni_attivi") {
        return {
          ...tooltip,
          title: t("entities.active.tooltip.municipalities"),
        };
      }
      if (tooltip.field === "perc_comuni_attivi") {
        return { ...tooltip, title: t("entities.active.tooltip.percentage") };
      }
      return tooltip;
    });

    return {
      ...spec,
      layer: [
        spec.layer[0],
        {
          ...layer,
          encoding: {
            ...layer.encoding,
            tooltip: translatedTooltips,
          },
        },
      ],
    } as TopLevelSpec;
  }
  const translatedTooltip = useMemo(() => translateMapTooltip(spec), []);

  useEffect(() => {
    if (!chartContent.current) return;
    const options = {
      ...chartConfig,
    };
    embed(chartContent.current, translatedTooltip, options).then((chart) => {
      chart.view.resize().runAsync();
    });
  }, [t]);

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
