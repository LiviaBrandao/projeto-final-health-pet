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

    public class ServicoController : ControllerBase
    {
        private HealthPetsContext _context;

        public ServicoController(HealthPetsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Servico>> GetAll()
        {
            return _context.Servico.ToList();
        }

        //metodos mais especificos -----------------------------------

        [HttpGet("{IdServico}")]
        public ActionResult<List<Servico>> Get(int IdServico)
        {
            try
            {
                var result = _context.Servico.Find(IdServico);
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
        public async Task<ActionResult> post(Servico model)
        {
            try
            {
                _context.Servico.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created("/api/Servico/{model.idServico}", model);
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

        [HttpPut("{IdServico}")]
        public async Task<IActionResult> put(int IdServico, Servico dadosServicoAlt)
        {
            try
            {
                var result = await _context.Servico.FindAsync(IdServico);
                if (IdServico != result.idServico)
                {
                    return BadRequest();
                }
                result.nomeServico = dadosServicoAlt.nomeServico;
                await _context.SaveChangesAsync();
                return Created($"/api/Servico/{dadosServicoAlt.idServico}", dadosServicoAlt);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{IdServico}")]
        public async Task<ActionResult> delete(int IdServico)
        {
            System.Console.WriteLine("\n\n\n\nCurso:" + IdServico);
            try
            {
                var servico = await _context.Servico.FindAsync(IdServico);
                // System.Console.WriteLine("\n\n\n\nCurso:" + Curso);
                if (servico == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(servico);
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