import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, Select } from "antd";

const Client = () => {
  const [clients, setClients] = useState([]); //стейт для хранения списка клиентов

  const [editModalVisible, setEditModalVisible] = useState(false);

  const { Option } = Select; //опция выбора всех клиентов или только новых

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

  const [clientType, setClientType] = useState("api/Client/GetClients"); //стейт типа клиента - новый или нет (будет изменять ссылка запроса для получения всех клиентов)

  useEffect(() => {
    updateClientList(clientType); //обновление списка по типу
  }, []);

  const handleSelectChange = (value) => { //изменение выбора типа клиента
    setClientType(value);
    updateClientList(value);
  };

  const handleUpdate = (updClient) => {
    // переприсваиваем параметры которые неизменяются при редактировании
    updClient.passport = selectedClient.passport;
    updClient.cars = selectedClient.cars;
    updClient.clientPosition = selectedClient.clientPosition;
    updClient.id = selectedClient.id;
    updateClient(updClient); //изменение клиента
    setEditModalVisible(false);
    setSelectedClient(null);
  };

  const updateClient = async (updatedClient) => { //обновление клиента через запрос
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClient),
    };
    return await fetch("api/Client/" + updatedClient.id, requestOptions).then(
      (response) => {
        if (response.ok) {
          updateClientList(clientType);
        }
      },
      (error) => console.log(error)
    );
  };

  const handleCreateNewClient = (client) => { //создание клиента
    client.clientPosition = 0; //позиция что клиент новый
    createClient(client);
    setCreateModalVisible(false);
  };

  const createClient = async (createdClient) => { //создание клиента через запрос
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdClient),
    };
    return await fetch("api/Client", requestOptions).then(
      (response) => {
        if (response.ok) {
          updateClientList(clientType);
        }
      },
      (error) => console.log(error)
    );
  };

  const handleCancel = () => { //закрытие модальных окон
    setEditModalVisible(false);
    setCreateModalVisible(false);
    setSelectedClient(null);
  };

  const updateClientList = async (url) => { //обновление списка клиентов через запрос
    try {
      const response = await fetch(url);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

  // flex-wrap задает многострочную расстановку блоков по главной оси.
  //gap - зазор между элементами Flex
  return (
    <div>
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>
        Создать нового клиента
      </Button>

      <Select
        defaultValue="api/Client/GetClients"
        style={{ width: 220, marginLeft: "20px", marginBottom: "20px" }}
        onChange={handleSelectChange}
      >
        <Option value="api/Client/GetClients">Все клиенты</Option>
        <Option value="api/Client/GetAllNewClients">Новые клиенты</Option>
      </Select>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {clients.map((client) => (
          <div>
            <Card
              key={client.id}
              title={client.name + " " + client.surname}
              style={{ width: 300 }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedClient(client);
                    setEditModalVisible(true);
                  }}
                >
                  Обновить
                </Button>,
              ]}
            >
              <p>Телефон: {client.phonenumber}</p>
              <p>Адрес: {client.address}</p>
              <p>Паспорт: {client.passport}</p>
            </Card>
          </div>
        ))}

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
              name: selectedClient != null ? selectedClient.name : "",
              surname: selectedClient != null ? selectedClient.surname : "",
              phonenumber:
                selectedClient != null ? selectedClient.phonenumber : "",
              address: selectedClient != null ? selectedClient.address : "",
            }}
          >
            <Form.Item label="Имя" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Фамилия" name="surname">
              <Input />
            </Form.Item>

            <Form.Item label="Телефон" name="phonenumber">
              <Input />
            </Form.Item>
            <Form.Item label="Адрес" name="address">
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
          <Form onFinish={handleCreateNewClient} autoComplete="off">
            <Form.Item label="Имя" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Фамилия" name="surname">
              <Input />
            </Form.Item>

            <Form.Item label="Телефон" name="phonenumber">
              <Input />
            </Form.Item>

            <Form.Item label="Адрес" name="address">
              <Input />
            </Form.Item>

            <Form.Item label="Паспорт" name="passport">
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

export default Client;
