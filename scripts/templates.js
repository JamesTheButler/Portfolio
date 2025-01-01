async function LoadTemplates() {
    const response = await fetch('templates.html');
    const templates = await response.text();
    const templateContainer = document.createElement('div');
    templateContainer.innerHTML = templates;
    document.body.appendChild(templateContainer);
  }
  