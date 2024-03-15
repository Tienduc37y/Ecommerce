import './Register.scss'
import { Button, Form, Input } from 'antd';
import { usernameRule, emailRule, passwordRule, rePasswordRule } from '@/common/rules';
import { register } from '@/services/auth'
import { useNavigate } from 'react-router-dom';
import useNotification from '@/customHooks/useNotify'
const Register = () => {
  const {contextHolder, infoNotify ,errorNotify} = useNotification()
  const nav = useNavigate()
  const onFinish = async (values) => {
    try {
      await register(values)
      infoNotify('topRight', 'Thanh Cong', 'Ban da tao thanh cong')
      nav('/dang-nhap')
    } catch ({response}) {
      var {error} = response.data
      errorNotify('topRight', 'Loi dang ky', error.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    errorNotify('topRight', 'Loi dang ky', 'Khong thanh cong')
  };


  return (
    <Form
    name="registerForm"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {contextHolder}
    <Form.Item
      label="Username"
      name="username"
      rules={usernameRule}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={emailRule}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={passwordRule}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Re-assword"
      name="rePassword"
      rules={rePasswordRule}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
};
export default Register;