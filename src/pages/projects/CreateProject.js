import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown"
export default function CreateProject() {
    const [employees, setEmployees] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        getemployees();


    }, []);

    function getemployees() {
        fetch("http://localhost:4000/api/Employee/employeeForProject")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error()
            })
            .then(data => {
                //console.log(data)
                setEmployees(data)
            })
            .catch(error => {
                alert("Unable to get the data")
            })
    }


    function handleSelect(selectedList, selectedItem) {

        setSelectedEmployees(selectedList.map(item => item.id));
        console.log(selectedEmployees)
    }

    function handleRemove(selectedList, removedItem) {
        setSelectedEmployees(selectedList.map(item => item.id));
    }
    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const project = Object.fromEntries(formData.entries())

        project.employeeIds = selectedEmployees;
        console.log(project)
        fetch("http://localhost:4000/api/Project/addProject", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Project created successfully!");
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

                    <h2 className="text-center mb-5">Создать Проект</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Название проекта</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Компания-заказчик</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="customerCompany" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Компания-исполнитель</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="executorCompany" />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Приоритет проекта</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="priority">
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                    <option value="4">Critical</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Дата начала</label>
                            <div className="col-sm-8">
                                <DatePicker
                                    selected={startDate} // Pass the selected date value
                                    onChange={(date) => setStartDate(date)} // Handle date change
                                    className="form-control" // Apply necessary styles
                                    name="startDate"
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Дата окончания</label>
                            <div className="col-sm-8">
                                <DatePicker
                                    selected={endDate} // Pass the selected date value
                                    onChange={(date) => setEndDate(date)} // Handle date change
                                    className="form-control" // Apply necessary styles
                                    name="endDate"
                                />
                                <span className="text-danger"></span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Руководитель проекта</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="projectManagerId">
                                    {
                                        employees.map((employee) => {
                                            console.log(employee)
                                            return (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.firstName} {employee.position}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Сотрудники</label>
                            <div className="col-sm-8">
                                <Multiselect
                                    name="employeeIds"
                                    options={employees}
                                    displayValue="firstName"
                                    onSelect={handleSelect}
                                    onRemove={handleRemove}
                                    placeholder="Select employees"
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
                                <Link className="btn btn-secondary" to="/projects" role="button">Отменить</Link>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}