async function OnPageLoad() {
  await LoadTemplates();
  SetUpScrollToTop();
  await ApplyWIPState();
  await SetUpHome();
  await LoadProjectData();
}

$(document).ready(OnPageLoad);