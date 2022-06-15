//Create the connection
const connectionBuilder = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/UserCount")
    .build();

//Make a call the hub
connectionBuilder.on("updatePageViews",
    (count, date) => {

        document.querySelector("#display-live-count").innerText = count.toString();
        document.querySelector("#display-live-count-date").innerText = formatDate(date);
    });

connectionBuilder.on("updatePageUsers",
    (count, date) => {
        document.querySelector("#display-live-users-count").innerText = count.toString();
        document.querySelector("#display-live-users-count-date").innerText = formatDate(date);
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

const formatDate = (date) => {

    const parsedDate = new Date(Date.parse(date));

    return `${parsedDate}`;
}

//Establish the connection
connectionBuilder.start().then(onFulfill, onReject);

