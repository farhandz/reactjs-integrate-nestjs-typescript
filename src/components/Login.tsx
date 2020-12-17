import React from 'react'
import Axios from 'axios'

const Login = () => {
    const [email, setEmail] = React.useState("")
    const LoginSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        Axios.post("http://localhost:3333/employee/login", {
            email: email
        }).then(dt => {
            localStorage.setItem("token", dt.data.token);
            localStorage.setItem("refreshToken", dt.data.refresh);
            window.location.href = "/"
        }).catch(err => {
          alert("email salah/tidak terdaftar")
          console.log(err.message)
        })
    }
    return (
      <>
        <div className="main-login">
          <form onSubmit={LoginSubmit}>
            <div className="login-wrapper">
                <h3 className="text-secondary font-wight-bold text-login">Login Page</h3>
              <div className="form-group form-input mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control email-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-secondary">
                Login
              </button>
            </div>
          </form>
        </div>
      </>
    );
}

export default Login