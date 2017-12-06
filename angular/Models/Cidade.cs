using System;

namespace angular.models
{
    public class Cidade
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public Estado Estado { get; set; }
        public Guid EstadoId { get; set; }
        

    }
}