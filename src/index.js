import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Client from "./Componets/Client/Client";
import Employee from "./Componets/Employee/Employee";
import Order from "./Componets/Order/Order";
import LayoutApt from "./Componets/Layout/Layout"
import LogIn from "./Componets/Auto/Login"
import LogOff from "./Componets/Auto/Logoff"
import Register from "./Componets/Auto/Register"
import AllAvailableCars from "./Componets/Car/AllAvailableCars"
import AllCars from "./Componets/Car/AllCars"
import SoldCars from "./Componets/Car/SoldCars"

const App = () => {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" })

  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "", userRole: ""  })
          return response.json()
        })
        .then(
          (data) => {
            if (
              typeof data !== "undefined" &&
              typeof data.userName !== "undefined" &&
              typeof data.userRole !== "undefined"
            ) {
              setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
            }
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getUser()
  }, [setUser])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LayoutApt user={user} />}>
          <Route
            path="/clients"
            element={
                <Client
                  clients={clients}
                  setClients={setClients}
                />
            }
          />
          <Route path="/cars" element={<AllAvailableCars user={user} />}/>
          <Route path="/allCars" element={<AllCars/>}/>
          <Route path="/soldCars" element={<SoldCars/>}/>
          <Route path="/login" element={<LogIn setUser={setUser} />}/>
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(     
    <App />
);