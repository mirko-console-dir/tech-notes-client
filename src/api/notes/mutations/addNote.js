export default async function addNote(note) {
  const response = await fetch("http://localhost:3500/notes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }
}
