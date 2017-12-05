using System;

namespace angular.models
{
    public class Cidade
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public Guid Estado { get; set; }

    }
}