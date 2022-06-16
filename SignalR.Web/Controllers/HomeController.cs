using Microsoft.AspNetCore.Mvc;
using SignalR.Web.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using SignalR.Web.Hubs;
using SignalR.Web.SD;

namespace SignalR.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<RoleSystemHub> _hubContext;

        public HomeController(ILogger<HomeController> logger, IHubContext<RoleSystemHub> hubContext)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task<IActionResult> RoleSystem(string role)
        {

            if (Roles.RoleInWorld.ContainsKey(role))
            {
                Roles.RoleInWorld[role]++;
            }

            await _hubContext.Clients.All.SendAsync("updateRoleSystem",
                 Roles.RoleInWorld[Roles.Marine],
                 Roles.RoleInWorld[Roles.Pirate],
                 Roles.RoleInWorld[Roles.Government]);

            return Accepted();
        }

        public ActionResult RoleManager()
        {
            return View();
        }

        #region Groups

        public ActionResult Tenants()
        {
            return View();
        }

        #endregion

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}