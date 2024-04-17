import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";

const url = "api/account/login";

const LogIn = ({ setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true)
    }

    useEffect(() => {
    showModal()
    }, [])

    const handleCancel = () => {
      console.log("Clicked cancel button")
      setOpen(false)
      navigate("/")
      }

  const logIn = async (event) => {
    
    event.preventDefault()

    var { email, password } = document.forms[0]

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    };

    return await fetch(url, requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" });
          setOpen(false);
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName });
            setOpen(false);
            navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setOpen(true);
            setErrorMessages(data.error);
        },
        (error) => {
          setOpen(true);
          console.log(error);
        }
      );
  };

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

return (
<Modal
    title="Вход"
    footer={null}
    open = {open}
    onCancel={handleCancel}
    destroyOnClose={true}
  >
    <Form
      onFinishFailed={renderErrorMessage}
      autoComplete="off"
    >
      <Form.Item
        label="Введите Email"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш Email!' }]}
      >
        <Input name="inputPassword"/>
      </Form.Item>
      <Form.Item
        label="Введите пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
      >
        <Input.Password name="inputPassword" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block onClick={logIn}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  </Modal>
  );
};

export default LogIn;
