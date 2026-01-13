
export async function fetchProducts() {
  const res = await fetch(
    `${import.meta.env.VITE_ROUTE_API}/products`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  return data.products;
}
