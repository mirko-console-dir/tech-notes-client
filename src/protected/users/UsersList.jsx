import getUsers from "../../api/users/getUsers";
import { useQuery } from "@tanstack/react-query";
import User from "./User";

function UsersList() {
  const {
    status,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!users.length) {
    return <span>No user yet!</span>;
  }
  console.log(users);
  const tableContent = users?.length
    ? users.map((user) => <User key={user.username} user={user} />)
    : null;

  return (
    <table className="table table--users">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th user__username">
            Username
          </th>
          <th scope="col" className="table__th user__roles">
            Roles
          </th>
          <th scope="col" className="table__th user__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
}

export default UsersList;
