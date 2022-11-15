using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class Pet
    {
        [Key]
        public int codPet { get; set; }
        public string? nomePet { get; set; }
        public string? raca { get; set; }
        public string? tipoPet { get; set; }
        public int codCliente { get; set; }
    }

}