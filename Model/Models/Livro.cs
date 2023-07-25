using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaPrevenirAPI.Model.Models
{
    public class Livro
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Categoria { get; set; }
        public string? Descricao { get; set; }
        public string? ISBN { get; set; }
        public bool Disponibilidade { get; set; }
        public string? DtoField { get; set; }
    }
}