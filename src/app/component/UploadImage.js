
import "../css/UploadImage.css";
import {analyzeImage} from "../vision";

export default function UploadImage() {
    return (
        <>
            <div>
                Test Stuff
                <button className="uploadImageButton" onClick={analyzeImage("../images/cat.png")}>Test</button>
            </div>
        </>
    )
}