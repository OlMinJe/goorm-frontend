import { QueryClient } from '@tanstack/react-query'

export const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60000,
      retry: (failCount, err) => (err?.status === 401 ? 0 : failCount < 2),
    },
  },
  mutation: {
    retry: 0,
  },
})
