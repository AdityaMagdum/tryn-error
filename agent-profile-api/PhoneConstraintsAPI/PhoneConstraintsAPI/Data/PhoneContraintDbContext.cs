using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;
using PhoneConstraintsAPI.Models;

namespace PhoneConstraintsAPI.Data
{
    public class AgentProfileDbContext:DbContext
    {
        public AgentProfileDbContext(DbContextOptions<AgentProfileDbContext> options)
            :base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TenantClient>()
                .HasKey(tc => new { tc.TenantId, tc.AID });

            modelBuilder.Entity<Tenant>()
                .HasKey(tc => new { tc.TenantId, tc.ConstraintID }); 

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Agent> Agent { get; set; }

        public DbSet<TenantClient> TenantClient { get; set; }

        public DbSet<Tenant> Tenant { get; set; }

        public DbSet<Constraint> Constraints { get; set; }

    }
}
