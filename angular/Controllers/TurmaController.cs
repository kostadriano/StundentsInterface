using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using angular.Data;
using angular.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

namespace angular.Controllers
{
    [Route("api/[controller]")]
    public class TurmaController : Controller
    {
        public TurmaController(AcademicContext dbContext)
        {
            DbContext = dbContext;
        }

        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Turma
            .Include(m => m.Professor)
            .Include(m => m.Disciplina)
            .ThenInclude(m => m.Curso).ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetTurma()
        {
            return Ok(await DbContext.Turma
           .Select(m => new
           {
               DisciplinaNome = m.Disciplina.Nome,
               ProfessorNome = m.Professor.Nome
           })
           .ToListAsync());
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Turma.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Turma value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Turma.AddAsync(value);
                await DbContext.SaveChangesAsync();
                return new NoContentResult();
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Turma value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Turma.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Dia = value.Dia; //update name
            updateValue.Sala = value.Sala;
            updateValue.Vagas = value.Vagas;
            updateValue.Disciplina = value.Disciplina;
            updateValue.Professor = value.Professor;


            DbContext.Turma.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var classR = await DbContext.Turma.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Turma.Remove(classR);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
