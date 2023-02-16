import React, {useContext} from 'react';
import {UserContext} from './App';


function User() {
    const username = useContext(UserContext)
  return (
    <div>
        <h2>I am  child component my name is {username}</h2>
    </div>
  )
}

export default User