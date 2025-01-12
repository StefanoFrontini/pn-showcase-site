import React, { useState } from "react";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import DashboardIntro from "../../components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "../../components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "../../components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "../../components/Numeri/components/KpiNotifications";
import NotificationsTrend from "../../components/Numeri/components/NotificationsTrend";
import TopServices from "../../components/Numeri/components/TopServices";
import { curYear, firstYear } from "../../components/Numeri/shared/constants";
import Tabs from "../../components/Tabs";
import Script from 'next/script';

type Tabs = {
  id: number | null;
  label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

const DashboardContent: NextPage = () => {
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
        strategy="beforeInteractive"
      />
    
      <Box mt={10}>
        <Typography align="center" variant="h2">
          SEND in numeri
        </Typography>
        <DashboardIntro />
      </Box>

      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title="Notifiche inviate"
          description="I seguenti dati si riferiscono alle notifiche inviate dagli enti della pubblica amministrazione"
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            {/* <Completion selYear={selYear} /> */}
            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title="Enti e tipologie di notifica inviate"
          description="I seguenti dati mostrano quanti Enti stanno utilizzando SEND e per quale tipologia di servizi"
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

// Questo fornirà le proprie proprietà iniziali specificando che non vogliamo il layout
DashboardContent.getInitialProps = async () => {
  return {
    noLayout: true,
  };
};

export default DashboardContent;
