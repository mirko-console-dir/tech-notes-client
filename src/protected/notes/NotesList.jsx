import { useQuery } from "@tanstack/react-query";
import getNotes from "../../api/notes/queries/getNotes";
import Note from "./Note";
import { Link } from "react-router-dom";

function NotesList() {
  const {
    status,
    data: notes,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  if (!notes.length) {
    return (
      <>
        <p className="general-btn" style={{ marginBottom: "1rem" }}>
          <Link to="/dash/notes/new">Create Note</Link>
        </p>
        <p>No notes yet!</p>
      </>
    );
  }

  const tableContent = notes?.length
    ? notes.map((note) => <Note key={note._id} note={note} />)
    : null;

  return (
    <>
      <p className="general-btn" style={{ marginBottom: "1rem" }}>
        <Link to="/dash/notes/new">Create Note</Link>
      </p>
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </>
  );
}

export default NotesList;
