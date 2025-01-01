async function ApplyWIPState() {
  let isWip;
  try {
    let config = await GetConfig();
    isWip = config.isWip;
  } catch(error) {
    console.error(`Failed to load config file. Wip state is assumed to be false.`, error);
    isWip = false;
  }

  let displayMode = isWip ? "block" : "none";
  document.getElementById("wip-warning").style.display = displayMode;
}