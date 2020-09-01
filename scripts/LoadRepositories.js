var userName = "JamesTheButler"

function createRepoContent(contentObject) {
    var mainDivTemplate = document.getElementsByTagName("template")[0]
        var mainDivClone = mainDivTemplate.content.cloneNode(true);

    mainDivClone.querySelector("h4#project_name").textContent = contentObject.name
        mainDivClone.querySelector("p#project_tags").textContent = contentObject.tags
        mainDivClone.querySelector("p#project_description").textContent = contentObject.desc
        mainDivClone.querySelector("img#repo-image").src = contentObject.img_url
        //mainDivClone.querySeletor("div#tags").textContent = contentObject.tags

        var linkButtonTemplate = document.getElementsByTagName("template")[1]

        for (var key in contentObject.links) {
            var linkButtonClone = linkButtonTemplate.content.cloneNode(true);
            linkButtonClone.querySelector("a#link-button").href = contentObject.links[key].href_link
                linkButtonClone.querySelector("a#link-button").textContent = contentObject.links[key].href_name

                mainDivClone.querySelector("div#link-buttons").appendChild(linkButtonClone)
        }
        document.getElementById("repo-content").appendChild(mainDivClone)
}

function loadRepoContent() {
    // get all public repos
    var allRepos = JSON.parse(httpGet("https://api.github.com/users/" + userName + "/repos"))

        // read data
        var repoDict = {}
    for (var i = 0; i < allRepos.length; i++) {
        // find urls
        var apiUrl = allRepos[i].url
            var htmlUrl = allRepos[i].html_url
            // find githubio.json
            var githubioJsonData = JSON.parse(httpGet(apiUrl + "/contents/githubio.json"))

            if (githubioJsonData.message != "Not Found") {
                $('#RepoInfo').append(allRepos[i].url + "<br>" + atob(githubioJsonData.content) + "<br>------<br>")
                // read actual content of githubio.json
                console.log("parsing " + allRepos[i].url + "+...")
                var githubioContent = JSON.parse(atob(githubioJsonData.content))

                    if (!(githubioContent.project_id in repoDict)) {
                        repoDict[githubioContent.project_id] = {
                            name: "",
                            desc: "",
                            img_url: "",
                            tags: "",
                            links: []
                        }
                    }
                    // main project
                    if ("project_name" in githubioContent) {
                        repoDict[githubioContent.project_id].name = githubioContent.project_name
                            repoDict[githubioContent.project_id].desc = githubioContent.project_description
                            // set up image url
                            var url = htmlUrl + "/blob/master/" + githubioContent.image_uri + "?raw=true"
                            console.log(url)
                            repoDict[githubioContent.project_id].img_url = url
                            // set up tags
                            repoDict[githubioContent.project_id].tags = githubioContent.tags
                            repoDict[githubioContent.project_id].links.push({
                            href_link: htmlUrl,
                            href_name: githubioContent.href_name
                        })
                    } // secondary project
                    else {
                        repoDict[githubioContent.project_id].links.push({
                            href_link: htmlUrl,
                            href_name: githubioContent.href_name
                        })
                    }
            } else {
                console.log("Project has no githubio.json in root directory on master branch: " + htmlUrl)
            }
            //result += allRepos[i].html_url + "\n"
    }

    // output collected data
    console.log("repos\n")
    for (var key in repoDict) {
        createRepoContent(repoDict[key])
    }
}

$(document).ready(function () {
    loadRepoContent()
    //loadRepoContentAsync()
})

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", theUrl, false) // false for synchronous request
        xmlHttp.send(null)
        return xmlHttp.responseText
}
