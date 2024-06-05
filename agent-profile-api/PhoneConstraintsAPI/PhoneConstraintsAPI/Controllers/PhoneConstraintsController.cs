using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Newtonsoft.Json;
using PhoneConstraintsAPI.Models;
using System.Data;
using System.Text.Json;

namespace PhoneConstraintsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneConstraintsController : ControllerBase
    {
        private readonly string constraints_path = "C:\\Users\\amagdum\\dev\\agent-profile-api\\PhoneConstraintsAPI\\PhoneConstraintsAPI\\Models\\Constraint.json";
        private readonly string tenantclient_path = "C:\\Users\\amagdum\\dev\\agent-profile-api\\PhoneConstraintsAPI\\PhoneConstraintsAPI\\Models\\TenantClient.json";
        private readonly string tenant_path = "C:\\Users\\amagdum\\dev\\agent-profile-api\\PhoneConstraintsAPI\\PhoneConstraintsAPI\\Models\\Tenant.json";

        private T ReadJsonFile<T>(string path)
        {
            var json = System.IO.File.ReadAllText(path);
            return JsonConvert.DeserializeObject<T>(json);
        }

        private async Task SaveTenantData(int TenantId, PhoneConstraint[] phoneConstraints)
        {
            var tenantObjects = ReadJsonFile<List<Tenant>>(tenant_path);
            var tenantName = tenantObjects.FirstOrDefault(obj=>obj.TenantId == TenantId);
            string name;
            if(tenantName == null) {
                name = "default";
            }
            else
            {
                name = tenantName.TenantName;
            }
            tenantObjects.RemoveAll(obj => obj.TenantId == TenantId);
            foreach (var Object in phoneConstraints)
            {
                tenantObjects.Add(new Tenant
                {
                    TenantId = TenantId,
                    TenantName = name,
                    ConstraintID = Object.ConstraintID
                });
            }
            await System.IO.File.WriteAllTextAsync(tenant_path, JsonConvert.SerializeObject(tenantObjects, Formatting.Indented));
        }

        private async Task SaveConstraintData(PhoneConstraint[] phoneConstraints)
        {
            var constraintObjects = ReadJsonFile<List<PhoneConstraint>>(constraints_path);
            foreach (var Object in phoneConstraints)
            {
                var constraintObject = constraintObjects.FirstOrDefault(obj => obj.ConstraintID == Object.ConstraintID);
                if (constraintObject != null)
                {
                    constraintObject.Key = Object.Key;
                    constraintObject.Value = Object.Value;
                }
                else
                {
                    constraintObjects.Add(new PhoneConstraint
                    {
                        ConstraintID = Object.ConstraintID,
                        Key = Object.Key,
                        Value = Object.Value,
                        Default = Object.Default,
                    });
                }
            }
            await System.IO.File.WriteAllTextAsync(constraints_path, JsonConvert.SerializeObject(constraintObjects, Formatting.Indented));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllData()
        {
            var json = await System.IO.File.ReadAllTextAsync(constraints_path);
            var data = System.Text.Json.JsonSerializer.Deserialize<List<PhoneConstraint>>(json);
            return Ok(data);
        }

        [HttpGet("data/{id}")]
        public Task<IActionResult> GetData(int id)
        {
            var tenantClientObjects = ReadJsonFile<List<TenantClient>>(tenantclient_path);
            var tenantClientObject = tenantClientObjects.FirstOrDefault(obj => obj.AID == id);
            if (tenantClientObject == null)
                return Task.FromResult<IActionResult>(NotFound());

            var tenantObjects = ReadJsonFile<List<Tenant>>(tenant_path);
            var tenantObject = tenantObjects.Where(obj=>obj.TenantId==tenantClientObject.TenantId).ToList();
            if (tenantObject.Count == 0)
                return Task.FromResult<IActionResult>(NotFound());

            var constraintObjects = ReadJsonFile<List<PhoneConstraint>>(constraints_path);
            var result = constraintObjects.Where(o => tenantObject.Any(m=> m.ConstraintID==o.ConstraintID)).ToList();
            var finaljson = new JSONResult
            {
                TenantID = tenantClientObject.TenantId,
                AgentID = tenantClientObject.AID,
                PhoneConstraint = result.ToArray()
            };
            return Task.FromResult<IActionResult>(Ok(finaljson));

        }

        [HttpPost]
        public async Task<IActionResult> PostData([FromBody] PostData newData)
        {
            await SaveTenantData(newData.TenantID, newData.phoneConstraints);
            await SaveConstraintData(newData.phoneConstraints);
            return Ok("Data Saved Successfully");
        }
    }
}















































































