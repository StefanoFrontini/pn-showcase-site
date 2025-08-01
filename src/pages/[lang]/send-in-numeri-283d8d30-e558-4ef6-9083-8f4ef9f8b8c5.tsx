import type { GetStaticPaths, NextPage } from "next";

import InfoIcon from "@mui/icons-material/Info";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import Script from "next/script";
import { useContext, useState } from "react";
import Icons from "src/components/Numeri/components/Icons";
import KpiCard from "src/components/Numeri/components/KpiCard";
import KpiSignal from "src/components/Numeri/components/KpiSignal";
import SectionLayout from "src/components/Numeri/components/SectionLayout";
import { dashboardColors } from "src/components/Numeri/shared/colors";
import { toVegaLiteSpec } from "src/components/Numeri/shared/toVegaLiteSpec";
import { getI18n } from "../../api/i18n";
import DashboardIntro from "../../components/Numeri/components/DashboardIntro";
import NotificationsTrend from "../../components/Numeri/components/NotificationsTrend";
import { curYear, firstYear } from "../../components/Numeri/shared/constants";
// import Tabs from "../../components/Tabs";
import TabsNumeri from "src/components/Numeri/components/TabsNumeri";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode } from "../../model";

import notificationsAnalogSpec from "../../components/Numeri/assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../../components/Numeri/assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../../components/Numeri/assets/data/notifications-total.vl.json";
import PieChart from "../../components/Numeri/components/PieChart";

import Head from "next/head";
import CardText from "src/components/Numeri/components/CardText";
import CardTitle from "src/components/Numeri/components/CardTitle";
import KpiWrapper from "src/components/Numeri/components/KpiWrapper";
import MapChart from "src/components/Numeri/components/MapChart";
import NotificationsTypes from "src/components/Numeri/components/NotificationsTypes";
import SquareBracketWrapper from "src/components/Numeri/components/SquareBracketWrapper";
import SvgDefs from "src/components/Numeri/components/SvgDefs";
import entitiesActiveSpec from "../../components/Numeri/assets/data/entities-active.vl.json";
import municipalitiesActivePercSpec from "../../components/Numeri/assets/data/municipalities-active-perc.vl.json";
import pieChartDigitalSpec from "../../components/Numeri/assets/data/pie-chart-digital.vl.json";

import LangContext from "src/context/lang-context";
import { formatLocale, timeFormatLocale } from "vega";

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
  // const vegaLocale = (
  //   await import(
  //     `src/components/Numeri/shared/locale/${params.lang}/locale.json`
  //   )
  // ).default;
  // const vegaTimeLocale = (
  //   await import(
  //     `src/components/Numeri/shared/locale/${params.lang}/time-locale.json`
  //   )
  // ).default;
  const vegaFormatLocale = require(`src/components/Numeri/shared/locale/${params.lang}/locale.json`);
  const vegaTimeFormatLocale = require(`src/components/Numeri/shared/locale/${params.lang}/time-locale.json`);

  return {
    props: {
      translations,
      lang: params.lang,
      vegaLocale: {
        formatLocale: vegaFormatLocale,
        timeFormatLocale: vegaTimeFormatLocale,
      },
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

  const { vegaLocale } = useContext(LangContext);

  const [selYear, setSelYear] = useState<number | null>(null);

  formatLocale(vegaLocale.formatLocale ?? {});
  timeFormatLocale(vegaLocale.timeFormatLocale ?? {});

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
      />
      <SvgDefs />

      <Box
        sx={{
          maxWidth: 1156,
          backgroundColor: "white",
          mx: "auto",
          px: {
            xs: 2,
            md: 2,
            xl: 0,
          },
        }}
        marginX={17.7}
      >
        <Box component="header" sx={{ py: 11 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 6, md: 0 }}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Stack direction="column" spacing={2}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: dashboardColors.get("secondary"),
                  fontSize: "0.875rem",
                  letterSpacing: 1,
                }}
              >
                {t("hero.eyelet")}
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  color: dashboardColors.get("primary"),
                }}
              >
                {t("hero.title")}
              </Typography>
              <DashboardIntro />
            </Stack>
            <Box flex={"0 0 32%"}>
              <Alert
                iconMapping={{
                  info: (
                    <InfoIcon
                      sx={{
                        color: dashboardColors.get("icon"),
                        backgroundColor: dashboardColors.get("alert"),
                        borderRadius: "50%",
                      }}
                    />
                  ),
                }}
                action={
                  <Button
                    sx={{
                      color: dashboardColors.get("icon"),
                      whiteSpace: "nowrap",
                    }}
                    href="/"
                    size="small"
                  >
                    {t("hero.website")}
                  </Button>
                }
                severity="info"
                variant="standard"
                sx={{
                  backgroundColor: dashboardColors.get("alert"),
                  border: `1px solid ${dashboardColors.get("alert-border")}`,
                }}
              >
                {t("hero.alert")}
              </Alert>
            </Box>
          </Stack>
        </Box>
        <Box component="main" paddingTop={6}>
          <SectionLayout
            title={t("sent_notifications.title")}
            text={t("sent_notifications.description")}
          >
            <TabsNumeri
              tabs={tabs.map((tab) => tab.label)}
              onTabChange={handleTabChange}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
            >
              <Box sx={{ flex: "0 0 30.602%" }}>
                <KpiCard>
                  <Stack direction={"column"} spacing={2}>
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
                    <CardTitle>{t("sent_notifications.total.title")}</CardTitle>
                    <CardText>
                      {t("sent_notifications.total.description")}
                    </CardText>
                  </Stack>
                </KpiCard>
              </Box>
              <Box sx={{ flex: "1 1 0" }}>
                <KpiCard>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 8, sm: 2 }}
                  >
                    <Stack
                      sx={{ flex: "0 0 50%" }}
                      direction={"column"}
                      spacing={4}
                    >
                      <Stack direction={"column"} spacing={1}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          width={"100%"}
                          alignItems={"center"}
                        >
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="18"
                              fill="url(#pattern_2)"
                            />
                          </svg>

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
                        </Stack>
                        <CardTitle>
                          {t("sent_notifications.digital.title")}
                        </CardTitle>
                        <CardText>
                          {t("sent_notifications.digital.description")}
                        </CardText>
                      </Stack>
                      <Stack direction={"column"} spacing={1}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="18"
                              fill="url(#pattern_1)"
                            />
                          </svg>

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
                        </Stack>
                        <CardTitle>
                          {t("sent_notifications.analog.title")}
                        </CardTitle>
                        <CardText>
                          {t("sent_notifications.analog.description")}
                        </CardText>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{ flex: "1 1 0" }}
                      direction={"column"}
                      spacing={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <PieChart
                        spec={toVegaLiteSpec(pieChartDigitalSpec)}
                        yearSignal={selYear}
                      />
                    </Stack>
                  </Stack>
                </KpiCard>
              </Box>
            </Stack>
            <NotificationsTrend selYear={selYear} />
          </SectionLayout>
          <SectionLayout
            title={t("entities.title")}
            text={t("entities.description")}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
            >
              <Stack flex={"0 0 30.602%"} direction={"column"} spacing={6}>
                <KpiCard>
                  <Stack direction={"column"} spacing={1} width={"100%"}>
                    <Icons.AccountBalanceIcon />
                    <CardTitle>{t("entities.active.total.title")}</CardTitle>
                    <CardText>
                      {t("entities.active.total.description")}
                    </CardText>
                    <Typography
                      sx={{
                        color: dashboardColors.get("blue-io"),
                        fontSize: "2rem",
                        fontWeight: 700,
                        lineHeight: "2.625rem",
                      }}
                    >
                      <KpiWrapper spec={toVegaLiteSpec(entitiesActiveSpec)} />
                    </Typography>
                  </Stack>
                </KpiCard>
                <KpiCard>
                  <Stack direction={"column"} spacing={1} width={"100%"}>
                    <Icons.ThingsToDoIcon />
                    <CardTitle>
                      {t("entities.active.municipalities.title")}
                    </CardTitle>
                    <Typography
                      sx={{
                        color: dashboardColors.get("blue-io"),
                        fontSize: "2rem",
                        fontWeight: 700,
                        lineHeight: "2.625rem",
                      }}
                    >
                      <SquareBracketWrapper>
                        <KpiWrapper
                          spec={toVegaLiteSpec(municipalitiesActivePercSpec)}
                        />
                      </SquareBracketWrapper>
                    </Typography>
                  </Stack>
                </KpiCard>
              </Stack>
              <Box flex={"1 1 0"}>
                <KpiCard>
                  <Box marginBottom={1}>
                    <CardTitle>
                      {t("entities.active.geographic_distribution.title")}
                    </CardTitle>
                  </Box>
                  <CardText>
                    {t("entities.active.geographic_distribution.description")}
                  </CardText>
                  <MapChart />
                </KpiCard>
              </Box>
            </Stack>
          </SectionLayout>
          <SectionLayout
            title={t("notification_types.title")}
            text={t("notification_types.description")}
          >
            <NotificationsTypes />
          </SectionLayout>
        </Box>
      </Box>
    </>
  );
};

export default SendInNumbers;
