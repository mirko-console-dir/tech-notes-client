export default async function deleteNoteMutation(note) {
  const response = await fetch("http://localhost:3500/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Req failed status ${response.status}`
    );
  }
}
