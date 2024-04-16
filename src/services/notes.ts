import request from "./request"

interface addNewNoteParams {
  user_id: number
  noteTitle: string
  noteContent: string
  isStar: boolean
  isTrash: boolean
}

export interface updateNoteInfoParams {
  noteId: number
  noteTitle: string
  noteContent: string
  isStar: boolean
  isTrash: boolean
}

export const getNoteById = async (user_id: number) => {
  return request.post("/api/notes/get_note_by_id", { user_id })
}

export const addNewNote = ({ user_id, noteTitle, noteContent, isStar, isTrash }: addNewNoteParams) => {
  return request.post("/api/notes/add_new_note", { user_id, noteTitle, noteContent, isStar, isTrash })
}

// 修改Note的信息
export const updateNoteInfo = ({ noteId, noteTitle, noteContent, isStar, isTrash }: updateNoteInfoParams) => {
  return request.post("/api/notes/update_note", { noteId, noteTitle, noteContent, isStar, isTrash })
}

// 删除Note
export const deleteNote = (noteId: number) => {
  return request.post("/api/notes/delete_note", { noteId })
}
