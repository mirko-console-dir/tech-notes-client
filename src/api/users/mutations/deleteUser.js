export default async function deleteUserMutation(user) {
  const response = await fetch("http://localhost:3500/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Req failed status ${response.status}`
    );
  }
}
