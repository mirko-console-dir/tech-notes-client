export default async function getUsers() {
  const users = await fetch("http://localhost:3500/users").then((res) =>
    res.json()
  );
  return users;
}
