using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaPrevenirAPI.Model.Services
{
    public class LivroDTO
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Categoria { get; set; }
        public string? Descricao { get; set; }
        public string? ISBN { get; set; }
        public bool Disponibilidade { get; set; }
    }
}