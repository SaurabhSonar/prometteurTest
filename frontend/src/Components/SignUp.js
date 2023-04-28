import React from 'react'
import { useFormik } from "formik";
import { SignUpSchema } from "../Validations/validation";
import {postUser} from '../Services/apis'
import {useNavigate,Link} from 'react-router-dom'

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

export default function SignUp() {
  const Navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
    });
    const handleSubmit=()=>{
        postUser(values)
        .then((res)=>{
         console.log(res.data.msg)
         alert(res.data.msg)
         Navigate("/")
        })
        .catch((err)=>{
        console.log(err.response.data.msg)
        alert(err.response.data.msg)
        })
    }
    return (
        <div className="container row form">
            <div className="col-md-7 ">
                <img src="./Images/SignUp.jpg" className="Background" />
            </div>
            <div className="container col-md-4 formBody">
                <div>
                    <h3 className="text-center">Sign Up</h3>
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
                    <div className="text-center">
                        {
                            JSON.stringify(errors) == "{}" && values.name !=='' && values.email !=="" && 
                            values.password !== "" && values.confirm_password !== "" ? 
                            <button className="btn btn-primary" onClick={handleSubmit} >Register</button>:
                            <button className="btn btn-primary"  disabled>Register</button>
                        }
                       
                    </div><br/>
                    <span className='text-center'>Already signed Up, go to <Link to="/">Login</Link> Page</span>
                </div>
            </div>
        </div>
    )
}
