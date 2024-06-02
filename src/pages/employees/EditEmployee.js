import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown"
export default function CreateProject() {
    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const { employeeId } = useParams();

    console.log(employeeId)
    useEffect(() => {
        getemployees();

    }, []);

    function getemployees() {
        fetch("http://localhost:4000/api/Project/projectForEmployee")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                console.log(data)
                setProjects(data)
            })
            .catch(error => {
                alert("Unable to get the data")
            })
    }

    function handleSelect(selectedList, selectedItem) {

        setSelectedProjects(selectedList.map(item => item.id));
        // console.log(selectedEmployees)
    }

    function handleRemove(selectedList, removedItem) {
        setSelectedProjects(selectedList.map(item => item.id));
    }
    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const project = Object.fromEntries(formData.entries())

        project.projectIds = selectedProjects;
        console.log(project)
        fetch(`http://localhost:4000/api/Employee/updateEmployee/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Project created successfully!");
                    // Redirect or perform any other action after successful creation
                } else {
                    throw new Error("Failed to create project");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to create project");
            });

    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">

                    <h2 className="text-center mb-5">Обновить</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Имя</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="firstName" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Фамилия</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lastName" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Отчество</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="middleName" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Почта</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="email" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Позиция</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="position" />
                                <span className="text-danger"></span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Проекты</label>
                            <div className="col-sm-8">
                                <Multiselect
                                    name="projectIds"
                                    options={projects}
                                    displayValue="name"
                                    onSelect={handleSelect}
                                    onRemove={handleRemove}
                                    placeholder="Выберите проекты"
                                    style={{
                                        multiselectContainer: { width: "100%" }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Отправить</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to="/" role="button">Отменить</Link>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}