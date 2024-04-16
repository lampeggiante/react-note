import { useEffect, useState } from "react"

import { Input } from "antd"

import MarkdownEditor from "@/components/markdown-editor"

import { updateNoteInfo, updateNoteInfoParams } from "@/services/notes"
import useNoteStore, { NoteType } from "@/store/note"

import "@/styles/container.scss"

const Scratchpad: React.FC = () => {
  const { noteArray, latestNoteId, editNote } = useNoteStore()
  const latestNote = noteArray.find((n) => n.noteId === latestNoteId)
  const [title, setTitle] = useState(latestNote?.noteTitle)
  const [content, setContent] = useState(latestNote?.noteContent || "")

  useEffect(() => {
    setTitle(latestNote?.noteTitle)
    setContent(latestNote?.noteContent || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestNoteId])

  useEffect(() => {
    editNote({ ...latestNote, noteTitle: title, noteContent: content } as NoteType)
    updateNoteInfo({ ...latestNote, noteTitle: title, noteContent: content } as updateNoteInfoParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content])

  return (
    <>
      <Input
        placeholder="输入笔记标题"
        defaultValue="无标题"
        variant={"borderless"}
        className="title"
        maxLength={20}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="cardContainer">
        <MarkdownEditor value={content as string} setValue={setContent} />
      </div>
    </>
  )
}

export default Scratchpad
