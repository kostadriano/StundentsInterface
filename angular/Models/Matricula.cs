using System;

namespace angular.models
{
    public class Matricula
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public System.DateTime Dt_Matricula { get; set; }
        public string Hora { get; set; }
        public Turma Turma { get; set; }
        public Guid TurmaId { get; set; }
        public Aluno Aluno { get; set; }
        public Guid AlunoId { get; set; }
        
    }
}