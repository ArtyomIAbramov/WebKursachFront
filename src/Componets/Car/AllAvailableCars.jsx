import React, { useState, useEffect } from "react";
import { Card, Alert } from "antd";

const url = "api/Car/GetAllAvailableCars";

const AllAvailableCars = () => {
  const [cars, setCars] = useState([]); //стейт для хранения списка автомобилей

  useEffect(() => {
    updateCarList(); //обновление списка
  }, []);

  const updateCarList = async () => { //функция обновления списка через запрос
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {cars.map((car) => (
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
          actions={[
            <Alert
              message="В наличии"
              type="success"
              showIcon
              style={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
              }}
            />,
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

export default AllAvailableCars;
