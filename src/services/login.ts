import { encode } from "js-base64"

import request from "./request"

interface LoginParamsType {
  username: string
  password: string
}

interface RegisterParamsType {
  username: string
  password: string
  email?: string
}

interface UpdateLatestNoteParamsType {
  user_id: number
  latestNoteId: number
}

// 登录
export const login: (params: LoginParamsType) => Promise<any> = ({ username, password }) => {
  return request.post("/api/users/user_login", {
    username,
    password: encode(password),
  })
}

// 注册
export const register: (params: RegisterParamsType) => Promise<any> = ({ username, password, email }) => {
  return request.post("/api/users/add_new_user", {
    username,
    password: encode(password),
    email: email || "",
  })
}

export const updateLatestNote: (params: UpdateLatestNoteParamsType) => Promise<any> = ({ user_id, latestNoteId }) => {
  return request.post("/api/users/update_latest_note", {
    user_id,
    latestNoteId,
  })
}
