//Create the connection
const connectionRoleSystem = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/RoleSystem")
    .build();

//Make a call the hub
connectionRoleSystem.on("updateRoleSystem",
    (marine, pirate, government) => {
        document.querySelector("#display-marine").innerText = marine.toString();
        document.querySelector("#display-pirate").innerText = pirate.toString();
        document.querySelector("#display-government").innerText = government.toString();
    });


const onRoleFulfill = () => {
    console.log("Connection has been established with role system (success)");

    connectionRoleSystem.invoke("GetRolesInWorld").then( (role) => {
        document.querySelector("#display-marine").innerText = role.marine.toString();
        document.querySelector("#display-pirate").innerText = role.pirate.toString();
        document.querySelector("#display-government").innerText = role.government.toString();
    });
}

const onRoleReject = () => { console.log("Connection has not been established (rejected)"); }

//Establish the connection
connectionRoleSystem.start().then(onRoleFulfill, onRoleReject);

