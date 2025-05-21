using DemoChartProject.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DemoChartProject.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserChartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserChartController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("user-registrations")]
        public IActionResult GetUserRegistrations()
        {
            try
            {
                var data = _context.Users
       .GroupBy(u => u.CreatedDT.Date)
       .Select(g => new
       {
           Date = g.Key,        // Keep it as DateTime
           Count = g.Count()
       })
       .OrderBy(x => x.Date)
       .AsEnumerable()         // Switch to in-memory (LINQ to Objects)
       .Select(x => new
       {
           Date = x.Date.ToString("yyyy-MM-dd"),  // Now it's safe
           x.Count
       })
       .ToList();

                return Ok(data);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            //     try
            //     {
            //         var data = _context.Users
            //.GroupBy(u => u.RoleId)
            //.Select(g => new
            //{
            //    RoleId = g.Key,        // Keep it as DateTime
            //    Count = g.Count()
            //})
            //.OrderBy(x => x.RoleId)
            //.AsEnumerable()         // Switch to in-memory (LINQ to Objects)
            //.Select(x => new
            //{
            //    RoleId = x.RoleId.ToString(),  // Now it's safe
            //    x.Count
            //})
            //.ToList();

            //         return Ok(data);
            //     }
            //     catch (Exception ex)
            //     {

            //         throw ex;
            //     }

        }
    }
}
