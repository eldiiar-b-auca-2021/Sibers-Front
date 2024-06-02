import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './pages/projects/ProjectList';
import EmployeeList from './pages/employees/EmployeeList';
import CreateProject from './pages/projects/CreateProject';
import EditProject from './pages/projects/EditProject';
import CreateEmployee from './pages/employees/CreateEmployee';
import EditEmployee from './pages/employees/EditEmployee';


function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/edit/Employee/:employeeId" element={<EditEmployee />} />
            <Route path="/create/Employee" element={<CreateEmployee />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/edit/:projectId" element={<EditProject />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
