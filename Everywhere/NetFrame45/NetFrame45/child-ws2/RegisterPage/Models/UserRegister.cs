using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace LoginPage.Models
{
    public class UserRegister
    {
        [Key]
        public string UserName { get; set; }
        public string UserPwd { get; set; }
        public string UserEmail { get; set; }
    }
}