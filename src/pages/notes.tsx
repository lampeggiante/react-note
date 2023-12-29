import { useState } from "react"

import { List, Skeleton } from "antd"

import MarkdownViewer from "@/components/markdown-viewer"

import useNoteStore from "@/store/note"

import "@/styles/container.scss"
import "@/styles/notes.scss"

const Notes: React.FC = () => {
  const { noteArray } = useNoteStore()
  const [prevStr, setPrevStr] = useState("")
  const truncateString = (str: string | undefined, maxLength: number) => {
    if (!str) return "无内容"
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

  const divs = (
    <List
      className="note-list-container"
      itemLayout="horizontal"
      dataSource={noteArray}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key={item.noteId} onClick={() => handlePrev(item.noteId)}>
              预览
            </a>,
            <a key={item.noteId}>编辑</a>,
            <a key={item.noteId}>删除</a>,
          ]}>
          <Skeleton title={false} active loading={false}>
            <List.Item.Meta title={item.noteTitle} description={truncateString(item.noteContent, 20)} />
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
