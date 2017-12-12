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
    public class CidadeController : Controller
    {
        public CidadeController(AcademicContext dbContext)
        {
            DbContext = dbContext;
        }

        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Cidade.Include(m => m.Estado).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Cidade.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Cidade value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Cidade.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Estado = await DbContext.Estado.SingleOrDefaultAsync(m => m.Id == value.EstadoId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Cidade value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Cidade.SingleOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Nome = value.Nome;
            updateValue.EstadoId = value.EstadoId;
            updateValue.Estado = await DbContext.Estado.SingleOrDefaultAsync(m => m.Id == value.EstadoId);

            DbContext.Cidade.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return Ok(updateValue);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var classR = await DbContext.Cidade.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Cidade.Remove(classR);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
