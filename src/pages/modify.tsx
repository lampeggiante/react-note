import React from "react"
import { useNavigate } from "react-router-dom"

import { Form, Input, Button, Row, Col, message } from "antd"

import { register } from "@/services/login"

interface FormParams {
  username: string
  email?: string
  password: string
  repassword: string
}

const Modify: React.FC = () => {
  const navigation = useNavigate()

  const onFinish = async (values: FormParams) => {
    // 验证输入是否合法
    if (values.password !== values.repassword) {
      message.error("两次输入的密码不一致")
      return
    }
    if (values.email) {
      // 验证邮箱是否合法
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(values.email)) {
        message.error("邮箱格式不正确")
        return
      }
    }

    // 注册
    try {
      await register({ username: values.username, email: values.email, password: values.password })
      message.success("注册成功")
      navigation("/react-note/login")
    } catch (error) {
      message.error("注册失败")
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
          <Form.Item label="邮箱" labelCol={{ span: 6 }} name="email" rules={[{ message: "请输入邮箱!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            labelCol={{ span: 6 }}
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            labelCol={{ span: 6 }}
            name="repassword"
            rules={[{ required: true, message: "请再次输入密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Modify
