import getUsers from "../../api/users/queries/getUsers";
import { useQuery } from "@tanstack/react-query";
import User from "./User";
import { Link } from "react-router-dom";

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

  const tableContent = users?.length
    ? users.map((user) => <User key={user.username} user={user} />)
    : null;

  return (
    <>
      <p className="general-btn" style={{ marginBottom: "1rem" }}>
        <Link to="/dash/users/new">Create User</Link>
      </p>
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
    </>
  );
}

export default UsersList;
