namespace HealthPets_API.Models
{
    public class Agendamento
    {
        public int idAgendamento { get; set; }
        public string? dataAgendamento { get; set; }
        public int? codPet { get; set; }
        public int? codCuidador { get; set; }
        public int? codCliente { get; set; }
    }
}