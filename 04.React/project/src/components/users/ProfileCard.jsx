import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ProfileCard({ user = {} }) {
  const { name = '익명', profile: profileSrc, intro, GitHub, blog, nickname } = user

  const imgSrc = user.profile ? `/${String(user.profile).replace(/^\/+/, '')}` : undefined

  return (
    <Card className="min-h-full">
      <CardHeader className="relative">
        <CardTitle className=" mx-auto inline-block text-center">
          {name}
          <span className="absolute -top-1 right-4 px-2 py-1 rounded-md bg-pink-100 text-xs">
            {nickname}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <CardDescription>
          <ul>
            <li>
              {profileSrc ? (
                <img
                  src={imgSrc}
                  alt={`${name}의 프로필 이미지`}
                  className="h-40 w-30 ml-auto mr-auto mb-3 rounded-full object-cover"
                />
              ) : (
                <div
                  className="h-40 w-30 rounded-full bg-gray-200 dark:bg-gray-800"
                  aria-hidden="true"
                />
              )}
            </li>
            <li>{intro}</li>
          </ul>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col text-center">
        <p>{GitHub}</p>
        <p>{blog}</p>
      </CardFooter>
    </Card>
  )
}
