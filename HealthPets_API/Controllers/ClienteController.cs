using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using HealthPets_API.Data;
using HealthPets_API.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HealthPets_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ClienteController : ControllerBase
    {
        private HealthPetsContext _context;

        public ClienteController(HealthPetsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<ClientePet>> GetAll()
        {
            return _context.ClientePet.ToList();
        }

        //metodos mais especificos -----------------------------------

        [HttpGet("{CodCliente}")]
        public ActionResult<List<ClientePet>> Get(int CodCliente)
        {
            try
            {
                var result = _context.ClientePet.Find(CodCliente);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(ClientePet model)
        {
            try
            {
                _context.ClientePet.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created("/api/ClientePet/{model.codCliente}", model);
                }
            }
            catch(Exception e)
            {
                System.Console.WriteLine("message:" + e.Message, e.StackTrace);
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{CodCliente}")]
        public async Task<IActionResult> put(int CodCliente, ClientePet dadosClientePetAlt)
        {
            try
            {
                var result = await _context.ClientePet.FindAsync(CodCliente);
                if (CodCliente != result.codCliente)
                {
                    return BadRequest();
                }

                result.nomeCliente = dadosClientePetAlt.nomeCliente;
                result.cpfCliente = dadosClientePetAlt.cpfCliente;

                await _context.SaveChangesAsync();
                return Created($"/api/ClientePet/{dadosClientePetAlt.codCliente}", dadosClientePetAlt);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{CodCliente}")]
        public async Task<ActionResult> delete(int CodCliente)
        {
            System.Console.WriteLine("\n\n\n\nCurso:" + CodCliente);
            try
            {
                var cliente = await _context.ClientePet.FindAsync(CodCliente);
                // System.Console.WriteLine("\n\n\n\nCurso:" + Curso);
                if (cliente == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(cliente);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch(Exception e)
            {
                System.Console.WriteLine("message:" + e.Message, e.StackTrace);
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }

            return BadRequest();
        }
        
    }
}