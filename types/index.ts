import { Session } from 'express-session'
import { CartItem, PersonalInfo } from '@/server/api'

declare module 'express-session' {
  interface Session {
    cartList: CartItem[]
    personalInfo: PersonalInfo
  }
}
