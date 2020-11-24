var reposPath = "https://api.github.com/repos/JamesTheButler"
//"contents/githubio.json"

var projectsPath = "/JamesTheButler.github.io/contents/data/projects.json"

var startWithEven = 0;

function CreateProjectHtml(contentObject, IsEven) {
    if (IsEven)
        var projectElementTemplate = document.getElementById("TemplateProjectEven");
    else
        var projectElementTemplate = document.getElementById("TemplateProjectOdd");

    var projectElement = projectElementTemplate.content.cloneNode(true);

    projectElement.querySelector("#project_name").textContent = contentObject.project_name;
    //GenerateTagItems_String(contentObject, mainDivClone);
    GenerateTagItems_SOF_Style(contentObject, projectElement);
    //console.log("1" + projectElement)
    projectElement.querySelector("#project_description").textContent = contentObject.project_description;
    projectElement.querySelector("#repo-image").src = contentObject.image_uri;
    //console.log("2" + projectElement)

    GenerateLinkButtons(contentObject, projectElement);
    document.getElementById("repo-content").appendChild(projectElement);
}

// generate tag items
function GenerateTagItems_String(contentObject, mainDivClone) {
    var tagsString = contentObject.tags[0].tag_name;
    for (var i = 1; i < contentObject.tags.length; i++) {
        tagsString += ", " + contentObject.tags[i].tag_name;
    }
    //console.log(mainDivClone)
    mainDivClone.querySelector("#project_tags").textContent = tagsString;
}

function GenerateTagItems_SOF_Style(contentObject, mainDivClone) {
    var tagTemplate = document.getElementById("TemplateTag");
    for (var i = 0; i < contentObject.tags.length; i++) {
        var tagClone = tagTemplate.content.cloneNode(true);
        tagClone.querySelector("#tag_name").textContent = contentObject.tags[i].tag_name;
        mainDivClone.querySelector(".tag-list").appendChild(tagClone);
    }
}

// generate html code for link buttons
function GenerateLinkButtons(contentObject, mainDivClone) {
    var linkButtonTemplate = document.getElementById("TemplateRepoLink")
    for (var key in contentObject.links) {
        var linkButtonClone = linkButtonTemplate.content.cloneNode(true);
        linkButtonClone.querySelector(".link-button").href = contentObject.links[key].link_href;
        linkButtonClone.querySelector(".link-button").textContent = contentObject.links[key].link_name;
        // add link to main div
        mainDivClone.querySelector(".link-buttons").appendChild(linkButtonClone);
    }
}

// generate html from the projects.json file 
function GenerateProjectsHtml(projectJson) {
    var projects = projectJson.projects
    for (var i = 0; i < projects.length; i++) {
        console.log("------\n" + projects[i].project_name + "\n")
        CreateProjectHtml(projects[i], (i + startWithEven) % 2 == 0)
    }
}

function HttpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", theUrl, false) // false for synchronous request
    xmlHttp.send(null)
    return xmlHttp.responseText
}


$(document).ready(function() {
    var projectsJsonFile = HttpGet(reposPath + projectsPath)
        // base64 decode the content-tag in the projects.json file from github
    var projectJsonContent = atob(JSON.parse(projectsJsonFile).content)
        // generate project elements with the parsed content-string
    GenerateProjectsHtml(JSON.parse(projectJsonContent))
})