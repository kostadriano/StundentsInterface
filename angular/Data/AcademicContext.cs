using System;
using System.IO;
using angular.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace angular.Data
{
    public class AcademicContext : DbContext
    {
        public DbSet<Aluno> Aluno { get; set; }
        public DbSet<Cidade> Cidade { get; set; }
        public DbSet<Turma> Turma { get; set; }
        public DbSet<Disciplina> Disciplina { get; set; }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<Professor> Professor { get; set; }
        public DbSet<Estado> Estado {get; set;}
        public DbSet<Matricula> Matricula {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=./Data/database.sqlite");
        }

        public static void InitDb(IServiceProvider serviceProvider)
        {
            const string path = "./Data/database.sqlite";

            if(File.Exists(path)){
                File.Delete(path);
            }

            var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
            var dataContext = serviceScope.ServiceProvider.GetRequiredService<AcademicContext>();
            dataContext.Database.EnsureCreated();
            dataContext.SaveChanges();
        }


    }
}