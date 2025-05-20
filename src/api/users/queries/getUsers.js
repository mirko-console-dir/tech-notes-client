export default async function getUsers() {
  const response = await fetch("http://localhost:3500/users");

  if (!response.ok) {
    const errorData = await response.json();
    throw Error(errorData.message || `Get users failed ${response.status}`);
  }

  return response.json();
}
