export const API_BASE_URL = "http://localhost:8080";

export async function fetchItemById(id: string) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  return response.json();
}

export async function updateItem(id: string, body: unknown) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Server error:", errorData);
    throw new Error("Save failed");
  }

  return response.json().catch(() => null);
}

export async function fetchItems(queryString: string) {
    const response = await fetch(`${API_BASE_URL}/items?${queryString}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
  
    return response.json();
  }