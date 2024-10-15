import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [years, setYears] = useState(0);
  const [id, setId] = useState(0);

  const [edit, setEdit] = useState(false);

  const [employeesList, setEmployees] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getEmployees();
      clearFields();
      Swal.fire({
        title: 'Succesful Registration!',
        html: '<i> The employee <strong>' + name + '</strong> was Successfully Registered!</i>',
        icon: 'success',
        timer: 3000
      })
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The employee could not be added!",
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Try later"
          : JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getEmployees();
      clearFields();
      Swal.fire({
        title: 'Succesful Update!',
        html: '<i> The employee <strong>' + name + '</strong> was Successfully Updated!</i>',
        icon: 'success',
        timer: 3000
      })
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The employee could not be updated!",
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Try later"
          : JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const deleteEmployee = (val) => {

    Swal.fire({
      title: "Confirm delete",
      html: `<i> You want to delete the employee <strong>${val.name}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmployees();
          clearFields();
          Swal.fire({
            title: "Deleted!",
            text: `The employee ${val.name} has been deleted.`,
            icon: "success",
            timer: 3000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The employee could not be deleted!",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Try later"
              : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const clearFields = () => {
    setName("");
    setAge("");
    setCountry("");
    setPosition("");
    setYears("");
    setEdit(false);
  }

  const editEmployee = (val) => {
    setEdit(true);

    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setPosition(val.position);
    setYears(val.years);
    setId(val.id);
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployees(response.data);
    }).catch((err) => {
      console.error("Error fetching employees:", err);
    });
  }

  // useEffect execute one time
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          Employee Management
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Name:</span>
            <input type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="form-control" value={name} placeholder="Enter Name" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Age:</span>
            <input type="number"
              onChange={(event) => {
                setAge(event.target.value);
              }}
              className="form-control" value={age} placeholder="Enter Age" aria-label="Age" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Country:</span>
            <input type="text"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              className="form-control" value={country} placeholder="Enter Country" aria-label="Country" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Position:</span>
            <input type="text"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
              className="form-control" value={position} placeholder="Enter Position" aria-label="Position" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Years:</span>
            <input type="number"
              onChange={(event) => {
                setYears(event.target.value);
              }}
              className="form-control" value={years} placeholder="Enter Years" aria-label="Years" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            edit ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Update</button>
                <button className='btn btn-info m-2' onClick={clearFields}>Cancel</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Register</button>
          }

        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">Id</th> */}
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Position</th>
            <th scope="col">Years</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employeesList.map((val, key) => {
              return <tr key={val.id}>
                {/* <th>{val.id}</th> */}
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.country}</td>
                <td>{val.position}</td>
                <td>{val.years}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editEmployee(val);
                      }}
                      className="btn btn-info">Edit</button>
                    <button type="button" onClick={() => {
                      deleteEmployee(val);
                    }} className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
