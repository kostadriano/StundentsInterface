using System;

namespace angular.models
{
    public class Disciplina
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public int CargaHoraria { get; set; }
        public Curso Curso { get; set; }
    }
}