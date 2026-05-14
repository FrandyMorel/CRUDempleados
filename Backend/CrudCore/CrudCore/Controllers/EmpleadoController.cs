using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CrudCore.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly DbcrudContext dbContext;

        public EmpleadoController(DbcrudContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> GetLista()
        {
            var listaEmpleado = await dbContext.Empleados.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaEmpleado);
        }

        [HttpGet]
        [Route("Obtener/{id:int}")]
        public async Task<ActionResult> Get(int id)
        {
            var empleado = await dbContext.Empleados.FirstOrDefaultAsync(e => e.IdEmpleado == id);
            return StatusCode(StatusCodes.Status200OK, empleado);
        }

        [HttpPost]
        [Route("Nuevo")]
        public async Task<ActionResult> GetNuevo([FromBody] Empleado objeto)
        {
            await dbContext.Empleados.AddAsync(objeto);
            await dbContext.SaveChangesAsync();
           
            return StatusCode(StatusCodes.Status200OK, new {mensaje = "Empleado agregado correctamente"});
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<ActionResult> Editar([FromBody] Empleado objeto)
        {
            dbContext.Empleados.Update(objeto);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { mensaje = "Empleado editado correctamente"});
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<ActionResult> GetEliminar(int id)
        {
            var empleado = await dbContext.Empleados.FirstOrDefaultAsync(e => e.IdEmpleado == id);
            if (empleado == null)
            {
                return NotFound(new { mensaje = "Empleado no encontrado" });
            }
            dbContext.Empleados.Remove(empleado);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new {mensaje = "Empleado elimindo correctamente"});
        }
    }
}
