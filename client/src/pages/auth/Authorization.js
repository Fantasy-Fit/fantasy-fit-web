import React from 'react';
import Login from './Login';
import Signup from './Signup';


function Authorization() {
  return (
    <div>Authorization Page
        <div className='auth-login'><Login /></div>
        <div className='auth-signup'><Signup /></div>
    </div>
  )
}

export default Authorization