import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ApplicationsForm() {

    const [platform, setPlatform] = useState("")
    const [date, setDate] = useState("")
    const [payment, setPayment] = useState("")


    const [error, setError] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        if (!e.currentTarget.checkValidity()) {
            setError("Заполните все поля")
            return
        }

        const application = {
            
            idusers: JSON.parse(localStorage.getItem("iduser")),
            platform,
            date,
            payment
        }
        console.log(application.idusers);

        console.log(application);

        try {
            const response = await fetch("http://localhost:3000/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(application),
            });

            const result = await response.json()
            console.log(result);

            navigate("/Applications")


        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Container fluid="sm" style={{maxWidth:"400px"}}>
            <h1>Создать заявку </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Помещение для конференции</Form.Label>
                    <Form.Control type="text" placeholder="Помещение для конференции" required onChange={(e) => setPlatform(e.target.value)} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Дата</Form.Label>
                    <Form.Control type="date" placeholder="Желаемая дата" required onChange={(e) => setDate(e.target.value)} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Способ оплаты</Form.Label>

                    <Form.Check
                        required
                        type="radio"
                        label="при очном посещении"
                        name="payment"
                        value="при очном посещении"
                        onChange={(e) => setPayment(e.target.value)}
                    />

                    <Form.Check
                        type="radio"
                        label="переводом СПБ"
                        name="payment"
                        value="переводом СПБ"
                        onChange={(e) => setPayment(e.target.value)} />
                </Form.Group>



                <Button variant="primary" type="submit"> Отправить </Button>
                <a href='/Applications'>Назад</a>
                {error && <p>{error}</p>}
            </Form>
        </Container>
    )

}

export default ApplicationsForm