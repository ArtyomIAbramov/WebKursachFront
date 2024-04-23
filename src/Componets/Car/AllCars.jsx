import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Modal, Form, Input  } from 'antd';

const url = "api/Car/GetAllCars";

const AllCars = () => {
  const [cars, setCars] = useState([]);

  // Состояние для отображения модального окна редактирования
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Состояние для отображения модального окна удаления
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Состояние для хранения информации о выбранном автомобиле
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {updateCarList();}, []);

 // Обработчик для подтверждения удаления автомобиля
  const handleDelete = (car) => {
    deleteCar(car);
    // Закрыть модальное окно удаления
    setDeleteModalVisible(false);
    // Очистить выбранный автомобиль
    setSelectedCar(null);
  };

  // Обработчик для подтверждения редактирования автомобиля
  const handleUpdate = (updCar) => {
    updCar.color = selectedCar.color;
    updCar.max_speed = selectedCar.max_speed;
    updCar.power = selectedCar.power;
    updCar.carPosition = selectedCar.carPosition;
    updCar.url = selectedCar.url;
    updCar.id = selectedCar.id;
    updateItem(updCar);
    // Закрыть модальное окно редактирования
    setEditModalVisible(false);
    // Очистить выбранный автомобиль
    setSelectedCar(null);
  };

  const updateItem = async (updatedCar) => {
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

  // Обработчик для закрытия модальных окон
  const handleCancel = () => {
    // Закрыть модальное окно удаления
    setDeleteModalVisible(false);
    // Закрыть модальное окно редактирования
    setEditModalVisible(false);
    // Очистить выбранный автомобиль
    setSelectedCar(null);
  };
  
  const updateCarList = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setCars(data);
    } catch (error) {
        console.error('Error updating clients:', error);
    }
    };

    const deleteCar = async (car) => {
      const requestOptions = {
          method: "DELETE",
        };
  
        try{
          const response = await fetch("api/Car/" + car.id, requestOptions);
              if(!response.ok)
              {
                console.log('Error deleting client');
              }
              updateCarList();
        } catch(error){
          console.log('Error deleting client');
        }
      };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {cars.filter(car => car.carPosition !== 2).map(car => (
        <div>
        <Card
          key={car.id}
          title={car.brand + ' ' + car.model}
          style={{ width: 300 }}
          cover={<img alt={car.brand + ' ' + car.model} src={car.url} style={{ width: 280, height: 200, margin: 10}}/>}
          actions={car.carPosition === 1 ? [
            car.carPosition === 1 ?  <Button type="primary" onClick={() => {
              setSelectedCar(car); // Установить выбранный автомобиль
              setDeleteModalVisible(true); // Показать модальное окно удаления
            }}>Удалить</Button>: <></>,
            car.carPosition === 1 ? <Button type="primary" onClick={() => {              
              setSelectedCar(car); // Установить выбранный автомобиль
              setEditModalVisible(true);
            }}>Обновить</Button>: <></>
          ] : car.carPosition === 0 ? [
            <Alert
            message="Продано"
            type="success"
            showIcon
            style={{ backgroundColor: '#f0f0f0', color: 'black', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
          />,
          ] : <></>}
        >
          <p>Цена: {car.cost}</p>
          <p>Цвет: {car.color}</p> 
          <p>Макс. скорость: {car.max_speed}</p>
          <p>Л.С.: {car.power}</p>
        </Card>
        </div>
      ))}

      {/* Модальное окно для удаления */}
      <Modal title="Удалить" open={deleteModalVisible} onOk={() => handleDelete(selectedCar)} onCancel={handleCancel} destroyOnClose={true}>
        <p>Подтвердите удаление автомобиля: {selectedCar && selectedCar.brand + ' ' + selectedCar.model}</p>
      </Modal>

      <Modal title="Обновить" footer={null} open={editModalVisible} onCancel={handleCancel} destroyOnClose={true}>
      <Form
        onFinish={handleUpdate}
        autoComplete="off"
        initialValues={{brand: selectedCar != null ? selectedCar.brand : "", model: selectedCar != null ? selectedCar.model: "", cost: selectedCar != null ? selectedCar.cost: "" }}
      >
        <Form.Item
          label="Марка"
          name="brand"
        >
        <Input />
        </Form.Item>

        <Form.Item
          label="Модель"
          name="model"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Цена"
          name="cost"
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};

export default AllCars;