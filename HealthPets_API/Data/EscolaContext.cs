using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Models;
using System.Diagnostics.CodeAnalysis;
namespace ProjetoEscola_API.Data
{
    public class HealthPetsContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        //public HealthPetsContext(DbContextOptions<HealthPetsContext> options) : base(options)
        public HealthPetsContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }
        public DbSet<Aluno> Aluno { get; set; }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<User>? Usuario { get; set; }
    }
}