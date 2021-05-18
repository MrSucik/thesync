import Devices from "./features/Devices/Devices";
import Scenes from "./features/Scenes/Scenes";
import Header from "./features/Header";
import Loading from "./components/Loading";
import { useFirestoreSubscribe } from "./hooks/useFirestoreSubscribe";
import UsersModal from "./features/Users/UsersModal";
import ModalPreview from "./features/Preview/ModalPreview";
import SceneDetail from "./features/SceneDetail";
import { Box, Theme, withStyles } from "@material-ui/core";
import Content from "./features/Content/Content";

const Container = withStyles((theme: Theme) => ({
  root: {
    height: "calc(100vh - 86px)",
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
}))(Box);

const Dashboard = () => {
  const dataLoaded = useFirestoreSubscribe();
  return dataLoaded ? (
    <>
      <UsersModal />
      <ModalPreview />
      <Content />
      <Header />
      <Container>
        <Scenes />
        <SceneDetail />
        <Devices />
      </Container>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
