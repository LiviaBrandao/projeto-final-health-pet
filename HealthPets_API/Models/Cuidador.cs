using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class Cuidador
    {
        [Key]
        public int codCuidador { get; set; }
        public string? nomeCuidador { get; set; }
        public string? especialidade { get; set; }
    }
}