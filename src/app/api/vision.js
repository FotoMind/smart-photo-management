// Require the Google Cloud Vision library
import vision from '@google-cloud/vision';

// Asynchronously analyze an image using Google Cloud Vision API
async function analyzeImage(image){
    try{
        // Initialize the ImageAnnotatorClient with your service account credentials
        const client = new vision.ImageAnnotatorClient({
            keyFilename: '../vision_key.json' // Replace with your actual JSON key file
        });

        // Perform label detection on the image to identify objects, locations, activities, and more
        const labels = await client.labelDetection(image);
        // Perform safe search detection to determine the likelihood of adult content, violence, etc.
        const safeSearch = await client.safeSearchDetection(image);
        // Return the results of both label and safe search detection
        return {labels, safeSearch};
    } catch(error){
        // Log any errors that occur during the API call
        console.error('Error:', error);
    }
}

export default analyzeImage;