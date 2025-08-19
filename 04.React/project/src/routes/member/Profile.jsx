import { useEffect, useState } from 'react'

import ProfileCard from '@/components/users/ProfileCard'

export default function Profile() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('데이터 로드 실패: ', err))
  })

  // 768px 이상일 때 2열, 1024px 3열
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {users.map((user) => (
        <article className="min-h-40" key={user.id}>
          <ProfileCard user={user} />
        </article>
      ))}
    </section>
  )
}
