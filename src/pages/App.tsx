import { Suspense } from "react"
import { Outlet, NavLink } from "react-router-dom"
import "../styles/App.scss"

const Home: React.FC = () => {
  return (
    <div className="main">
      <aside>
        <div className="empty-aside"></div>
        <div className="aside-container">
          <button className="main-btn">+新笔记</button>
          <div className="menu-item">
            <NavLink to="/" end>
              便笺
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/notes" end>
              笔记
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/favorites" end>
              收藏
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/trash" end>
              回收站
            </NavLink>
          </div>
        </div>
      </aside>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="title">标题</div>
          <div className="cardContainer">
            <Outlet />
          </div>
        </Suspense>
      </section>
    </div>
  )
}

export default Home
