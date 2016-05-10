var tabStr = [];
function r_DestroyTags(chaine) {
    if (chaine.indexOf('<') == -1 && chaine.indexOf('>') == -1) {
        return chaine.trim();
    }
    a = chaine.indexOf('>');
    newStr = chaine.slice(a+1, chaine.length);
    b = newStr.indexOf('<');
    if(newStr[0] != '<') {
        tabStr.push(newStr.slice(0, b));
        if (tabStr[tabStr.length-1] == "") {
            strFinale = "";
            for (var k=0; k < (tabStr.length-2);k++) {
                strFinale += tabStr[k];
            }
            tabStr = [];
            return r_DestroyTags(strFinale);
        } else {
            return r_DestroyTags(newStr);
        }
    } else {
        return r_DestroyTags(newStr);
    }
}

function inBkg_setBadgeNum() {
    if(localStorage.getItem("articles")) {
        var count = 0;
        var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
        for(var i = 0; i < json_tabArticles.length; i++) {
            if(json_tabArticles[i].show == true)
                count += 1;
        }
        if( count == 0 ){
            chrome.browserAction.setBadgeText({text: ""});
            chrome.browserAction.setIcon({path: "../images/button/ico_baseNoNews3.png"})
        } else {
            chrome.browserAction.setBadgeText({text: count.toString()});
            chrome.browserAction.setIcon({path: "../images/ico_rouge3.png"});
        }
    } else {
        var bagdeTime = setTimeout(function(){
            inBkg_setBadgeNum();
            clearTimeout(badgeTime);
        }, 150);
    }
}

function inBkg_comparaisonArticles(in_tab2d) {
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));

    for(var i = in_tab2d.length - 1; i >= 0 ; i--) {
        var found = false;
        for (var j = 0; j < json_tabArticles.length && !found; j++) {
            if (in_tab2d[i]["title"] == json_tabArticles[j]["title"])
                found = true;
        }
        if (found == false) {
            json_tabArticles.unshift(in_tab2d[i]);
            json_tabArticles.pop();
        } else {
            found = false;
        }
    }
    json_tabArticles = JSON.stringify(json_tabArticles);
    localStorage.setItem("articles", json_tabArticles);
}

function inBkg_prepareXML(ls_XML) {
    if (typeof ls_XML == "string") {
        var parser = new DOMParser();
        var doc = parser.parseFromString(ls_XML, "text/xml");
        return doc;
    } else {
        return 0;
    }
}

function inBkg_decoupeXML(ls_XML) {
    if(!typeof ls_XML == "string")
        return 0;
    else {
        var xmlReady = inBkg_prepareXML(ls_XML);
        var tabArticles = [];
        var tags = xmlReady.getElementsByTagName("item");
        for (var i = 0; i < tags.length; i++) {
            var title = tags[i].getElementsByTagName("title");
            title = title[0].childNodes[0].nodeValue;
            var link = tags[i].getElementsByTagName("link");
            link = link[0].childNodes[0].nodeValue;
            var description = tags[i].getElementsByTagName("description");
            description = r_DestroyTags(description[0].childNodes[0].nodeValue);
            tabArticles[i] = {
                "title": title,
                "link": link,
                "description": description,
                "show": true
            };
        }
        if(localStorage.getItem("articles"))
            inBkg_comparaisonArticles(tabArticles);
        else {
            var json_tabArticles = JSON.stringify(tabArticles);
            localStorage.setItem("articles", json_tabArticles);
        }
        inBkg_setBadgeNum();
    }
}

function inLS_comparaisonXML() {
    if(localStorage.getItem("pf_originXML") === localStorage.getItem("pf_newestXML"))
    {
        inBkg_setBadgeNum();
        return 0;
    }

    else {
        inBkg_decoupeXML(localStorage.getItem("pf_newestXML"));
        localStorage.setItem("pf_originXML", localStorage.getItem("pf_newestXML"));
    }
}

function inBkg_getXML(url) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange=function() {
        if (xhr.readyState==4 && xhr.status==200) {

            if(!localStorage.getItem("pf_originXML")) {
                localStorage.setItem("pf_originXML", xhr.responseText);
                inBkg_decoupeXML(localStorage.getItem("pf_originXML"));
            } else {
                localStorage.setItem("pf_newestXML", xhr.responseText);
                inLS_comparaisonXML();
            }
        }
    }
    xhr.open("GET", url + "?nocache="+ Math.random()); //oblige a afficher un xhr qui n'est pas en cache
    xhr.send();
}

localStorage.clear();

inBkg_getXML('http://lafabriqueainnovations.com/rss.xml');

var debugI = setInterval(function(){
    inBkg_getXML('http://lafabriqueainnovations.com/rss.xml');
}, 3600000);
