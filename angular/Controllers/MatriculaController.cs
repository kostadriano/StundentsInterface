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
    public class MatriculaController : Controller
    {
        public MatriculaController(AcademicContext dbContext)
        {
            DbContext = dbContext;
        }

        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Matricula.Include(m=>m.Aluno).Include(m=>m.Turma).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Matricula.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Matricula value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Matricula.AddAsync(value);
                await DbContext.SaveChangesAsync();
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Matricula value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Matricula.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Dt_Matricula = value.Dt_Matricula;
            updateValue.Hora = value.Hora;
            updateValue.Turma = value.Turma;
            updateValue.Aluno = value.Aluno;

            DbContext.Matricula.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var classR = await DbContext.Matricula.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Matricula.Remove(classR);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
