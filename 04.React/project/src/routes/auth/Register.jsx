import { useState } from 'react'

import InputField from '@/components/InputField'

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
        <InputField
          label="이름"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="이름을 입력해 주세요."
          autoComplete="name"
          required
          error={errors.name}
        />

        {/* 이메일 */}
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          required
          error={errors.email}
        />

        {/* 비밀번호 */}
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="비밀번호를 입력해 주세요."
          autoComplete="new-password"
          required
          error={errors.password}
        />

        {/* 비밀번호 확인 */}
        <InputField
          label="비밀번호 확인"
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={onChange}
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          required
          error={errors.confirm}
        />

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
