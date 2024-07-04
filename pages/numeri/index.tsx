import type { InferGetStaticPropsType, NextPage } from "next";

import { Box, Typography } from "@mui/material";
import {
  SEND_NUMBERS_SECTION_1,
  SEND_NUMBERS_SECTION_2,
} from "@utils/constants";
import { Metrics1, Metrics2 } from "model/numbers.models";
import { useState } from "react";
import DashboardIntro from "src/components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "src/components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "src/components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "src/components/Numeri/components/KpiNotifications";
import NotificationsTrend from "src/components/Numeri/components/NotificationsTrend";
import TopServices from "src/components/Numeri/components/TopServices";
import { curYear, firstYear } from "src/components/Numeri/shared/constants";
import Tabs from "src/components/Tabs";
import PageHead from "../../src/components/PageHead";

type Tabs = {
  id: number | null;
  label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

export async function getStaticProps({ noLayout = false }) {
  const urls = [SEND_NUMBERS_SECTION_1, SEND_NUMBERS_SECTION_2];
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const notOk = responses.some((res) => !res.ok);
  if (notOk) {
    // If there is a server error the cache is not updated
    // until the next successful request.
    throw new Error("Error fetching data");
  }
  const data = (await Promise.all(responses.map((res) => res.json()))) as [
    Metrics1,
    Metrics2
  ];
  return {
    props: {
      data,
      noLayout,
    },
  };
}
const NumeriPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const [selYear, setSelYear] = useState<number | null>(null);
  const [metricsData1, metricsData2] = data;

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <PageHead
        title="SEND - Servizio Notifiche Digitali | I numeri di SEND"
        description="Scopri i dati relativi a notifiche inviate, enti che stanno usando SEND e tipologie di servizi dati"
      />
      <Box mt={10}>
        <Typography align="center" variant="h2">
          SEND in numeri
        </Typography>
        <DashboardIntro data={metricsData1} />
      </Box>

      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title="Notifiche inviate"
          description="I seguenti dati si riferiscono alle notifiche inviate dagli enti della pubblica amministrazione"
        >
          <Box mb={2}>
            <KpiNotifications
              selYear={selYear}
              data={metricsData1.totale_notifiche}
            />

            {/* <Completion selYear={selYear} /> */}
            <NotificationsTrend
              selYear={selYear}
              data={metricsData1.notifiche_per_mese}
            />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title="Enti e tipologie di notifica inviate"
          description="I seguenti dati mostrano quanti Enti stanno utilizzando SEND e per quale tipologia di servizi"
          background="grey"
        >
          <Box mb={2}>
            <KpiAuthoritiesServices data={metricsData2} />
            <TopServices data={metricsData2} />
          </Box>
        </DataSectionWrapper>
      </Box>
    </>
  );
};

export default NumeriPage;
