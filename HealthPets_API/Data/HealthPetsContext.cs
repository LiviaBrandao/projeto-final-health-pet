using Microsoft.EntityFrameworkCore;
using HealthPets_API.Models;
using System.Diagnostics.CodeAnalysis;
namespace HealthPets_API.Data
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
        
        public DbSet<ClientePet> ClientePet { get; set; }
        public DbSet<Pet> Pet { get; set; }
        public DbSet<Cuidador> Cuidador { get; set; }
        public DbSet<Servico> Servico { get; set; }
        public DbSet<Agendamento> Agendamento { get; set; }
        public DbSet<User>? Usuario { get; set; }
    }
}