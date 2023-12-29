import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { List, Skeleton } from "antd"

import MarkdownViewer from "@/components/markdown-viewer"

import useNoteStore, { NoteType } from "@/store/note"

import "@/styles/container.scss"
import "@/styles/notes.scss"

const Favorites: React.FC = () => {
  const { noteArray, updateLatestId, editNote } = useNoteStore()
  const [prevStr, setPrevStr] = useState("")
  const navigator = useNavigate()
  const truncateString = (str: string | undefined, maxLength: number) => {
    if (!str) return "empty"
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "..."
    } else {
      return str
    }
  }
  const handlePrev: (id: number | undefined) => void = (id) => {
    const clickedItem = noteArray.find((n) => n.noteId === id)
    setPrevStr(clickedItem?.noteContent as string)
  }

  const handleEdit: (id: number | undefined) => void = (id) => {
    updateLatestId(id as number)
    navigator("/")
  }

  const handleTrash: (id: number | undefined) => void = (id) => {
    const clickedItem = noteArray.find((n) => n.noteId === id)
    editNote({ ...clickedItem, isTrash: true } as NoteType)
  }

  const divs = (
    <List
      className="note-list-container"
      itemLayout="horizontal"
      dataSource={noteArray.filter((n) => n.isStar)}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key={item.noteId} onClick={() => handlePrev(item.noteId)}>
              预览
            </a>,
            <a key={item.noteId} onClick={() => handleEdit(item.noteId)}>
              编辑
            </a>,
            <a key={item.noteId} onClick={() => handleTrash(item.noteId)}>
              删除
            </a>,
          ]}>
          <Skeleton title={false} active loading={false}>
            <List.Item.Meta title={item.noteTitle} description={truncateString(item.noteContent, 10)} />
          </Skeleton>
        </List.Item>
      )}
    />
  )

  return (
    <>
      <div className="title">收藏笔记</div>
      <div className="cardContainer">
        <div className="note-container">
          <div className="note-list">{divs}</div>
          <div className="note-content">
            <MarkdownViewer value={prevStr} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorites
