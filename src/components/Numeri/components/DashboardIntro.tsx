import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "../../../hook/useTranslation";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapper from "./KpiWrapper";

const DashboardIntro = () => {
  const { t } = useTranslation(["numeri"]);
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={0}>
        <Typography color="textSecondary" variant="caption">
          {t("hero.last_update", { ns: "numeri" })} -&nbsp;
        </Typography>
        <Typography color="textSecondary" variant="caption">
          <KpiWrapper spec={toVegaLiteSpec(lastUpdateSpec)} />
        </Typography>
      </Stack>
    </Box>
  );
};

export default DashboardIntro;
