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
    //(function () {
        var bkg = browser.extension.getBackgroundPage();
        bkg.inBkg_setBadgeNum();
    //})();

    var reload = setTimeout(function(){
        window.location.reload();
        clearTimeout(reload);
    },100);
}

if(document.querySelector("div1 a"))
{
    var hideDiv1 = document.querySelector("div1 a");
    hideDiv1.addEventListener("click", function(e){
        hideDiv(0);
    }, false);
}

if(document.querySelector("div2 a"))
{
    var hideDiv2 = document.querySelector("div2 a");
    hideDiv2.addEventListener("click", function(e){
        hideDiv(1);
    }, false);
}

if(document.querySelector("div3 a"))
{
    var hideDiv3 = document.querySelector("div3 a");
    hideDiv3.addEventListener("click", function(e){
        hideDiv(2);
    }, false);
}

if(!document.querySelector("div1 a") && !document.querySelector("div2 a") && !document.querySelector("div3 a"))
{
    var getExistDiv = document.querySelector("#Contenu");
    var noNews = "<div class='article'><h1 class='titre'>Pas de nouvelles. Revenez plus tard !</h1></div>";
    getExistDiv.innerHTML = noNews;
}
