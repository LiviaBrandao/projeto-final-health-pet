using System.ComponentModel.DataAnnotations;

namespace HealthPets_API.Models
{
    public class ClientePet
    {
        [Key]
        public int codCliente { get; set; }
        public string? nomeCliente { get; set; }
        public string? cpfCliente { get; set; } 
    }

}