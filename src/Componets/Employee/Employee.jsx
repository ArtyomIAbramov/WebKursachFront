import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Input } from "antd";

const Employee = () => {
  const [employees, setEmployee] = useState([]); //стейт для хранения списка работников

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null); ////стейт для хранения выбранного работника

  useEffect(() => {
    updateEmployeeList();
  }, []);

  const handleUpdate = (updEmployee) => {
    // переприсваиваем параметры которые неизменяются при редактировании
    updEmployee.emppassport = selectedEmployee.emppassport;
    updEmployee.empaddress = selectedEmployee.empaddress;
    updEmployee.soldCars = selectedEmployee.soldCars;
    updEmployee.email = selectedEmployee.email;
    updEmployee.totalSold = selectedEmployee.totalSold;
    updEmployee.employeePosition = selectedEmployee.employeePosition;
    updEmployee.id = selectedEmployee.id;

    updateEmployee(updEmployee); //обновление работника
    setEditModalVisible(false);
    setSelectedEmployee(null);
  };

  const updateEmployee = async (updatedEmployee) => {  //обновление работника через запрос
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    };
    return await fetch(
      "api/Employee/" + updatedEmployee.id,
      requestOptions
    ).then(
      (response) => {
        if (response.ok) {
          updateEmployeeList();
        }
      },
      (error) => console.log(error)
    );
  };

  const handleCreateNewEmployee = (employee) => { //создание работника
    employee.employeePosition = 0; //позиция работника (уволен, действующий)
    employee.totalSold = 0; //сколько работник продал
    createEmployee(employee);
    setCreateModalVisible(false);
  };

  const createEmployee = async (createdEmployee) => { //создание работника через запрос
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdEmployee),
    };
    return await fetch("api/Employee", requestOptions).then(
      (response) => {
        if (response.ok) {
          updateEmployeeList();
        }
      },
      (error) => console.log(error)
    );
  };

  const handleCancel = () => { //закрытие модальных окон
    setEditModalVisible(false);
    setCreateModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleDelete = (employee) => { //увольнение работника
    deleteEmployee(employee);
    setDeleteModalVisible(false);
    setSelectedEmployee(null);
  };

  const deleteEmployee = async (employee) => { //увольнение работника через запрос удаления
    const requestOptions = {
      method: "DELETE",
    };

    try {
      const response = await fetch(
        "api/Employee/" + employee.id,
        requestOptions
      );
      if (!response.ok) {
        console.log("Error deleting employee");
      }
      updateEmployeeList();
    } catch (error) {
      console.log("Error deleting employee");
    }
  };

  const updateEmployeeList = async () => { //обновление списка работников через запрос
    try {
      const response = await fetch("api/Employee");
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error updating employees:", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setCreateModalVisible(true)}
        style={{ marginBottom: "20px" }}
      >
        Создать нового работника
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {employees.map((employee) => (
          <div>
            <Card
              key={employee.id}
              title={employee.name + " " + employee.surname}
              style={{ width: 300 }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setEditModalVisible(true);
                  }}
                >
                  Обновить
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setDeleteModalVisible(true);
                  }}
                >
                  Удалить
                </Button>,
              ]}
            >
              <p>Должность: {employee.post}</p>
              <p>Телефон: {employee.empphonenumber}</p>
              <p>Зарплата: {employee.salary}</p>
              <p>Продано на: {employee.totalSold}</p>
            </Card>
          </div>
        ))}

        <Modal
          title="Удалить"
          open={deleteModalVisible}
          onOk={() => handleDelete(selectedEmployee)}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <p>
            Подтвердите увольнение работника:{" "}
            {selectedEmployee &&
              selectedEmployee.name + " " + selectedEmployee.surname}
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
              name: selectedEmployee != null ? selectedEmployee.name : "",
              surname: selectedEmployee != null ? selectedEmployee.surname : "",
              post: selectedEmployee != null ? selectedEmployee.post : "",
              empphonenumber:
                selectedEmployee != null ? selectedEmployee.empphonenumber : "",
              salary: selectedEmployee != null ? selectedEmployee.salary : "",
            }}
          >
            <Form.Item label="Имя" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Фамилия" name="surname">
              <Input />
            </Form.Item>

            <Form.Item label="Телефон" name="empphonenumber">
              <Input />
            </Form.Item>
            <Form.Item label="Должность" name="post">
              <Input />
            </Form.Item>
            <Form.Item label="Зарплата" name="salary">
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
          <Form onFinish={handleCreateNewEmployee} autoComplete="off">
            <Form.Item label="Имя" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Фамилия" name="surname">
              <Input />
            </Form.Item>

            <Form.Item label="Должность" name="post">
              <Input />
            </Form.Item>

            <Form.Item label="Телефон" name="empphonenumber">
              <Input />
            </Form.Item>

            <Form.Item label="Адрес" name="empaddress">
              <Input />
            </Form.Item>

            <Form.Item label="Паспорт" name="emppassport">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Зарплата" name="salary">
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

export default Employee;
