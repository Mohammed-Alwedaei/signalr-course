let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

//Create the connection
const connectionTenants = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/Tenants")
    .build();

//Add to a group
btn_gryffindor.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("JoinTenant", "Gryffindor");
});

btn_slytherin.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("JoinTenant", "Slytherin");
});

btn_hufflepuff.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("JoinTenant", "Hufflepuff");
});

btn_ravenclaw.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("JoinTenant", "Ravenclaw");
});


//Remove from a group
btn_un_gryffindor.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("LeaveTenant", "Gryffindor");
});

btn_un_slytherin.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("LeaveTenant", "Slytherin");
});

btn_un_hufflepuff.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("LeaveTenant", "Hufflepuff");
});

btn_un_ravenclaw.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("LeaveTenant", "Ravenclaw");
});

//Send notification for all members in single tenant
trigger_gryffindor.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("NotifyTenant", "Gryffindor");
});

trigger_slytherin.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("NotifyTenant", "Slytherin");
});

trigger_hufflepuff.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("NotifyTenant", "Hufflepuff");
});

trigger_ravenclaw.addEventListener("click", (event) => {
    event.preventDefault();

    connectionTenants.send("NotifyTenant", "Ravenclaw");
});


//Implement subscription
connectionTenants.on("tenantStatusChanged",
    (subscribedTenantsList, tenantName, hasSubscribed) => {

        if (hasSubscribed == true) {
            switch (tenantName) {
                case "Gryffindor":
                    subscribeToTenant(btn_gryffindor, btn_un_gryffindor);
                    break;

                case "Slytherin":
                    subscribeToTenant(btn_slytherin, btn_un_slytherin);
                    break;

                case "Hufflepuff":
                    subscribeToTenant(btn_hufflepuff, btn_un_hufflepuff);
                    break;

                case "Ravenclaw":
                    subscribeToTenant(btn_ravenclaw, btn_un_ravenclaw);
                    break;

                default:
                    break;
            }

            lbl_houseJoined.innerText = subscribedTenantsList;
            toastr.success(`you have subscribed to ${tenantName}`);
        } else {
            switch (tenantName) {
                case "Gryffindor":
                    subscribeFromTenant(btn_gryffindor, btn_un_gryffindor);
                    break;

                case "Slytherin":
                    subscribeFromTenant(btn_slytherin, btn_un_slytherin);
                    break;

                case "Hufflepuff":
                    subscribeFromTenant(btn_hufflepuff, btn_un_hufflepuff);
                    break;

                case "Ravenclaw":
                    subscribeFromTenant(btn_ravenclaw, btn_un_ravenclaw);
                    break;

                default:
                    break;
            }
            lbl_houseJoined.innerText = subscribedTenantsList;
            toastr.success(`you have unsubscribed to ${tenantName}`);
        }

    });

connectionTenants.on("newMemberJoinedTenant",
    (tenantName, hasSubscriped) => {
        if (hasSubscriped === true) {
            toastr.success(`Someone has subscriped to ${tenantName}`);
        } else {
            toastr.success(`Someone has unsubscriped from ${tenantName}`);
        }
    });

connectionTenants.on("notifyTenantMembers",
    tenantName => {
        toastr.info(`Someone has sent a notification to ${tenantName}`);
    });


const subscribeToTenant = (subscribeBtn, unsubscribeBtn) => {
    subscribeBtn.style.display = "none";
    unsubscribeBtn.style.display = "";
}

const subscribeFromTenant = (subscribeBtn, unsubscribeBtn) => {
    subscribeBtn.style.display = "";
    unsubscribeBtn.style.display = "none";
}


const onRoleFulfill = () => { console.log("Connection has been established with role system (success)"); }

const onRoleReject = () => { console.log("Connection has not been established (rejected)"); }

//Establish the connection
connectionTenants.start().then(onRoleFulfill, onRoleReject);

