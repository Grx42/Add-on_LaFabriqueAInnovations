function parseXML()
{
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    for(var i = 0; i < json_tabArticles.length; i++)
    {
        getExistDiv = document.querySelector("#Contenu");
        var dynDiv = "div" + (i+1);
        createDivAuto = document.createElement(dynDiv);
        createDivArticle = document.createElement('div');
        createDivArticle.setAttribute("class", "article");

        if(json_tabArticles[i].show == false)
        {
            getExistDiv.appendChild(createDivAuto);
            continue;
        }
        else
        {
            var createLink = document.createElement("a");
            var dynLink = json_tabArticles[i].link;
            createLink.setAttribute("href", dynLink);
            createLink.setAttribute("class", "lien");
            createLink.setAttribute("target", "_blank");
            createLink.appendChild(createDivArticle);
            createDivAuto.appendChild(createLink);
            getExistDiv.appendChild(createDivAuto);

            var createTitle = document.createElement("h1");
            createTitle.setAttribute("class", "titre");
            var createTextNode = document.createTextNode(json_tabArticles[i].title);
            createTitle.appendChild(createTextNode);
            createDivArticle.appendChild(createTitle);

            strDesc = json_tabArticles[i].description;
            var createPara = document.createElement("p");
            createPara.setAttribute("class", "paragraphe");
            var setAtt_id = "innerP"+(i+1);
            createPara.setAttribute("id", setAtt_id);
            createDivArticle.appendChild(createPara);
            var queSel_id = "#innerP"+(i+1);
            var target = document.querySelector(queSel_id);
            target.innerHTML += strDesc;
        }
    }
}

parseXML();


function hideDiv(divID)
{
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    json_tabArticles[divID].show = false;
    json_tabArticles = JSON.stringify(json_tabArticles);
    localStorage.setItem("articles", json_tabArticles);
    /*browser.extension.getBackgroundPage(
        function(bkg) {
            //bkg.inBkg_setBadgeNum();
        }
    );*/
    (function () {
        var bkg = chrome.extension.getBackgroundPage();
        bkg.inBkg_setBadgeNum();
    })();

    var reload = setTimeout(function(){
        window.location.reload();
        clearTimeout(reload);
    }, 100);
}

function lalala(divID)
{
    //e.preventDefault();
    var json_tabArticles = JSON.parse(localStorage.getItem("articles"));
    var linkTarget = json_tabArticles[divID].link;
    //chrome.tabs.create({url: linkTarget}, active: false);
    hideDiv(divID);
}

if(document.querySelector("div1 a"))
{
    var hideDiv1 = document.querySelector("div1 a");
    hideDiv1.addEventListener("click", function(e){
        //e.preventDefault();
        //console.log("TEST PUTAIN:M:PNJPOHJPHHGIL000");
        hideDiv(0);
        var json_tabArticles1 = JSON.parse(localStorage.getItem("articles"));
        var linkTarget1 = json_tabArticles1[0].link;
        chrome.tabs.create({url: linkTarget1, active: false});
        //lalala(0);
    }, true);
    hideDiv1.addEventListener("click", function(e){
        e.preventDefault();
    }, false);
}

if(document.querySelector("div2 a"))
{
    var hideDiv2 = document.querySelector("div2 a");
    hideDiv2.addEventListener("click", function(e){
        //e.preventDefault();
        //console.log("TEST PUTAIN:M:PNJPOHJPHHGIL111");
        hideDiv(1);
        var json_tabArticles2 = JSON.parse(localStorage.getItem("articles"));
        var linkTarget2 = json_tabArticles2[1].link;
        chrome.tabs.create({url: linkTarget2, active: false});
        //lalala(1);
    }, true);
    hideDiv2.addEventListener("click", function(e){
        e.preventDefault();
    }, false);
}

if(document.querySelector("div3 a"))
{
    var hideDiv3 = document.querySelector("div3 a");
    hideDiv3.addEventListener("click", function(e){
        //e.preventDefault();
        //console.log("TEST PUTAIN:M:PNJPOHJPHHGIL222");
        hideDiv(2);
        var json_tabArticles3 = JSON.parse(localStorage.getItem("articles"));
        var linkTarget3 = json_tabArticles3[2].link;
        chrome.tabs.create({url: linkTarget3, active: false});
        //lalala(2);
    }, true);
    hideDiv3.addEventListener("click", function(e){
        e.preventDefault();
    }, false);
}

if(!document.querySelector("div1 a") && !document.querySelector("div2 a") && !document.querySelector("div3 a"))
{
    var getExistDiv = document.querySelector("#Contenu");
    var noNews = "<div class='article'><h1 class='titre'>Pas de nouvelles. Revenez plus tard !</h1></div>";
    getExistDiv.innerHTML = noNews;
}


/*
    je veux empecher le click sur le lien d'ouvrir ce lien.
    a la place ca ouvre un nouvel onglet avec chrome.tabs.create({url: 'http://www.google.com'});

*/
