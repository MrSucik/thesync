import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs as MuiTabs, withStyles } from "@material-ui/core";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Preview from "../../features/Preview/Preview";
import Settings from "./Settings";
import { setPreviewMediaList } from "../../store/slices/preview";
import { useCurrentScene } from "../../hooks/useCurrentScene";

const DarkTabs = withStyles((theme) => ({
  indicator: { backgroundColor: theme.palette.primary.main },
}))(MuiTabs);
const DarkTab = withStyles((theme) => ({
  root: {
    color: "rgba(255, 255, 255, 0.7)",
    "&$selected": { color: theme.palette.primary.main },
  },
}))(Tab);
const TabContainer = withStyles({
  root: {
    overflow: "auto",
    padding: 8,
    flexGrow: 1,
  },
})(Box);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <TabContainer role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </TabContainer>
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
      <DarkTabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        textColor="primary"
        variant="fullWidth"
      >
        <DarkTab label="obsah" />
        <DarkTab label="náhled" disabled={!Boolean(scene?.mediaList?.length)} />
        <DarkTab label="nastavení" />
      </DarkTabs>
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
