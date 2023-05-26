const submitIcon = document.getElementById("submit-icon");
const inputElement = document.getElementById("prompt-input");
const imagesSection = document.querySelector(".images-section");

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 4,
            "size": "1024x1024",
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await response.json();
        //console.log(data);

        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add('image-container');
            const imageElement = document.createElement("img");
            imageElement.setAttribute("src", imageObject.url);
            imageContainer.append(imageElement);
            imagesSection.append(imageContainer);
        });
    } catch (error) {
        //console.error(error);
    }
}

if (submitIcon) {
    submitIcon.addEventListener("click", getImages);
}