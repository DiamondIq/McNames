document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.querySelector(".nameForm");
    const usernameInput = document.querySelector(".nameInput");
    const skinImg = document.getElementById("skinImage");
    const uuidInput = document.getElementById("uuid");
    const ignInput = document.getElementById("ign");

    nameForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim(); // Trim whitespace

        if (username) {
            // Fetch player data and wait for the result
            const data = await getPlayerData(username);

            if (data) { // Ensure data is not undefined
                const { id: uuid, name: ign } = data; // Destructure UUID and IGN

                if (uuidInput) {
                    uuidInput.textContent = `UUID: ${uuid}`; // Update the UUID display
                    uuidInput.style.display = "block";
                } else {
                    console.error("The UUID input element could not be found in the DOM.");
                }

                if (ignInput) {
                    ignInput.textContent = `IGN: ${ign}`; // Update the IGN display
                    ignInput.style.display = "block";
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
                if (ignInput) {
                    ignInput.textContent = "This username is avaiable and doesn't exist"; // Display error message
                } else {
                    console.error("The IGN input element could not be found in the DOM.");
                }

                if (skinImg) {
                    skinImg.style.display = "none";
                } else {
                    console.error("The image element could not be found in the DOM.");
                }

                if (uuidInput) {
                    uuidInput.style.display = "none";
                } else {
                    console.error("The UUID input element could not be found in the DOM.");
                }

            }
        }
    });
});

async function getPlayerData(username) {
    // Use corsproxy.io to bypass CORS
    const apiUrl = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    const proxiedUrl = 'https://corsproxy.io/?' + encodeURIComponent(apiUrl);
    
    try {
        const response = await fetch(proxiedUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            console.error("Account not found.");
            return null; // Return null if the account does not exist
        } else {
            console.error("Failed to fetch player data.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
