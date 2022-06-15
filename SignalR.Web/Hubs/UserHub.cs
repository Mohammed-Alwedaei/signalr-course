using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalPageView { get; set; } = 0;

        public static int TotalPageUsers { get; set; } = 0;

        public static DateTime LastUpdate { get; set; } = DateTime.Now;

        //To be called when the connection is established successfully 
        public override async Task OnConnectedAsync()
        {
            TotalPageUsers++;
            LastUpdate = DateTime.Now;

            await Clients.All.SendAsync("updatePageUsers", TotalPageUsers, LastUpdate);
        }

        //Will be called when the connection is disconnected
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            TotalPageUsers--;
            LastUpdate = DateTime.Now;

            await Clients.All.SendAsync("updatePageUsers", TotalPageUsers, LastUpdate);
        }

        public async Task UpdatePageViews()
        {
            TotalPageView++;
            LastUpdate = DateTime.Now;

            //Send a request for the corresponding clients
            await Clients.All.SendAsync("updatePageViews", TotalPageView, LastUpdate);
        }
    }
}
