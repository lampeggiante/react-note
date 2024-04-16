import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { List, Skeleton } from "antd"

import MarkdownViewer from "@/components/markdown-viewer"

import { updateLatestNote } from "@/services/login"
import { updateNoteInfo, updateNoteInfoParams } from "@/services/notes"
import useNoteStore, { NoteType } from "@/store/note"

import "@/styles/container.scss"
import "@/styles/notes.scss"

const Notes: React.FC = () => {
  const { user_id, noteArray, editNote, updateLatestId } = useNoteStore()
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
    updateLatestNote({ user_id: user_id as number, latestNoteId: id as number })
    navigator("/react-note/")
  }

  const handleStar: (id: number | undefined) => void = (id) => {
    const clickedItem = noteArray.find((n) => n.noteId === id)
    editNote({ ...clickedItem, isStar: true } as NoteType)
    updateNoteInfo({ ...clickedItem, isStar: true } as updateNoteInfoParams)
  }

  const handleTrash: (id: number | undefined) => void = (id) => {
    const clickedItem = noteArray.find((n) => n.noteId === id)
    editNote({ ...clickedItem, isTrash: true } as NoteType)
    updateNoteInfo({ ...clickedItem, isTrash: true } as updateNoteInfoParams)
  }

  const divs = (
    <List
      className="note-list-container"
      itemLayout="horizontal"
      dataSource={noteArray.filter((n) => !n.isTrash)}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key={item.noteId} onClick={() => handlePrev(item.noteId)}>
              预览
            </a>,
            item.isStar ? (
              <div>收藏</div>
            ) : (
              <a key={item.noteId} onClick={() => handleStar(item.noteId)}>
                收藏
              </a>
            ),
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
      <div className="title">所有笔记</div>
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

export default Notes
