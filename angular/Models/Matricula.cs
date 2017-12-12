using System;

namespace angular.models
{
    public class Matricula
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Dt_Matricula { get; set; } = System.DateTime.Now.ToString("dd/MM/yyyy");
        public string Hora { get; set; } = System.DateTime.Now.ToShortTimeString();
        public Turma Turma { get; set; }
        public Guid TurmaId { get; set; }
        public Aluno Aluno { get; set; }
        public Guid AlunoId { get; set; }
        
    }
}