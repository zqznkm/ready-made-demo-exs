import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        // Проверяем админа отдельно
        if (login === "Conf2027" && password === "Demo77") {
            navigate("/AdminPanel")
            return
        }

        // Проверка обычного пользователя
        if (!e.currentTarget.checkValidity()) {
            setError("Заполните все поля")
            return
        }

        const validUsers = {
            login,
            password
        }

        console.log(validUsers);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validUsers),
            });

            const result = await response.json()

            if (result.message === "Неверный логин или пароль") {
                setError(result.message)
                return
            }

            console.log(result);

            localStorage.setItem("iduser", JSON.stringify(result.id))

            navigate("/Applications")

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>

            <h1>Авторизация</h1>

            <Form onSubmit={handleSubmit}>

                <Form.Group>

                    <Form.Label>Логин</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Логин"
                        required
                        minLength={6}
                        pattern="[A-Za-z0-9]+"
                        onChange={(e) => setLogin(e.target.value)}
                    />

                </Form.Group>

                <Form.Group>

                    <Form.Label>Пароль</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        required
                        minLength={8}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </Form.Group>

                <Button variant="primary" type="submit">
                    Войти
                </Button>

            </Form>

            <p>
                Ещё не зарегистрированы?
                <a href="Register">Регистрация</a>
            </p>

            {error && <p>{error}</p>}

        </Container>
    )
}

export default Login