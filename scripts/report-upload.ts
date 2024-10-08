import { uploadDirect } from '@uploadcare/upload-client'
import * as path from "path";
import * as fs from "fs";
import { v4 as uuid } from "uuid";

async function uploadReportFile() {
    const htmlFile = path.join(__dirname, "..", "playwright-report", "index.html");
    const jsonFile = path.join(__dirname, "..", "test-results.json");
    // This would be setup as a secret that is injected into runner environment.
    const key = process.env.UPLOAD_CARE_KEY ?? "";
    if (!key) {
        throw new Error("No public key");
    }
    const jsonResult = await uploadDirect(
        fs.readFileSync(jsonFile),
        {
            publicKey: key,
            store: "auto",
            // This would be a more meaningful name.
            fileName: `${uuid()}.json`
        }
    )
    console.log(`Uploaded json report to ${jsonResult.cdnUrl}`);
    const htmlResult = await uploadDirect(
        fs.readFileSync(htmlFile),
        {
            publicKey: key,
            store: 'auto',
            // This would be a more meaningful name.
            fileName: `${uuid()}.html`
        }
    );
    console.log(`Uploaded html report to ${htmlResult.cdnUrl}`);
}

uploadReportFile();