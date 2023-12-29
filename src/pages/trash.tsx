import { useState } from "react"

import { List, Skeleton } from "antd"

import MarkdownViewer from "@/components/markdown-viewer"

import useNoteStore, { NoteType } from "@/store/note"

import "@/styles/container.scss"
import "@/styles/notes.scss"

const Trash: React.FC = () => {
  const { noteArray, editNote, delNote } = useNoteStore()
  const [prevStr, setPrevStr] = useState("")
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

  const handleRecovery: (id: number | undefined) => void = (id) => {
    const clickedItem = noteArray.find((n) => n.noteId === id)
    editNote({ ...clickedItem, isTrash: false } as NoteType)
  }

  const handleDelete: (id: number | undefined) => void = (id) => {
    delNote(id as number)
  }

  const divs = (
    <List
      className="note-list-container"
      itemLayout="horizontal"
      dataSource={noteArray.filter((n) => n.isTrash)}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key={item.noteId} onClick={() => handlePrev(item.noteId)}>
              预览
            </a>,
            <a key={item.noteId} onClick={() => handleRecovery(item.noteId)}>
              恢复
            </a>,
            <a key={item.noteId} onClick={() => handleDelete(item.noteId)}>
              永久删除
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
      <div className="title">回收站</div>
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

export default Trash
