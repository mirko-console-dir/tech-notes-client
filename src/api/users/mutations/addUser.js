export default async function addUser(user) {
  const response = await fetch("http://localhost:3500/users", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }
}
