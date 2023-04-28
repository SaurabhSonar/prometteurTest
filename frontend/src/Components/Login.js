import React from 'react'
import { useFormik } from "formik";
import { LoginSchema } from "../Validations/validation";
import {login} from '../Services/apis'
import {useNavigate,Link} from 'react-router-dom'

const initialValues = {
    email: "",
    password: ""
  };

export default function () {
  const Navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
    });
    const handleSubmit=()=>{
      login(values)
      .then((res)=>{
       console.log(res.data.msg)
       alert(res.data.msg)
       localStorage.setItem("email",values.email)
       Navigate("/dashboard")
      })
      .catch((err)=>{
      console.log(err.response.data.msg)
      alert(err.response.data.msg)
      })
    }
  return (
    <div className="container row form">
            <div className="col-md-7 ">
                <img src="./Images/login.jpg" className="Background" />
            </div>
            <div className="container col-md-4 LoginformBody">
                <div>
                    <h3 className="text-center">Login</h3>
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
                    <div className="text-center">
                        {
                            JSON.stringify(errors) == "{}" && values.email !=="" && 
                            values.password !== ""  ? 
                            <button className="btn btn-primary" onClick={handleSubmit} >Register</button>:
                            <button className="btn btn-primary"  disabled>Register</button>
                        }
                       
                    </div><br/>
                    <span className='text-center'>Not signed Up, go to <Link to="/signup">SignUp</Link> Page</span>
                </div>
            </div>
        </div>
  )
}
