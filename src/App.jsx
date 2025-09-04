import { useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const savetoLS=(parms)=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = (e) => {
    if(e.key === 'Enter'){
      setTodos([...todos, {todo, isCompleted:false, id:uuidv4()}]);
      setTodo('');
      e.target.value = "";
      savetoLS();
    }
  }

  const handleChange=(e)=>{
    setTodo(e.target.value);
  }

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished);
  }
  
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  }

  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  }

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  }


  return (
    <>
      <div className='flex justify-center items-center flex-col w-screen h-screen'>
          <h1 className='text-center md:text-9xl text-5xl text-green-100'>do<span className='italic'>it</span></h1>
           <div className='flex flex-col md:w-[50vw] w-[95vw] bg-slate-200 p-10 pb-0 z-10 mt-5 rounded rounded-b-none'>
            <input 
              type="text"
              className='text-slate-900 md:text-4xl text-2xl m-3 bg-slate-200'
              placeholder='Type some shit...'
              onKeyDown={handleAdd}
              onChange={handleChange}
              value={todo}
            /> 
          </div> 
          <div className='flex flex-col md:w-[50vw] md:h-[60vh] w-[95vw] h-[70vh] bg-slate-200 p-10 pt-0 overflow-scroll rounded rounded-t-none'>
            <ul className='todos'>
              {todos.length === 0 && <div className='m-5 text-2xl font-bold italic'>Write to some shit to see some shit</div>}
              {todos.map(item=>{
                return (showFinished || !item.isCompleted) && <div key={item.id} className={'todo flex justify-between my-3'}>
                  <div className='flex my-3'>
                    <input type="checkbox" className='md:mr-40 mr-15' name={item.id} onChange={handleCheckbox} checked={item.isCompleted} id=''/>
                    <li className={`md:text-5xl text-lg font-bold list-decimal md:mb-2 ${item.isCompleted?"line-through italic text-green-700":""}`}
                      onDoubleClick={(e)=>{handleEdit(e,item.id)}}
                    >
                      {item.todo}
                    </li>
                  </div>
                  <MdDelete 
                    className='text-4xl hover:text-slate-500 hover:cursor-pointer active:text-slate-500 mt-2.5 md:mt-4' 
                    onClick={(e)=>{handleDelete(e,item.id)}}
                    name={item.id}
                  />
                </div>
              })}
            </ul>
          </div>
          
      </div>
    </>
  )
}

export default App

// import { useState,useEffect} from 'react'
// import { v4 as uuidv4 } from 'uuid';
// import { MdDelete } from "react-icons/md";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import Home from './pages/Home';

// const routes = (
//   <Router>
//     <Routes>
//       <Route path='/login' exact element={<Login />}/>
//       <Route path='/signup' exact element={<SignUp />}/>
//       <Route path='/home' exact element={<Home />}/>
//     </Routes>
//   </Router>
// )

// function App() {
//   return (
//     <>
//     {routes}
//     </>
//   )
// }

// export default App
