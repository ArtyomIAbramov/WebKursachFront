import React, { useState, useEffect } from "react";
import { Card, Button, Select } from "antd";

const { Option } = Select;

const Order = () => {
  const [orders, setOrders] = useState([]);//стейт для хранения списка заказов
  const [selectedClient, setSelectedClient] = useState(null); //стейт для хранения выбранного клиента
  const [selectedCar, setSelectedCar] = useState(null);//стейт для хранения выбранной машины
  const [selectedEmployee, setSelectedEmployee] = useState(null); //стейт для хранения выбранного работника

  const [cars, setCars] = useState([]); //стейт для хранения списка машин
  const [clients, setClients] = useState([]);//стейт для хранения списка клиентов
  const [employees, setEmployee] = useState([]);//стейт для хранения списка работников

  const updateCarList = async () => { //обновление списка машин
    try {
      const response = await fetch("api/Car/GetAllAvailableCars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

  const updateEmployeeList = async () => { //обновление списка работников
    try {
      const response = await fetch("api/Employee");
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error updating employees:", error);
    }
  };

  const updateClientList = async () => { //обновление списка клиентов
    try {
      const response = await fetch("api/Client/GetClients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

  useEffect(() => {
    updateOrdersList(); //обновление списка заказов
  }, []);


  const handleCreateNewOrder = async () => { // создание заказа
    if (selectedClient && selectedCar && selectedEmployee) { //если все компоненты выбраны (переменные это айдишники!! объектов), то получаем через гет запросы сами объекты
      var clientfinded;
      var carfinded;
      var employeefinded;

      try {
        const response1 = await fetch("api/Car/" + selectedCar, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        carfinded = await response1.json();
      } catch (error) {
        carfinded = null;
        console.error("Ошибка при запросе машины2:", error);
      }

      try {
        const response2 = await fetch("api/Client/" + selectedClient, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        clientfinded = await response2.json();
      } catch (error) {
      clientfinded = null;
      console.error("Ошибка при запросе клиента:", error);
      }

      try {
        const response3 = await fetch("api/Employee/" + selectedEmployee, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        employeefinded =await  response3.json();
      } catch (error) {
        employeefinded = null;
      console.error("Ошибка при запросе работника:", error);
      }


     if(clientfinded != null && carfinded != null && employeefinded != null)
     {
        const order = {
            client: clientfinded,
            car: carfinded,
            employee: employeefinded,
            order_price: carfinded.cost,
          };
          createOrder(order); //создание заказа
     }
    }
  };

  const createOrder = async (createdOrder) => {//создание заказа через запрос
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdOrder),
    };
    try {
      const response = await fetch("api/Order", requestOptions);
      if (response.ok) {
        updateOrdersList();
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const updateOrdersList = async () => { //обновление спискка заказов через запрос
    updateCarList();
    updateEmployeeList();
    updateClientList();
    try {
      const response = await fetch("api/Order");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Select
          placeholder="Выберите клиента"
          style={{ width: 200 }}
          onChange={(value) => setSelectedClient(value)}
        >
          {clients.map((client) => (
            <Option key={client.id} value={client.id}>
                {`${client.name} ${client.surname}`}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Выберите машину"
          style={{ width: 200, marginLeft: "20px" }}
          onChange={(value) => setSelectedCar(value)}
        >
          {cars.map((car) => (
            <Option key={car.id} value={car.id}>
              {`${car.brand} ${car.model}`}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Выберите работника"
          style={{ width: 200, marginLeft: "20px" }}
          onChange={(value) => setSelectedEmployee(value)}
        >
          {employees.map((employee) => (
            <Option key={employee.id} value={employee.id}>
              {`${employee.name} ${employee.surname}`}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: "20px" }}
          onClick={handleCreateNewOrder}
          disabled={!selectedClient || !selectedCar || !selectedEmployee}
        >
          Создать заказ
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {orders.map((order) => (
          <div>
            <Card
              key={order.id}
              title={order.contract_code}
              style={{ width: 450 }}
            >
              <p>Клиент: {order.client.name + " " + order.client.surname}</p>
              <p>Машина:  {order.car.brand + " " + order.car.model}</p>
              <p>Работник: {order.employee.name + " " + order.employee.surname}</p>
              <p>Дата: {order.order_date}</p>
              <p>Стоимость: {order.order_price}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;