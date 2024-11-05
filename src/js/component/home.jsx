import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
    const [listaDeTareas, setListaDeTareas] = useState([])
    const [nuevaTarea, setNuevaTarea] = useState("")

    const crearUsuario = async () => {
        const url = "https://playground.4geeks.com/todo/users/juliju"
        const resp = await fetch(url, {
            method: "POST",
        })
        if (resp.ok) {
            cargarTareas()
        }
    };

    const cargarTareas = async () => {
        const url = "https://playground.4geeks.com/todo/users/juliju"
        const resp = await fetch(url)
        
        if (resp.status === 404) {
            crearUsuario()
            return
        }
        const data = await resp.json()
        console.log(data)
        setListaDeTareas(data.todos || [])
    };

    useEffect(() => {
        cargarTareas()
    }, []);

    const agregarTarea = async () => {
        if (nuevaTarea) {
            const url = "https://playground.4geeks.com/todo/todos/juliju"
            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    label: nuevaTarea,
                    is_done: false
                })
            });
            if (resp.ok) {
                const data = await resp.json()
                setListaDeTareas([...listaDeTareas, data])
                setNuevaTarea("")
            }
        }
    };

    const eliminarTarea = async (id, index) => {
        const url = `https://playground.4geeks.com/todo/todos/${id}`
        const resp = await fetch(url, {
            method: "DELETE",
        });
        
        if (resp.ok) {
            const aux = listaDeTareas.filter((_task, ind) => ind !== index)
            setListaDeTareas(aux)
        }
    };

    return (
        <div className="card container mt-5 text-center">
            <h1 className="text-center">✅ Todo list ✅</h1>
            <div className="mx-auto col-6">
                <input
                     type="text"
                     className="form-control"
                     id="nuevaTarea"
                     name="nuevaTarea" 
                     placeholder="Add a Task 👈"
                     value={nuevaTarea}
                     onChange={(event) => setNuevaTarea(event.target.value)}
                     onKeyUp={(event) => {
                         if (event.key === "Enter") {
                             agregarTarea();
                         }
                     }}
                />

                <ul className="todo-list mt-4">
                    {listaDeTareas.map((item, index) => (
                        <li key={index} className="d-flex justify-content-between align-items-center">
                            {item.label}
                            <i onClick={() => eliminarTarea(item.id, index)} 
                               className="fa fa-trash" style={{ color: "#77bb78", cursor: "pointer" }}></i>
                        </li>
                    ))}
                </ul>

                <p>{listaDeTareas.length} Tasks left to complete </p>
            </div>
        </div>
    );
};

export default Home
