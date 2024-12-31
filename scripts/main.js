async function OnPageLoad() {
  SetUpScrollToTop();

  try {
    await ApplyWIPState();
    await SetUpHome();
    await LoadProjectData();

  } catch(error) {
    console.error("Error loading content:", error);
    if(error.status == "403"){
      ShowGitHubLimitApology();
    }
  }
}

$(document).ready(OnPageLoad);
