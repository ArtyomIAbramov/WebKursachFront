import React from "react"

const Register = () => {

  const register = async (event) => {
    event.preventDefault()

    var { email, password, confirmed_password } = document.forms[0]

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        passwordConfirm : confirmed_password.value
      }),
    }
    try{
        const response = await fetch("api/account/register", requestOptions);
        if(response.ok)
        {
            document.forms[0].reset();
            document.getElementById("is_user_created").innerHTML = "Пользователь создан!!!";
        }
    }
    catch(error){
        console.log(error);
    }
  }


  return (
    <>
        <h3>Регистрация</h3>
          <form onSubmit={register}>
            <label>Email пользователя </label>
            <input type="text" name="email" placeholder="Логин" />
            <br />
            <label>Пароль </label>
            <input type="text" name="password" placeholder="Пароль" />
            <br />
            <label>Повторите пароль</label>
            <input type="text" name="confirmed_password" placeholder="Повторите пароль" />
            <br />
            <button type="submit">Зарегистрироваться</button>
        <h3 id="is_user_created"></h3>
          </form>
    </>
  )
}

export default Register
