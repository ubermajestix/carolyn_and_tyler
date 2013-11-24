var browserName, browserVersion, webfontType;
var browsers = [{
    'regex': 'MSIE (\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 9.0,
        "type": "woff"
    }, {
        "version": 5.0,
        "type": "eot"
    }]
}, {
    'regex': 'Trident\/(\\d+\\.\\d+); (.+)?rv:(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$3)',
    'type': [{
        "version": 11.0,
        "type": "woff"
    }]
}, {
    'regex': 'Firefox[\/\s](\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 3.6,
        "type": "woff"
    }, {
        "version": 3.5,
        "type": "ttf"
    }]
}, {
    'regex': 'Chrome\/(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 6.0,
        "type": "woff"
    }, {
        "version": 4.0,
        "type": "ttf"
    }]
}, {
    'regex': 'Mozilla.*Android (\\d+\\.\\d+).*AppleWebKit.*Safari',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 4.1,
        "type": "woff"
    }, {
        "version": 3.1,
        "type": "svg#wf"
    }, {
        "version": 2.2,
        "type": "ttf"
    }]
}, {
    'regex': 'Mozilla.*(iPhone|iPad).* OS (\\d+)_(\\d+).* AppleWebKit.*Safari',
    'versionRegex': "new Number(RegExp.$2) + (new Number(RegExp.$3) / 10)",
    "unhinted": true,
    'type': [{
        "version": 5.0,
        "type": "woff"
    }, {
        "version": 4.2,
        "type": "ttf"
    }, {
        "version": 1.0,
        "type": "svg#wf"
    }]
}, {
    'regex': 'Mozilla.*(iPhone|iPad|BlackBerry).*AppleWebKit.*Safari',
    'versionRegex': '1.0',
    'type': [{
        "version": 1.0,
        "type": "svg#wf"
    }]
}, {
    'regex': 'Version\/(\\d+\\.\\d+)(\\.\\d+)? Safari\/(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 5.1,
        "type": "woff"
    }, {
        "version": 3.1,
        "type": "ttf"
    }]
}, {
    'regex': 'Opera\/(\\d+\\.\\d+)(\.+)Version\/(\\d+\\.\\d+)(\\.\\d+)?',
    'versionRegex': 'new Number(RegExp.$3)',
    'type': [{
        "version": 11.1,
        "type": "woff"
    }, {
        "version": 10.1,
        "type": "ttf"
    }]
}]
var browLen = browsers.length;
var unhinted = 0;
out: for (i = 0; i < browLen; i++) {
    var regex = new RegExp(browsers[i].regex);
    if (regex.test(navigator.userAgent)) {
        browserVersion = eval(browsers[i].versionRegex);
        var typeLen = browsers[i].type.length;
        for (j = 0; j < typeLen; j++) {
            if (browserVersion >= browsers[i].type[j].version) {
                if (browsers[i].unhinted == true) {
                    unhinted = 1;
                }
                webfontType = browsers[i].type[j].type;
                if (webfontType == "svg#wf") {
                    continue;
                } else {
                    break out;
                }
            }
        }
    } else {
        webfontType = 'woff';
    }
}
if (/(Macintosh|Android)/.test(navigator.userAgent)) {
    unhinted = 1;
}
