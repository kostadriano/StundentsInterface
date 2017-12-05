using System;

namespace angular.models
{
    public class Curso
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string Titulo { get; set; }
    }
}