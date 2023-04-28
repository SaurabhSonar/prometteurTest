import React, { useEffect, useState } from 'react'
import { getUsers } from '../Services/apis'
import {deleteUser,editUser, postUser} from '../Services/apis'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import { SignUpSchema } from "../Validations/validation";
import {useNavigate} from 'react-router-dom'

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };


export default function Dashboard() {
    const Navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleChange,setValues } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
    });
    const [userData, setUserData] = useState([])
    const [show,setShow] = useState(0)
    const [flag,setFlag] = useState(0)
    const [ID,setID] = useState("")
    
    useEffect(() => {
        if(localStorage.getItem("email") !== null){
            fetchData()
        }
        else{
            Navigate("/")
        }
        
    }, [])
    const fetchData = () => {
        getUsers()
            .then((res) => {
                setUserData(res.data.data)
            })
    }
    const deleteUsers=(id)=>{
        console.log(id)
        deleteUser(id)
        .then((res)=>{
           alert(res.data.msg)
           fetchData()
        })
    }
    const onEdit=(data)=>{
        const {email,name,password,_id} = data
        setID(_id)
        setValues({
            name: name,
            email: email,
            password: password,
            confirm_password:password
        })
        setShow(1)
        setFlag(1)
    }
    const onAdd=()=>{
        setValues(initialValues)
        setShow(1)
        setFlag(0)
    }
    const Modals=()=>{
        return(
            <Modal show={show}
             onHide={()=>{
                setShow(!show)
             }}
             >
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" 
                        className="form-control"
                        name="name"
                        value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                        />
                         {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email"
                         className="form-control"
                         name="email"
                         value={values.email}
                         onChange={handleChange}
                         onBlur={handleBlur} />
                           {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                         className="form-control"
                         name="password"
                         value={values.password}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         />
                          {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password"
                         className="form-control"
                         name="confirm_password"
                         value={values.confirm_password}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         />
                           {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                    </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" 
              onClick={()=>{
                setShow(0)
              }}
              >
                Close
              </Button>
              { flag ? <Button variant="primary" 
              onClick={EditDetails}
              >
                Update
              </Button>:
              <Button variant="primary" 
                onClick={AddDetails}
                >
                  Add
                </Button>}
            </Modal.Footer>
          </Modal>
        )
    }
    const EditDetails=()=>{
     editUser(ID,values)
     .then((res)=>{
        alert(res.data.msg)
        fetchData()
        setShow(0)
     })
    }
    const AddDetails=()=>{
        postUser(values)
        .then((res)=>{
         console.log(res.data.msg)
         alert(res.data.msg)
         fetchData()
         setShow(0)
        })
        .catch((err)=>{
        console.log(err.response.data.msg)
        alert(err.response.data.msg)
        })
    }

    return (
        <div className="container ">
            
            <div className="col-md-8 container tableContainer" >
                <div className='dashHead'>
            <h3 className="text-center">List of Users</h3>
            <div>
            <button className="btn btn-primary" onClick={onAdd}>Add User</button>&nbsp;
            <button className="btn btn-dark" onClick={()=>{
                localStorage.clear()
               Navigate("/")
            }}>LogOut</button>
            </div>
            </div><br/>
                <table className="table text-center">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((el,index)=>
                            <tr>
                            <td>{index+1}</td>
                            <td scope="col">{el.name}</td>
                            <td scope="col">{el.email}</td>
                            <td scope="col">{el.password}</td>
                            <td colSpan={2}>
                                <button className="btn btn-success" onClick={()=>onEdit(el)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={()=>deleteUsers(el._id)}>Delete</button>
                            </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {Modals()}
        </div>
    )
}
