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

    public class CuidadorController : ControllerBase 
    {
        private readonly HealthPetsContext _context;

        public CuidadorController(HealthPetsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Cuidador>> GetAll()
        {
            return _context.Cuidador.ToList();
        }


        [HttpGet("{CodCuidador}")]
        public ActionResult<List<Cuidador>> Get(int CodCuidador)
        {
            try
            {
                var result = _context.Cuidador.Find(CodCuidador);
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
        public async Task<ActionResult> post(Cuidador model)
        {
            try
            {
                _context.Cuidador.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created("/api/Cuidador/{model.codCuidador}", model);
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
        
        [HttpPut("{CodCuidador}")]
        public async Task<IActionResult> put(int CodCuidador, Cuidador dadosCuidadorAlt)
        {
            try
            {
                var result = await _context.Cuidador.FindAsync(CodCuidador);
                if (CodCuidador != result.codCuidador)
                {
                    return BadRequest();
                }

                result.nomeCuidador = dadosCuidadorAlt.nomeCuidador;
                result.especialidade = dadosCuidadorAlt.especialidade;

                await _context.SaveChangesAsync();
                return Created($"/api/Cuidador/{dadosCuidadorAlt.codCuidador}", dadosCuidadorAlt);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    
        [HttpDelete("{CodCuidador}")]
        public async Task<ActionResult> delete(int CodCuidador)
        {
            System.Console.WriteLine("\n\n\n\nCurso:" + CodCuidador);
            try
            {
                var cuidador = await _context.Cuidador.FindAsync(CodCuidador);
                // System.Console.WriteLine("\n\n\n\nCurso:" + Curso);
                if (cuidador == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(cuidador);
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