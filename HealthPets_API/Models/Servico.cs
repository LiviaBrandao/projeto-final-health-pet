using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class Servico
    {
        [Key]
        public int idServico { get; set; }
        public string? nomeServico { get; set; }
    }
}