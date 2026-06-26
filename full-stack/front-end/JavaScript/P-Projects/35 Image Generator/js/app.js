const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "sk-YHvhlNmyLxu0Vw5y_DHEPA_r94K14r3kFotKyEzlRPT3BlbkFJdl9xZr2nZRW5nX8hcgQqH_BY5IpoMDlJHQn8HcTx0A"; // Your OpenAI API key here
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
  imgDataArray.forEach((imgObject, index) => {
    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const downloadBtn = imgCard.querySelector(".download-btn");
    
    // Set the image source to the AI-generated image data
    const aiGeneratedImage = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src = aiGeneratedImage;
    
    // When the image is loaded, remove the loading class and set download attributes
    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href", aiGeneratedImage);
      downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    }
  });
};

const generateAiImages = async (userPrompt, userImgQuantity) => {
  try {
    console.log("Sending request to OpenAI..."); // Debugging output
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`, // Correct API key setup
      },
      body: JSON.stringify({
        prompt: userPrompt,
        n: userImgQuantity, // Number of images to generate
        size: "512x512", // Image size
        response_format: "b64_json" // Base64 JSON response format
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate AI images: ${errorText}`);
    }

    const { data } = await response.json(); // Get the JSON response
    updateImageCard([...data]); // Update the image cards with the generated data
  } catch (error) {
    console.error(error); // Log full error for debugging
    alert(error.message);
  } finally {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  }
};

const handleImageGeneration = (e) => {
  e.preventDefault();
  if (isImageGenerating) return;

  // Get user input and image quantity values
  const userPrompt = e.srcElement[0].value;
  const userImgQuantity = parseInt(e.srcElement[1].value);

  // Disable the generate button, update its text, and set the flag
  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating...";
  isImageGenerating = true;

  // Creating HTML markup for image cards with loading state
  const imgCardMarkup = Array.from({ length: userImgQuantity }, () => 
      `<div class="img-card loading">
        <img src="images/loader.svg" alt="AI generated image">
        <a class="download-btn" href="#">
          <img src="images/download.svg" alt="Download Image">
        </a>
      </div>`
  ).join("");

  imageGallery.innerHTML = imgCardMarkup; // Insert the loading state for image cards
  generateAiImages(userPrompt, userImgQuantity); // Generate AI images
};

// Attach the event listener to handle form submissions
generateForm.addEventListener("submit", handleImageGeneration);
