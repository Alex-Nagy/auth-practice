import { useEffect, useState } from "react";
import "./App.css";
import http from "axios";

function App() {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [todo, setTodo] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const [sectionToAppear, setSectionToAppear] = useState("registration");

  const signup = async () => {
    try {
      await http.post("http://localhost:4000/api/signup", {
        name: nameValue,
        password: passwordValue,
      });
      alert("Successfully signed up ✅");
      setNameValue("");
      setPasswordValue("");
    } catch (err) {
      if (!err.response) {
        alert("Oops... Something went wrong 🙁");
      }
      if (err.response.status === 409) {
        alert("User already exists");
      }
      if (err.response.status === 400) {
        alert("Missing credentials");
      }
    }
  };

  
  const addTodo = async () => {
    try {
      await http.post(
        "http://localhost:4000/api/todo",
        {
          todo: todo,
        },
        {
          headers: {
            authorization: authUser + ":::" + authPassword,
          },
        }
      );
      alert("To Do added ✅");
      setTodo("");
    } catch (err) {
      alert("Oops... Something went wrong 🙁");
    }
  };

  const login = async () => { 
    try {
      await http.post(
        "http://localhost:4000/api/login",
        {
          todo: todo,
        },
        {
          headers: {
            authorization: authUser + ":::" + authPassword,
          },
        }
      );
      setSectionToAppear('todos')
        localStorage.setItem('user', authUser)
        localStorage.setItem('password', authPassword)
      } catch (err) {
        alert("Wrong username or password 🙁");
      }
    }

    const signout = () => { 
      localStorage.removeItem('user', authUser)
      localStorage.removeItem('password', authPassword)
      setAuthUser('')
      setAuthPassword('')
      setSectionToAppear('login')
     }

     useEffect(() => {
      const user = localStorage.getItem('user')
       const password = localStorage.getItem('password')
       if (!user || !password) return
       setAuthUser(user)
       setAuthPassword(password)
       setSectionToAppear('todos')
     }, []);
    
    return (
    <main className="App">
      {sectionToAppear === "registration" && (
        <section >
          <h1>Registration</h1>
          <input
            placeholder="username"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button onClick={signup}>Sign up</button>
          <button onClick={ ()=> setSectionToAppear('login')}>I already have an account</button>
        </section>
      )}
     {sectionToAppear === 'login' && <section>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="authUsername"
          value={authUser}
          onChange={(e) => setAuthUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="authPassword"
          value={authPassword}
          onChange={(e) => setAuthPassword(e.target.value)}
        />
          <button onClick={() => setSectionToAppear('registration')}>I don't have an account</button>
          <button onClick={login}>Log in</button>
      </section>}
      {sectionToAppear === 'todos' && <section>
        <h2>ToDo</h2>
        <input
          type="text"
          placeholder="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button disabled={!todo} onClick={addTodo}>
          Add ToDo
        </button>
      </section>}
    </main>
  );
}

export default App;
