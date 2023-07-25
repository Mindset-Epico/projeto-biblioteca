using Microsoft.EntityFrameworkCore;
using BibliotecaPrevenirAPI.Model.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//FIX para essa Injeção de Dependencia da Base de Dados. Override no Contexto.
var connectionString = builder.Configuration.GetConnectionString("Biblioteca");
builder.Services.AddDbContext<BibliotecaContext>(context => 
    context.UseSqlite("Biblioteca"));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
