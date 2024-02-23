/**
 * Creates custom menu for user to run scripts.
 */
function onOpen() {
	let ui = SpreadsheetApp.getUi();
	ui.createMenu('GK Auto Email')
		.addItem('Enable automated emails from row creation', 'installTrigger')
		.addToUi();
}

/**
 * Installs a trigger on the Spreadsheet for when a Form response is submitted.
 */
function installTrigger() {
	Logger.log('installing Trigger...');
	ScriptApp.newTrigger('onRowsChange')
		.forSpreadsheet(SpreadsheetApp.getActive())
		.onChange()
		.create();
}

/**
 * Creates a draft email for every response on a form
 *
 * @param {Object} event - Form submit event
 */
function onRowsChange(e) {
	Logger.log('onRowsChange() > ChangeType: ');
	Logger.log(e.changeType);
	let changeType = e.changeType;
	let sheetSource = e.source;
	let lastRowId = sheetSource.getLastRow();
	let responses = e.source.getSheetValues(lastRowId, 1, 1, 9)[0];
	Logger.log(responses);

	// parse form response data
	let rowData = {
		timestamp: responses[0],
		name: responses[1],
		phone: responses[2],
		email: responses[3],
		eventType: responses[4],
		guestCount: responses[5],
		targetDate: responses[6],
		message: responses[7],
		referral: responses[8],
	};

	// create draft email
	createDraft(rowData);
}

/**
 * Creates email body and includes feedback from Google Form.
 *
 * @param {string} responses - The form response data
 * @return {string} - The email body as an HTML string
 */
function createEmailBody(rowData) {
	// create email body
	let htmlBody =
		'Form Submission:<br><br>' +
		'Name:  ' +
		rowData.name +
		'<br>' +
		'Email:  ' +
		rowData.email +
		'<br>' +
		'Event Type:  ' +
		rowData.eventType +
		'<br>' +
		'Guest Count:  ' +
		rowData.guestCount +
		'<br>' +
		'Desired Date:  ' +
		rowData.targetDate +
		'<br>' +
		'Referral:  ' +
		rowData.referral +
		'<br>' +
		'Message:  <br><p><i>' +
		rowData.message +
		'</i></p><br><br>';

	return htmlBody;
}

/**
 * Create a draft email with the feedback
 */
function createDraft(rowData) {
	Logger.log('draft email create process started');

	// create subject line
	let subjectLine =
		'Thanks for inquiring, ' +
		rowData.name.split(' ')[0] +
		'!=?UTF-8?B?8J+Sng==?= ';

	// create email body
	let message = createEmailBody(rowData);

	// grab current authenticator's gmail alias signature
	const signature = Gmail.Users.Settings.SendAs.list('me').sendAs.find(
		(account) => account.isDefault,
	).signature;

	const emailBody =
		'<br><br>--<br><br>' + signature + '<br>--<br><br>' + message;

	// create draft email
	GmailApp.createDraft(rowData.email, subjectLine, '', {
		htmlBody: emailBody,
	});
}
