export const dynamic = "force-dynamic"
import LoginForm from '@/components/loginForm'

type Props={
  searchParams:{
    [key:string]:string
  }
}

export default function page({searchParams}:Props) {
  let master=false;
  if(searchParams.token && searchParams.token!=null && /login|new/.test(searchParams.type)){
    master=true
  }
  return (
   <LoginForm token={searchParams.token} master={master} type={searchParams.type as 'login'|'new'}/>
  )
}
