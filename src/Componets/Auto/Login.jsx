import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";

const url = "api/account/login";

const LogIn = ({ setUser }) => {
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    showModal();
  }, []);

  const handleCancel = () => {
    setOpen(false);
    navigate("/");
  };

  const logIn = async (values) => {
    const { email, password } = values;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        if (data && data.userName) {
          setUser({ isAuthenticated: true, userName: data.userName });
          setOpen(false);
          navigate("/");
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
      console.log(error);
    }
  };

  return (
    <Modal
      title="Вход"
      footer={null}
      open={open}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form onFinish={logIn} autoComplete="off">
        <Form.Item
          label="Введите Email"
          name="email"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш Email!" },
          ]}
          validateStatus={loginError ? "error" : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Введите пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
          ]}
          validateStatus={loginError ? "error" : ""}
          help={loginError ? "Неверный Email или пароль" : ""}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LogIn;
