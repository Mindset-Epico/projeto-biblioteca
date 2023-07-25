using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BibliotecaPrevenirAPI.Model.Models;

namespace BibliotecaPrevenirAPI.Model.Data
{
    public class BibliotecaContext : DbContext
    {
         public BibliotecaContext(DbContextOptions<BibliotecaContext> options)
        : base(options)
    {
    }

        public DbSet<Livro> Livros { get; set; } = null!;


        //FIX para a Injeção de Dependencia da Base de Dados no Program.cs
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("Biblioteca");
            optionsBuilder.UseSqlite(connectionString);
        }
    }
}