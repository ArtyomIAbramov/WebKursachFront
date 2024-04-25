import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const url = "api/account/logoff";

const LogOff = ({ setUser }) => {
  const [open, setOpen] = useState(false); //стейт для хранения состояния объекта открытия окна
  const navigate = useNavigate();//навигация

  const showModal = () => { //открытие модального окна
    setOpen(true);
  };

  useEffect(() => {
    showModal();
  }, []);

  const handleCancel = () => { //отмета входа
    setOpen(false);
    navigate("/");
  };

  const logOff = async () => { //функция выхода из системы
    const requestOptions = {
      method: "POST",
    };
    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        setUser({ isAuthenticated: false, userName: "" });
        setOpen(false);
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Выход"
      open={open}
      onOk={logOff}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <p>Выполнить выход?</p>
    </Modal>
  );
};

export default LogOff;
