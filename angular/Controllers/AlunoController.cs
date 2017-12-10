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
    public class AlunoController : Controller
    {
        public AlunoController(AcademicContext dbContext)
        {
            DbContext = dbContext;
        }

        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Aluno.Include(m=> m.Cidade.Estado).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Aluno.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Aluno value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Aluno.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Cidade = await DbContext.Cidade.SingleOrDefaultAsync(m => m.Id == value.CidadeId);
                value.Cidade.Estado = await DbContext.Estado.SingleOrDefaultAsync(m => m.Id == value.Cidade.EstadoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Aluno value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Aluno.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome; //update name
            updateValue.Endereco = value.Endereco;
            updateValue.Email = value.Email;
            updateValue.Telefone = value.Telefone;
            updateValue.Cidade = value.Cidade;
            

            DbContext.Aluno.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var classR = await DbContext.Aluno.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Aluno.Remove(classR);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
