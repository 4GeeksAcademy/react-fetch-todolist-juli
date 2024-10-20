import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    let [listaDeTareas, setListaDeTareas] = useState(["Learn React", "Create a new project", "Go gym"])
    const [nuevaTarea,setNuevaTarea] = useState ("")
    return (
        <div className="card container mt-5 text-center">
            <h1 className="text-center"> Todo list ✅ 
            </h1>
            <div className="mx-auto col-6">
                <input type="text" className="form-control " placeholder="Add Task"
                value={nuevaTarea} onChange={(event) => {
                       setNuevaTarea((event.target.value))
                   }}
                   onKeyUp={(event) => {
                    if (event.key == "Enter") {
                        setListaDeTareas ([...listaDeTareas ,nuevaTarea]);
                        setNuevaTarea("")
                    }
                    setNuevaTarea
                   }}
                />

                <ul className="todo-list mt-4">
                    {listaDeTareas.map((item, index) => {
                        return (
                            <li key={index} className="d-flex justify-content-between align-items-center">

                                {item}
                                <i onClick ={()=>{
                                    const aux = listaDeTareas.filter((task, ind) => {
                                        return(ind != index)   
                                    })
                                    setListaDeTareas(aux)
                                }}
                                    className="fa fa-trash icono-oculto"
                                    style={{ color: "#77bb78", cursor: "pointer" }}
                                ></i>
                            </li>
                        )
                    })}
                </ul>
                    <p>
                        {listaDeTareas.length} Tasks left to complete
                    </p>
            </div>

        </div>
    );
};

export default Home;
