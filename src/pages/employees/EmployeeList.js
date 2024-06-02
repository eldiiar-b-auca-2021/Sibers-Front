import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getemployees();
    }, []);
    function handleDelete(employeeId) {
        console.log(employeeId)
        fetch(`http://localhost:4000/api/Employee/deleteEmployee/${employeeId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the employee list after deletion
                    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));

                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                alert("Unable to delete the employee");
            });
    }
    function getemployees() {
        fetch("http://localhost:4000/api/Employee/allEmployee")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                console.log(data)
                setEmployees(data)
            })
            .catch(error => {
                alert("Unable to get the data")
            })
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">
                Сотрудники
            </h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="create/Employee" role="button">Создать Сотрудника</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getemployees}>Обновить</button>
                </div>

                <div className="col"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>УИ</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Отчество</th>
                        <th>Почта</th>
                        <th>Позиция</th>
                        <th>Проекты</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employees, index) => {

                            return (
                                <tr key={index}>
                                    <td>{employees.id}</td>
                                    <td>{employees.firstName}</td>
                                    <td>{employees.lastName}</td>
                                    <td>{employees.middleName}</td>
                                    <td>{employees.email}</td>
                                    <td>{employees.position}</td>

                                    <td>
                                        <div className="accordion" id={`accordionExample${index}`}>
                                            <div className="card">
                                                <div className="card-header" id={`heading${index}`}>
                                                    <h2 className="mb-0 d-flex justify-content-center align-items-center">
                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`} style={{ textAlign: 'center', color: '#007bff', fontSize: '1rem', fontWeight: 'bold' }}>
                                                            Посмотреть Проектов
                                                        </button>
                                                    </h2>
                                                </div>
                                                <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent={`#accordionExample${index}`}>
                                                    <div className="card-body">
                                                        <ul className="list-group">
                                                            {employees.projects.map((emp, empIndex) => (
                                                                <li key={empIndex} className="list-group-item">
                                                                    <div><strong>Название:</strong> {emp.name}</div>
                                                                    <div><strong>Компания-Заказчик:</strong> {emp.customerCompany}</div>
                                                                    <div><strong>Компания-Исполнитель:</strong> {emp.executorCompany}</div>

                                                                </li>

                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <Link className="btn btn-primary me-1" to={`/edit/Employee/${employees.id}`} role="button"> Edit </Link>
                                        <button type="button" className="btn btn-outline-primary btn-danger text-white" onClick={() => handleDelete(employees.id)}>Delete</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}