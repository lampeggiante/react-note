import { produce } from "immer"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface NoteType {
  noteId: number | undefined
  noteTitle: string | undefined
  noteContent: string | undefined
  isStar: boolean | undefined
  isTrash: boolean | undefined
}

interface NoteState {
  latestNoteId: number
  noteArray: NoteType[]
  updateLatestId: (params: number) => void
  addNote: (parmas: NoteType) => void
  editNote: (params: NoteType) => void
  delNote: (params: number) => void
}

const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      latestNoteId: 0,
      noteArray: [
        {
          noteId: 0,
          noteTitle: "demo1",
          noteContent: "hello world",
          isStar: false,
          isTrash: false,
        },
        {
          noteId: 1,
          noteTitle: "demo2",
          noteContent: "hello world",
          isStar: false,
          isTrash: false,
        },
      ],
      updateLatestId: (latestNoteId) => set({ latestNoteId }),
      addNote: (note: NoteType) => {
        set(
          produce((state) => {
            state.noteArray.push(note)
          }),
        )
      },
      editNote: (note: NoteType) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.noteArray.length; i++) {
              if (state.noteArray[i].noteId === note.noteId) {
                state.noteArray[i] = note
              }
            }
          }),
        )
      },
      delNote: (id: number) => {
        set(
          produce((state) => {
            for (let i = 0; i < state.noteArray.length; i++) {
              if (state.noteArray[i].noteId === id) {
                state.noteArray.splice(i, 1)
              }
            }
          }),
        )
      },
    }),
    {
      name: "NOTESTORE",
    },
  ),
)

export default useNoteStore
