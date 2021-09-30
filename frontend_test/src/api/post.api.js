export async function getAll() {
  const resp = await fetch('http://localhost:5000/blog/posts', {
    method: "GET"
  })

  const data = await resp.json()
  return data
}