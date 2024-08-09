document.addEventListener("DOMContentLoaded", () => {
    
    const nameForm = document.querySelector(".nameForm");
    const usernameInput = document.querySelector(".nameInput");
    const skinImg = document.getElementById("skinImage");
    const uuidInput = document.getElementById("uuid");
    const ignInput = document.getElementById("ign");

    nameForm.addEventListener("submit", async (event) => { // Make the event handler async
        event.preventDefault();

        const username = usernameInput.value.trim(); // Trim whitespace

        if (username) {
            // Fetch player data and wait for the result
            const data = await getPlayerData(username);

            if (data) { // Ensure data is not undefined
                const { id: uuid, name: ign } = data; // Destructure UUID and IGN

                if (uuidInput) {
                    uuidInput.textContent = `UUID: ${uuid}`; // Update the UUID display
                } else {
                    console.error("The UUID input element could not be found in the DOM.");
                }

                if (ignInput) {
                    ignInput.textContent = `IGN: ${ign}`; // Update the IGN display
                } else {
                    console.error("The IGN input element could not be found in the DOM.");
                }

                const skinLinkTemplate = `https://vzge.me/full/384/${uuid}`; // Use UUID for skin URL

                if (skinImg) {
                    skinImg.src = skinLinkTemplate;
                    skinImg.style.display = "block";
                } else {
                    console.error("The image element could not be found in the DOM.");
                }
            } else {
                console.error("No data returned from getPlayerData.");
            }
        }
    });
});

async function getPlayerData(username) {
    const apiUrl = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch player data.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
