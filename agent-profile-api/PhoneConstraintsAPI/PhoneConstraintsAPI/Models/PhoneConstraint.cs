using System.ComponentModel.DataAnnotations;

namespace PhoneConstraintsAPI.Models
{
    public class PhoneConstraint
    {
        public int ConstraintID { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Default { get; set; } = "Enabled";
    }

    public class Constraint
    {
      
        public int ConstraintID { get; set; }
        public string Key_Name { get; set; }
        public string Value { get; set; }
    }
    public class TenantClient
    {
        [Key]
        public int TenantId { get; set; }
        [Key]
        public int AID { get; set; }
    }
 
    public class Tenant
    {
        [Key]
        public int TenantId { get; set; }

        public string? TenantName { get; set; }
        [Key]
        public int ConstraintID { get; set; }
    }

    public class JSONResult
    {
        public int AgentID { get; set; }
        public int TenantID { get; set; }

        public PhoneConstraint[] PhoneConstraint { get; set; }
    }
    public class Result
    {
        public int AgentID { get; set; }
        public int TenantID { get; set;}

        public Constraint[] Constraint { get; set; }
    }

    public class PostData
    {
        public int TenantID { get; set; }

        public PhoneConstraint[] phoneConstraints { get; set; }
    }

    public class Agent
    {
        public int AgentID { get; set; }
        public string AgentName  { get; set;}
    }
}
