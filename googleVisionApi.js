import urljoin from 'url-join';

export class GoogleVisionApi {
    static imageRecognitionURL = "https://vision.googleapis.com/v1/images:annotate";
    static apiKey = "?key=AIzaSyB5WVcfCzsxhCRfh34jTiubDyEOnP5pXYc";
    static requestURL = urljoin(GoogleVisionApi.imageRecognitionURL, GoogleVisionApi.apiKey);
    static async postImage(base64StringOfImage, type = "LABEL_DETECTION", maxResults = 5) {
        const requestBody = [
            {
                image: { content: base64StringOfImage }, // Example of converting a buffer to base64string: Buffer.from(fs.readFileSync(imagePath)).toString("base64")
                features: [
                    {
                        type: type,
                        maxResults: maxResults
                    }
                ]
            }
        ];

        const response = await fetch(GoogleVisionApi.requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        return await response.json();
    }
}