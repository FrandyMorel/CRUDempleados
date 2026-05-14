import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { appsettings } from "../settings/appsettings"
import Swal from "sweetalert2"
import { IEmpleados } from "../Interfaces/IEmpleado"


const initialEmpleado = { 
    nombre:"",
    correo:"",
    sueldo:0
}

export function NuevoEmpleado(){

    const [empleado, setEmpleado] = useState<IEmpleados>(initialEmpleado)
    const navigate = useNavigate();

    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        // console.log(inputName, ":",inputValue)
        setEmpleado({...empleado,[inputName]: inputValue})
    }

    const volver = () => {
      navigate("/")
    }

    const guardar = async () => {
      const response = await fetch(`${appsettings.appUrl}Empleado/Nuevo`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(empleado)
    })
    if (response.ok) {
      Swal.fire({
        title: "Empledo guardado!",
        icon: "success",
        draggable: true
      })
      navigate("/")

    }else{
      Swal.fire({
        title: "Error!",
        text: "No se pudo guardar el empleado",
        icon: "question"
      });
    }
  }

    return (
        <div className="container mx-auto px-4 justfy-center">
        <h1 className="flex justify-center text-4xl font-bold mt-8">Nuevo empleado</h1>
            <hr className="mt-6 mb-6 px-8 border-gray-900/10" />
            <div className="border-b px-8 border-gray-900/10 pb-12">
            <form>
              <div className="flex justify-center">
              <div className="p-8 flex flex-col">
                <label className="block text-lg/6 font-medium text-gray-900">Nombre</label>
                <div className=" mt-2 mb-3 pe-8" dir="ltr"> 
                <input autoComplete="given-name" className="block w-lg rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre} placeholder="nombre"/>
                </div>

                <label className="block text-lg/6 font-medium text-gray-900">Correo</label>
                <div className=" mt-2 mb-3 pe-8" dir="ltr">
                <input autoComplete="given-name" className="block w-lg rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="text" name="correo" onChange={inputChangeValue} value={empleado.correo} placeholder="correo"/>
                </div>

              
                <label className="block text-lg/6 font-medium text-gray-900">Sueldo</label>
                <div className=" mt-2 mb-3 pe-8" dir="ltr">
                <input autoComplete="given-name" className="block w-lg rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="number" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo} placeholder="sueldo"/>
                </div>
                </div>
                </div>
            </form>
           <div className="flex justify-center">
            <button  type="button" className="rounded-md me-4 bg-neutral-400 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400" 
            onClick={volver}>
          Volver
        </button>
        <button
          type="submit" onClick={guardar}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
        </div>
            </div>
        </div>
    )
}