import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function UserLoading() {
  return (
    <section className="flex flex-wrap gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <article key={i} className="w-3xs">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-5 w-1/2 bg-muted mb-2" />
              <div className="h-4 w-2/3 bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-3/4 bg-muted mb-2" />
              <div className="h-4 w-1/2 bg-muted " />
            </CardContent>
          </Card>
        </article>
      ))}
    </section>
  )
}
