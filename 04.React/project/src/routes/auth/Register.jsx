import { useState } from 'react'

const INPUT_STYLE = 'py-2 px-4 bg-white rounded-md'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = '이름을 입력하세요'
    }
    if (!/^[^^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = '이메일 형식이 올바르지 않습니다.'
    }
    if (!form.password) {
      e.password = '비밀번호를 입력하세요'
    }
    if (!form.confirm) {
      e.confirm = '비밀번호 확인을 입력하세요'
    }
    if (form.password !== form.confirm) {
      e.confirm = '비밀번호가 일치하지 않습니다.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    alert(`${form.name}(${form.email})님 환영합니다!`)
  }

  return (
    <div>
      <h1 className="mb-5 text-2xl text-center">회원가입 페이지</h1>
      {/* noValidate - 브라우저 자동 끈다. */}
      <form onSubmit={onSubmit} noValidate>
        {/* 이름 */}
        <fieldset className="grid mb-5">
          <legend className="text-bold mb-1">이름</legend>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="이름을 입력해 주세요."
            className={INPUT_STYLE}
            autoComplete="name"
            required
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
        </fieldset>

        {/* 이메일 */}
        <fieldset className="grid mb-5">
          <legend className="text-bold mb-1">이메일</legend>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="이메일을 입력해 주세요."
            className={INPUT_STYLE}
            autoComplete="email"
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </fieldset>

        {/* 비밀번호 */}
        <fieldset className="grid mb-5">
          <legend className="text-bold mb-1">비밀번호</legend>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해 주세요."
            className={INPUT_STYLE}
            autoComplete="new-password"
            required
          />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
        </fieldset>

        {/* 비밀번호 확인 */}
        <fieldset className="grid mb-5">
          <legend className="text-bold mb-1">비밀번호 확인</legend>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            placeholder="비밀번호 확인"
            className={INPUT_STYLE}
            autoComplete="new-password"
            required
          />
          {errors.confirm && <p className="text-sm text-red-600 mt-1">{errors.confirm}</p>}
        </fieldset>

        {/* 가입 버튼 */}
        <div className="text-right">
          <button type="submit" className="py-2 px-4 rounded-md bg-blue-400 text-white">
            가입하기
          </button>
        </div>
      </form>
    </div>
  )
}
