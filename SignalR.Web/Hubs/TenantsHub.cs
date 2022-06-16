using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class TenantsHub : Hub
    {

        public static List<string> JoinedTenants { get; set; } = new List<string>();


        public async Task JoinTenant(string tenant)
        {
            var key = $"{Context.ConnectionId}:{tenant}";

            if (!JoinedTenants.Contains(key))
            {
                JoinedTenants.Add(key);

                string tenantList = "";

                foreach (var tenantInList in JoinedTenants)
                {
                    if (tenantInList.Contains(Context.ConnectionId))
                    {
                        tenantList += tenantInList.Split(":")[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("tenantStatusChanged", tenantList, tenant, true);

                await Clients.Others.SendAsync("newMemberJoinedTenant", tenant, true);

                await Groups.AddToGroupAsync(Context.ConnectionId, tenant);
            }
        }

        public async Task LeaveTenant(string tenant)
        {
            var key = $"{Context.ConnectionId}:{tenant}";

            if (JoinedTenants.Contains(key))
            {
                JoinedTenants.Remove(key);

                string tenantList = "";

                foreach (var tenantInList in JoinedTenants)
                {
                    if (tenantInList.Contains(Context.ConnectionId))
                    {
                        tenantList += tenantInList.Split(":")[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("tenantStatusChanged", tenantList, tenant, false);

                await Clients.Others.SendAsync("newMemberJoinedTenant", tenant, false);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, tenant);
            }
        }

        public async Task NotifyTenant(string tenant)
        {
            await Clients.Group(tenant).SendAsync("notifyTenantMembers", tenant);
        }
    }
}
