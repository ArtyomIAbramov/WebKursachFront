import React, { useEffect } from "react";
import { useState } from 'react';
import './Style.css'

const url = "api/Client";

    const Client = ({user}) => {
      const [clients, setClients] = useState([]);
      const [, removeClient] = useState([]);

      useEffect(() => {updateClientList();}, []);

        const updateClientList = async () => {
          try {
          const response = await fetch(url);
          const data = await response.json();
          setClients(data);
          } catch (error) {
          console.error('Error updating clients:', error);
          }
          };

        const deleteItem = async (id) => {
          const requestOptions = {
            method: "DELETE",
          };
          return await fetch(url +'/' + id,requestOptions)
          .then((response) => {
            if (response.ok) {
                removeClient(id);
                updateClientList();
              }
          },
          (error) => console.log(error)
          )
          }

          const updateClientPopups = (client) => {
          const userInput1 = prompt("Введите новое имя:", client.name);
          if (userInput1) {
            const userInput2 = prompt("Введите новую фамилию:", client.surname);
            if (userInput2) {
              client.name = userInput1;
              client.surname = userInput2;
              updateItem(client);
            } else {
              alert("Отменено или введены некорректные данные");
            }
            } else {
              alert("Отменено или введены некорректные данные");
            }
          };

        const updateItem = async (updatedClient) => {
            const requestOptions = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedClient)
            };
            return await fetch(url + '/' + updatedClient.id, requestOptions)
            .then((response) => {
            if (response.ok) {
            updateClientList();
            }
            },
            (error) => console.log(error)
            )
            }

            function CanSeeCars(client)
            {
              if(user.userRole === "admin")
              {
                return (
                  <div>
                  <h4>Купленные машины:</h4>
                    <ul>
                      {client.cars.map(car => (
                        <li key={car.id}>
                          {car.model}: {car.cost}
                        </li>
                      ))}
                    </ul>
                  <button onClick={(e) => deleteItem(client.id)}>Удалить</button>
                  <button onClick={(e) => updateClientPopups(client)}>Обновить</button>
                </div>
                )
              }
            }

return (
  <React.Fragment>
  {user.isAuthenticated ? (
    <React.Fragment>
    <h3>Клиенты</h3>
      {clients.map(client => (
        <div className="Client" key={client.id}>
          <strong className="ClientName">Имя клиента: </strong> {client.name} <br/> 
          <strong>Фамилия клиента:</strong> {client.surname}<br/>
          {CanSeeCars(client)}
          </div>
    ))}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h3>Дружище, авторизуйся</h3>
    </React.Fragment>
  )}
      </React.Fragment>
    );
}
export default Client;