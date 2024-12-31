async function LoadData(fileName) {
    fileName = 'data/' + fileName;
    let data;
  
    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`HTTP error! Failed to load ${fileName}. Status: ${response.status}`);
    }

    data = await response.json();
    console.log(`${fileName} loaded:`, data);
    
    return data;
}
  

async function GetConfig() {
    return await LoadData("config.json");
}