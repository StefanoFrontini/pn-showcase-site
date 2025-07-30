import { Stack, Typography } from "@mui/material";
import { useTranslation } from "../../../hook/useTranslation";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { dashboardColors } from "../shared/colors";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapper from "./KpiWrapper";

const DashboardIntro = () => {
  const { t } = useTranslation(["numeri"]);
  return (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Typography
        sx={{ color: dashboardColors.get("secondary"), fontSize: "0.875rem" }}
      >
        {t("hero.last_update", { ns: "numeri" })} -&nbsp;
      </Typography>
      <Typography
        sx={{ color: dashboardColors.get("secondary"), fontSize: "0.875rem" }}
      >
        <KpiWrapper spec={toVegaLiteSpec(lastUpdateSpec)} />
      </Typography>
    </Stack>
  );
};

export default DashboardIntro;
