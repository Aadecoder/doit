import { useState,useEffect,useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

function uid(){
  return Math.random().toString(36).slice(2,9);
}
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [mode, setMode] = useState('normal');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const cmdRef = useRef(null);
  const containerRef = useRef(null);

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

  const handleNormal=(e)=>{
    if(e.key === 'i' || e.key === 'a'){
      setMode = 'insert';
    }
  }

  return (
    <>
      <div className='flex justify-center items-center flex-col w-screen h-screen'>
          <h1 className='text-center text-9xl text-green-100'>termit</h1>
          {mode === 'normal' &&
          <div className='flex flex-col w-[50vw] bg-slate-700 p-10 pb-0 z-10'>
            <input 
              type="text"
              className='text-slate-200 text-4xl m-3 bg-slate-700'
              placeholder='Type some shit...'
              onKeyDown={handleAdd}
              onChange={handleChange}
            /> 
          </div>}
          <div className='flex flex-col w-[50vw] h-[75vh] bg-slate-700 p-10 pt-0 overflow-scroll'>
            <div className='todos'>
              {todos.length === 0 && <div className='m-5 text-2xl font-bold italic'>Write to some shit to see some shit</div>}
              {todos.map(item=>{
                return (showFinished || !item.isCompleted) && <div key={item.id} className={'todo flex my-3'}>
                  <input type="checkbox" className='mr-4' name={item.id} onChange={handleCheckbox} checked={item.isCompleted} id=''/>
                  <div className={item.isCompleted?"line-through text-2xl font-bold italic text-green-700":"text-2xl font-bold"}>{item.todo}</div>
                </div>
              })}
            </div>
          </div>
      </div>
    </>
  )
}

export default App
