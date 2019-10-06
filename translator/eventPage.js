var menuItem = {
    "id": "trans",
    "title": "Tłumacz",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem, function(){});

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, '}');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "trans" && clickData.selectionText) {
        var blablaUrl = 'https://pl.bab.la/slownik/angielski-polski/' + fixedEncodeURI(clickData.selectionText);
        var createData = {
            'url': blablaUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth/2,
            "height": screen.availHeight/2
        };
        chrome.windows.create(createData, function(){})
    }
})

