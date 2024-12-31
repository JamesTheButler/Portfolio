async function SetUpHome()
{
  await SetUpProfile();
  await SetUpSocials();
}

async function SetUpProfile() 
{
  let profileData;

  try
  {
    profileData = await LoadData("profile.json");
  }
  catch(error)
  {
    console.error("Error while setting up profile.", error);
    return;
  }

  document.getElementById("profile-image").src = "media/" + profileData.image;
  document.getElementById("profile-description").innerHTML = profileData.description;
  document.getElementById("profile-name").innerHTML = profileData.name;
  document.getElementById("profile-title").innerHTML = profileData.title;

}

async function SetUpSocials() 
{
  let socialsData;
  try
  {
    socialsData = await LoadData("socials.json");
  } catch (error)
  {
    console.error(`Failed to load socials.`, error);
    return;
  }

  for (var i = 0; i < socialsData.socials.length; i++) {
    const socialInfo = socialsData.socials[i];
    AddSocialLink(socialInfo);
  }
}

  async function AddSocialLink(socialInfo)
  {
    const template = document.getElementById("template-socials-link");
    let socialLink = template.content.cloneNode(true);
    let hyperlink = socialLink.querySelector("a#socials-hyperlink");
    hyperlink.href = socialInfo.url;
    hyperlink.innerHTML += socialInfo.title;
    socialLink.querySelector("img#socials-icon").src = "media/" + socialInfo.icon;

    document.getElementById("media-links").appendChild(socialLink);
  }