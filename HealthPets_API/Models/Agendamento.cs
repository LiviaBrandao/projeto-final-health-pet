using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class Agendamento
    {
        [Key]
        public int idAgendamento { get; set; }
        public string? dataAgendamento { get; set; }
        public string? nomePet { get; set; } 
        public string? nomeCuidador { get; set; }
        public string? nomeCliente { get; set; }
        
    }
}