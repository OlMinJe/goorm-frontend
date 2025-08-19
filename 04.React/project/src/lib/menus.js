import {
  CircleDollarSign,
  Contact,
  Guitar,
  Home,
  ListCheck,
  LogIn,
  User,
  UserPlus,
  Users,
} from 'lucide-react'

import { ROUTES } from '@/lib//routes'

const NAV_META = {
  HOME: { label: 'Home', icon: Home },
  GUITAR: { label: 'Guitar', icon: Guitar },
  TODO: { label: 'To-Do', icon: ListCheck },
  RATE: { label: 'Rate', icon: CircleDollarSign },
  MEMBER: { label: 'Member', icon: Users },
  PROFILE: { label: 'Profile', icon: Contact },
  AUTH: { label: 'Account', icon: User },
  MYPAGE: { label: '마이페이지', icon: User },
  LOGIN: { label: 'Login', icon: LogIn },
  REGISTER: { label: 'Register', icon: UserPlus },
}

const metaOf = (key) => NAV_META[key] || { label: key, icon: undefined }

function buildMenu() {
  const items = []

  Object.entries(ROUTES).forEach(([key, val]) => {
    if (key === 'NOT_FOUND') {
      return
    }

    // 단일 경로
    if (typeof val === 'string') {
      const m = metaOf(key)
      items.push({ slot: 'content', key, title: m.label, to: val, icon: m.icon })
      return
    }

    const children = Object.entries(val)
      .filter(([k]) => k !== 'ROOT')
      .map(([k, path]) => {
        const cm = metaOf(k)
        return { key: k, title: cm.label, to: path, icon: cm.icon }
      })

    if (key === 'AUTH') {
      const order = ['MYPAGE', 'LOGIN', 'REGISTER']
      order.forEach((code) => {
        const found = children.find((c) => c.key === code)
        if (found) {
          items.push({ slot: 'footer', ...found })
        }
      })
    } else {
      const sm = metaOf(key)
      items.push({
        slot: 'content',
        key,
        title: sm.label,
        to: val.ROOT,
        icon: sm.icon,
        children,
      })
    }
  })

  return [...items]
}

export const MENU = buildMenu()
