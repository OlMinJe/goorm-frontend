import { useQuery } from '@tanstack/react-query'

import ProfileCard from '@/components/users/ProfileCard'

export default function ProfileQuery() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await fetch('/users.json')).json(),
    staleTime: 1000 * 10,
  })

  if (isLoading) {
    return <p>로딩중</p>
  }
  if (isError) {
    return <p>에러: {error.message}</p>
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {data &&
        data.map((user) => (
          <article className="min-h-40" key={user.id}>
            <ProfileCard user={user} />
          </article>
        ))}
    </section>
  )
}
