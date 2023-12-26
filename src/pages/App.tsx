import { Suspense } from "react"
import { Outlet, NavLink } from "react-router-dom"

import styled from "styled-components"

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div className="main">
        <aside>
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
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  .main {
    min-height: 100vh;
    display: flex;
    aside {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 240px;
      background-color: #2d2d2d;
      color: #fff;
      gap: 8px;
      .main-btn {
        text-align: left;
        margin: 0;
        padding: 0 20px;
        border: none;
        width: 240px;
        height: 50px;
        background-color: #2d2d2d;
        color: #fff;
      }
      .menu-item {
        height: 40px;
        width: 240px;
        a {
          display: flex;
          padding: 0 20px;
          align-items: center;
          background-color: #2d2d2d;
          height: 40px;
          line-height: 40px;
          text-decoration: none;
          color: #fff;
        }
        a:hover {
          background-color: #3a3a3a;
        }
        a.active {
          background-color: #202020;
        }
      }
    }
    section {
      background-color: #f2f2f2;
      flex: auto;
      .title {
        margin: 24px 36px;
        font-family: sans-serif;
        font-size: 40px;
        font-weight: 600;
        color: #232323;
      }
      .cardContainer {
        margin: 24px 36px;
        background: #fff;
        min-height: 80vh;
        border-radius: 12px;
        padding: 12px;
      }
    }
  }
`
