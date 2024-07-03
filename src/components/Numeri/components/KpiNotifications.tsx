import { Box, Paper, Stack, Typography } from "@mui/material";
// import notificationAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationAnalogSpec1 from "../assets/data/notifications-analog1.vl.json";
import notificationsDigitalSpec1 from "../assets/data/notifications-digital1.vl.json";
import notificationsTotalSpec1 from "../assets/data/notifications-total1.vl.json";
import pieChartAnalogSpec from "../assets/data/pie-chart-analog1.vl.json";
import pieChartDigitalSpec from "../assets/data/pie-chart-digital1.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiCard from "./KpiCard";
import KpiSignal1 from "./KpiSignal1";
import PieChart from "./PieChart";

type Props = {
  selYear: number | null;
  data: any;
};

const KpiNotifications = ({ selYear, data }: Props): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{ mb: 3 }}
    >
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Totale notifiche"
          subLabel="Notifiche inviate tramite SEND"
        >
          <KpiSignal1
            spec={toVegaLiteSpec(notificationsTotalSpec1)}
            yearSignal={selYear}
            data={data}
          />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <Paper
          elevation={8}
          sx={{
            p: 3,
            borderRadius: 2,
            borderLeft: "8px solid #0073E6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "600", mb: 1 }}
              >
                Totale notifiche digitali
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Notifiche inviate ai destinatari tramite canali digitali
              </Typography>

              <KpiSignal1
                spec={toVegaLiteSpec(notificationsDigitalSpec1)}
                yearSignal={selYear}
                data={data}
              />
            </Box>
            <Box>
              <PieChart
                spec={toVegaLiteSpec(pieChartDigitalSpec)}
                yearSignal={selYear}
                data={data}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <Paper
          elevation={8}
          sx={{
            p: 3,
            borderRadius: 2,
            borderLeft: "8px solid #0073E6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "600", mb: 1 }}
              >
                Totale notifiche analogiche
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Notifiche inviate ai destinatari tramite raccomandata cartacea
              </Typography>

              <KpiSignal1
                spec={toVegaLiteSpec(notificationAnalogSpec1)}
                yearSignal={selYear}
                data={data}
              />
            </Box>
            <Box>
              <PieChart
                spec={toVegaLiteSpec(pieChartAnalogSpec)}
                yearSignal={selYear}
                data={data}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Stack>

    // <Box style={{ flex: "1 0 0" }} mb={3}>
    //   <KpiCard
    //     label="Totale notifiche analogiche"
    //     subLabel="Notifiche inviate ai destinatari tramite raccomandata cartacea"
    //   >
    //     <KpiSignal
    //       spec={toVegaLiteSpec(notificationsAnalogSpec)}
    //       yearSignal={selYear}
    //     />
    //   </KpiCard>
    // </Box>
  );
};

export default KpiNotifications;
