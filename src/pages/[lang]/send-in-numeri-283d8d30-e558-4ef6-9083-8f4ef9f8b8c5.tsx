import type { GetStaticPaths, NextPage } from "next";

import { Box, Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import Script from "next/script";
import { useState } from "react";
import Icons from "src/components/Numeri/components/Icons";
import KpiCard2 from "src/components/Numeri/components/KpiCard2";
import KpiSignal from "src/components/Numeri/components/KpiSignal";
import SectionLayout from "src/components/Numeri/components/SectionLayout";
import { dashboardColors } from "src/components/Numeri/shared/colors";
import { toVegaLiteSpec } from "src/components/Numeri/shared/toVegaLiteSpec";
import { getI18n } from "../../api/i18n";
import DashboardIntro from "../../components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "../../components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "../../components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "../../components/Numeri/components/KpiNotifications";
import NotificationsTrend from "../../components/Numeri/components/NotificationsTrend";
import TopServices from "../../components/Numeri/components/TopServices";
import { curYear, firstYear } from "../../components/Numeri/shared/constants";
import Tabs from "../../components/Tabs";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode } from "../../model";

import notificationsAnalogSpec from "../../components/Numeri/assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../../components/Numeri/assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../../components/Numeri/assets/data/notifications-total.vl.json";
import PieChart from "../../components/Numeri/components/PieChart";

import CardText from "src/components/Numeri/components/CardText";
import CardTitle from "src/components/Numeri/components/CardTitle";
import pieChartDigitalSpec from "../../components/Numeri/assets/data/pie-chart-digital.vl.json";

type Tabs = {
  id: number | null;
  label: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params: { lang: LangCode };
}) {
  const translations = getI18n(params.lang, ["common", "numeri"]);

  return {
    props: {
      translations,
      lang: params.lang,
    },
  };
}

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years].reverse();

const SendInNumbers: NextPage = () => {
  const { t } = useTranslation(["numeri"]);
  const [selYear, setSelYear] = useState<number | null>(null);

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
      />

      <Box mt={8}>
        <Typography
          align="center"
          fontWeight={700}
          fontSize="14px"
          color="textSecondary"
          mb={3}
          sx={{ textTransform: "uppercase" }}
        >
          {t("hero.eyelet")}
        </Typography>

        <Typography align="center" variant="h2">
          {t("hero.title")}
        </Typography>
        <DashboardIntro />
      </Box>

      <SectionLayout
        title="Notifiche SEND inviate"
        text="I seguenti dati si riferiscono alle comunicazioni a valore legale inviate dagli enti aderenti."
      >
        <Box sx={{ textAlign: "left" }}>
          <Tabs
            tabs={tabs.map((tab) => tab.label)}
            onTabChange={handleTabChange}
          />
        </Box>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Box sx={{ flex: "0 0 32%" }}>
            <KpiCard2>
              <Stack direction={"column"} spacing={2} width={"100%"}>
                <Icons.ForwardToInboxIcon />
                <Typography
                  sx={{
                    color: dashboardColors.get("blue-io"),
                    fontSize: "2rem",
                    fontWeight: 700,
                    lineHeight: "2.625rem",
                  }}
                >
                  <KpiSignal
                    spec={toVegaLiteSpec(notificationsTotalSpec)}
                    yearSignal={selYear}
                  />
                </Typography>
                <CardTitle>Totale notifiche SEND inviate</CardTitle>
                <CardText>
                  La notifica SEND è una comunicazione a valore legale emessa in
                  via ufficiale da un'amministrazione. Può essere trasmessa per
                  via cartacea o digitale.
                </CardText>
              </Stack>
            </KpiCard2>
          </Box>
          <KpiCard2>
            <Stack direction={"row"} spacing={2} width={"100%"}>
              <Stack
                flex={"0 0 55%"}
                direction={"column"}
                spacing={4}
                width={"100%"}
              >
                <Box>
                  <Typography
                    sx={{
                      color: dashboardColors.get("blue-io"),
                      fontSize: "2rem",
                      fontWeight: 700,
                      lineHeight: "2.625rem",
                    }}
                  >
                    <KpiSignal
                      spec={toVegaLiteSpec(notificationsDigitalSpec)}
                      yearSignal={selYear}
                    />
                  </Typography>
                  <Stack direction={"column"} spacing={1}>
                    <CardTitle>Numero di notifiche SEND digitali</CardTitle>
                    <CardText>
                      Notifiche SEND inviate ai destinatari tramite canali
                      digitali come PEC e Domicilio Digitale
                    </CardText>
                  </Stack>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: dashboardColors.get("blue-io"),
                      fontSize: "2rem",
                      fontWeight: 700,
                      lineHeight: "2.625rem",
                    }}
                  >
                    <KpiSignal
                      spec={toVegaLiteSpec(notificationsAnalogSpec)}
                      yearSignal={selYear}
                    />
                  </Typography>
                  <Stack direction={"column"} spacing={1}>
                    <CardTitle>Numero di notifiche SEND analogiche</CardTitle>
                    <CardText>
                      Notifiche SEND inviate ai destinatari che non hanno
                      trovato una PEC o un Domicilio Digitale
                    </CardText>
                  </Stack>
                </Box>
              </Stack>
              <Stack
                direction={"column"}
                spacing={2}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <PieChart
                  spec={toVegaLiteSpec(pieChartDigitalSpec)}
                  yearSignal={selYear}
                />
              </Stack>
            </Stack>
          </KpiCard2>
        </Stack>
        <Box mb={2}>
          <KpiNotifications selYear={selYear} />
          <NotificationsTrend selYear={selYear} />
        </Box>
      </SectionLayout>
      <Box sx={{ overflowX: "hidden" }}>
        {/* <DataSectionWrapper
          title={t("sent_notifications.title")}
          description={t("sent_notifications.description")}
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper> */}

        <DataSectionWrapper
          title={t("authorities_and_types.title")}
          description={t("authorities_and_types.description")}
          background="grey"
        >
          <Box mb={2}>
            <KpiAuthoritiesServices />
            <TopServices />
          </Box>
        </DataSectionWrapper>
      </Box>
    </>
  );
};

export default SendInNumbers;
