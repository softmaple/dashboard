import { useState, SyntheticEvent, FC } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import type { Clone, View } from "@/types";
import { HeatmapCalendar } from "@/components/heatmap-calendar";
import { ViewsPanel } from "./views-panel";

type DashboardTabsProps = {
  clones: Clone[];
  views: View[];
  isDarkMode: boolean;
};

export const DashboardTabs: FC<DashboardTabsProps> = ({
  clones,
  views,
  isDarkMode,
}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="dashboard tabs">
            <Tab label="Clones" value="1" />
            <Tab label="Views" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <HeatmapCalendar clones={clones} isDarkMode={isDarkMode} />
        </TabPanel>
        <TabPanel value="2">
          <ViewsPanel views={views} isDarkMode={isDarkMode} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
