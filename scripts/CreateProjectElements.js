const reposPath = "https://api.github.com/repos/JamesTheButler";
const projectsPath = "/PortfolioData/contents/";

var startWithEven = 0;


async function HttpGet(url) {
  const timeoutMs = 2000;

  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs)
  );

  const response = await Promise.race([fetchPromise, timeoutPromise]);

  if (!response.ok){
    var error = new Error(`Failed to fetch ${url}`);
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

async function DownoadJson(url) {
  var projectsJsonFile = await HttpGet(url);
  return JSON.parse(atob(projectsJsonFile.content));
}

// generate a project element
async function CreateProjectHtml(projectName, IsEven) {
  const projectPath = reposPath + projectsPath + "projects/" + projectName + ".json";
  console.log("project data path: " + projectPath);
  var projectJsonContent = await DownoadJson(projectPath);
  console.log("project data json: " + projectJsonContent);

  var templateId = IsEven ? "TemplateProjectEven" : "TemplateProjectOdd";
  var projectElementTemplate = document.getElementById(templateId);
  var projectElement = projectElementTemplate.content.cloneNode(true);

  projectElement.querySelector("#project_name").textContent = projectJsonContent.project_name;
  GenerateTagItems_SOF_Style(projectJsonContent, projectElement);
  projectElement.querySelector("#project_description").textContent = projectJsonContent.project_description;
  projectElement.querySelector("#repo-image").src = projectJsonContent.image_uri;

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


async function LoadProjects() {
  var projectMetaPath = reposPath + projectsPath + "projectsGP.json";
  var projectMetaJso = await DownoadJson(projectMetaPath);
  await GenerateProjectsHtml(projectMetaJso);
}

async function GenerateProjectsHtml(projectJson) {
  var projectNames = projectJson.projects;
  for (var i = 0; i < projectNames.length; i++) {
    console.log("loading " + projectNames[i] + "...");
    await CreateProjectHtml(projectNames[i], (i + startWithEven) % 2 == 0);
  }
}

async function LoadDescription() {
  const descriptionDataPath = reposPath + projectsPath + "description.json";
  var descriptionDataJson = await DownoadJson(descriptionDataPath);
  UpdateDescription(descriptionDataJson);
}

function UpdateDescription(descriptionJson) {
  document.querySelector('.data-limit-error').style.display = "none";

  var descriptionParagraph = document.querySelector('.desc-about');
  descriptionParagraph.innerHTML = descriptionJson.content;
}

function ShowGitHubLimitApology() {
  document.querySelector('.desc-about').style.display = "none";
  const apology = "I'm sorry. The portfolio data is hosted on GitHub and they only allow 60 requests per hour. Come back in an hour please.<br>I need to fix this somehow. :3";
  document
    .querySelector('.data-limit-error')
    .innerHTML = apology;
}

$(document).ready(async function () {
  try {
    await LoadDescription();
    await LoadProjects();
  } catch(error) {
    console.error("Error loading content:", error);
    if(error.status == "403"){
      ShowGitHubLimitApology();
    }
  }
});
