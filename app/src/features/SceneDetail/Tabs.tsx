import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs as MuiTabs } from "@mui/material";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Preview from "../../features/Preview/Preview";
import Settings from "./Settings";
import { setPreviewMediaList } from "../../store/slices/preview";
import { useCurrentScene } from "../../hooks/useCurrentScene";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const darkTab = {
  color: "rgba(255, 255, 255, 0.7)",
  "&$selected": { color: "primary.main" },
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ overflow: "auto", padding: 1 }}>{children}</Box>
      )}
    </Box>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const selectedScene = useSelector<RootState, string | null>(
    (state) => state.app.selectedScene
  );
  const dispatch = useDispatch();
  const scene = useCurrentScene();
  useEffect(() => setActiveTab(0), [selectedScene]);
  useEffect(() => {
    if (selectedScene && activeTab === 1) {
      dispatch(
        setPreviewMediaList({ mediaList: scene.mediaList, type: "tab" })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedScene]);
  return !selectedScene ? null : (
    <>
      <MuiTabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        textColor="primary"
        variant="fullWidth"
      >
        <Tab sx={darkTab} label="obsah" />
        <Tab
          sx={darkTab}
          label="náhled"
          disabled={!Boolean(scene?.mediaList?.length)}
        />
        <Tab sx={darkTab} label="nastavení" />
      </MuiTabs>
      <TabPanel value={activeTab} index={0}>
        <Content />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Preview />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <Settings />
      </TabPanel>
    </>
  );
};

export default Tabs;
