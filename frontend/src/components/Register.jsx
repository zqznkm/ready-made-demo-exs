import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Register() {

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [error, setError] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    if (!e.currentTarget.checkValidity()) {
      setError("Заполните все поля")
    }

    const user = {
      login,
      password,
      fullName,
      phone,
      email
    }

    console.log(user);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),

      });

      const result = await response.json
      console.log(result);

      navigate("/Login")
      
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <Container>
      <h1>Регистрация</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Логин" required minLength={6} pattern='[A-Za-z0-9]+' onChange={(e) => setLogin(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" required minLength={8} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Label>ФИО</Form.Label>
          <Form.Control type="text" placeholder="ФИО" required pattern='[А-Яа-яЁё\s]+' onChange={(e) => setFullName(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Label>Телефон</Form.Label>
          <Form.Control type="tel" placeholder="Телефон" required pattern='8\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}' onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>

        <Form.Group >
          <Form.Label>Почта</Form.Label>
          <Form.Control type="email" placeholder="Почта" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit"> Зарегистрироваться </Button>
      </Form>
      <p>Уже есть аккаунт? {
        <a href='Login'>Войти</a>}</p>

        {error && <p>{error}</p>}
    </Container>
  )

}

export default Register