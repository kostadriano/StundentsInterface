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
    public class DisciplinaController : Controller
    {
        public DisciplinaController(AcademicContext dbContext)
        {
            DbContext = dbContext;
        }

        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Disciplina.Include(m => m.Curso).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Disciplina.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Disciplina value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Disciplina.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Curso = await DbContext.Curso.SingleOrDefaultAsync(m=> m.Id == value.CursoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Disciplina value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Disciplina.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome;
            updateValue.CargaHoraria = value.CargaHoraria;
            updateValue.Curso = value.Curso; 

            DbContext.Disciplina.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var classR = await DbContext.Disciplina.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Disciplina.Remove(classR);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
