import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Client from "./Componets/Client/Client";
import CreateClient from "./Componets/Client/CreateClient"
import LayoutApt from "./Componets/Layout/Layout"
import LogIn from "./Componets/Auto/Login"
import LogOff from "./Componets/Auto/Logoff"
import Register from "./Componets/Auto/Register"

const App = () => {
  const [clients, setClients] = useState([]);
  const addClient = (client) => setClients([...clients, client]);
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
              <>
                <CreateClient user={user} addClient={addClient} />
                <Client
                  clients={clients}
                  setClients={setClients}
                  user={user}
                />
              </>
            }
          />
          <Route path="/login" element={<LogIn setUser={setUser} />}/>
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route path="/register" element={<Register/>} />
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