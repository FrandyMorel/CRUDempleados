import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { appsettings } from "../settings/appsettings"
import Swal from "sweetalert2"
import { IEmpleados } from "../Interfaces/IEmpleado"



export function Lista(){
    const [empleados, setEmpleados] = useState<IEmpleados[]>([]);

    const obternerEmpleados = async() => {
        const response = await fetch(`${appsettings.appUrl}Empleado/Lista`)
        if(response.ok){
            const data = await response.json();
           setEmpleados(data)
        } else{
          console.log("Error al obtener el empleado")
        }
    }

    useEffect(() =>{
        obternerEmpleados()
    },[])

    const Eliminar = (id:number)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "bg-blue-500 text-white me-1 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300",
              cancelButton: "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "Si haces esto eliminaras un empleado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si eliminar!",
            cancelButtonText: "No cancelar!",
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
            const response = await fetch(`${appsettings.appUrl}Empleado/Eliminar/${id}`, {method:"DELETE"})
            if(response.ok) await obternerEmpleados() 
        } 
     });
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="flex justify-center text-4xl font-bold mt-8">Lista de Empleados</h1>
            <hr className="border-gray-900/10 mt-6 mb-4"></hr>
            <div className="mt-8 mb-4">
            <Link className=" rounded-md bg-indigo-600 px-3 py-2  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" to="/nuevoempleado">Nuevo empleado</Link>
            </div>
            <div className="flex justify-center">
            <table className=" justify-center min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className=" bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Correo</th>
                        <th className="py-3 px-6 text-left">Sueldo</th>
                        <th className="py-3 px-6 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {empleados.map((item) => (
                        <tr key={item.idEmpleado} className="hover:bg-gray-100">
                            <td className="py-3 px-6">{item.nombre}</td>
                            <td className="py-3 px-6">{item.correo}</td>
                            <td className="py-3 px-6">{item.sueldo}</td>
                            <td className="py-3 px-6">
                                <Link 
                                    to={`/editarempleado/${item.idEmpleado}`} 
                                    className="bg-yellow-500 text-white me-4 px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Editar
                                </Link>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300" onClick={()=> {Eliminar(item.idEmpleado!)}}>
                                    Eliminar
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}