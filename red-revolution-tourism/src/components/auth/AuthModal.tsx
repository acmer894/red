import React from 'react';
import { Modal, Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { User, loginUser, registerUser } from '../../utils/auth';


interface AuthModalProps {
  visible: boolean;
  onCancel: () => void;
  type: 'login' | 'register';
  onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  onCancel,
  type,
  onLoginSuccess,
}) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>(type);

  React.useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const handleTabChange = (key: string) => {
    setActiveTab(key as 'login' | 'register');
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    if (activeTab === 'login') {
      const user = loginUser(values.username, values.password);
      if (user) {
        message.success('登录成功！');
        onLoginSuccess(user);
      } else {
        message.error('用户名或密码错误！');
      }
    } else {
      const newUser = registerUser({
        username: values.username,
        password: values.password,
        email: values.email || '',
        avatar: `https://joeschmoe.io/api/v1/${values.username}`,
      });
      
      if (newUser) {
        message.success('注册成功！请登录');
        setActiveTab('login');
        form.resetFields();
      } else {
        message.error('用户名已存在！');
      }
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      title={null}
      footer={null}
      width={400}
      destroyOnClose
    >
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        centered
        items={[
          {
            key: 'login',
            label: '登录',
            children: (
              <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名！' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码！' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            key: 'register',
            label: '注册',
            children: (
              <Form
                form={form}
                name="register"
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="邮箱" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    注册
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default AuthModal;