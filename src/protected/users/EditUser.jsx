import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import EditUserForm from "./EditUserForm";

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  console.log("useParams: ", id);

  const users = queryClient.getQueryData(["users"]);
  const user = users.find((user) => user._id === id);

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
}

export default EditUser;
