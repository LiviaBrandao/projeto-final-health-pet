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

    public class AgendamentoController : ControllerBase
    {
        private HealthPetsContext _context;

        public AgendamentoController(HealthPetsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Agendamento>> GetAll()
        {
            return _context.Agendamento.ToList();
        }

        //metodos mais especificos -----------------------------------

        [HttpGet("{IdAgendamento}")]
        public ActionResult<List<Agendamento>> Get(int IdAgendamento)
        {
            try
            {
                var result = _context.Agendamento.Find(IdAgendamento);
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
        public async Task<ActionResult> post(Agendamento model)
        {
            try
            {
                _context.Agendamento.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created("/api/Agendamento/{model.idAgendamento}", model);
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

        [HttpPut("{IdAgendamento}")]
        public async Task<IActionResult> put(int IdAgendamento, Agendamento dadosAgendamentoAlt)
        {
            try
            {
                var result = await _context.Agendamento.FindAsync(IdAgendamento);
                if (IdAgendamento != result.idAgendamento)
                {
                    return BadRequest();
                }

                result.dataAgendamento = dadosAgendamentoAlt.dataAgendamento;
                result.nomePet = dadosAgendamentoAlt.nomePet;
                result.nomeCuidador = dadosAgendamentoAlt.nomeCuidador;
                result.nomeCliente = dadosAgendamentoAlt.nomeCliente;

                await _context.SaveChangesAsync();
                return Created($"/api/Agendamento/{dadosAgendamentoAlt.idAgendamento}", dadosAgendamentoAlt);
            }
            catch(Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpDelete("{IdAgendamento}")]
        public async Task<ActionResult> delete(int IdAgendamento)
        {
            System.Console.WriteLine("\n\n\n\nCurso:" + IdAgendamento);
            try
            {
                var agendamento = await _context.Agendamento.FindAsync(IdAgendamento);
                // System.Console.WriteLine("\n\n\n\nCurso:" + Curso);
                if (agendamento == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(agendamento);
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