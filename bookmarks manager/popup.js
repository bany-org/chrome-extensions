$(function(){

    // $("input:text:visible:first").focus();

    var localId;
    var token;

    chrome.storage.sync.get(['idToken', "localId", "email"], function(items) {
        if (items.idToken && items.localId) {
            token = items.idToken;
            localId = items.localId;
            $("#user").text(items.email)
            $('.footer').show();
            $('.content').show();
            $('#loginForm').hide();
        } 
    });

    $('#logoutButton').click(function(){
        chrome.storage.sync.clear(function(){
            $("#user").text("")
            $('.footer').hide();
            $('.content').hide();
            $('#loginForm').show();
        })
    });

    $('#loginSubmit').click(function(){

        const email = $("#loginEmail").val();
        const pass = $("#loginPassword").val()

        $.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBkdtXbDhdwf1I6ojhmqHt97tDzFVmicHM",
        {
            email: email,
            password: pass,
            returnSecureToken: true
        },
        function(response, status){
            chrome.storage.sync.set({"idToken": response.idToken, "localId": response.localId, "email": response.email}, function() {
                token = response.idToken;
                localId = response.localId;
                $("#user").text(response.email)
                $('.footer').show();
                $('.content').show();
                $('#loginForm').hide();
            });
        });
    });

    $('#saveButton').click(function(){
        var tablink;
        var name1 = $("#linkName").val();
        var desc1 = $("#linkDescription").val();
        var descCheckbox1 = $("#musicCheckbox").is(':checked') ? $("#musicCheckbox").val() : '';
        var descCheckbox2 = $("#programyCheckbox").is(':checked') ? $("#programyCheckbox").val() : '';
        var descCheckbox3 = $("#projektyCheckbox").is(':checked') ? $("#projektyCheckbox").val() : '';

        if(name1 !== '' && desc1 !== '') {
            chrome.tabs.query({'active': true}, function(tab) {
                tablink = (tab[0].url)
                const data =  {
                    "name": name1,
                    "link": tablink,
                    "description": descCheckbox1 + ' ' + descCheckbox2  + ' ' + descCheckbox3 + ' ' + desc1,
                }
        
                $.post('https://bookmarks-online-c04b8.firebaseio.com/'+ localId +'/links.json?auth=' + token,
                    JSON.stringify(data),
                    function(response, status){
                        alert("resp:" + response + "status" + status);
                        $("#linkName").val('');
                        $("#linkDescription").val('');
                        window.close();
                        // chrome.storage.sync.set({"idToken": response.idToken, "localId": response.localId, "email": response.email}, function() {
                        //     $("#user").text(response.email)
                        //     $('#logoutButton').show();
                        //     $('#loginForm').hide();
                    
                });
            });
        } else {
            alert('brak danych')
        }
    });
});