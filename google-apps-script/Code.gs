const SHEET_NAME = "Dyno Suggestions";

function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    const teamName = (data.teamName || "").toString().trim();
    const suggestion = (data.suggestion || "").toString().trim();
    const submittedAt = (data.submittedAt || new Date().toISOString()).toString();

    if (!teamName || !suggestion) {
      return jsonResponse({ ok: false, error: "Missing teamName or suggestion" });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([new Date(), submittedAt, teamName, suggestion]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message || "Unknown error" });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["ServerTimestamp", "ClientTimestamp", "TeamName", "Suggestion"]);
  }

  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
