using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneConstraintsAPI.Models;
using System.Text.Json;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PhoneConstraintsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllConstraintsController : ControllerBase
    {
        private readonly string allConstraintPath = "C:\\Users\\amagdum\\dev\\agent-profile-api\\PhoneConstraintsAPI\\PhoneConstraintsAPI\\Models\\PhoneJSONData.json";

        public List<PhoneConstraint> ReadJson(string filepath)
        {
            var json = System.IO.File.ReadAllText(filepath);
            return JsonSerializer.Deserialize<List<PhoneConstraint>>(json);
        }

        public string[] ExtractKeys(List<PhoneConstraint> phoneConstraints)
        {
            return phoneConstraints.Select(p=>p.Key).ToArray();
        }

        [HttpGet]
        public IActionResult GetAllConstraints()
        {
            var constraints = ReadJson(allConstraintPath);
            var keys = ExtractKeys(constraints);
            return Ok(keys);
        }
    }
}
