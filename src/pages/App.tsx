import { Suspense, useCallback } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"

import { FileAddOutlined, EditOutlined, DatabaseOutlined, BookOutlined, DeleteOutlined } from "@ant-design/icons"

import "@/styles/App.scss"
import useNoteStore from "@/store/note"
import { genNewNote } from "@/util/newNote"

const Home: React.FC = () => {
  const navigation = useNavigate()
  // const location = useLocation()
  const { addNote, updateLatestId } = useNoteStore()
  const handleAddNewNote = useCallback(() => {
    const newNote = genNewNote()
    addNote(newNote)
    updateLatestId(newNote.noteId as number)
    navigation("/")
  }, [addNote, navigation, updateLatestId])

  return (
    <div className="main">
      <aside>
        <div className="empty-aside"></div>
        <div className="aside-container">
          <div className="btn-container" onClick={handleAddNewNote}>
            <FileAddOutlined />
            <div className="btn-font">新笔记</div>
          </div>
          <div className="menu-item">
            <NavLink to="/" end>
              <EditOutlined />
              <span className="menu-font">便笺</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/notes" end>
              <DatabaseOutlined />
              <span className="menu-font">笔记</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/favorites" end>
              <BookOutlined />
              <span className="menu-font">收藏</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/trash" end>
              <DeleteOutlined />
              <span className="menu-font">回收站</span>
            </NavLink>
          </div>
        </div>
      </aside>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  )
}

export default Home
