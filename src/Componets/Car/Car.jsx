import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';

const url = "api/Car/GetAllAvailableCars";

const Car = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {updateCarList();}, []);

  const updateCarList = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setCars(data);
    } catch (error) {
        console.error('Error updating clients:', error);
    }
    };

  const handleBuyCar = (carId) => {
    console.log('Купить автомобиль с ID:', carId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {cars.map(car => (
        <Card
          key={car.id}
          title={car.brand + ' ' + car.model}
          style={{ width: 300 }}
          cover={<img alt={car.brand + ' ' + car.model} src={car.url} style={{ width: 280, height: 200, margin: 10}}/>}
          actions={[
            <Button type="primary" onClick={() => handleBuyCar(car.id)}>Купить</Button>
          ]}
        >
          <p>Цена: {car.cost}</p>
          <p>Цвет: {car.color}</p> 
          <p>Макс. скорость: {car.max_speed}</p>
          <p>Л.С.: {car.power}</p>
        </Card>
      ))}
    </div>
  );
};

export default Car;