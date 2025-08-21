async function fetchUser() {
  const res = await fetch('/users.json')
  if (!res.ok) {
    throw new Error('데이터 불러오기 실패')
  }
  return res.json()
}

export const userPromise = fetchUser()
