var reposPath = "https://api.github.com/repos/JamesTheButler";
var projectsPath = "/PortfolioData/contents/";

var startWithEven = 0;

// generate a project element
function CreateProjectHtml(projectName, IsEven) {
  var projectPath =
    reposPath + projectsPath + "projects/" + projectName + ".json";
  console.log(projectPath);

  // pull and base64 decode the content-tag in the projects.json file from github
  var projectJsonContent = JSON.parse(
    atob(JSON.parse(HttpGet(projectPath)).content)
  );
  console.log(projectJsonContent);

  if (IsEven)
    var projectElementTemplate = document.getElementById("TemplateProjectEven");
  else
    var projectElementTemplate = document.getElementById("TemplateProjectOdd");

  var projectElement = projectElementTemplate.content.cloneNode(true);

  projectElement.querySelector("#project_name").textContent =
    projectJsonContent.project_name;
  //GenerateTagItems_String(contentObject, mainDivClone);
  GenerateTagItems_SOF_Style(projectJsonContent, projectElement);
  projectElement.querySelector("#project_description").textContent =
    projectJsonContent.project_description;
  projectElement.querySelector("#repo-image").src =
    projectJsonContent.image_uri;

  GenerateLinkButtons(projectJsonContent, projectElement);
  document.getElementById("repo-content").appendChild(projectElement);
}

// generate tag items in the style of stack overflow
function GenerateTagItems_SOF_Style(contentObject, mainDivClone) {
  var tagTemplate = document.getElementById("TemplateTag");
  for (var i = 0; i < contentObject.tags.length; i++) {
    var tagClone = tagTemplate.content.cloneNode(true);
    tagClone.querySelector("#tag_name").textContent =
      contentObject.tags[i].tag_name;
    mainDivClone.querySelector(".tag-list").appendChild(tagClone);
  }
}

// generate html code for link buttons
function GenerateLinkButtons(contentObject, mainDivClone) {
  var linkButtonTemplate = document.getElementById("TemplateRepoLink");
  for (var key in contentObject.links) {
    var linkButtonClone = linkButtonTemplate.content.cloneNode(true);
    linkButtonClone.querySelector(".link-button").href =
      contentObject.links[key].link_href;
    linkButtonClone.querySelector(".link-button").textContent =
      contentObject.links[key].link_name;
    // add link to main div
    mainDivClone.querySelector(".link-buttons").appendChild(linkButtonClone);
  }
}

// generate html from the projects.json file
function GenerateProjectsHtml(projectJson) {
  var projectNames = projectJson.projects;
  for (var i = 0; i < projectNames.length; i++) {
    console.log("loading " + projectNames[i] + "...");
    CreateProjectHtml(projectNames[i], (i + startWithEven) % 2 == 0);
  }
}

function HttpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function UpdateDescription(descriptionJson) {
  
  var descriptionParagraph = document.querySelector('.desc-about');
  descriptionParagraph.textContent = descriptionJson.content;
}

function LoadDescription() {
  var descriptionJsonFile = HttpGet(reposPath + projectsPath + "description.json");
  // base64 decode the content-tag in the description.json file from github
  var decodedDescriptionJsonContent = atob(JSON.parse(descriptionJsonFile).content);
  var descriptionJsonContent = JSON.parse(decodedDescriptionJsonContent);
  UpdateDescription(descriptionJsonContent);
}

function LoadProjects() {
  var projectsJsonFile = HttpGet(reposPath + projectsPath + "projectsGP.json");
  // base64 decode the content-tag in the projects.json file from github
  var decodedJsonContent = atob(JSON.parse(projectsJsonFile).content);
  var projectJsonContent = JSON.parse(decodedJsonContent);
  // generate project elements with the parsed content-string
  GenerateProjectsHtml(projectJsonContent);
}

$(document).ready(function () {
  LoadDescription();
  LoadProjects();
});
