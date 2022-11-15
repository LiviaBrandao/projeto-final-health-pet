using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class Agendamento
    {
        [Key]
        public int idAgendamento { get; set; }
        public string? dataAgendamento { get; set; }
        public string? codPet { get; set; } 
        public string? codCuidador { get; set; }
        public string? codCliente { get; set; }
        
    }
}