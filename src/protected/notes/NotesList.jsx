import { useQuery } from "@tanstack/react-query";
import getNotes from "../../api/notes/queries/getNotes";
import Note from "./Note";

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
    return <span>No notes yet!</span>;
  }
  console.log(notes);

  const tableContent = notes?.length
    ? notes.map((note) => <Note key={note.id} note={note} />)
    : null;

  return (
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
  );
}

export default NotesList;
