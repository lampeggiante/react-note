import { produce } from "immer"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface NoteType {
  noteId: number | undefined
  noteTitle: string | undefined
  noteContent: string | undefined
}

interface NoteState {
  latestNoteId: number
  noteArray: NoteType[]
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
        },
        {
          noteId: 1,
          noteTitle: "demo2",
          noteContent: "hello world",
        },
      ],
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
            // state.noteArray.forEach((n: NoteType, index: number, array: NoteType[]) => {
            //   if (n.noteId === note.noteId) array[index] = note
            // })
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
          produce((state) =>
            state.noteArray.map((n: NoteType) => {
              if (n.noteId === id) return
            }),
          ),
        )
      },
    }),
    {
      name: "NOTESTORE",
    },
  ),
)

export default useNoteStore
