import React from "react"
import { Outlet, Link } from "react-router-dom"

const Layout = ({ user }) => {
  return (
    <>
      <div>
        {user.isAuthenticated ? (
          <h4>Пользователь: {user.userName}</h4>
        ) : (
          <h4>Пользователь: Гость</h4>
        )}
      </div>

      <nav>
        <Link to="/">Главная</Link> <span> </span>
        <Link to="/clients">Клиенты</Link> <span> </span>
        <Link to="/login">Вход</Link> <span> </span>
        <Link to="/logoff">Выход</Link>
        <Link to="/register">  Регистрация</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
