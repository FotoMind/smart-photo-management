import { NextResponse } from 'next/server';
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage";

export async function GET() {
  return NextResponse.json({ name: 'Varun' });
}

export async function POST(req, res) {
    const data = req.json();
    const imageRef = ref(storage, ('images/' + data.uid + '/' + data.name));
    const image = getDownloadURL(imageRef);
    try {
      const visionClient = new ImageAnnotatorClient({
        keyFilename: './vision_key.json'
      });

      const [result] = await visionClient.labelDetection(image);
      const labels = result.labelAnnotations;
      // console.log('Labels:', labels);
      return NextResponse.json({'labels': labels});
    } catch (error) {
      console.error('Vision API error:', error);
      return NextResponse.json({ 'Err': error });
    }
}