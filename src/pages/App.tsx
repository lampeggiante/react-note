import { Suspense, useCallback, useEffect, useState } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"

import {
  FileAddOutlined,
  EditOutlined,
  DatabaseOutlined,
  BookOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Spin, Popconfirm } from "antd"

import "@/styles/App.scss"
import { updateLatestNote } from "@/services/login"
import { addNewNote } from "@/services/notes"
import useNoteStore, { NoteType } from "@/store/note"

const Home: React.FC = () => {
  const navigation = useNavigate()
  // const location = useLocation()
  const { user_id, addNote, updateLatestId } = useNoteStore()
  const handleAddNewNote = useCallback(async () => {
    const newNote: any = {
      user_id,
      noteTitle: "新建笔记",
      noteContent: "",
      isStar: false,
      isTrash: false,
    }
    const res = await addNewNote(newNote)
    const addedNote: NoteType = { ...newNote, noteId: res.data }
    addNote(addedNote)
    updateLatestId(res.data)
    updateLatestNote({ user_id: user_id as number, latestNoteId: res.data })
    navigation("/react-note/")
  }, [addNote, navigation, updateLatestId, user_id])
  const [pageSpin, setPageSpin] = useState<boolean>(true)

  const handleExit = useCallback(() => {
    localStorage.clear()
    navigation("/react-note/login")
  }, [navigation])

  useEffect(() => {
    setPageSpin(true)
    const isLoggedIn = localStorage.getItem("token")
    if (!isLoggedIn) {
      navigation("/react-note/login")
    }
    setPageSpin(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (pageSpin) {
    return <Spin spinning fullscreen />
  }

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
            <NavLink to="/react-note/" end>
              <EditOutlined />
              <span className="menu-font">便笺</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/react-note/notes" end>
              <DatabaseOutlined />
              <span className="menu-font">笔记</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/react-note/favorites" end>
              <BookOutlined />
              <span className="menu-font">收藏</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <NavLink to="/react-note/trash" end>
              <DeleteOutlined />
              <span className="menu-font">回收站</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <Popconfirm
              title="退出登录"
              description="确定要退出吗"
              onConfirm={handleExit}
              okText="确认"
              cancelText="取消">
              <a href="#">
                <LogoutOutlined />
                <span style={{ marginLeft: 8 }}>退出登录</span>
              </a>
            </Popconfirm>
          </div>
        </div>
      </aside>
      <section>
        <Suspense fallback={<Spin delay={5000} fullscreen />}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  )
}

export default Home
