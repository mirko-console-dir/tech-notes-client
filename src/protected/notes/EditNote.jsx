import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import getUsers from "../../api/users/queries/getUsers";
import { useQueries } from "@tanstack/react-query";
import EditNoteForm from "./EditNoteForm";
import getNotes from "../../api/notes/queries/getNotes";

const EditNote = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Check for cached data first
  const notesFromCache = queryClient.getQueryData(["notes"]);
  const usersFromCache = queryClient.getQueryData(["users"]);

  // Run both queries in parallel (like Promise.all)
  const results = useQueries({
    queries: [
      {
        queryKey: ["notes"],
        queryFn: getNotes,
        enabled: !notesFromCache,
      },
      {
        queryKey: ["users"],
        queryFn: getUsers,
        enabled: !usersFromCache,
      },
    ],
  });

  // Extract data and loading states
  const [notesResult, usersResult] = results;

  // Determine if any query is still loading
  const isLoading =
    (notesResult.isLoading && !notesFromCache) ||
    (usersResult.isLoading && !usersFromCache);

  // Get the final data (either from cache or fetch)
  const notes = notesFromCache || notesResult.data;
  const users = usersFromCache || usersResult.data;

  // Find the note we're looking for
  const note = notes?.find((note) => note._id === id);

  if (isLoading) return <p>Loading...</p>;

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditNote;
