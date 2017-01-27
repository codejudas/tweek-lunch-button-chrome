console.log('Adding message listener');

chrome.gcm.onMessage.addListener(function (message) {
    console.log('Got message');
    chrome.browserAction.getBadgeText({}, function(result) {
        let val = parseInt(result) || 0
        val = val + 1;
        chrome.browserAction.setBadgeText({text: '' + val})
        chrome.browserAction.setBadgeBackgroundColor({color: '#36a64f'})
    });
    chrome.storage.local.get('menu', function(result) {
        let message = '';
        if (!result || !result['menu']) {
            message = 'Go and get it.';
        } else {
            message = "Today's meal is brought to you by " + result['menu'].vendor + ".";
        }
        var notification = new Notification('Lunch has arrived!', {
            icon: './icon.png',
            body: message
        });
    });
});
