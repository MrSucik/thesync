import Devices from "features/Devices/Devices";
import Scenes from "features/Scenes/Scenes";
import Header from "features/Header";
import Loading from "components/Loading";
import { useFirestoreSubscribe } from "hooks/useFirestoreSubscribe";
import UsersModal from "features/Users/UsersModal";
import ModalPreview from "features/Preview/ModalPreview";
import SceneDetail from "features/SceneDetail";
import Content from "features/Content/Content";
import { Box } from "@mui/system";
import { useStoreUserData } from "features/Authorization/useStoreUserData";

const Dashboard = () => {
  useStoreUserData();
  const dataLoaded = useFirestoreSubscribe("wigym");
  return dataLoaded ? (
    <>
      <UsersModal />
      <ModalPreview />
      <Content />
      <Header />
      <Box
        sx={{
          height: "calc(100vh - 86px)",
          display: "flex",
          backgroundColor: "background.paper",
        }}>
        <Scenes />
        <SceneDetail />
        <Devices />
      </Box>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
