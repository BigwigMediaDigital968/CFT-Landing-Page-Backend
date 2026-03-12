import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "google-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const appendLeadToSheet = async (lead) => {
  try {
    const spreadsheetId = "AIzaSyAiATJ3E-cOet_7H0qpX47-7io0y0geuRo";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            lead.fullName,
            lead.email,
            `${lead.countryCode} ${lead.phone}`,
            lead.city,
            lead.accountStatus,
            new Date().toLocaleString(),
          ],
        ],
      },
    });
  } catch (error) {
    console.error("Google Sheet Error:", error);
  }
};
