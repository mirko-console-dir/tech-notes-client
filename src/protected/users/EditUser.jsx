import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import EditUserForm from "./EditUserForm";
import getUsers from "../../api/users/queries/getUsers";
import { useQuery } from "@tanstack/react-query";
function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  // First, try to get users from cache
  const usersFromCache = queryClient.getQueryData(["users"]);

  // If not in cache, fetch all users
  const { data: fetchedUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    // Only run this query if we don't have users in cache
    enabled: !usersFromCache,
  });

  // Find user in either cache or fetched data
  const users = usersFromCache || fetchedUsers;
  let user = users?.find((user) => user._id === id);

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
}

export default EditUser;
