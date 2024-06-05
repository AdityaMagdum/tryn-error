using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneConstraintsAPI.Data;
using PhoneConstraintsAPI.Models;

namespace PhoneConstraintsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentProfileController : ControllerBase
    {
        private readonly AgentProfileDbContext _dbContext;

        public AgentProfileController(AgentProfileDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Constraint>>> GetAllConstraints()
        {
            return await _dbContext.Constraints.ToListAsync();
        }

        [HttpGet("data/{id}")]
        public async Task<IActionResult> GetData(int id)
        {
                var tenantClientObject = await _dbContext.TenantClient
                    .FirstOrDefaultAsync(obj => obj.AID == id);
                if (tenantClientObject == null)
                    return NotFound();

                var tenantObject = await _dbContext.Tenant
                    .Where(obj => obj.TenantId == tenantClientObject.TenantId)
                    .ToListAsync();
                if (tenantObject.Count == 0)
                    return NotFound();

            var constraintIds = tenantObject.Select(t => t.ConstraintID).ToList();
            var result = await _dbContext.Constraints
                .Where(constraint => constraintIds.Contains(constraint.ConstraintID))
                .ToListAsync();

            var finaljson = new Result
            {
                TenantID = tenantClientObject.TenantId,
                AgentID = tenantClientObject.AID,
                Constraint = result.ToArray()
                };

                return Ok(finaljson);
        }

        [HttpPost]
        public async Task<IActionResult> PostData([FromBody] PostData newData)
        {
            await SaveTenantData(newData.TenantID, newData.phoneConstraints);
            await SaveConstraintData(newData.phoneConstraints);
            return Ok();
        }

        private async Task SaveTenantData(int TenantId, PhoneConstraint[] phoneConstraints)
        {
            foreach (var Object in phoneConstraints)
            {
                var tenant = new Tenant
                {
                    TenantId = TenantId,
                    TenantName = "default",
                    ConstraintID = Object.ConstraintID
                };
                _dbContext.Tenant.Add(tenant);
            }
            await _dbContext.SaveChangesAsync();
        }

        private async Task SaveConstraintData(PhoneConstraint[] phoneConstraints)
        {
            foreach (var Object in phoneConstraints)
            {
                var constraint = await _dbContext.Constraints
                    .FirstOrDefaultAsync(obj => obj.ConstraintID == Object.ConstraintID);

                if (constraint != null)
                {
                    constraint.Key_Name = Object.Key;
                    constraint.Value = Object.Value;
                }
                else
                {
                    constraint = new Constraint
                    {
                        ConstraintID = Object.ConstraintID,
                        Key_Name = Object.Key,
                        Value = Object.Value
                    };
                    _dbContext.Constraints.Add(constraint);
                }
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}

