import React from 'react'

function Login() {
  return (
    <div className='login'>
        <p>I am the Login</p>
        <form>
            <label>Username</label><input/><br>
            </br>
            <label>Password</label><input/>
            <br></br>
            <button>Login</button>
        </form>
    </div>

  )
}

export default Login