import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


function AdminPanel() {

    const [applications, setApplications] = useState([])

    // console.log(applications);

    useEffect(() => {
        fetch("http://localhost:3000/applications")
            .then(res => res.json())
            .then(data => setApplications(data))
    })
    return (
        <Container fluid="sm" style={{ maxWidth: "800px" }}>
            <h1>Панель администратора </h1>
            <Table>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>Помещение</th>
                        <th>Дата</th>
                        <th>Оплата</th>
                        <th>Статус</th>
                        <th>Отзыв</th>
                    </tr>
                </thead>
                <tbody>

                    {applications.map((application, index) =>
                        // console.log(application)
                        <tr key={application.idapplications}>
                            {/* <td>{application.idapplications}</td> */}
                            <td>{application.platform}</td>
                            <td>{application.date}</td>
                            <td>{application.payment}</td>
                            <td>

                                <Form.Control as="select"
                                    value={application.status}
                                    onChange={(e) => {
                                        console.log(`http://localhost:3000/applications/${application.idapplications}`);
                                        
                                        fetch(`http://localhost:3000/applications/${application.idapplications}`, {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({status: e.target.value}),
                                        });
                                    }}

                                >
                                    <option value="Новая">Новая</option>
                                    <option value="Мероприятие назначено" >Мероприятие назначено</option>
                                    <option value="Завершено" >Завершено</option>
                                </Form.Control>

                            </td>
                            <td>{application.rewiest || "нет отзыва"}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button href='/ApplicationsForm'>Подать заявку</Button>
            <a href='Login'>Назад </a>

        </Container>
    )

}

export default AdminPanel