
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import {
  createContext,
  useEffect,
  useState
} from "react";
import { IUser } from "@/utils/types";

interface AuthContextProps {
  children: React.ReactNode;
}

interface IAuthContextData {
  isAuth: boolean;
  users: any;
  socketChangeUser: any
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

let user: IUser
export let socket: any

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    let auth = false
    if (typeof window !== 'undefined') {
      const hasUser = Boolean(localStorage.getItem('user'))
      //@ts-ignore
      user = JSON.parse(localStorage.getItem('user'))

      if (!hasUser || !user)
        auth = false
      else {
        auth = true
        socketIoSetup(user)
      }
    }

    const isAuthRoute = router.pathname.indexOf('private') > -1

    if (!auth && isAuthRoute) {
      router.push('signin')
    } else if (auth && !isAuthRoute) {
      router.push('private')
    }

    setIsAuth(auth)

  }, [router]);


  const socketIoSetup = (usr:any) => {
    if (!socket) {
      socket = io('https://english-next-socket-ms.onrender.com', { query: usr });
      socket.on('users', (data: any) => {
        setUsers(data)
        console.log('users', data)
      })
    }
  }


  const socketChangeUser = (usr:any) => {
    socketIoSetup(usr)
    socket.emit('changeUser', usr)
  }


  return (
    <AuthContext.Provider value={{ isAuth, users, socketChangeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
