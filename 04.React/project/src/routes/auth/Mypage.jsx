import { useState } from 'react'

const EMOJIS = [
  { id: 'fe', char: '👩🏻‍💻', label: 'frontend' },
  { id: 'user', char: '👤', label: 'user' },
  { id: 'skull', char: '☠️', label: 'skull' },
]

export default function Mypage() {
  const [user, setUser] = useState({ name: '', job: '', emoji: [] })

  const handleSubmit = (FormData) => {
    const userName = FormData.get('name')
    const userJob = FormData.get('job')
    const userEmoji = FormData.get('emoji')

    setUser((prev) => ({ ...prev, name: userName, job: userJob, emoji: userEmoji }))
  }

  return (
    <div>
      <div className="flex gap-4">
        <section className="flex-1 p-4 rounded-lg border-1 bg-white">
          <form action={handleSubmit}>
            {/* 이름 */}
            <fieldset className="flex flex-col mb-5">
              <legend className="mb-2 font-bold">이름</legend>
              <input name="name" className="p-2 border-1 rounded-sm" required />
            </fieldset>

            {/* 직무 */}
            <fieldset className="flex flex-col mb-5">
              <legend className="mb-2 font-bold">직무</legend>
              <select
                id="job"
                name="job"
                defaultValue=""
                className="p-2 border-1 rounded-sm"
                required
              >
                <option value="" disabled>
                  선택하세요
                </option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="ProductManagement">Product Management</option>
              </select>
            </fieldset>

            {/* 이모지 */}
            <fieldset className="flex flex-col mb-5">
              <legend className="mb-2 font-bold">이모지</legend>
              <div className="flex items-center gap-4">
                {EMOJIS.map((e, i) => (
                  <label
                    key={e.id}
                    htmlFor={`emoji-${e.id}`}
                    className="p-2 rounded-md inline-flex items-center gap-2 cursor-pointer bg-gray-100 transition has-[:checked]:bg-pink-200 has-[:checked]:text-white"
                  >
                    <input
                      type="radio"
                      id={`emoji-${e.id}`}
                      name="emoji"
                      value={e.char}
                      className="accent-black sr-only"
                      required={i === 0}
                    />
                    <span>{e.char}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="text-right">
              <button type="submit" className="py-1 px-5 rounded-md bg-pink-100">
                수정
              </button>
            </div>
          </form>
        </section>
        <section className="flex-1 p-4 rounded-lg border-1 bg-white">
          {user.name || user.job || user.emoji.length ? (
            <div className="h-full flex items-center">
              <div className="mr-3 text-4xl">{user.emoji}</div>
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-gray-400">{user.job}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">왼쪽 폼을 제출하면 정보가 여기에 표시돼요.</p>
          )}
        </section>
      </div>
    </div>
  )
}
