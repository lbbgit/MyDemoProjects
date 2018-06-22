using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using LoginPage.Models;
namespace LoginPage.Controllers
{
    public class RegisterController : Controller
    {
        //
        // GET: /Login/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Register(UserRegister model)
        {
            using (LoginDbContext db = new LoginDbContext())
           {
               if (db.UserRegisters.Where(a => (a.UserName == model.UserName)).Count() > 0) {

                   return Json(new { result = "error", content = "注册失败，用户名已经存在" });
               }
               if (db.UserRegisters.Where(a => a.UserEmail == model.UserEmail).Count() > 0)
               {
                   return Json(new { result="error", content="注册失败，邮箱已经存在"});
               }
               db.UserRegisters.Add(model);
               db.SaveChanges();
               return Json(new { result="success",content="注册成功 欢迎你："+model.UserName});
            }
        }
        public string ValidateUser(string userName)
        {
            using(LoginDbContext db=new LoginDbContext())
            {
                //如果当前用户名 已经存在 返回false
            if (db.UserRegisters.Where(a=>a.UserName==userName ).Count()>0)
            {
                return "false";
            }
            else
            {
                return "ok";
            }
            }
        }
    }
}
