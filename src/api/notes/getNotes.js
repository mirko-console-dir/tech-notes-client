export default async function getNotes() {
  const notes = await fetch("http://localhost:3500/notes").then((res) =>
    res.json()
  );
  return notes;
}
