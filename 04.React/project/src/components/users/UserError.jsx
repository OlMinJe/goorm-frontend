export default function UserError(error) {
  return (
    <div>
      <p>사용자 정보를 불러오지 못했습니다</p>
      <pre className="text-sm text-red-600">{String(error?.message ?? error)}</pre>
    </div>
  )
}
