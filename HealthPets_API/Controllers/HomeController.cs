using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using HealthPets_API.Data;
using HealthPets_API.Models;

namespace HealthPets_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class HomeControler: ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HealthPetsContext? _context;
        // public HomeController (
        //     Configuration configuration, EscolaContext context) {
        //     _configuration = configuration;
        //     _context = context;
        // }

        public HomeControler(IConfiguration configuration, HealthPetsContext context) {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<dynamic> Login([FromBody] User usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuario.Where(u => u.username == usuario.username &&

            u.senha == usuario.senha)

            .FirstOrDefault();
            if (user == null)
                return Unauthorized("Usuário ou senha inválidos");

            var authClaims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = GetToken(authClaims);
            user.senha = "";
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = user
            });
        }

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet]
        [Route("cliente")]
        [Authorize(Roles = "cliente,cuidador")]
        public string Cliente() => "Cliente";

        [HttpGet]
        [Route("cuidador")]
        [Authorize(Roles = "cuidador")]
        public string Cuidador() => "Cuidador";
        
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(3),
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            return token;
        }

    }

}