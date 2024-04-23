import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Alert } from "antd";

const url = "api/account/register";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [registerFailed, setFailed] = useState(false);
  const [registerSuccess, setSuccess] = useState(false);
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

  const register = async (values) => {
    var { email, password, passwordConfirm } = values;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm,
      }),
    };
    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        setSuccess(true);
        setFailed(false);
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.log(error);
      setFailed(true);
    }
  };

  return (
    <Modal
      title="Регистрация"
      footer={null}
      open={open}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        onFinish={register}
        autoComplete="off"
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          label="Введите Email"
          name="email"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш Email!" },
          ]}
          validateStatus={registerFailed ? "error" : ""}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Введите пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш пароль!" },
          ]}
          validateStatus={registerFailed ? "error" : ""}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          name="passwordConfirm"
          rules={[{ required: true, message: "Пароли не совпадают!" }]}
          validateStatus={registerFailed ? "error" : ""}
          help={registerFailed ? "Неверный Email или пароли не совпадают" : ""}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
        {registerSuccess && (
          <Alert
            message="Вы успешно зарегистрировались!"
            type="success"
            showIcon
            style={{
              backgroundColor: "#f0f0f0",
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            }}
          />
        )}
      </Form>
    </Modal>
  );
};

export default Register;
