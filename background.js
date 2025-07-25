var storage = chrome.storage.local; // the storage where data is saved.
var state, links, time, totalSeconds; // local vars that hold storage values

setDefault();
setInterval(setTime, 1000);
setInterval(checkSite, 500);

/*
 * Function: blockSite();
 * Description: It will update the active tab with the HTML page showing that
 * the page is blocked.
 */
function blockSite() 
{


    const blockedUrl = chrome.runtime.getURL("blockedSite.html");
    chrome.tabs.update({url: blockedUrl});

}

/*
 * Function: setDefault();
 * Description: It will set the array to block major social media websites and
 * it will save it into the local storage.
 */
function setDefault() 
{
    console.log("Set the default");
    storage.set({"links": ['https://www.blue-whale.com/game/']});
    storage.set({"time": 0});
    storage.set({"distractions": 0});
}


/*
 * Function: setTime();
 * Description: It will take the data from the local storage and increase
 * the number of seconds by 1. And set the final number into the local
 * storage. This will be called every time a second is passed.
 */
function setTime()
{

    chrome.storage.local.get(["state","time"], function(data)
    {
        // Gets data from the local storage
        state = data.state;
	    totalSeconds = data.time;

        // if not active productive session, then reset the session.
        if(!state) 
        {
            totalSeconds = 0;
            return;
        }
        totalSeconds++;

        storage.set({"time" : totalSeconds});

    });
}

/*
 * Function: checkSite()
 * Description: It takes in the current tab and checks if its in the list
 * of blocked websites. If it is not part of the list, then it does nothing
 * and returns. If it is, then we redirect the user to the blockedSite.html.
 */
function checkSite() 
{
    chrome.storage.local.get(["state","links","distractions"], function(data) 
    {

        // Gets the data from the local storage
        state = data.state;
        links = data.links;
        distractions = data.distractions;
        // If not active productive session, then continue as normal.
        if(!state) return;

        chrome.tabs.query({active:true, lastFocusedWindow: true}, tabs => 
        {
        if (tabs.length == 0) return;
        let url = tabs[0].url;
        if (url.includes("blockedSite.html")) 
        return;
            // checks every entry for a blocked URL.
            for(index=0; index< links.length; index++) 
            {

                // check if there is a URL and if it should be blocked
                if (url && url.includes(links[index])) 
                {
                    // This link shows when wanting to add a link to the blocked list
                    if (url.includes("settings.html?add_link=" + links[index])) return;

                    // This will update the tab to not go to the blocked URL.
                    blockSite();
                    const ifttt=require("ifttt");
                    const webhooks = ifttt.webhooks('bVvj2XYKrzSW_radkFVCsSJ6WuwPpUOZTotS76SUJ4m');
                    webhooks.trigger('block bluewhale game content', {
                        value1: 'Your child tried to access a blocked website: https://' + details.url + '.'
                    }, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                        }
                    });
                    chrome.tabs.sendMessage(tabs[0].id, {
                        message: "sendSMS"
                    });
                    return;
                }
            }
        });
    })
}
