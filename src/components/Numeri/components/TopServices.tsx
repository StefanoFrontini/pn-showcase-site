import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

import { Box, Stack, Typography } from "@mui/material";
import actsSpec from "../assets/data/acts.vl.json";

import { Metrics2 } from "model/numbers.models";
import topAreasSpec from "../assets/data/top-areas.vl.json";
import ChartServices from "./ChartServices";
import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";

interface Props {
  data: Metrics2;
}

const TopServices = ({ data }: Props) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      mt={3}
    >
      <Box mb={3} sx={{ flex: "0 0 25%" }}>
        <KpiCard
          label="Tipologie di notifiche inviate"
          subLabel="La tipologia rappresenta la sfera di appartenenza della notifica (es. multe, tributi, anagrafe etc.)"
        >
          <KpiAuthority spec={toVegaLiteSpec(actsSpec)} data={data} />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Principali ambiti"
          subLabel="Servizi ordinati per numero di notifiche depositate a partire dall'adozione di SEND"
          borderLeft=""
        >
          <ChartServices
            spec={toVegaLiteSpec(topAreasSpec)}
            data={data.top10_ambiti}
          />
          <Box mt={2}>
            <Typography variant="caption" color="textSecondary">
              * diversa/o da quelli la cui notificazione è esclusa tramite SEND
              ai sensi dell’art.26, comma 17 D.L. 76/2020
            </Typography>
          </Box>
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default TopServices;
