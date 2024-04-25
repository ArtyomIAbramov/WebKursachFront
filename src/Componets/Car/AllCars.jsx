import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Modal, Form, Input } from "antd";

const url = "api/Car/GetAllCars";

const AllCars = () => {
  const [cars, setCars] = useState([]); //стейт для хранения списка автомобилей

  // Состояние для отображения модального окна редактирования
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Состояние для отображения модального окна удаления
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Состояние для отображения модального окна добавления
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // Состояние для хранения информации о выбранном автомобиле
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    updateCarList();
  }, []);

  // Обработчик для подтверждения удаления автомобиля
  const handleDelete = (car) => {
    deleteCar(car);
    setDeleteModalVisible(false);
    setSelectedCar(null);
  };

  //функция удаления машины через запрос
  const deleteCar = async (car) => {
    const requestOptions = {
      method: "DELETE",
    };

    try {
      const response = await fetch("api/Car/" + car.id, requestOptions);
      if (!response.ok) {
        console.log("Error deleting car");
      }
      updateCarList();
    } catch (error) {
      console.log("Error deleting car");
    }
  };

  // Обработчик для подтверждения редактирования автомобиля
  const handleUpdate = (updCar) => {
    // переприсваиваем параметры которые неизменяются при редактировании
    updCar.color = selectedCar.color;
    updCar.max_speed = selectedCar.max_speed;
    updCar.power = selectedCar.power;
    updCar.carPosition = selectedCar.carPosition;
    updCar.url = selectedCar.url;
    updCar.id = selectedCar.id;
    updateCar(updCar); // обновление машины
    setEditModalVisible(false);
    setSelectedCar(null);
  };

  //функция обновлнеия машины чкерез запрос
  const updateCar = async (updatedCar) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    };
    return await fetch("api/Car/" + updatedCar.id, requestOptions).then(
      (response) => {
        if (response.ok) {
          updateCarList();
        }
      },
      (error) => console.log(error)
    );
  };

  const handleCreateNewCar = (car) => {
    car.carPosition = 1; //изменение позиции автомоблия на "в магазине"
    createCar(car);
    setCreateModalVisible(false);
  };

  const createCar = async (createdCar) => { //создание машины с отправкой запроса
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdCar),
    };
    return await fetch("api/Car", requestOptions).then(
      (response) => {
        if (response.ok) {
          updateCarList();
        }
      },
      (error) => console.log(error)
    );
  };

  // Обработчик для закрытия модальных окон
  const handleCancel = () => {
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setCreateModalVisible(false);
    setSelectedCar(null);
  };

  const updateCarList = async () => { //обновление списка машин через запрос
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setCreateModalVisible(true)} style={{ marginBottom: '20px'}}>
        Создать новый автомобиль
      </Button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cars
          .filter((car) => car.carPosition !== 2)
          .map((car) => (
            <div>
              <Card
                key={car.id}
                title={car.brand + " " + car.model}
                style={{ width: 300 }}
                cover={
                  <img
                    alt={car.brand + " " + car.model}
                    src={car.url}
                    style={{ width: 280, height: 200, margin: 10 }}
                  />
                }
                actions={
                  car.carPosition === 1 ? (
                    [
                      car.carPosition === 1 ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            setSelectedCar(car); // Установить выбранный автомобиль
                            setDeleteModalVisible(true); // Показать модальное окно удаления
                          }}
                        >
                          Удалить
                        </Button>
                      ) : (
                        <></>
                      ),
                      car.carPosition === 1 ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            setSelectedCar(car); // Установить выбранный автомобиль
                            setEditModalVisible(true);
                          }}
                        >
                          Обновить
                        </Button>
                      ) : (
                        <></>
                      ),
                    ]
                  ) : car.carPosition === 0 ? (
                    [
                      <Alert
                        message="Продано"
                        type="success"
                        showIcon
                        style={{
                          backgroundColor: "#f0f0f0",
                          color: "black",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "16px",
                        }}
                      />,
                    ]
                  ) : (
                    <></>
                  )
                }
              >
                <p>Цена: {car.cost}</p>
                <p>Цвет: {car.color}</p>
                <p>Макс. скорость: {car.max_speed}</p>
                <p>Л.С.: {car.power}</p>
              </Card>
            </div>
          ))}

        <Modal
          title="Удалить"
          open={deleteModalVisible}
          onOk={() => handleDelete(selectedCar)}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <p>
            Подтвердите удаление автомобиля:{" "}
            {selectedCar && selectedCar.brand + " " + selectedCar.model}
          </p>
        </Modal>

        <Modal
          title="Обновить"
          footer={null}
          open={editModalVisible}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <Form
            onFinish={handleUpdate}
            autoComplete="off"
            initialValues={{
              brand: selectedCar != null ? selectedCar.brand : "",
              model: selectedCar != null ? selectedCar.model : "",
              cost: selectedCar != null ? selectedCar.cost : "",
            }}
          >
            <Form.Item label="Марка" name="brand">
              <Input />
            </Form.Item>

            <Form.Item label="Модель" name="model">
              <Input />
            </Form.Item>

            <Form.Item label="Цена" name="cost">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Обновить
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Создать"
          footer={null}
          open={createModalVisible}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <Form onFinish={handleCreateNewCar} autoComplete="off">
            <Form.Item label="Марка" name="brand">
              <Input />
            </Form.Item>

            <Form.Item label="Модель" name="model">
              <Input />
            </Form.Item>

            <Form.Item label="Цвет" name="color">
              <Input />
            </Form.Item>

            <Form.Item label="Цена" name="cost">
              <Input />
            </Form.Item>

            <Form.Item label="Скорость" name="max_speed">
              <Input />
            </Form.Item>

            <Form.Item label="Л.С." name="power">
              <Input />
            </Form.Item>

            <Form.Item label="Ссылка на изображение" name="url">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Создать
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AllCars;
