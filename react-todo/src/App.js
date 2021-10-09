import React, { useState , useEffect} from 'react';
import "./App.css";
//Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';




function App() {


  //Create a storage for state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //RUN ONCE when the app start
  useEffect(() =>{
    getLocalTodos();
  },[])
    //USE EFFECT
    useEffect(() => {
      filterHandler();
    } ,[todos, status]);

  //Functions and Event
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
          default: 
          setFilteredTodos(todos);
          break;
          
    }
  }

  //SAVE TO LOCAL
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };

  //Get localTodo
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos"  , JSON.stringify([]));
    }else{
    let todoLocal =  JSON.parse(localStorage.getItem("todos"));
    setTodos(todoLocal)
    }
  };

  return (
    <div className="App">
      <header>
      <h1 id="fonts">Rex's Todo List</h1>
    </header>
    <Form inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
       setInputText={setInputText}
       setStatus ={setStatus}
     />

    <TodoList 
    todos={todos}
     setTodos={setTodos}
    filteredTodos={filteredTodos}
    />
    </div>
  );
}

export default App;
