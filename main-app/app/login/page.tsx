import LoginForm from '@/components/loginForm'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'


export default function page() {
  const cookieStore=cookies()
  if(cookieStore.get('authToken')!==undefined){
    permanentRedirect('/')
  }
  return (
   <LoginForm />
  )
}
