import { lazy } from 'react'

// 动态引入，只有使用的时候引入这两个页面
const Login: React.FC = lazy(() => import('@/pages/login'))
const Home: React.FC = lazy(() => import('@/pages/home'))

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />
  }
]

export default routes
