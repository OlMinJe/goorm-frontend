import { useEffect, useReducer } from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import UserError from '@/components/users/UserError'
import UserLoading from '@/components/users/UserLoading'
import { fetchUser } from '@/features/users/api'
import { fetchUserReducer, initialState } from '@/features/users/reducer'

export default function User() {
  const [{ users, error, loading }, dispatch] = useReducer(fetchUserReducer, initialState)

  useEffect(() => {
    const ac = new AbortController()

    dispatch({ type: 'start' })
    fetchUser(ac.signal)
      .then((data) => dispatch({ type: 'success', payload: data }))
      .catch((err) => dispatch({ type: 'error', payload: err }))

    return () => {
      ac.abort()
    }
  }, [])

  if (error) {
    return <UserError error={error} />
  }

  if (loading) {
    return <UserLoading />
  }

  return (
    <section className="flex flex-wrap gap-5">
      {users.map((user) => (
        <article className="w-xs" key={user.id}>
          <Card>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>
                <ul>
                  <li>{user.email}</li>
                  <li>{user.phone}</li>
                </ul>
              </CardDescription>
              <CardAction>
                <a href={user.website}>Site</a>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>
                [{user.address.zipcode}] {user.address.city}
              </p>
              <p>
                [{user.company.name}] {user.company.catchPhrase}
              </p>
            </CardContent>
          </Card>
        </article>
      ))}
    </section>
  )
}
