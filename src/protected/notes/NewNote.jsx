import getUsers from "../../api/users/queries/getUsers";
import { useQuery } from "@tanstack/react-query";
import NewNoteForm from "./NewNoteForm";

function NewNote() {
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
    return (
      <>
        <p className="general-btn" style={{ marginBottom: "1rem" }}>
          <Link to="/dash/users/new">Create User</Link>
        </p>
        <p>No user yet!</p>
      </>
    );
  }
  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
}

export default NewNote;
