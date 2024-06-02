import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getProjects(currentPage, pageSize);
    }, [currentPage, pageSize]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    function handleDelete(projectId) {
        console.log(projectId)
        fetch(`http://localhost:4000/api/Project/deleteProject/${projectId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {

                    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));

                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                alert("Unable to delete the employee");
            });
    }
    async function getProjects(page, size) {
        try {
            const response = await fetch(`http://localhost:4000/api/Project/allProjects?page=${page}&pageSize=${size}`);

            if (!response.ok) {
                throw new Error("Unable to fetch data");
            }
            const data = await response.json();
            console.log(data)
            setProjects(data.items);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
            alert("Unable to get the data");
        }
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Проекты</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/projects/create" role="button">Создать Проект</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={() => getProjects(currentPage, pageSize)}>Обновить</button>
                </div>
                <div className="col"></div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>УИ</th>
                        <th>Название проекта</th>
                        <th>Компания-Заказчик</th>
                        <th>Компания-Исполнитель</th>
                        <th>Приоритет</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                        <th>Руководитель</th>
                        <th>Сотрудники</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.customerCompany}</td>
                            <td>{project.executorCompany}</td>
                            <td>{project.priority}</td>
                            <td>{formatDate(project.startDate)}</td>
                            <td>{formatDate(project.endDate)}</td>
                            <td>{project.projectManager}</td>
                            <td>
                                <div className="accordion" id={`accordionExample${index}`}>
                                    <div className="card">
                                        <div className="card-header" id={`heading${index}`}>
                                            <h2 className="mb-0 d-flex justify-content-center align-items-center">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`} style={{ textAlign: 'center', color: '#007bff', fontSize: '1rem', fontWeight: 'bold' }}>
                                                    Посмотреть Сотрудников
                                                </button>
                                            </h2>
                                        </div>
                                        <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent={`#accordionExample${index}`}>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    {project.employees.map((emp, empIndex) => (
                                                        <li key={empIndex} className="list-group-item">
                                                            {emp.firstName} {emp.lastName} - {emp.position}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <Link className="btn btn-primary me-1" to={`/projects/edit/${project.id}`} role="button">Обновить</Link>
                                <button type="button" className="btn btn-outline-primary btn-danger text-white" onClick={() => handleDelete(project.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
