import { NoteType } from "@/store/note"

const genNewId = () => {
  // 使用闭包生成序列化id
  let id = +new Date()
  return () => {
    return id++
  }
}

const initIdFunc = genNewId()

export const genNewNote: () => NoteType = () => {
  const newNote = {
    noteId: initIdFunc(),
    noteTitle: "untitled",
    noteContent: "",
    isStar: false,
    isTrash: false,
  }

  return newNote
}
