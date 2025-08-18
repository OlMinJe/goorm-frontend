const API = "https://jsonplaceholder.typicode.com/users"

export async function fetchUser() {
  const res = await fetch(API)
  if (!res.ok) {
    throw new Error(res.status)
  }
  return res.json()
}
