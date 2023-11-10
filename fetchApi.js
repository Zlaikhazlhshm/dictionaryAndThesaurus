//search.html
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const wordDetails = document.getElementById("wordDetails");

    // Event listener for the search button
    searchButton.addEventListener("click", () => {
        const word = searchInput.value;
        if (word) {
            fetchWordDetails(word);
        }
    });

   // Function to fetch word details from the API
function fetchWordDetails(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const wordData = data[0];

            // Display word details
            document.getElementById("word").textContent = wordData.word;
            document.getElementById("phonetic").textContent = wordData.phonetic;
            document.getElementById("partOfSpeech").textContent = wordData.meanings[0].partOfSpeech;
            

            // Initialize example text
            let exampleText = "N/A";

            // Find the first meaning with an example
            const meaningWithExample = wordData.meanings.find(
                (meaning) => meaning.definitions[0].example
            );

            if (meaningWithExample) {
                exampleText = meaningWithExample.definitions[0].example;
            }

            document.getElementById("example").textContent = exampleText;

            const meaningsList = document.getElementById("meanings");
            meaningsList.innerHTML = "";

            wordData.meanings.forEach((meaning) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`;
                meaningsList.appendChild(listItem);
            });

            document.getElementById("antonyms").textContent =
                wordData.meanings[0].definitions[0].antonyms.join(", ") || "N/A";

            const audioElement = document.getElementById("audio");
            const audioSource = document.getElementById("audioSource");
            if (wordData.phonetics[0].audio) {
                audioSource.src = wordData.phonetics[0].audio;
                audioElement.load();
            } else {
                audioElement.style.display = "none"; // Hide the audio element if no audio is available
            }

            const relatedUrl = document.getElementById("relatedUrl");
            relatedUrl.textContent = "Source URL";
            relatedUrl.href = wordData.sourceUrls[0] || "#";
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            clearWordDetails();
        });
}

    

    // Function to clear word details
    function clearWordDetails() {
        document.getElementById("word").textContent = "N/A";
        document.getElementById("phonetic").textContent = "N/A";
        document.getElementById("partOfSpeech").textContent = "N/A";
        const meaningsList = document.getElementById("meanings");
        meaningsList.innerHTML = "";
        document.getElementById("antonyms").textContent = "N/A";
        document.getElementById("example").textContent = "N/A";
        const audioElement = document.getElementById("audio");
        audioElement.style.display = "none"; // Hide the audio element
        document.getElementById("relatedUrl").textContent = "";
        
    }

       // Add a click event listener to the restart button
       const restartButton = document.getElementById("restartButton");
       restartButton.addEventListener("click", function() {
           location.reload();
       });
});
