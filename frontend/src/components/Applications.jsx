import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';


function Applications() {

    const [applications, setApplications] = useState([])

    // console.log(applications);
    
    useEffect(()=> {
        fetch("http://localhost:3000/applications")
        .then(res=> res.json())
        .then(data=> setApplications(data))
    })
    return (
        <Container fluid="sm" style={{maxWidth:"800px"}}>
            <h1>Заявки</h1>
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
                    
                    {applications.map((application, index) => {
                    // console.log(application)
                    
                   return application.idusers === JSON.parse(localStorage.getItem("iduser")) ? (
                    <tr key={application.idapplications}>
                        {/* <td>{application.idapplications}</td> */}
                        <td>{application.platform}</td>
                        <td>{application.date}</td>
                        <td>{application.payment}</td>
                        <td>{application.status}</td>
                        <td>{application.rewiest || "нет отзыва"}</td>
                    </tr>
                    ) : null}
                    )}
                </tbody>
            </Table>
        <Button href='/ApplicationsForm'>Подать заявку</Button>
          <a href='Login'>Назад </a>
           
        </Container>
    )

}

export default Applications