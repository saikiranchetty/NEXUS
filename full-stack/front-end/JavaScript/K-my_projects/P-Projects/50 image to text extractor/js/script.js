const dropArea = document.getElementById('dropArea');
const imageInput = document.getElementById('imageInput');
const urlInput = document.getElementById('imageURL');
const urlProcessBtn = document.getElementById('urlProcessBtn');
const outputText = document.getElementById('outputText');
const spinner = document.getElementById('spinner');

// Initialize Tesseract Worker
const worker = Tesseract.createWorker({
    logger: (info) => console.log(info),
});

// Load Tesseract.js Worker
const initializeWorker = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
};

// Preprocess the image to improve OCR accuracy
const preprocessImage = (imageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    // Grayscale preprocessing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness; // Red
        data[i + 1] = brightness; // Green
        data[i + 2] = brightness; // Blue
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
};

// Perform OCR
const performOCR = async (imageSource) => {
    try {
        spinner.style.display = 'block';
        outputText.innerHTML = '<p>Processing...</p>';

        const img = new Image();
        img.src = imageSource;
        img.onload = async () => {
            const processedImage = preprocessImage(img);
            const { data: { text } } = await worker.recognize(processedImage);
            outputText.innerHTML = `<p>${text.trim() || 'No text detected.'}</p>`;
        };
    } catch (error) {
        console.error(error);
        outputText.innerHTML = '<p>Error processing image. Please try again.</p>';
    } finally {
        spinner.style.display = 'none';
    }
};

// Handle Drag and Drop
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = '#e6f5ff';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = '#f9f9f9';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = '#f9f9f9';
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => performOCR(reader.result);
        reader.readAsDataURL(file);
    }
});

// File Upload Handler
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => performOCR(reader.result);
        reader.readAsDataURL(file);
    }
});

// URL Processing
urlProcessBtn.addEventListener('click', () => {
    const imageUrl = urlInput.value.trim();
    if (imageUrl) performOCR(imageUrl);
});

// Initialize Worker on Page Load
initializeWorker();
