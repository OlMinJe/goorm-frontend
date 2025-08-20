import axios from 'axios'
import { useEffect, useState } from 'react'

import ProfileCard from '@/components/users/ProfileCard'

export default function ProfileAxios() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // axios
    //   .get('/users.json')
    //   .then((res) => setUsers(res.data))
    //   .catch((err) => console.error(err))

    const load = async () => {
      try {
        const { data } = await axios.get('/users.json')
        setUsers(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

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
