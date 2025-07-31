import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "../../../hook/useTranslation";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import CardText from "./CardText";
import KpiCard from "./KpiCard";

import topAreasSpec from "../assets/data/top-areas.vl.json";
import { dashboardColors } from "../shared/colors";
import ChartServices from "./ChartServices";

const categories = [
  "tutte",
  "Comuni",
  "Riscossori e altro",
  "Altri enti territoriali",
  "Province",
  "Regioni",
  "Enti comunali",
  "Ordini, collegi e consigli professionali",
  "Pubbliche amministrazioni centrali",
  "Università",
  "Consorzi universitari",
] as const;

type Categories = (typeof categories)[number];

type OptionsCategories = {
  tag: string;
  label: Categories;
};
const options: OptionsCategories[] = [
  { tag: "tutte", label: categories[0] },
  { tag: "comuni", label: categories[1] },
  { tag: "riscossori", label: categories[2] },
  { tag: "altri_enti", label: categories[3] },
  { tag: "province", label: categories[4] },
  { tag: "regioni", label: categories[5] },
  { tag: "comunali", label: categories[6] },
  { tag: "ordini", label: categories[7] },
  { tag: "amministrazioni", label: categories[8] },
  { tag: "universita", label: categories[9] },
  { tag: "consorzi", label: categories[10] },
];

const NotificationsTypes = () => {
  const { t } = useTranslation(["numeri"]);

  const [curOption, setCurOption] = useState<string>(options[0].tag);
  function getLabel(tag: string) {
    if (tag === "tutte") return null;
    const result = options.find((f) => f.tag === tag);
    return result ? result.label : null;
  }

  const handleOptions = (id: string) => {
    setCurOption(id);
  };
  return (
    <KpiCard>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CardText>
            Filtra per tipologia di ente aderente.
            {/* {t("sent_notifications.trend.description_1", { ns: "numeri" })} */}
          </CardText>

          <Typography variant="caption" color="textSecondary">
            {" "}
            {/* {t("sent_notifications.trend.description_2", { ns: "numeri" })} */}
          </Typography>
          <Select
            size={"small"}
            sx={{
              fontSize: 14,
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: dashboardColors.get("blue-io"),
              },
            }}
            value={curOption}
            onChange={(e: any) => handleOptions(e.target.value)}
          >
            {options.map((option) => (
              <MenuItem
                key={option.tag}
                value={option.tag}
                sx={{
                  "&.Mui-selected": { color: dashboardColors.get("blue-io") },
                }}
              >
                {t(`notification_types.${option.tag}.name`, { ns: "numeri" })}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* <Box style={{ height: "22rem" }}>
          <CumulativeChart
            spec={toVegaLiteSpec(downloadSpec)}
            cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
            filterSignal={getLabel(curOptionTotalDigitalAnalog)}
            yearSignal={selYear}
          />
        </Box> */}
        <ChartServices
          spec={toVegaLiteSpec(topAreasSpec)}
          categorySignal={getLabel(curOption)}
        />
      </Stack>
    </KpiCard>
  );
};
export default NotificationsTypes;
