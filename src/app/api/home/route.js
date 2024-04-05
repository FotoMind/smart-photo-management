import { NextResponse } from 'next/server';
import { ImageAnnotatorClient } from "@google-cloud/vision";

export async function GET() {
  return NextResponse.json({ name: 'Varun' });
}

export async function POST(req, res) {
    console.log(req)
    try {
      const visionClient = new ImageAnnotatorClient({
        keyFilename: './vision_key.json'
      });

      const [result] = await visionClient.labelDetection('../smart-photo-management/public/tree.jpg');
      const labels = result.labelAnnotations;
      // console.log('Labels:', labels);
      return NextResponse.json({ name: 'Varun' });
    } catch (error) {
      console.error('Vision API error:', error);
      return NextResponse.json({ name: 'Varun' });
    }
}