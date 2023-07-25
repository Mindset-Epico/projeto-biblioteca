using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaPrevenirAPI.Model.Data;
using BibliotecaPrevenirAPI.Model.Models;
using BibliotecaPrevenirAPI.Model.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BibliotecaPrevenirAPI.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class BibliotecaController : ControllerBase
    {
        private readonly ILogger<BibliotecaController> _logger;
        private readonly BibliotecaContext _bibliotecaContext;

        //CONSTRUCTOR

        public BibliotecaController(BibliotecaContext bibliotecaContext, ILogger<BibliotecaController> logger)
        {
            _bibliotecaContext = bibliotecaContext;
            _logger = logger;
        }



        //MÉTODOS

        private bool LivroExists(int id)
        {
            return _bibliotecaContext.Livros.Any(livro => livro.Id == id);
        }


        private static LivroDTO BibliotecaToDTO(Livro livro) =>
            new LivroDTO
            {
                Id = livro.Id,
                Nome = livro.Nome,
                Categoria = livro.Categoria,
                Descricao = livro.Descricao,
                ISBN = livro.ISBN,
                Disponibilidade = livro.Disponibilidade
            };



        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LivroDTO>>> GetLivros()
        {
            return await _bibliotecaContext.Livros
                .Select(livro => BibliotecaToDTO(livro))
                .ToListAsync();
        }


        // GET BY ID
        [HttpGet("{id}")]
        public async Task<ActionResult<LivroDTO>> GetLivroById(int id)
        {
            var livro = await _bibliotecaContext.Livros.FindAsync(id);

            if (livro == null)
            {
                return NotFound();
            }

            return BibliotecaToDTO(livro);
        }


        // POST
        [HttpPost]
        public async Task<ActionResult<LivroDTO>> PostLivro(LivroDTO livroDto)
        {

            var livro = new Livro
            {
                Nome = livroDto.Nome,
                Categoria = livroDto.Categoria,
                Descricao = livroDto.Descricao,
                ISBN = livroDto.ISBN,
                Disponibilidade = livroDto.Disponibilidade
            };

            _bibliotecaContext.Livros.Add(livro);
            await _bibliotecaContext.SaveChangesAsync();

            //    return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
            return CreatedAtAction(nameof(GetLivros), new { id = livro.Id }, BibliotecaToDTO(livro));
        }


        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLivro(int id, LivroDTO livroDto)
        {
            if (id != livroDto.Id)
            {
                return BadRequest();
            }

            var livro = await _bibliotecaContext.Livros.FindAsync(id);
            if (livro == null)
            {
                return NotFound();
            }

            livro.Nome = livroDto.Nome;
            livro.Categoria = livroDto.Categoria;
            livro.Descricao = livroDto.Descricao;
            livro.ISBN = livroDto.ISBN;
            livro.Disponibilidade = livroDto.Disponibilidade;

            try
            {
                await _bibliotecaContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!LivroExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }


        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var livro = await _bibliotecaContext.Livros.FindAsync(id);
            if (livro == null)
            {
                return NotFound();
            }

            _bibliotecaContext.Livros.Remove(livro);
            await _bibliotecaContext.SaveChangesAsync();

            return NoContent();
        }
    }
}