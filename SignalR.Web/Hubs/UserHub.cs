using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalPageView { get; set; } = 0;
        public static int TotalPageUsers { get; set; } = 0;

        //To be called when the connection is established successfully 
        public override async Task OnConnectedAsync()
        {
            TotalPageUsers++;
            await Clients.All.SendAsync("updatePageUsers", TotalPageUsers);
        }

        //Will be called when the connection is disconnected
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            TotalPageUsers--;
            await Clients.All.SendAsync("updatePageUsers", TotalPageUsers);
        }

        public async Task UpdatePageViews()
        {
            TotalPageView++;

            //Send a request for the corresponding clients
            await Clients.All.SendAsync("updatePageViews", TotalPageView);
        }
    }
}
