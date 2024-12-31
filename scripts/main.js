async function OnPageLoad() {
  SetUpScrollToTop();
  ApplyWIPState();

  try {
    await SetUpHome();
    await LoadDescriptionData();
    await LoadProjectData();
  } catch(error) {
    console.error("Error loading content:", error);
    if(error.status == "403"){
      ShowGitHubLimitApology();
    }
  }
}

$(document).ready(OnPageLoad);
