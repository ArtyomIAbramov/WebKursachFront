import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input, Select } from "antd";

const Client = () => {
  const [clients, setClients] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const { Option } = Select;

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

  const [clientType, setClientType] = useState("api/Client/GetClients");

  useEffect(() => {
    updateClientList(clientType);
  }, []);

  const handleSelectChange = (value) => {
    setClientType(value);
    updateClientList(value);
  };

  const handleUpdate = (updClient) => {
    updClient.passport = selectedClient.passport;
    updClient.cars = selectedClient.cars;
    updClient.clientPosition = selectedClient.clientPosition;
    updClient.id = selectedClient.id;
    updateClient(updClient);
    setEditModalVisible(false);
    setSelectedClient(null);
  };

  const updateClient = async (updatedClient) => {
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

  const handleCreateNewClient = (client) => {
    client.clientPosition = 0;
    createClient(client);
    setCreateModalVisible(false);
  };

  const createClient = async (createdClient) => {
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

  const handleCancel = () => {
    setEditModalVisible(false);
    setCreateModalVisible(false);
    setSelectedClient(null);
  };

  const updateClientList = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error updating clients:", error);
    }
  };

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
        <Option value="api/Client/GetClients">Новые клиенты</Option>
        <Option value="api/Client/GetAllNewClients">Все клиенты</Option>
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
