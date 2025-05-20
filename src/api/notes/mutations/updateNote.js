export default async function updateNoteMutation(updatedFileds) {
  const response = await fetch("http://localhost:3500/notes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFileds),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }
}
