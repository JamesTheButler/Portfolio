async function SetUpHome()
{
  await SetUpProfilePic();
  await SetUpDescription();
  await SetUpSocials();
}

async function SetUpProfilePic() 
{

}

async function SetUpDescription() 
{

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