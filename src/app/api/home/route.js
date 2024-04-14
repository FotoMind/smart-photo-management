import { NextResponse } from 'next/server';
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage";

export async function GET() {
  return NextResponse.json({ name: 'Varun' });
}

export async function POST(req, res) {
    const data = await req.json();
    const imageRef = ref(storage, ('images/' + data.uid + '/' + data.name));
    const image = await getDownloadURL(imageRef);
    try {
      const visionClient = new ImageAnnotatorClient({
        keyFilename: './vision_key.json'
      });

      const [result] = await visionClient.labelDetection(image);
      const labels = result.labelAnnotations;
      const desc = [];

      for (let x in labels) {
        desc.push(labels[x].description)
      }

      return NextResponse.json({'labels': desc});
    } catch (error) {
      console.error('Vision API error:', error);
      return NextResponse.json({ 'Err': error });
    }
}