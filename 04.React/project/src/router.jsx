import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'

import { ROUTES } from './lib/routes'
import AuthLayout from './routes/auth/AuthLauout'
import Login from './routes/auth/Login'
import Mypage from './routes/auth/MyPage'
import Register from './routes/auth/Register'
import Rate from './routes/guitar/Rate'
import Todo from './routes/guitar/Todo'
import Home from './routes/Home'
import ProfileAxios from './routes/member/ProfileAxios'
import ProfileQuery from './routes/member/ProfileQuery'
import NotFount from './routes/NotFound'

import RootLayout from '@/layout/RootLayout'

const Profile = lazy(() => import('@/routes/member/Profile'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path={ROUTES.GUITAR.ROOT} element={<Outlet />}>
          <Route index element={<Navigate to={ROUTES.GUITAR.TODO} replace />} />
          <Route index path={ROUTES.GUITAR.RATE} element={<Rate />} />
          <Route path={ROUTES.GUITAR.TODO} element={<Todo />} />
        </Route>

        <Route path={ROUTES.MEMBER.ROOT} element={<Outlet />}>
          <Route index element={<Navigate to={ROUTES.MEMBER.PROFILE} replace />} />
          <Route path={ROUTES.MEMBER.PROFILE} element={<Profile />} />
          <Route path={ROUTES.MEMBER.PROFILE_AXIOS} element={<ProfileAxios />} />
          <Route path={ROUTES.MEMBER.PROFILE_QUERY} element={<ProfileQuery />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
          <Route path={ROUTES.AUTH.MYPAGE} element={<Mypage />} />
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFount />} />
      </Route>
    </Routes>
  )
}
