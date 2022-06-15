//Create the connection
const connectionBuilder = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/UserCount")
    .build();

//Make a call the hub
connectionBuilder.on("updatePageViews",
    value => {
        document.querySelector("#display-live-count").innerText = value.toString();
    });

connectionBuilder.on("updatePageUsers",
    value => {
        document.querySelector("#display-live-users-count").innerText = value.toString();
    });

//Send the client data to the hub
const onNewPageLoad = () => {
    connectionBuilder.send("UpdatePageViews");
    connectionBuilder.send("UpdatePageUsers");
}

const onFulfill = () => {
    console.log("Connection has been established (success)");

    //Update page count

    onNewPageLoad();
}

const onReject = () => {
    console.log("Connection has not been established (rejected)");
}

//Establish the connection
connectionBuilder.start().then(onFulfill, onReject);

