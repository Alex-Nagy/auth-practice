import { useState } from "react";
import "./App.css";
import http from 'axios'

function App() {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const signup = async() => { 
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: nameValue,
        password: passwordValue
      })
      alert("Successfully signed up ✅")
      setNameValue('')
      setPasswordValue('')
    } catch(err) {
      if(!err.response){
      alert("Oops... Something went wrong 🙁")
      }
      if (err.response.status === 409) {
        alert('User already exists')
      }
      if (err.response.status === 400) {
        alert('Missing credentials')
      }
    }
   }
  
  return (
    <div className="App">
      <h1>Registration</h1>
      <input
        placeholder="username"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <input
        placeholder="password"
        type='password'
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button onClick={signup}>Sign up</button>
    </div>
  );
}

export default App;
