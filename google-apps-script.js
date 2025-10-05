// GOOGLE APPS SCRIPT CODE - COMPREHENSIVE VERSION
// Deploy this code in Google Apps Script as a Web App

var SHEET_NAMES = {
  USERS: 'UserRegistrations',
  SCHEMES: 'SchemeApplications',
  COMPLAINTS: 'Complaints',
  BILLS: 'BillPayments',
  CHILDREN: 'Children',
  DOCUMENTS: 'Documents',
  BLOOD_DONORS: 'BloodDonors',
  ORGAN_DONORS: 'OrganDonors',
  BLOOD_REQUESTS: 'BloodRequests',
  ORGAN_REQUESTS: 'OrganRequests'
};

// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Copy and paste this entire code
// 4. Click "Deploy" > "New deployment"
// 5. Choose "Web app" as deployment type
// 6. Set "Execute as" to "Me"
// 7. Set "Who has access" to "Anyone"
// 8. Click "Deploy" and copy the Web App URL
// 9. Update the WEB_APP_URL in your frontend code

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const dataType = data.dataType;
    
    let result;
    switch(dataType) {
      case 'user':
        result = saveUserRegistration(data);
        break;
      case 'scheme':
        result = saveSchemeApplication(data);
        break;
      case 'complaint':
        result = saveComplaint(data);
        break;
      case 'billPayment':
        result = saveBillPayment(data);
        break;
      case 'child':
        result = saveChildData(data);
        break;
      case 'document':
        result = saveDocument(data);
        break;
      case 'updateSchemeStatus':
        result = updateSchemeStatus(data);
        break;
      case 'updateComplaintStatus':
        result = updateComplaintStatus(data);
        break;
      case 'bloodDonor':
        result = saveBloodDonor(data);
        break;
      case 'organDonor':
        result = saveOrganDonor(data);
        break;
      case 'bloodRequest':
        result = saveBloodRequest(data);
        break;
      case 'organRequest':
        result = saveOrganRequest(data);
        break;
      case 'updateBloodRequestStatus':
        result = updateBloodRequestStatus(data);
        break;
      case 'updateOrganRequestStatus':
        result = updateOrganRequestStatus(data);
        break;
      default:
        result = { success: false, error: 'Unknown data type: ' + dataType };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const dataType = e.parameter.dataType;
    
    if (!dataType) {
      return getAllData();
    }
    
    let result;
    switch(dataType) {
      case 'users':
        result = getUsers();
        break;
      case 'schemes':
        result = getSchemes();
        break;
      case 'complaints':
        result = getComplaints();
        break;
      case 'billPayments':
        result = getBillPayments();
        break;
      case 'children':
        result = getChildren();
        break;
      case 'documents':
        result = getDocuments();
        break;
      case 'bloodDonors':
        result = getBloodDonors();
        break;
      case 'organDonors':
        result = getOrganDonors();
        break;
      case 'bloodRequests':
        result = getBloodRequests();
        break;
      case 'organRequests':
        result = getOrganRequests();
        break;
      default:
        result = { success: false, error: 'Unknown data type' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveUserRegistration(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('UserRegistrations');
  
  if (!sheet) {
    sheet = ss.insertSheet('UserRegistrations');
    sheet.appendRow([
      'Timestamp',
      'Aadhaar Number',
      'Phone Number',
      'Email',
      'Address',
      'Family Members',
      'Registration Date'
    ]);
  }
  
  const familyMembersStr = data.familyMembers ? 
    data.familyMembers.map(fm => `${fm.name} (${fm.relation}, ${fm.age})`).join('; ') : 
    'None';
  
  sheet.appendRow([
    new Date(),
    data.aadhaar,
    data.phone,
    data.email,
    data.address,
    familyMembersStr,
    data.createdAt
  ]);
  
  return {
    success: true,
    message: 'User registration saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveSchemeApplication(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('SchemeApplications');
  
  if (!sheet) {
    sheet = ss.insertSheet('SchemeApplications');
    sheet.appendRow([
      'Timestamp',
      'Application ID',
      'User ID',
      'Scheme ID',
      'Scheme Name',
      'Status',
      'Documents',
      'Additional Info',
      'Applied Date'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.applicationId || data.id,
    data.userId,
    data.schemeId,
    data.schemeName || '',
    data.status,
    JSON.stringify(data.documents || []),
    JSON.stringify(data.additionalInfo || {}),
    data.appliedAt || new Date().toISOString()
  ]);
  
  return {
    success: true,
    message: 'Scheme application saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveComplaint(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Complaints');
  
  if (!sheet) {
    sheet = ss.insertSheet('Complaints');
    sheet.appendRow([
      'Timestamp',
      'Complaint ID',
      'User ID',
      'Department',
      'Description',
      'Status',
      'Filed Date'
    ]);
  }
  
  sheet.appendRow([
    new Date(),
    data.id,
    data.userId,
    data.department,
    data.description,
    data.status,
    data.filedAt
  ]);
  
  return {
    success: true,
    message: 'Complaint saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveBillPayment(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('BillPayments');
  
  if (!sheet) {
    sheet = ss.insertSheet('BillPayments');
    sheet.appendRow([
      'Timestamp',
      'Payment ID',
      'User ID',
      'Bill Type',
      'Service',
      'Consumer Number',
      'Amount',
      'Payment Date'
    ]);
  }
  
  sheet.appendRow([
    new Date(),
    data.id,
    data.userId,
    data.billType,
    data.service || data.billType,
    data.consumerNumber,
    data.amount,
    data.paymentDate
  ]);
  
  return {
    success: true,
    message: 'Bill payment saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveChildData(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.CHILDREN);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.CHILDREN);
    sheet.appendRow([
      'Timestamp',
      'Child ID',
      'User ID',
      'Name',
      'Age',
      'Gender',
      'School Name',
      'Grade',
      'Birth Certificate',
      'Vaccinations',
      'Resources Used',
      'Attendance Streak',
      'Created At'
    ]);
  }
  
  const vaccinations = data.vaccinations ? JSON.stringify(data.vaccinations) : 'None';
  const resources = data.resources ? JSON.stringify(data.resources) : 'None';
  
  sheet.appendRow([
    new Date().toISOString(),
    data.childId || data.id,
    data.userId,
    data.name,
    data.age,
    data.gender || '',
    data.school || data.schoolName || '',
    data.class || data.grade || '',
    data.birthCertificate || '',
    vaccinations,
    resources,
    data.attendanceStreak || 0,
    data.createdAt || data.addedAt || new Date().toISOString()
  ]);
  
  return {
    success: true,
    message: 'Child data saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveDocument(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Documents');
  
  if (!sheet) {
    sheet = ss.insertSheet('Documents');
    sheet.appendRow([
      'Timestamp',
      'Document ID',
      'User ID',
      'Document Type',
      'Document Name',
      'Status',
      'Upload Date'
    ]);
  }
  
  sheet.appendRow([
    new Date(),
    data.id,
    data.userId,
    data.type,
    data.name,
    data.status || 'Uploaded',
    data.uploadedAt
  ]);
  
  return {
    success: true,
    message: 'Document saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function updateSchemeStatus(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SchemeApplications');
  
  if (!sheet) {
    return { success: false, error: 'SchemeApplications sheet not found' };
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === data.applicationId) {
      sheet.getRange(i + 1, 6).setValue(data.status);
      return {
        success: true,
        message: 'Scheme status updated in Google Sheets',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return { success: false, error: 'Application not found' };
}

function updateComplaintStatus(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Complaints');
  
  if (!sheet) {
    return { success: false, error: 'Complaints sheet not found' };
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === data.complaintId) {
      sheet.getRange(i + 1, 6).setValue(data.status);
      return {
        success: true,
        message: 'Complaint status updated in Google Sheets',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return { success: false, error: 'Complaint not found' };
}

function getUsers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('UserRegistrations');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const users = rows.map(row => {
    const user = {};
    headers.forEach((header, index) => {
      user[header] = row[index];
    });
    return user;
  });
  
  return { success: true, users: users, count: users.length };
}

function getSchemes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SchemeApplications');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const schemes = rows.map(row => {
    const scheme = {};
    headers.forEach((header, index) => {
      scheme[header] = row[index];
    });
    return scheme;
  });
  
  return { success: true, schemes: schemes, count: schemes.length };
}

function getComplaints() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Complaints');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const complaints = rows.map(row => {
    const complaint = {};
    headers.forEach((header, index) => {
      complaint[header] = row[index];
    });
    return complaint;
  });
  
  return { success: true, complaints: complaints, count: complaints.length };
}

function getBillPayments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('BillPayments');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const payments = rows.map(row => {
    const payment = {};
    headers.forEach((header, index) => {
      payment[header] = row[index];
    });
    return payment;
  });
  
  return { success: true, payments: payments, count: payments.length };
}

function getChildren() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Children');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const children = rows.map(row => {
    const child = {};
    headers.forEach((header, index) => {
      child[header] = row[index];
    });
    return child;
  });
  
  return { success: true, children: children, count: children.length };
}

function getDocuments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Documents');
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const documents = rows.map(row => {
    const doc = {};
    headers.forEach((header, index) => {
      doc[header] = row[index];
    });
    return doc;
  });
  
  return { success: true, documents: documents, count: documents.length };
}

function saveBloodDonor(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.BLOOD_DONORS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.BLOOD_DONORS);
    sheet.appendRow([
      'Timestamp',
      'Donor ID',
      'User ID',
      'Name',
      'Blood Group',
      'Age',
      'Contact',
      'Location',
      'Availability',
      'Medical History',
      'Status',
      'Registered At'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.id,
    data.userId,
    data.name,
    data.bloodGroup,
    data.age,
    data.contact,
    data.location,
    data.availability,
    data.medicalHistory || 'None',
    data.status,
    data.registeredAt
  ]);
  
  return {
    success: true,
    message: 'Blood donor saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveOrganDonor(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.ORGAN_DONORS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.ORGAN_DONORS);
    sheet.appendRow([
      'Timestamp',
      'Donor ID',
      'User ID',
      'Name',
      'Organ Type',
      'Age',
      'Contact',
      'Location',
      'Medical Details',
      'Consent',
      'Status',
      'Registered At'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.id,
    data.userId,
    data.name,
    data.organType,
    data.age,
    data.contact,
    data.location,
    data.medicalDetails || 'None',
    data.consent,
    data.status,
    data.registeredAt
  ]);
  
  return {
    success: true,
    message: 'Organ donor saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveBloodRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.BLOOD_REQUESTS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.BLOOD_REQUESTS);
    sheet.appendRow([
      'Timestamp',
      'Request ID',
      'User ID',
      'Patient Name',
      'Blood Group',
      'Units Required',
      'Urgency',
      'Hospital',
      'Hospital Address',
      'Contact',
      'Additional Info',
      'Status',
      'Requested At'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.id,
    data.userId,
    data.patientName,
    data.bloodGroup,
    data.unitsRequired,
    data.urgency,
    data.hospital,
    data.hospitalAddress,
    data.contact,
    data.additionalInfo || 'None',
    data.status,
    data.requestedAt
  ]);
  
  return {
    success: true,
    message: 'Blood request saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function saveOrganRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.ORGAN_REQUESTS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.ORGAN_REQUESTS);
    sheet.appendRow([
      'Timestamp',
      'Request ID',
      'User ID',
      'Patient Name',
      'Organ Type',
      'Patient Age',
      'Urgency',
      'Hospital',
      'Hospital Address',
      'Contact',
      'Medical Details',
      'Status',
      'Requested At'
    ]);
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    data.id,
    data.userId,
    data.patientName,
    data.organType,
    data.patientAge,
    data.urgency,
    data.hospital,
    data.hospitalAddress,
    data.contact,
    data.medicalDetails || 'None',
    data.status,
    data.requestedAt
  ]);
  
  return {
    success: true,
    message: 'Organ request saved to Google Sheets',
    timestamp: new Date().toISOString()
  };
}

function updateBloodRequestStatus(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.BLOOD_REQUESTS);
  
  if (!sheet) {
    return { success: false, error: 'BloodRequests sheet not found' };
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === data.requestId) {
      sheet.getRange(i + 1, 12).setValue(data.status);
      return {
        success: true,
        message: 'Blood request status updated in Google Sheets',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return { success: false, error: 'Blood request not found' };
}

function updateOrganRequestStatus(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.ORGAN_REQUESTS);
  
  if (!sheet) {
    return { success: false, error: 'OrganRequests sheet not found' };
  }
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === data.requestId) {
      sheet.getRange(i + 1, 12).setValue(data.status);
      return {
        success: true,
        message: 'Organ request status updated in Google Sheets',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return { success: false, error: 'Organ request not found' };
}

function getBloodDonors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.BLOOD_DONORS);
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const donors = rows.map(row => {
    const donor = {};
    headers.forEach((header, index) => {
      donor[header] = row[index];
    });
    return donor;
  });
  
  return { success: true, donors: donors, count: donors.length };
}

function getOrganDonors() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.ORGAN_DONORS);
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const donors = rows.map(row => {
    const donor = {};
    headers.forEach((header, index) => {
      donor[header] = row[index];
    });
    return donor;
  });
  
  return { success: true, donors: donors, count: donors.length };
}

function getBloodRequests() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.BLOOD_REQUESTS);
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const requests = rows.map(row => {
    const request = {};
    headers.forEach((header, index) => {
      request[header] = row[index];
    });
    return request;
  });
  
  return { success: true, requests: requests, count: requests.length };
}

function getOrganRequests() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.ORGAN_REQUESTS);
  
  if (!sheet) {
    return { success: false, message: 'No data found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const requests = rows.map(row => {
    const request = {};
    headers.forEach((header, index) => {
      request[header] = row[index];
    });
    return request;
  });
  
  return { success: true, requests: requests, count: requests.length };
}

function getAllData() {
  const usersData = getUsers();
  const schemesData = getSchemes();
  const complaintsData = getComplaints();
  const billPaymentsData = getBillPayments();
  const childrenData = getChildren();
  const documentsData = getDocuments();
  const bloodDonorsData = getBloodDonors();
  const organDonorsData = getOrganDonors();
  const bloodRequestsData = getBloodRequests();
  const organRequestsData = getOrganRequests();
  
  return {
    success: true,
    data: {
      users: usersData.users || [],
      schemes: schemesData.schemes || [],
      complaints: complaintsData.complaints || [],
      billPayments: billPaymentsData.payments || [],
      children: childrenData.children || [],
      documents: documentsData.documents || [],
      bloodDonors: bloodDonorsData.donors || [],
      organDonors: organDonorsData.donors || [],
      bloodRequests: bloodRequestsData.requests || [],
      organRequests: organRequestsData.requests || []
    },
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      '/exec?dataType=users',
      '/exec?dataType=schemes',
      '/exec?dataType=complaints',
      '/exec?dataType=billPayments',
      '/exec?dataType=children',
      '/exec?dataType=documents',
      '/exec?dataType=bloodDonors',
      '/exec?dataType=organDonors',
      '/exec?dataType=bloodRequests',
      '/exec?dataType=organRequests'
    ]
  };
}
