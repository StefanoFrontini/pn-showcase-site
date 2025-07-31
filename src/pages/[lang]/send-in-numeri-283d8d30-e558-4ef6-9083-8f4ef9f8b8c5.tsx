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

import topAreasSpec from "../../components/Numeri/assets/data/top-areas.vl.json";

import Head from "next/head";
import CardText from "src/components/Numeri/components/CardText";
import CardTitle from "src/components/Numeri/components/CardTitle";
import KpiWrapper from "src/components/Numeri/components/KpiWrapper";
import MapChart from "src/components/Numeri/components/MapChart";
import NotificationsTypes from "src/components/Numeri/components/NotificationsTypes";
import SquareBracketWrapper from "src/components/Numeri/components/SquareBracketWrapper";
import LangContext from "src/context/lang-context";
import entitiesActiveSpec from "../../components/Numeri/assets/data/entities-active.vl.json";
import municipalitiesActivePercSpec from "../../components/Numeri/assets/data/municipalities-active-perc.vl.json";
import pieChartDigitalSpec from "../../components/Numeri/assets/data/pie-chart-digital.vl.json";

console.log({ data: toVegaLiteSpec(topAreasSpec) });

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
  const { lang } = useContext(LangContext);
  console.log("🚀 ~ lang:", lang);

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
      <svg
        height="0"
        width="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <pattern
            id="pattern_1"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <image
              xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2NkZDdmOSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQuNSIgZD0iTTIwLTVWNW0wIDMwdjEwbTIwLTMwdjEwTTAgMTV2MTBNLTUgNDBINU0tNSAwSDVtMzAgMGgxME0zNSA0MGgxME0xNSAyMGgxMCIvPjwvc3ZnPg==
"
              x="0"
              y="0"
              width="8"
              height="8"
            ></image>
          </pattern>
          <pattern
            id="pattern_2"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <image
              xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBiM2VlNSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2LjUiIGQ9Ik0wIDEwaDIweiIvPjwvc3ZnPg=="
              x="0"
              y="0"
              width="6"
              height="6"
            ></image>
          </pattern>
        </defs>
      </svg>

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
                    Vai al sito
                  </Button>
                }
                severity="info"
                variant="standard"
                sx={{
                  backgroundColor: dashboardColors.get("alert"),
                  border: `1px solid ${dashboardColors.get("alert-border")}`,
                }}
              >
                I dati sono disponibili su dati.gov.it
              </Alert>
            </Box>
          </Stack>
        </Box>
        <Box component="main" paddingTop={6}>
          <SectionLayout
            title="Notifiche SEND inviate"
            text="I dati si riferiscono alle comunicazioni a valore legale inviate dagli enti aderenti."
          >
            <TabsNumeri
              tabs={tabs.map((tab) => tab.label)}
              onTabChange={handleTabChange}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
              width={"100%"}
            >
              <Box sx={{ flex: "0 0 30.602%" }}>
                <KpiCard>
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
                      La notifica SEND è una comunicazione a valore legale
                      emessa in via ufficiale da un'amministrazione. Può essere
                      recapitata in modalità digitale o analogica.
                    </CardText>
                  </Stack>
                </KpiCard>
              </Box>
              <Box sx={{ flex: "1 1 0" }}>
                <KpiCard>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 8, sm: 2 }}
                    width={"100%"}
                  >
                    <Stack
                      sx={{ flex: "0 0 50%" }}
                      direction={"column"}
                      spacing={4}
                      width={"100%"}
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
                        <CardTitle>Numero di notifiche SEND digitali</CardTitle>
                        <CardText>
                          Notifiche SEND emesse ai destinatari tramite canali
                          digitali certificati.
                        </CardText>
                      </Stack>
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
                          Numero di notifiche SEND analogiche
                        </CardTitle>
                        <CardText>
                          Notifiche SEND emesse in modalità analogica per
                          assenza di canali digitali certificati del
                          destinatario.
                        </CardText>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{ flex: "1 1 0" }}
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
                </KpiCard>
              </Box>
            </Stack>
            <NotificationsTrend selYear={selYear} />
          </SectionLayout>
          <SectionLayout
            title="Enti su SEND"
            text="Enti aderenti che hanno inviato almeno una notifica SEND dall'avvio del servizio."
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
              width={"100%"}
            >
              <Stack
                flex={"0 0 30.602%"}
                direction={"column"}
                spacing={6}
                width={"100%"}
              >
                <KpiCard>
                  <Stack direction={"column"} spacing={1} width={"100%"}>
                    <Icons.AccountBalanceIcon />
                    <CardTitle>Totale enti su SEND</CardTitle>
                    <CardText>
                      Numero complessivo degli enti che hanno inviato almeno una
                      notifica SEND.
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
                      Percentuale di comuni sul totale degli enti su SEND
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
                      Distribuzione geografica dei comuni su SEND
                    </CardTitle>
                  </Box>
                  <CardText>
                    Il grafico mostra la distribuzione dei comuni nelle diverse
                    regioni, la dimensione delle bolle indica il volume dei
                    comumi attivi per regione.
                  </CardText>
                  <MapChart />
                </KpiCard>
              </Box>
            </Stack>
          </SectionLayout>
          <SectionLayout
            title="Principali ambiti di notifiche SEND"
            text="Categorie di notifiche SEND più inviate."
          >
            <NotificationsTypes />
          </SectionLayout>
        </Box>
      </Box>

      {/* <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title={t("sent_notifications.title")}
          description={t("sent_notifications.description")}
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title={t("authorities_and_types.title")}
          description={t("authorities_and_types.description")}
          background="grey"
        >
          <Box mb={2}>
            <KpiAuthoritiesServices />
          </Box>
        </DataSectionWrapper>
      </Box> */}
    </>
  );
};

export default SendInNumbers;
