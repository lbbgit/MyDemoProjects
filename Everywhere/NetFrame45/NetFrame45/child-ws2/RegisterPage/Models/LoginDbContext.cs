using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
namespace LoginPage.Models
{
    public class LoginDbContext:DbContext
    {

        public LoginDbContext()
        //public LoginDbContext():base("Name=dbConn")
        { 
        
        }
        public DbSet<UserRegister> UserRegisters{get;set;}
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            //modelBuilder.Conventions.Remove<PluralizingEntitySetNameConvention>();
        }
    }
}