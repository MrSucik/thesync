import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUserAdministrationOpen } from "../../store/slices/settings";
import AddUserButton from "./AddUserButton";
import UsersList from "./UsersList";

const UsersModal = () => {
  const open = useSelector<RootState, boolean>(
    (state) => state.settings.userAdministrationOpen
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setUserAdministrationOpen(false));
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Spravovat uživatele aplikace</DialogTitle>
      <DialogContent dividers>
        <AddUserButton />
        <UsersList />
      </DialogContent>
    </Dialog>
  );
};

export default UsersModal;
