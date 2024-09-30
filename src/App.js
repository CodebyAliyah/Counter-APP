import React, { useEffect, useState } from "react";
import "./App.css";
import * as yup from 'yup'
import { studentData } from "./studentData";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [update,setUpdate] = useState(false)

  useEffect(() => {
    setData(studentData);
  }, []);

  const editHandle = (id) => {
    const del = data.filter(item => item.id ===id)

    if (del !==undefined) {
      setId(id);
      setName(del[0].name);
      setEmail(del[0].email);
    }
  };

  const deleteHandle = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure delete this item")) {
        const del = data.filter((item) => item.id !== id);
        setData(del);
      }
    }
  };

  const saveHandle = (e) => {

    let error = ''
    if(name=='') 
      error += "Name is required"

     if(email=='') 
      error += "Name is required"

      if(error=='') {}
    e.preventDefault();

    const del = [...data];
    const newObj = {
      id : studentData.length+1,
      name : name ,
      email : email,
    }
    del.push(newObj)
    setData(del)
  }
  const updateHandle = () => {
    const index = data.map(item => {
      return item.id
    }).indexOf(id)

    const del = [...data];
    del[index].name = name
    del[index].email = email
    setData(del);
    clearHandle();
  }

  const clearHandle = () => {
    setId(0);
    setName('');
    setEmail('');
    setUpdate(false)
  }

  return (
    <dev clasName="APP">
      <div style={{ display: "flex", justifyContent: "center", 
        marginTop : "20px", marginBottom :"20px" }}>
        <div>
          <label>
            {" "}
            Name :
            <input type="text" 
            placeholder="Enter Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
             />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Email :
            <input type="TEXT"
             placeholder="Enter Email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />
          </label>
        </div>
        <div>
        { 
        !update ?
        <button className="btn btn-danger" onClick={(e) => saveHandle(e)}>
          save
        </button>
        :
         <button className="btn btn-danger" onClick={() => updateHandle()}>
         Update   
       </button>
        }

          <button className="btn btn-primary" onClick={() => clearHandle()}>
            clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => editHandle(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandle(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </dev>
  );
}

export default App;
