import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { Form, Input, Button, Row, Col, message } from "antd"

import { login } from "@/services/login"
import { getNoteById } from "@/services/notes"
import useNoteStore from "@/store/note"

interface FormParams {
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigation = useNavigate()
  const { initUserInfo } = useNoteStore()

  const fetchData = useCallback(async () => {
    try {
      const { username, user_id } = JSON.parse(localStorage.getItem("userInfo") as string)
      const res = await getNoteById(user_id)
      initUserInfo({
        user_id,
        username,
        email: "",
        latestNoteId: res.data[0].noteId,
        noteArray: res.data,
      })
    } catch (error) {
      message.error("获取用户信息失败")
    }
  }, [initUserInfo])

  const onFinish = async (values: FormParams) => {
    // 在这里处理登录逻辑
    try {
      const res = await login(values)
      // console.log(res)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userInfo", JSON.stringify({ username: values.username, user_id: res.data.user_id }))
      await fetchData()
      message.success("登录成功")
      navigation("/react-note/")
    } catch (error) {
      message.error("用户名或密码错误")
    }
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <Form name="登录表单" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            labelCol={{ span: 6 }}
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            labelCol={{ span: 6 }}
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              登录
            </Button>
            <Button type="default" onClick={() => navigation("/react-note/register")} style={{ marginRight: 8 }}>
              注册
            </Button>
            {/* <Button type="default" onClick={() => navigation("/react-note/modify")}>
              修改密码
            </Button> */}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
