import { useSelector } from "react-redux";
import { List } from "../../components/List";
import { UserModel } from "../../definitions";
import { RootState } from "../../store";
import UserListItem from "./UserListItem";

const UsersList = () => {
  const users = useSelector<RootState, UserModel[]>(
    (state) => state.firestore.ordered.users
  );
  return (
    <List sx={{ width: 500 }}>
      {[...users]
        .sort((a, b) => (a.bigD === b.bigD ? 0 : a.bigD ? -1 : 1))
        .map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
    </List>
  );
};

export default UsersList;
