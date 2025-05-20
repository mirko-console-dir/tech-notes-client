export default async function getUsers() {
  const response = await fetch("http://localhost:3500/users");

  return response.json();
}
