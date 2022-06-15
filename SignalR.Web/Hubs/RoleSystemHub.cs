using Microsoft.AspNetCore.SignalR;
using SignalR.Web.SD;
namespace SignalR.Web.Hubs
{
    public class RoleSystemHub : Hub
    {
        public Dictionary<string, int> GetRolesInWorld()
        {

            return Roles.RoleInWorld;
        }
    }
}
