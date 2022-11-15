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

    public class PetController : ControllerBase
    {
        private readonly HealthPetsContext _context;

        public PetController(HealthPetsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Pet>> GetAll()
        {
            return _context.Pet.ToList();
        }

        [HttpGet("{CodPet}")]
        public ActionResult<List<Pet>> Get(int CodPet)
        {
            try
            {
                var result = _context.Pet.Find(CodPet);
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
        public async Task<ActionResult> post(Pet model)
        {
            System.Console.WriteLine("\n\n\nENTROU NO POST\n\n\n");
            try
            {
                _context.Pet.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/pet/{model.nomePet}", model);
                }
            }
            catch (Exception e)
            {
                System.Console.WriteLine("message:" + e.Message, e.StackTrace);
                return this.StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{CodPet}")]
        public async Task<IActionResult> put(int CodPet, Pet dadosPetAlt)
        {
            try
            {
                //verifica se existe Pet a ser alterado
                var result = await _context.Pet.FindAsync(CodPet);
                if (CodPet != result.codPet)
                {
                    return BadRequest();
                }

                result.nomePet = dadosPetAlt.nomePet;
                result.raca = dadosPetAlt.raca;
                result.tipoPet = dadosPetAlt.tipoPet;

                await _context.SaveChangesAsync();
                return Created($"/api/pet/{dadosPetAlt.nomePet}", dadosPetAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{CodPet}")]
        public async Task<ActionResult> delete(int CodPet)
        {
            try
            {
                //  System.Console.WriteLine("\n\n\n\nEntrou no delete:" + AlunoId);
                //verifica se existe aluno a ser excluído
                var pet = await _context.Pet.FindAsync(CodPet);
                if (pet == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(pet);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch(Exception e)
            {
                System.Console.WriteLine("message:" + e.Message, e.StackTrace);
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
    }
}