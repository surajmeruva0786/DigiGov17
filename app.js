let currentUser = null;
let currentOfficial = null;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showHome() {
    showScreen('home-screen');
}

function showUserLogin() {
    showScreen('user-login-screen');
}

function showUserRegister() {
    showScreen('user-register-screen');
}

function showOfficialLogin() {
    showScreen('official-login-screen');
}

function showOfficialRegister() {
    showScreen('official-register-screen');
}

function showVoiceSetup() {
    showScreen('voice-setup-screen');
}

function addFamilyMember() {
    const familyContainer = document.getElementById('family-members');
    const memberDiv = document.createElement('div');
    memberDiv.className = 'family-member';
    memberDiv.innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="family-name" placeholder="Family member name">
        </div>
        <div class="form-group">
            <label>Relationship</label>
            <input type="text" class="family-relation" placeholder="e.g., Spouse, Child">
        </div>
        <div class="form-group">
            <label>Age</label>
            <input type="number" class="family-age" placeholder="Age">
        </div>
    `;
    familyContainer.appendChild(memberDiv);
}

document.getElementById('user-aadhaar-photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('aadhaar-preview');
            preview.innerHTML = `<img src="${event.target.result}" alt="Aadhaar Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('user-register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const aadhaar = document.getElementById('user-aadhaar').value;
    const fullName = document.getElementById('user-full-name').value;
    const phone = document.getElementById('user-phone').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const address = document.getElementById('user-address').value;
    
    const aadhaarPhotoFile = document.getElementById('user-aadhaar-photo').files[0];
    
    if (!aadhaarPhotoFile) {
        alert('Please upload Aadhaar photo');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const aadhaarPhoto = event.target.result;
        
        const familyMembers = [];
        document.querySelectorAll('.family-member').forEach(member => {
            const name = member.querySelector('.family-name').value;
            const relation = member.querySelector('.family-relation').value;
            const age = member.querySelector('.family-age').value;
            
            if (name && relation && age) {
                familyMembers.push({ name, relation, age });
            }
        });
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.phone === phone)) {
            alert('User with this phone number already exists');
            return;
        }
        
        const newUser = {
            name: fullName,
            aadhaar,
            phone,
            email,
            password,
            address,
            aadhaarPhoto,
            familyMembers,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        logActivity('user_registered', { email: email, phone: phone, aadhaar: aadhaar });
        
        if (typeof syncUserToGoogleSheets === 'function') {
            syncUserToGoogleSheets(newUser).then(result => {
                if (result.success) {
                    console.log('User data synced to Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:' , result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
        
        alert('Registration successful! Please login.');
        showUserLogin();
        document.getElementById('user-register-form').reset();
        document.getElementById('aadhaar-preview').innerHTML = '';
    };
    
    reader.readAsDataURL(aadhaarPhotoFile);
});

document.getElementById('user-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('user-login-phone').value;
    const password = document.getElementById('user-login-password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.phone === phone && u.password === password);
    
    if (user) {
        currentUser = user;
        
        if (typeof autoGenerateIDOnRegistration === 'function') {
            autoGenerateIDOnRegistration();
        }
        
        const voicePreference = localStorage.getItem('voicePreference');
        if (voicePreference === null) {
            showVoiceSetup();
        } else {
            showUserDashboard();
        }
        
        document.getElementById('user-login-form').reset();
    } else {
        alert('Invalid phone number or password');
    }
});

document.getElementById('official-register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('official-name').value;
    const email = document.getElementById('official-email').value;
    const password = document.getElementById('official-password').value;
    const qualification = document.getElementById('official-qualification').value;
    const department = document.getElementById('official-department').value;

    
    const officials = JSON.parse(localStorage.getItem('officials') || '[]');
    
    if (officials.find(o => o.email === email)) {
        alert('Official with this email already exists');
        return;
    }
    
    const newOfficial = {
        name,
        email,
        password,
        qualification,
        department,
        createdAt: new Date().toISOString()
    };
    
    officials.push(newOfficial);
    localStorage.setItem('officials', JSON.stringify(officials));
    
    alert('Registration successful! Please login.');
    showOfficialLogin();
    document.getElementById('official-register-form').reset();
});

document.getElementById('official-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('official-login-email').value;
    const password = document.getElementById('official-login-password').value;
    
    const officials = JSON.parse(localStorage.getItem('officials') || '[]');
    const official = officials.find(o => o.email === email && o.password === password);
    
    if (official) {
        currentOfficial = official;
        
        const voicePreference = localStorage.getItem('voicePreference');
        if (voicePreference === null) {
            showVoiceSetup();
        } else {
            showOfficialDashboard();
        }
        
        document.getElementById('official-login-form').reset();
    } else {
        alert('Invalid email or password');
    }
});

function setVoicePreference(enabled) {
    localStorage.setItem('voicePreference', enabled ? 'yes' : 'no');
    
    if (currentUser) {
        showUserDashboard();
    } else if (currentOfficial) {
        showOfficialDashboard();
    }
}

function showUserDashboard() {
    document.getElementById('user-name-display').textContent = currentUser.email.split('@')[0];
    displayDashboardSummary();
    showScreen('user-dashboard-screen');
    displayUserSchemeApplications();
}

function displayDashboardSummary() {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const userDocuments = documents.filter(d => d.userId === currentUser.phone);
    
    const documentsSummaryEl = document.getElementById('documents-summary');
    if (userDocuments.length === 0) {
        documentsSummaryEl.innerHTML = '<p style="color: #999;">No documents uploaded yet</p>';
    } else {
        const docCounts = {};
        userDocuments.forEach(doc => {
            docCounts[doc.type] = (docCounts[doc.type] || 0) + 1;
        });
        
        documentsSummaryEl.innerHTML = Object.entries(docCounts).map(([type, count]) => `
            <div class="summary-item">
                <span>${sanitizeHTML(type)}</span>
                <strong>${count} document${count > 1 ? 's' : ''}</strong>
            </div>
        `).join('') + `
            <div class="summary-item" style="margin-top: 10px; border-top: 2px solid #667eea; padding-top: 10px;">
                <strong>Total</strong>
                <strong>${userDocuments.length} document${userDocuments.length > 1 ? 's' : ''}</strong>
            </div>
        `;
    }
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const userComplaints = complaints.filter(c => c.userId === currentUser.phone);
    
    const complaintsSummaryEl = document.getElementById('complaints-summary');
    if (userComplaints.length === 0) {
        complaintsSummaryEl.innerHTML = '<p style="color: #999;">No complaints filed yet</p>';
    } else {
        const statusCounts = {};
        userComplaints.forEach(complaint => {
            statusCounts[complaint.status] = (statusCounts[complaint.status] || 0) + 1;
        });
        
        complaintsSummaryEl.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
            let badgeClass = 'badge-pending';
            if (status.toLowerCase() === 'resolved') badgeClass = 'badge-resolved';
            else if (status.toLowerCase() === 'in progress') badgeClass = 'badge-in-progress';
            
            return `
                <div class="summary-item">
                    <span>${sanitizeHTML(status)}</span>
                    <span class="summary-badge ${badgeClass}">${count}</span>
                </div>
            `;
        }).join('') + `
            <div class="summary-item" style="margin-top: 10px; border-top: 2px solid #667eea; padding-top: 10px;">
                <strong>Total Complaints</strong>
                <strong>${userComplaints.length}</strong>
            </div>
        `;
        
        const recentComplaints = userComplaints.slice(-3).reverse();
        if (recentComplaints.length > 0) {
            complaintsSummaryEl.innerHTML += '<p style="margin-top: 15px; font-weight: 600; color: #667eea;">Recent Updates:</p>';
            recentComplaints.forEach(complaint => {
                complaintsSummaryEl.innerHTML += `
                    <p style="font-size: 13px; margin: 5px 0;">
                        <strong>${sanitizeHTML(complaint.id)}:</strong> ${sanitizeHTML(complaint.status)} 
                        <span style="color: #999;">(${sanitizeHTML(complaint.department)})</span>
                    </p>
                `;
            });
        }
    }
}

function showOfficialDashboard() {
    document.getElementById('official-name-display').textContent = currentOfficial.name;
    document.getElementById('official-dept-display').textContent = currentOfficial.department;
    document.getElementById('official-qual-display').textContent = currentOfficial.qualification;
    
    
    showScreen('official-dashboard-screen');
    showOfficialTab('users');
}

function logout() {
    currentUser = null;
    currentOfficial = null;
    showHome();
}

const stateMapping = {
    '1': 'Delhi',
    '2': 'Maharashtra',
    '3': 'Karnataka',
    '4': 'Tamil Nadu',
    '5': 'Gujarat',
    '6': 'West Bengal',
    '7': 'Rajasthan',
    '8': 'Uttar Pradesh'
};

function getStateFromAadhaar(aadhaar) {
    const firstDigit = aadhaar.charAt(0);
    return stateMapping[firstDigit] || 'Unknown';
}

function initializeSchemesData() {
    if (!localStorage.getItem('schemes')) {
        const schemes = [
            { id: 1, name: 'Pradhan Mantri Awas Yojana', description: 'Housing for all - Urban', type: 'Central', benefits: 'Financial assistance for home construction', eligibility: 'EWS/LIG families' },
            { id: 2, name: 'Ayushman Bharat', description: 'Health insurance scheme', type: 'Central', benefits: 'Rs 5 lakh health cover', eligibility: 'Below poverty line families' },
            { id: 3, name: 'PM-KISAN', description: 'Income support for farmers', type: 'Central', benefits: 'Rs 6000 per year', eligibility: 'Small and marginal farmers' },
            { id: 4, name: 'National Education Policy', description: 'Education reforms', type: 'Central', benefits: 'Free quality education', eligibility: 'All students' },
            { id: 5, name: 'Delhi Education Scheme', description: 'Free education in government schools', type: 'Delhi', benefits: 'Free books and uniforms', eligibility: 'Delhi residents' },
            { id: 6, name: 'Maharashtra Farm Support', description: 'Support for farmers', type: 'Maharashtra', benefits: 'Financial aid for crops', eligibility: 'Maharashtra farmers' },
            { id: 7, name: 'Karnataka Skill Development', description: 'Vocational training program', type: 'Karnataka', benefits: 'Free skill training', eligibility: 'Youth in Karnataka' },
            { id: 8, name: 'Tamil Nadu Health Scheme', description: 'Free healthcare services', type: 'Tamil Nadu', benefits: 'Free medical treatment', eligibility: 'Tamil Nadu residents' }
        ];
        localStorage.setItem('schemes', JSON.stringify(schemes));
    }
}

function initializeDepartments() {
    if (!localStorage.getItem('departments')) {
        const departments = [
            'Revenue Department',
            'Health Department',
            'Education Department',
            'Transport Department',
            'Water Supply',
            'Electricity Board',
            'Police Department',
            'Municipal Corporation',
            'Agriculture Department'
        ];
        localStorage.setItem('departments', JSON.stringify(departments));
    }
}

function showGovernmentSchemes() {
    initializeSchemesData();
    const state = getStateFromAadhaar(currentUser.aadhaar);
    document.getElementById('user-state-display').textContent = `State: ${state}`;
    
    displaySchemes();
    showScreen('government-schemes-screen');
}

function displaySchemes(filter = '') {
    const state = getStateFromAadhaar(currentUser.aadhaar);
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    const schemesList = document.getElementById('schemes-list');
    
    const filteredSchemes = schemes.filter(scheme => {
        const matchesState = scheme.type === 'Central' || scheme.type === state;
        const matchesSearch = filter === '' || 
            scheme.name.toLowerCase().includes(filter.toLowerCase()) ||
            scheme.description.toLowerCase().includes(filter.toLowerCase()) ||
            scheme.benefits.toLowerCase().includes(filter.toLowerCase());
        return matchesState && matchesSearch;
    });
    
    if (filteredSchemes.length === 0) {
        schemesList.innerHTML = '<p style="text-align: center; color: #666;">No schemes found</p>';
        return;
    }
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const userApplications = applications.filter(a => a.userId === currentUser.phone);
    
    schemesList.innerHTML = filteredSchemes.map(scheme => {
        const existingApplication = userApplications.find(a => a.schemeId === scheme.id);
        let applicationButton = '';
        
        if (existingApplication) {
            const statusClass = existingApplication.status.toLowerCase();
            applicationButton = `<span class="application-status status-${statusClass}">${existingApplication.status}</span>`;
        } else {
            applicationButton = `<button class="btn-apply" onclick="applyForScheme(${scheme.id})">Apply</button>`;
        }
        
        return `
            <div class="scheme-card">
                <h4>${scheme.name}</h4>
                <p><strong>Description:</strong> ${scheme.description}</p>
                <p><strong>Benefits:</strong> ${scheme.benefits}</p>
                <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                <div class="scheme-card-footer">
                    <span class="scheme-type">${scheme.type}</span>
                    ${applicationButton}
                </div>
            </div>
        `;
    }).join('');
}

function searchSchemes() {
    const searchTerm = document.getElementById('scheme-search').value;
    displaySchemes(searchTerm);
}

let recognition;

function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        document.getElementById('scheme-search').placeholder = 'Listening...';
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('scheme-search').value = transcript;
        searchSchemes();
    };
    
    recognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
        document.getElementById('scheme-search').placeholder = 'Search schemes...';
    };
    
    recognition.onend = function() {
        document.getElementById('scheme-search').placeholder = 'Search schemes...';
    };
    
    recognition.start();
}

function startVoiceComplaint() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('quick-complaint-text').value = transcript;
    };
    
    recognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
    };
    
    recognition.start();
}

function submitQuickComplaint() {
    const complaintText = document.getElementById('quick-complaint-text').value.trim();
    
    if (!complaintText) {
        alert('Please enter a complaint');
        return;
    }
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintId = 'C' + Date.now();
    
    const newComplaint = {
        id: complaintId,
        userId: currentUser.phone,
        department: 'General',
        description: complaintText,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };
    
    complaints.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    if (typeof syncComplaintToGoogleSheets === 'function') {
        syncComplaintToGoogleSheets(newComplaint).then(result => {
            if (result.success) {
                console.log('Complaint synced to Google Sheets');
            } else {
                console.log('Google Sheets sync failed:', result.reason || result.error);
            }
        }).catch(err => {
            console.log('Google Sheets sync error:', err);
        });
    }
    
    alert('Complaint submitted successfully! ID: ' + complaintId);
    document.getElementById('quick-complaint-text').value = '';
}

function showComplaints() {
    initializeDepartments();
    displayDepartments();
    displayUserComplaints();
    showScreen('complaints-screen');
}

function displayDepartments() {
    const departments = JSON.parse(localStorage.getItem('departments') || '[]');
    const departmentsList = document.getElementById('departments-list');
    
    departmentsList.innerHTML = departments.map(dept => `
        <div class="department-card" onclick="selectDepartment('${dept}')">
            <h4>${dept}</h4>
        </div>
    `).join('');
}

let selectedDept = '';

function selectDepartment(department) {
    selectedDept = department;
    document.getElementById('selected-department').textContent = department;
    document.getElementById('complaint-form-section').style.display = 'block';
    document.getElementById('complaint-description').value = '';
}

function cancelComplaint() {
    selectedDept = '';
    document.getElementById('complaint-form-section').style.display = 'none';
    document.getElementById('complaint-description').value = '';
}

function startVoiceComplaintForm() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('complaint-description').value = transcript;
    };
    
    recognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
    };
    
    recognition.start();
}

document.getElementById('complaint-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('complaint-description').value.trim();
    
    if (!description) {
        alert('Please enter complaint description');
        return;
    }
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintId = 'C' + Date.now();
    
    
    const newComplaint = {
        id: complaintId,
        userId: currentUser.phone,
        department: selectedDept,
        description: description,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };
    
    complaints.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    
    if (typeof syncComplaintToGoogleSheets === 'function') {
        syncComplaintToGoogleSheets(newComplaint).then(result => {
            if (result.success) {
                console.log('Complaint synced to Google Sheets');
            } else {
                console.log('Google Sheets sync failed:' , result.reason || result.error);
            }
        }).catch(err => {
            console.log('Google Sheets sync error:' , err);
        });
    }
    alert('Complaint submitted successfully! ID: ' + complaintId);
    
    cancelComplaint();
    displayUserComplaints();
});

function displayUserComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const userComplaints = complaints.filter(c => c.userId === currentUser.phone);
    const complaintsItems = document.getElementById('complaints-items');
    
    if (userComplaints.length === 0) {
        complaintsItems.innerHTML = '<p style="text-align: center; color: #666;">No complaints filed yet</p>';
        return;
    }
    
    complaintsItems.innerHTML = userComplaints.map(complaint => `
        <div class="complaint-item">
            <h4>Complaint ID: ${complaint.id}</h4>
            <p><strong>Department:</strong> ${complaint.department}</p>
            <p><strong>Description:</strong> ${complaint.description}</p>
            <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
            <span class="complaint-status status-${complaint.status.toLowerCase()}">${complaint.status}</span>
        </div>
    `).join('');
}

function showChildren() {
    showScreen('children-screen');
}

function showBillPayments() {
    showScreen('bill-payments-screen');
}

function showDocuments() {
    displayUserDocuments();
    showScreen('documents-screen');

}
function showUploadDocumentForm() {
    document.getElementById('upload-document-form-section').style.display = 'block';
    document.getElementById('document-type').value = '';
    document.getElementById('document-name').value = '';
    document.getElementById('document-file').value = '';
    document.getElementById('document-preview').innerHTML = '';
}

function cancelUploadDocument() {
    document.getElementById('upload-document-form-section').style.display = 'none';
    document.getElementById('document-type').value = '';
    document.getElementById('document-name').value = '';
    document.getElementById('document-file').value = '';
    document.getElementById('document-preview').innerHTML = '';
}

document.getElementById('document-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('document-preview');
            if (file.type.startsWith('image/')) {
                preview.innerHTML = `<img src="${event.target.result}" alt="Document Preview" style="max-width: 100%; margin-top: 10px; border-radius: 8px;">`;
            } else if (file.type === 'application/pdf') {
                preview.innerHTML = `<p style="margin-top: 10px; color: #667eea;">📄 PDF file selected: ${file.name}</p>`;
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('upload-document-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const documentType = document.getElementById('document-type').value;
    const documentName = document.getElementById('document-name').value;
    const documentFile = document.getElementById('document-file').files[0];
    
    if (!documentFile) {
        alert('Please select a file to upload');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const documentData = event.target.result;
        
        const documents = JSON.parse(localStorage.getItem('documents') || '[]');
        const documentId = 'DOC' + Date.now();
        
        const newDocument = {
            id: documentId,
            userId: currentUser.phone,
            type: documentType,
            name: documentName,
            fileName: documentFile.name,
            fileType: documentFile.type,
            fileData: documentData,
            uploadedAt: new Date().toISOString()
        };
        
        documents.push(newDocument);
        localStorage.setItem('documents', JSON.stringify(documents));
        
        if (typeof syncDocumentToGoogleSheets === 'function') {
            syncDocumentToGoogleSheets({
                id: newDocument.id,
                userId: newDocument.userId,
                type: newDocument.type,
                name: newDocument.name,
                status: 'Uploaded',
                uploadedAt: newDocument.uploadedAt
            }).then(result => {
                if (result.success) {
                    console.log('Document synced to Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
        
        alert('Document uploaded successfully!');
        cancelUploadDocument();
        displayUserDocuments();
    };
    
    reader.readAsDataURL(documentFile);
});

function displayUserDocuments() {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const userDocuments = documents.filter(d => d.userId === currentUser.phone);
    const documentsItems = document.getElementById('documents-items');
    
    if (userDocuments.length === 0) {
        documentsItems.innerHTML = '<p style="text-align: center; color: #666;">No documents uploaded yet</p>';
        return;
    }
    
    documentsItems.innerHTML = userDocuments.map(doc => `
        <div class="document-item">
            <div class="document-item-header">
                <h4>${sanitizeHTML(doc.name)}</h4>
                <span class="document-type-badge">${sanitizeHTML(doc.type)}</span>
            </div>
            <p><strong>File:</strong> ${sanitizeHTML(doc.fileName)}</p>
            <p><strong>Uploaded:</strong> ${new Date(doc.uploadedAt).toLocaleDateString()}</p>
            <div class="document-actions">
                <button class="btn-secondary" onclick=\"viewDocument('${sanitizeHTML(doc.id)}')\">View</button>
                <button class="btn-secondary" onclick=\"downloadDocument('${sanitizeHTML(doc.id)}')\">Download</button>
                <button class="btn-secondary delete-btn" onclick=\"deleteDocument('${sanitizeHTML(doc.id)}')\">Delete</button>
            </div>
        </div>
    `).join('');
}

function viewDocument(docId) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const doc = documents.find(d => d.id === docId);
    
    if (doc) {
        if (doc.fileType.startsWith('image/')) {
            const newWindow = window.open();
            newWindow.document.write(`<img src="${doc.fileData}" style="max-width: 100%;" />`);
        } else if (doc.fileType === 'application/pdf') {
            const newWindow = window.open();
            newWindow.document.write(`<iframe src="${doc.fileData}" width="100%" height="100%" style="border:none;"></iframe>`);
        }
    }
}

function downloadDocument(docId) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const doc = documents.find(d => d.id === docId);
    
    if (doc) {
        const link = document.createElement('a');
        link.href = doc.fileData;
        link.download = doc.fileName;
        link.click();
    }
}

function deleteDocument_OLD(docId) {
    if (confirm('Are you sure you want to delete this document?')) {
        const documents = JSON.parse(localStorage.getItem('documents') || '[]');
        const updatedDocuments = documents.filter(d => d.id !== docId);
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
        displayUserDocuments();
        alert('Document deleted successfully!');
    }
}

let selectedBillType
let currentBillPayment = null;
let currentChildId = null;

function speak(text) {
    const voicePreference = localStorage.getItem('voicePreference');
    if (voicePreference === 'yes' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}

function showBillPayments() {
    speak("Bill Payments module. Please select the type of bill you want to pay.");
    displayPaymentHistory();
    showScreen('bill-payments-screen');
}

function selectBillType(type) {
    selectedBillType = type;
    document.getElementById('selected-bill-type').textContent = type;
    document.getElementById('bill-payment-form-section').style.display = 'block';
    document.getElementById('consumer-number').value = '';
    document.getElementById('bill-amount').value = '';
    speak(`${type} bill selected. Please enter consumer number and amount.`);
}

function cancelBillPayment() {
    selectedBillType = '';
    document.getElementById('bill-payment-form-section').style.display = 'none';
}

function startVoiceConsumerNumber() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.replace(/\s/g, '');
        document.getElementById('consumer-number').value = transcript;
        speak(`Consumer number ${transcript} entered.`);
    };
    recognition.start();
}

function startVoiceAmount() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.replace(/\D/g, '');
        document.getElementById('bill-amount').value = transcript;
        speak(`Amount ${transcript} rupees entered.`);
    };
    recognition.start();
}

document.getElementById('bill-payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const consumerNumber = document.getElementById('consumer-number').value;
    const amount = document.getElementById('bill-amount').value;
    
    currentBillPayment = {
        type: selectedBillType,
        consumerNumber,
        amount,
        timestamp: Date.now()
    };
    
    speak("Please verify your PIN to proceed with payment.");
    document.getElementById('pin-lock-modal').style.display = 'flex';
    document.getElementById('pin1').focus();
});

function movePinFocus(current, nextId) {
    if (current.value.length === 1 && nextId) {
        document.getElementById(nextId).focus();
    }
}

function submitPinVerify() {
    const pin1 = document.getElementById('pin1').value;
    const pin2 = document.getElementById('pin2').value;
    const pin3 = document.getElementById('pin3').value;
    const pin4 = document.getElementById('pin4').value;
    
    if (pin1 && pin2 && pin3 && pin4) {
        const pin = pin1 + pin2 + pin3 + pin4;
        
        if (pin === '1234') {
            closePinModal();
            speak("PIN verified successfully. Please select a UPI app.");
            document.getElementById('upi-simulation-modal').style.display = 'flex';
        } else {
            alert('Incorrect PIN. Please try again with 1234.');
            clearPinInputs();
        }
    }
}

function clearPinInputs() {
    document.getElementById('pin1').value = '';
    document.getElementById('pin2').value = '';
    document.getElementById('pin3').value = '';
    document.getElementById('pin4').value = '';
    document.getElementById('pin1').focus();
}

function closePinModal() {
    document.getElementById('pin-lock-modal').style.display = 'none';
    clearPinInputs();
}

function processUPIPayment(upiApp) {
    speak(`Redirecting to ${upiApp} for payment.`);
    
    setTimeout(() => {
        speak("Payment successful!");
        
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        const payment = {
            id: 'P' + Date.now(),
            userId: currentUser.phone,
            billType: currentBillPayment.type,
            consumerNumber: currentBillPayment.consumerNumber,
            amount: currentBillPayment.amount,
            upiApp: upiApp,
            status: 'Success',
            timestamp: new Date().toISOString()
        };
        
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
        
        if (typeof syncBillPaymentToGoogleSheets === 'function') {
            syncBillPaymentToGoogleSheets({
                id: payment.id,
                userId: payment.userId,
                billType: payment.billType,
                service: payment.billType,
                consumerNumber: payment.consumerNumber,
                amount: payment.amount,
                paymentDate: payment.timestamp
            }).then(result => {
                if (result.success) {
                    console.log('Bill payment synced to Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
        
        document.getElementById('upi-simulation-modal').style.display = 'none';
        alert(`Payment of ₹${currentBillPayment.amount} successful via ${upiApp}!`);
        
        cancelBillPayment();
        displayPaymentHistory();
    }, 1500);
}

function displayPaymentHistory() {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const userPayments = payments.filter(p => p.userId === currentUser.phone);
    const historyItems = document.getElementById('payment-history-items');
    
    if (userPayments.length === 0) {
        historyItems.innerHTML = '<p style="text-align: center; color: #666;">No payment history</p>';
        return;
    }
    
    historyItems.innerHTML = userPayments.reverse().map(payment => `
        <div class="payment-item">
            <h4>${payment.billType} Bill - ₹${payment.amount}</h4>
            <p><strong>Payment ID:</strong> ${payment.id}</p>
            <p><strong>Consumer:</strong> ${payment.consumerNumber}</p>
            <p><strong>Paid via:</strong> ${payment.upiApp}</p>
            <p><strong>Date:</strong> ${new Date(payment.timestamp).toLocaleString()}</p>
            <span class="payment-status">✓ ${payment.status}</span>
        </div>
    `).join('');
}

function showChildren() {
    speak("Children module. You can add and manage child profiles here.");
    displayChildrenList();
    showScreen('children-screen');
}

function showAddChildForm() {
    document.getElementById('add-child-form-section').style.display = 'block';
    speak("Please enter child details.");
}

function cancelAddChild() {
    document.getElementById('add-child-form-section').style.display = 'none';
    document.getElementById('add-child-form').reset();
}

function startVoiceChildName() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = function(event) {
        document.getElementById('child-name').value = event.results[0][0].transcript;
    };
    recognition.start();
}

function startVoiceSchoolName() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = function(event) {
        document.getElementById('child-school').value = event.results[0][0].transcript;
    };
    recognition.start();
}
    

document.getElementById('add-child-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const child = {
        id: 'CH' + Date.now(),
        userId: currentUser.phone,
        name: document.getElementById('child-name').value,
        age: document.getElementById('child-age').value,
        school: document.getElementById('child-school').value,
        class: document.getElementById('child-class').value,
        attendance: [],
        vaccinations: [],
        resources: [],
        createdAt: new Date().toISOString()
    };
    
    children.push(child);
    localStorage.setItem('children', JSON.stringify(children));
    
    logActivity('child_added', { 
        childId: child.id,
        childName: child.name,
        userId: child.userId
    });
    
    if (typeof syncChildToGoogleSheets === 'function') {
        syncChildToGoogleSheets({
            id: child.id,
            userId: child.userId,
            name: child.name,
            dob: '',
            age: child.age,
            gender: '',
            birthCertificate: '',
            schoolName: child.school || '',
            grade: child.class || '',
            attendanceStreak: 0,
            vaccinations: child.vaccinations || [],
            resources: child.resources || [],
            addedAt: child.createdAt
        }).then(result => {
            if (result.success) {
                console.log('Child data synced to Google Sheets');
            } else {
                console.log('Google Sheets sync failed:', result.reason || result.error);
            }
        }).catch(err => {
            console.log('Google Sheets sync error:', err);
        });
    }
    
    if (typeof speak === 'function') {
        speak(`${child.name} added successfully.`);
    }
    alert('Child added successfully!');
    cancelAddChild();
    displayChildrenList();
});

function displayChildrenList() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    const childrenList = document.getElementById('children-list');
    
    if (userChildren.length === 0) {
        childrenList.innerHTML = '<p style="text-align: center; color: #666;">No children added yet</p>';
        return;
    }
    
    childrenList.innerHTML = userChildren.map(child => `
        <div class="child-card" onclick="viewChildDetail('${child.id}')">
            <h4>${child.name}</h4>
            <p><strong>Age:</strong> ${child.age} years</p>
            <p><strong>School:</strong> ${child.school}</p>
            <p><strong>Class:</strong> ${child.class}</p>
        </div>
    `).join('');
}

function viewChildDetail(childId) {
    currentChildId = childId;
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const child = children.find(c => c.id === childId);
    
    document.getElementById('child-detail-name').textContent = child.name;
    speak(`Viewing details for ${child.name}.`);
    
    showChildTab('attendance');
    showScreen('child-detail-screen');
}

function showChildTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    event.target?.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    if (tabName === 'attendance') {
        displayAttendance();
    } else if (tabName === 'vaccination') {
        displayVaccinations();
    } else if (tabName === 'learning') {
        displayResources();
    }
}

function displayAttendance() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const child = children.find(c => c.id === currentChildId);
    
    const today = new Date().toDateString();
    const streak = calculateStreak(child.attendance);
    
    document.getElementById('streak-number').textContent = streak;
    
    const calendar = document.getElementById('attendance-calendar');
    calendar.innerHTML = child.attendance.slice(-7).map(date => `
        <div class="attendance-day">
            <span>✓</span>
            <p>${new Date(date).toLocaleDateString()}</p>
        </div>
    `).join('');
}

function calculateStreak(attendance) {
    if (!attendance || attendance.length === 0) return 0;
    
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    
    for (let i = attendance.length - 1; i >= 0; i--) {
        const attDate = new Date(attendance[i]).setHours(0, 0, 0, 0);
        const expectedDate = today - (streak * 24 * 60 * 60 * 1000);
        
        if (attDate === expectedDate) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function markAttendance() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const childIndex = children.findIndex(c => c.id === currentChildId);
    
    const today = new Date().toDateString();
    
    if (children[childIndex].attendance.some(d => new Date(d).toDateString() === today)) {
        alert('Attendance already marked for today!');
        return;
    }
    
    children[childIndex].attendance.push(new Date().toISOString());
    localStorage.setItem('children', JSON.stringify(children));
    
    speak("Attendance marked successfully.");
    alert('Attendance marked!');
    displayAttendance();
    
    const streak = calculateStreak(children[childIndex].attendance);
    if (streak > 0 && streak % 7 === 0) {
        setTimeout(() => speak(`Great job! ${streak} day streak achieved!`), 1000);
    }
}

function showAddVaccineForm() {
    document.getElementById('add-vaccine-form').style.display = 'block';
}

function cancelAddVaccine() {
    document.getElementById('add-vaccine-form').style.display = 'none';
    document.getElementById('vaccine-form').reset();
}

document.getElementById('vaccine-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const childIndex = children.findIndex(c => c.id === currentChildId);
    
    const vaccination = {
        id: 'V' + Date.now(),
        name: document.getElementById('vaccine-name').value,
        dueDate: document.getElementById('vaccine-date').value,
        status: 'Pending'
    };
    
    children[childIndex].vaccinations.push(vaccination);
    localStorage.setItem('children', JSON.stringify(children));
    
    speak(`Vaccination reminder for ${vaccination.name} added.`);
    alert('Vaccination reminder added!');
    cancelAddVaccine();
    displayVaccinations();
    
    checkVaccinationReminders();
});

function displayVaccinations() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const child = children.find(c => c.id === currentChildId);
    const vaccList = document.getElementById('vaccination-list');
    
    if (!child.vaccinations || child.vaccinations.length === 0) {
        vaccList.innerHTML = '<p style="text-align: center; color: #666;">No vaccinations added</p>';
        return;
    }
    
    vaccList.innerHTML = child.vaccinations.map(vacc => {
        const daysUntil = Math.ceil((new Date(vacc.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysUntil < 0;
        const isDueSoon = daysUntil >= 0 && daysUntil <= 7;
        
        return `
            <div class="vaccination-item ${isOverdue ? 'overdue' : isDueSoon ? 'due-soon' : ''}">
                <h4>${vacc.name}</h4>
                <p><strong>Due Date:</strong> ${new Date(vacc.dueDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${vacc.status}</p>
                ${isOverdue ? '<p class="warning">⚠️ Overdue!</p>' : ''}
                ${isDueSoon && !isOverdue ? '<p class="info">📅 Due soon!</p>' : ''}
            </div>
        `;
    }).join('');
}

function checkVaccinationReminders() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    
    userChildren.forEach(child => {
        child.vaccinations?.forEach(vacc => {
            const daysUntil = Math.ceil((new Date(vacc.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            
            if (daysUntil === 0) {
                speak(`Reminder: ${child.name}'s ${vacc.name} vaccination is due today.`);
            } else if (daysUntil === 1) {
                speak(`Reminder: ${child.name}'s ${vacc.name} vaccination is due tomorrow.`);
            }
        });
    });
}

function showAddResourceForm() {
    document.getElementById('add-resource-form').style.display = 'block';
    
    document.getElementById('resource-type').addEventListener('change', function() {
        const type = this.value;
        document.getElementById('resource-file').style.display = type === 'PDF' ? 'block' : 'none';
        document.getElementById('resource-url').style.display = type !== 'PDF' ? 'block' : 'none';
    });
}

function cancelAddResource() {
    document.getElementById('add-resource-form').style.display = 'none';
    document.getElementById('resource-form').reset();
}

document.getElementById('resource-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const childIndex = children.findIndex(c => c.id === currentChildId);
    
    const type = document.getElementById('resource-type').value;
    let resourceData = '';
    
    if (type === 'PDF') {
        const file = document.getElementById('resource-file').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const resource = {
                    id: 'R' + Date.now(),
                    title: document.getElementById('resource-title').value,
                    type: type,
                    data: event.target.result,
                    addedAt: new Date().toISOString()
                };
                
                children[childIndex].resources.push(resource);
                localStorage.setItem('children', JSON.stringify(children));
                
                speak(`Resource ${resource.title} added successfully.`);
                alert('Resource added!');
                cancelAddResource();
                displayResources();
            };
            reader.readAsDataURL(file);
        }
    } else {
        const resource = {
            id: 'R' + Date.now(),
            title: document.getElementById('resource-title').value,
            type: type,
            data: document.getElementById('resource-url').value,
            addedAt: new Date().toISOString()
        };
        
        children[childIndex].resources.push(resource);
        localStorage.setItem('children', JSON.stringify(children));
        
        speak(`Resource ${resource.title} added successfully.`);
        alert('Resource added!');
        cancelAddResource();
        displayResources();
    }
});

function displayResources() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const child = children.find(c => c.id === currentChildId);
    const resourcesList = document.getElementById('resources-list');
    
    if (!child.resources || child.resources.length === 0) {
        resourcesList.innerHTML = '<p style="text-align: center; color: #666;">No resources added</p>';
        return;
    }
    
    resourcesList.innerHTML = child.resources.map(resource => `
        <div class="resource-item">
            <h4>${resource.title}</h4>
            <p><strong>Type:</strong> ${resource.type}</p>
            <p><strong>Added:</strong> ${new Date(resource.addedAt).toLocaleDateString()}</p>
            ${resource.type === 'PDF' ? 
                `<a href="${resource.data}" download="${resource.title}.pdf" class="btn-secondary">Download PDF</a>` :
                `<a href="${resource.data}" target="_blank" class="btn-secondary">Open Link</a>`
            }
        </div>
    `).join('');
}

setInterval(checkVaccinationReminders, 60000);

window.addEventListener('load', function() {
    if (currentUser) {
        checkVaccinationReminders();
    }
});

function displayOfficialComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const deptComplaints = complaints.filter(c => c.department === currentOfficial.department || c.department === 'General');
    const complaintsListEl = document.getElementById('official-complaints-list');
    document.getElementById('official-dept-complaints').textContent = currentOfficial.department;
    
    if (deptComplaints.length === 0) {
        complaintsListEl.innerHTML = '<p style="text-align: center; color: #666;">No complaints for your department</p>';
        return;
    }
    
    complaintsListEl.innerHTML = deptComplaints.map(complaint => `
        <div class="complaint-item" onclick="viewComplaintDetail('${complaint.id}')">
            <h4>Complaint ID: ${complaint.id}</h4>
            <p><strong>Department:</strong> ${complaint.department}</p>
            <p><strong>Description:</strong> ${complaint.description.substring(0, 100)}${complaint.description.length > 100 ? '...' : ''}</p>
            <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
            <p><strong>User Phone:</strong> ${complaint.userId}</p>
            <span class="complaint-status status-${complaint.status.toLowerCase().replace(/ /g, '.')}">${complaint.status}</span>
        </div>
    `).join('');
}

function viewComplaintDetail(complaintId) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (!complaint) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.phone === complaint.userId);
    
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const userDocuments = documents.filter(d => d.userId === complaint.userId);
    
    let detailContent = `
        <p><strong>Complaint ID:</strong> ${complaint.id}</p>
        <p><strong>Department:</strong> ${complaint.department}</p>
        <p><strong>Status:</strong> <span class="complaint-status status-${complaint.status.toLowerCase().replace(/ /g, '.')}">${complaint.status}</span></p>
        <p><strong>Description:</strong> ${complaint.description}</p>
        <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
        <p><strong>User:</strong> ${user ? user.email : complaint.userId}</p>
    `;
    
    if (userDocuments.length > 0) {
        detailContent += `<p><strong>User Documents:</strong></p><div class="user-documents-list">`;
        userDocuments.forEach(doc => {
            detailContent += `<button class="btn-secondary" onclick="viewOfficialDocument('${doc.id}')" style="margin: 5px;">${doc.name} (${doc.type})</button>`;
        });
        detailContent += `</div>`;
    }
    
    document.getElementById('complaint-detail-content').innerHTML = detailContent;
    
    let actionsHtml = '';
    if (currentOfficial.category === '1') {
        if (complaint.status === 'Pending' || complaint.status === 'In Progress') {
            actionsHtml = `
                <button class="btn-primary" onclick="updateComplaintStatus('${complaint.id}', 'In Progress')">Mark In Progress</button>
                <button class="btn-primary" onclick="updateComplaintStatus('${complaint.id}', 'Resolved')">Mark Resolved</button>
            `;
        }
    } else if (currentOfficial.category === '2') {
        if (complaint.status === 'Resolved') {
        
        if (typeof updateComplaintStatusInGoogleSheets === 'function') {
            updateComplaintStatusInGoogleSheets(complaintId, newStatus).then(result => {
                if (result.success) {
                    console.log('Complaint status updated in Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
            actionsHtml = `
                <button class="btn-primary" onclick="verifyComplaint('${complaint.id}')">Verify Resolution</button>
            `;
        }
    }
    
    document.getElementById('complaint-actions-section').innerHTML = actionsHtml;
    document.getElementById('complaint-detail-modal').style.display = 'flex';
}

function closeComplaintDetailModal() {
    document.getElementById('complaint-detail-modal').style.display = 'none';
}

function updateComplaintStatus(complaintId, newStatus) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    
    if (complaintIndex !== -1) {
        complaints[complaintIndex].status = newStatus;
        complaints[complaintIndex].updatedAt = new Date().toISOString();
        complaints[complaintIndex].updatedBy = currentOfficial.email;
        
        localStorage.setItem('complaints', JSON.stringify(complaints));
        
        alert(`Complaint ${complaintId} marked as ${newStatus}`);
        closeComplaintDetailModal();
        displayOfficialComplaints();
    displayOfficialDocuments();
    }
}

function verifyComplaint(complaintId) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    
    if (complaintIndex !== -1) {
        complaints[complaintIndex].status = 'Verified';
        complaints[complaintIndex].verifiedAt = new Date().toISOString();
        complaints[complaintIndex].verifiedBy = currentOfficial.email;
        
        localStorage.setItem('complaints', JSON.stringify(complaints));
        
        alert(`Complaint ${complaintId} has been verified`);
        closeComplaintDetailModal();
        displayOfficialComplaints();
    displayOfficialDocuments();
    }
}

function viewOfficialDocument(docId) {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const doc = documents.find(d => d.id === docId);
    
    if (doc) {
        if (doc.fileType.startsWith('image/')) {
            const newWindow = window.open();
            newWindow.document.write(`<html><head><title>${doc.name}</title></head><body><img src="${doc.fileData}" style="max-width: 100%;" /></body></html>`);
        } else if (doc.fileType === 'application/pdf') {
            const newWindow = window.open();
            newWindow.document.write(`<html><head><title>${doc.name}</title></head><body><iframe src="${doc.fileData}" width="100%" height="100%" style="border:none;"></iframe></body></html>`);
        }
    }
}

window.addEventListener('storage', function(e) {
    if (e.key === 'complaints' && currentUser) {
        if (document.getElementById('complaints-screen').classList.contains('active')) {
            displayUserComplaints();
        }
    } else if (e.key === 'complaints' && currentOfficial) {
        if (document.getElementById('official-dashboard-screen').classList.contains('active')) {
            displayOfficialComplaints();
    displayOfficialDocuments();
        }
    } else if (e.key === 'documents' && currentUser) {
        if (document.getElementById('documents-screen').classList.contains('active')) {
            displayUserDocuments();
        }
    }
});

function displayOfficialDocuments() {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const officialDocsList = document.getElementById('official-documents-list');
    
    if (documents.length === 0) {
        officialDocsList.innerHTML = '<p style="text-align: center; color: #666;">No documents in system</p>';
        return;
    }
    
    officialDocsList.innerHTML = documents.map(doc => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.phone === doc.userId);
        const userName = user ? user.email.split('@')[0] : 'Unknown User';
        
        return `
            <div class="document-item">
                <div class="document-item-header">
                    <h4>${sanitizeHTML(doc.name)}</h4>
                    <span class="document-type-badge">${sanitizeHTML(doc.type)}</span>
                </div>
                <p><strong>User:</strong> ${sanitizeHTML(userName)} (${sanitizeHTML(doc.userId)})</p>
                <p><strong>File:</strong> ${sanitizeHTML(doc.fileName)}</p>
                <p><strong>Uploaded:</strong> ${new Date(doc.uploadedAt).toLocaleString()}</p>
                <div class="document-actions">
                    <button class="btn-secondary" onclick=\"viewDocument('${sanitizeHTML(doc.id)}')\">View</button>
                    <button class="btn-secondary" onclick=\"downloadDocument('${sanitizeHTML(doc.id)}')\">Download</button>
                </div>
            </div>
        `;
    }).join('');
}

function safeGetDocuments() {
    try {
        const data = localStorage.getItem('documents');
        if (!data) return [];
        const documents = JSON.parse(data);
        return Array.isArray(documents) ? documents : [];
    } catch (e) {
        console.error('Error reading documents from localStorage:', e);
        return [];
    }
}

function safeGetComplaints() {
    try {
        const data = localStorage.getItem('complaints');
        if (!data) return [];
        const complaints = JSON.parse(data);
        return Array.isArray(complaints) ? complaints : [];
    } catch (e) {
        console.error('Error reading complaints from localStorage:', e);
        return [];
    }
}


function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
function deleteDocument(docId) {
    if (confirm('Are you sure you want to delete this document?')) {
        try {
            const documents = safeGetDocuments();
            const updatedDocuments = documents.filter(d => d.id !== docId);
            localStorage.setItem('documents', JSON.stringify(updatedDocuments));
            
            if (currentUser) {
                displayUserDocuments();
                if (typeof displayDashboardSummary === 'function') {
                    displayDashboardSummary();
                }
            }
            
            if (currentOfficial && typeof displayOfficialDocuments === 'function') {
                displayOfficialDocuments();
            }
            
            alert('Document deleted successfully!');
        } catch (e) {
            console.error('Error deleting document:', e);
            alert('Error deleting document. Please try again.');
        }
    }
}

function getCurrentUserId() {
    if (currentUser) return currentUser.phone;
    if (currentOfficial) return 'official_' + currentOfficial.email;
    return null;
}

function createNotification(type, title, message, userId, data = {}) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    const notification = {
        id: 'N' + Date.now(),
        type: type,
        title: title,
        message: message,
        userId: userId,
        data: data,
        read: false,
        createdAt: new Date().toISOString()
    };
    
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    const currentId = getCurrentUserId();
    if (currentId && currentId === userId) {
        showNotificationPopup(notification);
        speakNotification(notification);
    }
    
    updateNotificationBadge();
    return notification;
}

function getUserNotifications(userId, unreadOnly = false) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    let userNotifications = notifications.filter(n => n.userId === userId);
    
    if (unreadOnly) {
        userNotifications = userNotifications.filter(n => !n.read);
    }
    
    return userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function markNotificationAsRead(notificationId) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const index = notifications.findIndex(n => n.id === notificationId);
    
    if (index !== -1) {
        notifications[index].read = true;
        localStorage.setItem('notifications', JSON.stringify(notifications));
        updateNotificationBadge();
    }
}

function deleteNotification(notificationId) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const filtered = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem('notifications', JSON.stringify(filtered));
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    const unreadNotifications = getUserNotifications(userId, true);
    
    const userBadge = document.getElementById('notification-badge');
    const officialBadge = document.getElementById('notification-badge-official');
    const badge = currentUser ? userBadge : officialBadge;
    
    if (badge) {
        badge.textContent = unreadNotifications.length;
        badge.style.display = unreadNotifications.length > 0 ? 'inline-block' : 'none';
    }
}

function speakNotification(notification) {
    const voicePreference = localStorage.getItem('voicePreference');
    if (voicePreference === 'yes') {
        const message = `${notification.title}. ${notification.message}`;
        speak(message);
    }
}

function showNotificationPopup(notification) {
    const popup = document.createElement('div');
    popup.className = 'notification-popup';
    popup.innerHTML = `
        <div class="notification-popup-content">
            <div class="notification-popup-header">
                <strong>${sanitizeHTML(notification.title)}</strong>
                <button class="notification-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <p>${sanitizeHTML(notification.message)}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 5000);
}

function toggleNotificationCenter() {
    const center = document.getElementById('notification-center');
    if (center.classList.contains('open')) {
        center.classList.remove('open');
    } else {
        center.classList.add('open');
        displayNotifications();
    }
}

function displayNotifications() {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    const notifications = getUserNotifications(userId);
    const container = document.getElementById('notifications-list');
    
    if (notifications.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No notifications</p>';
        return;
    }
    
    container.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.read ? 'read' : 'unread'}" onclick="handleNotificationClick('${n.id}')">
            <div class="notification-icon">${getNotificationIcon(n.type)}</div>
            <div class="notification-content">
                <h5>${sanitizeHTML(n.title)}</h5>
                <p>${sanitizeHTML(n.message)}</p>
                <small>${getTimeAgo(n.createdAt)}</small>
            </div>
            <button class="notification-delete" onclick="event.stopPropagation(); deleteNotificationAndRefresh('${n.id}')">×</button>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    const icons = {
        'school_attendance': '🎓',
        'vaccination': '💉',
        'bill_payment': '💰',
        'complaint_update': '📝',
        'general': '🔔'
    };
    return icons[type] || icons['general'];
}

function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function handleNotificationClick(notificationId) {
    markNotificationAsRead(notificationId);
    displayNotifications();
}

function deleteNotificationAndRefresh(notificationId) {
    deleteNotification(notificationId);
    displayNotifications();
}

function checkSchoolAttendanceReminders() {
    if (!currentUser) return;
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    
    userChildren.forEach(child => {
        if (!child.school) return;
        
        const today = new Date().toDateString();
        const hasAttendanceToday = child.attendance?.some(d => new Date(d).toDateString() === today);
        
        if (!hasAttendanceToday) {
            const now = new Date();
            const hour = now.getHours();
            
            if (hour >= 7 && hour < 9) {
                const existingReminder = getUserNotifications(currentUser.phone)
                    .find(n => n.type === 'school_attendance' && 
                               n.data.childId === child.id &&
                               new Date(n.createdAt).toDateString() === today);
                
                if (!existingReminder) {
                    createNotification(
                        'school_attendance',
                        'School Attendance Reminder',
                        `Don't forget to mark attendance for ${child.name} at ${child.school}`,
                        currentUser.phone,
                        { childId: child.id, childName: child.name, school: child.school }
                    );
                }
            }
        }
    });
}

function checkVaccinationReminders() {
    if (!currentUser) return;
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    
    userChildren.forEach(child => {
        child.vaccinations?.forEach(vacc => {
            const dueDate = new Date(vacc.dueDate);
            const today = new Date();
            const diffTime = dueDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0 || diffDays === 1 || diffDays === 3 || diffDays === 7) {
                const todayStr = today.toDateString();
                const existingReminder = getUserNotifications(currentUser.phone)
                    .find(n => n.type === 'vaccination' && 
                               n.data.vaccineId === vacc.id &&
                               new Date(n.createdAt).toDateString() === todayStr);
                
                if (!existingReminder && vacc.status !== 'Completed') {
                    const message = diffDays === 0 
                        ? `${child.name}'s ${vacc.name} vaccination is due today!`
                        : diffDays === 1
                        ? `${child.name}'s ${vacc.name} vaccination is due tomorrow`
                        : `${child.name}'s ${vacc.name} vaccination is due in ${diffDays} days`;
                    
                    createNotification(
                        'vaccination',
                        'Vaccination Reminder',
                        message,
                        currentUser.phone,
                        { childId: child.id, childName: child.name, vaccineId: vacc.id, vaccineName: vacc.name, dueDate: vacc.dueDate }
                    );
                }
            }
        });
    });
}

function checkBillPaymentReminders() {
    if (!currentUser) return;
    
    const bills = JSON.parse(localStorage.getItem('billReminders') || '[]');
    const userBills = bills.filter(b => b.userId === currentUser.phone);
    
    userBills.forEach(bill => {
        const dueDate = new Date(bill.dueDate);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 0 && diffDays <= 3) {
            const todayStr = today.toDateString();
            const existingReminder = getUserNotifications(currentUser.phone)
                .find(n => n.type === 'bill_payment' && 
                           n.data.billId === bill.id &&
                           new Date(n.createdAt).toDateString() === todayStr);
            
            if (!existingReminder && bill.status !== 'Paid') {
                const message = diffDays === 0
                    ? `Your ${bill.type} bill is due today! Amount: ₹${bill.amount}`
                    : `Your ${bill.type} bill is due in ${diffDays} day${diffDays > 1 ? 's' : ''}. Amount: ₹${bill.amount}`;
                
                createNotification(
                    'bill_payment',
                    'Bill Payment Reminder',
                    message,
                    currentUser.phone,
                    { billId: bill.id, billType: bill.type, amount: bill.amount, dueDate: bill.dueDate }
                );
            }
        }
    });
}

function checkComplaintStatusChanges() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const lastCheck = localStorage.getItem('lastComplaintCheck') || '{}';
    const lastCheckData = JSON.parse(lastCheck);
    
    complaints.forEach(complaint => {
        const previousStatus = lastCheckData[complaint.id];
        
        if (previousStatus && previousStatus !== complaint.status) {
            const existingNotification = getUserNotifications(complaint.userId)
                .find(n => n.type === 'complaint_update' && 
                           n.data.complaintId === complaint.id &&
                           n.data.newStatus === complaint.status);
            
            if (!existingNotification) {
                createNotification(
                    'complaint_update',
                    'Complaint Status Updated',
                    `Your complaint ${complaint.id} status changed from "${previousStatus}" to "${complaint.status}"`,
                    complaint.userId,
                    { complaintId: complaint.id, oldStatus: previousStatus, newStatus: complaint.status, department: complaint.department }
                );
            }
        }
        
        lastCheckData[complaint.id] = complaint.status;
    });
    
    localStorage.setItem('lastComplaintCheck', JSON.stringify(lastCheckData));
}

function initializeComplaintStatusTracking() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const lastCheckData = {};
    
    complaints.forEach(complaint => {
        lastCheckData[complaint.id] = complaint.status;
    });
    
    localStorage.setItem('lastComplaintCheck', JSON.stringify(lastCheckData));
}

function runAllNotificationChecks() {
    if (currentUser) {
        checkSchoolAttendanceReminders();
        checkVaccinationReminders();
        checkBillPaymentReminders();
        checkComplaintStatusChanges();
        updateNotificationBadge();
    }
}

function initializeNotificationSystem() {
    if (!localStorage.getItem('lastComplaintCheck')) {
        initializeComplaintStatusTracking();
    }
    
    runAllNotificationChecks();
    
    setInterval(runAllNotificationChecks, 60000);
    
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 9) {
        setTimeout(checkSchoolAttendanceReminders, 5000);
    }
}

window.addEventListener('load', function() {
    if (currentUser || currentOfficial) {
        initializeNotificationSystem();
    }
});

function saveBillReminder(billType, amount, dueDate) {
    if (!currentUser) return;
    
    const bills = JSON.parse(localStorage.getItem('billReminders') || '[]');
    
    const bill = {
        id: 'BR' + Date.now(),
        userId: currentUser.phone,
        type: billType,
        amount: amount,
        dueDate: dueDate,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };
    
    bills.push(bill);
    localStorage.setItem('billReminders', JSON.stringify(bills));
    
    checkBillPaymentReminders();
    return bill;
}

function markBillAsPaid(billId) {
    const bills = JSON.parse(localStorage.getItem('billReminders') || '[]');
    const index = bills.findIndex(b => b.id === billId);
    
    if (index !== -1) {
        bills[index].status = 'Paid';
        bills[index].paidAt = new Date().toISOString();
        localStorage.setItem('billReminders', JSON.stringify(bills));
    }
}

const originalShowUserDashboard = showUserDashboard;
showUserDashboard = function() {
    originalShowUserDashboard();
    initializeNotificationSystem();
    updateNotificationBadge();
};


function createComplaintNotificationForOfficial(complaintId, userId, oldStatus, newStatus, department) {
    const officials = JSON.parse(localStorage.getItem('officials') || '[]');
    const deptOfficials = officials.filter(o => o.department === department);
    
    deptOfficials.forEach(official => {
        const officialId = 'official_' + official.email;
        createNotification(
            'complaint_update',
            'Complaint Updated',
            `Complaint ${complaintId} status changed from "${oldStatus}" to "${newStatus}"`,
            officialId,
            { complaintId, oldStatus, newStatus, department, originalUserId: userId }
        );
    });
}

const originalUpdateComplaintStatus2 = updateComplaintStatus;
updateComplaintStatus = function(complaintId, newStatus) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaint = complaints.find(c => c.id === complaintId);
    const oldStatus = complaint ? complaint.status : null;
    
    originalUpdateComplaintStatus2(complaintId, newStatus);
    
    if (complaint) {
        setTimeout(() => {
            checkComplaintStatusChanges();
            createComplaintNotificationForOfficial(complaintId, complaint.userId, oldStatus, newStatus, complaint.department);
        }, 500);
    }
};

const originalShowOfficialDashboard = showOfficialDashboard;
showOfficialDashboard = function() {
    originalShowOfficialDashboard();
    initializeNotificationSystem();
    updateNotificationBadge();
};

let globalSearchResults = {
    schemes: [],
    complaints: [],
    payments: [],
    children: [],
    documents: []
};

let currentSearchTerm = '';
let voiceSearchRecognition = null;

function performGlobalSearch() {
    const searchTerm = document.getElementById('global-search-input').value.trim();
    
    if (searchTerm.length === 0) {
        document.getElementById('global-search-status').textContent = '';
        return;
    }
    
    if (searchTerm.length < 2) {
        document.getElementById('global-search-status').textContent = 'Type at least 2 characters to search';
        return;
    }
    
    currentSearchTerm = searchTerm;
    performSearch(searchTerm);
    
    const resultCount = Object.values(globalSearchResults).reduce((sum, arr) => sum + arr.length, 0);
    document.getElementById('global-search-status').textContent = `Found ${resultCount} result${resultCount !== 1 ? 's' : ''}. Click to view all →`;
    document.getElementById('global-search-status').style.cursor = 'pointer';
    document.getElementById('global-search-status').onclick = showGlobalSearchResults;
}

function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    globalSearchResults.schemes = schemes.filter(s => 
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.benefits.toLowerCase().includes(term) ||
        s.eligibility.toLowerCase().includes(term)
    );
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const userComplaints = complaints.filter(c => c.userId === currentUser.phone);
    globalSearchResults.complaints = userComplaints.filter(c =>
        c.id.toLowerCase().includes(term) ||
        c.department.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.status.toLowerCase().includes(term)
    );
    
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const userPayments = payments.filter(p => p.userId === currentUser.phone);
    globalSearchResults.payments = userPayments.filter(p =>
        p.id.toLowerCase().includes(term) ||
        p.billType.toLowerCase().includes(term) ||
        p.consumerNumber.toLowerCase().includes(term) ||
        p.upiApp.toLowerCase().includes(term)
    );
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    globalSearchResults.children = userChildren.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.school.toLowerCase().includes(term) ||
        c.class.toLowerCase().includes(term)
    );
    
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const userDocuments = documents.filter(d => d.userId === currentUser.phone);
    globalSearchResults.documents = userDocuments.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.type.toLowerCase().includes(term) ||
        d.fileName.toLowerCase().includes(term)
    );
}

function showGlobalSearchResults() {
    document.getElementById('search-results-input').value = currentSearchTerm;
    populateDepartmentFilter();
    showScreen('global-search-results-screen');
    displaySearchResults();
}

function performGlobalSearchFromResults() {
    const searchTerm = document.getElementById('search-results-input').value.trim();
    currentSearchTerm = searchTerm;
    
    if (searchTerm.length < 2) {
        document.getElementById('search-results-display').innerHTML = '<p class="search-info">Type at least 2 characters to search</p>';
        return;
    }
    
    performSearch(searchTerm);
    applyFilters();
}

function populateDepartmentFilter() {
    const departments = JSON.parse(localStorage.getItem('departments') || '[]');
    const deptFilter = document.getElementById('filter-complaint-dept');
    deptFilter.innerHTML = '<option value="">All Departments</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        deptFilter.appendChild(option);
    });
}

function applyFilters() {
    const complaintDept = document.getElementById('filter-complaint-dept').value;
    const complaintStatus = document.getElementById('filter-complaint-status').value;
    const documentType = document.getElementById('filter-document-type').value;
    const paymentType = document.getElementById('filter-payment-type').value;
    
    let filteredResults = { ...globalSearchResults };
    
    if (complaintDept) {
        filteredResults.complaints = filteredResults.complaints.filter(c => c.department === complaintDept);
    }
    if (complaintStatus) {
        filteredResults.complaints = filteredResults.complaints.filter(c => c.status === complaintStatus);
    }
    
    if (documentType) {
        filteredResults.documents = filteredResults.documents.filter(d => d.type === documentType);
    }
    
    if (paymentType) {
        filteredResults.payments = filteredResults.payments.filter(p => p.billType === paymentType);
    }
    
    displaySearchResults(filteredResults);
}

function clearAllFilters() {
    document.getElementById('filter-complaint-dept').value = '';
    document.getElementById('filter-complaint-status').value = '';
    document.getElementById('filter-document-type').value = '';
    document.getElementById('filter-payment-type').value = '';
    displaySearchResults();
}

function displaySearchResults(results = globalSearchResults) {
    const display = document.getElementById('search-results-display');
    
    if (currentSearchTerm.length < 2) {
        display.innerHTML = '<p class="search-info">Enter a search term to find results across Schemes, Complaints, Payments, Children, and Documents</p>';
        return;
    }
    
    const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
    
    if (totalResults === 0) {
        display.innerHTML = `<p class="no-results">No results found for "${sanitizeHTML(currentSearchTerm)}"</p>`;
        return;
    }
    
    let html = `<div class="search-summary">Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${sanitizeHTML(currentSearchTerm)}"</div>`;
    
    if (results.schemes.length > 0) {
        html += `<div class="search-category">
            <h3 class="category-header">📋 Government Schemes (${results.schemes.length})</h3>`;
        results.schemes.forEach(scheme => {
            html += `
                <div class="search-result-item scheme-result">
                    <h4>${highlightText(scheme.name, currentSearchTerm)}</h4>
                    <p><strong>Description:</strong> ${highlightText(scheme.description, currentSearchTerm)}</p>
                    <p><strong>Benefits:</strong> ${highlightText(scheme.benefits, currentSearchTerm)}</p>
                    <span class="result-badge scheme-badge">${scheme.type}</span>
                </div>`;
        });
        html += '</div>';
    }
    
    if (results.complaints.length > 0) {
        html += `<div class="search-category">
            <h3 class="category-header">📝 Complaints (${results.complaints.length})</h3>`;
        results.complaints.forEach(complaint => {
            const statusClass = complaint.status.toLowerCase().replace(/\s+/g, '-');
            html += `
                <div class="search-result-item complaint-result">
                    <h4>ID: ${highlightText(complaint.id, currentSearchTerm)}</h4>
                    <p><strong>Department:</strong> ${highlightText(complaint.department, currentSearchTerm)}</p>
                    <p><strong>Description:</strong> ${highlightText(complaint.description, currentSearchTerm)}</p>
                    <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleDateString()}</p>
                    <span class="result-badge complaint-status status-${statusClass}">${complaint.status}</span>
                </div>`;
        });
        html += '</div>';
    }
    
    if (results.payments.length > 0) {
        html += `<div class="search-category">
            <h3 class="category-header">💰 Payments (${results.payments.length})</h3>`;
        results.payments.forEach(payment => {
            html += `
                <div class="search-result-item payment-result">
                    <h4>${highlightText(payment.billType, currentSearchTerm)} Bill - ₹${payment.amount}</h4>
                    <p><strong>Payment ID:</strong> ${highlightText(payment.id, currentSearchTerm)}</p>
                    <p><strong>Consumer:</strong> ${highlightText(payment.consumerNumber, currentSearchTerm)}</p>
                    <p><strong>Paid via:</strong> ${highlightText(payment.upiApp, currentSearchTerm)}</p>
                    <p><strong>Date:</strong> ${new Date(payment.timestamp).toLocaleDateString()}</p>
                    <span class="result-badge payment-badge">✓ ${payment.status}</span>
                </div>`;
        });
        html += '</div>';
    }
    
    if (results.children.length > 0) {
        html += `<div class="search-category">
            <h3 class="category-header">👶 Children (${results.children.length})</h3>`;
        results.children.forEach(child => {
            html += `
                <div class="search-result-item child-result">
                    <h4>${highlightText(child.name, currentSearchTerm)}</h4>
                    <p><strong>Age:</strong> ${child.age} years</p>
                    <p><strong>School:</strong> ${highlightText(child.school, currentSearchTerm)}</p>
                    <p><strong>Class:</strong> ${highlightText(child.class, currentSearchTerm)}</p>
                    <span class="result-badge child-badge">Child Profile</span>
                </div>`;
        });
        html += '</div>';
    }
    
    if (results.documents.length > 0) {
        html += `<div class="search-category">
            <h3 class="category-header">📄 Documents (${results.documents.length})</h3>`;
        results.documents.forEach(doc => {
            html += `
                <div class="search-result-item document-result">
                    <h4>${highlightText(doc.name, currentSearchTerm)}</h4>
                    <p><strong>Type:</strong> ${highlightText(doc.type, currentSearchTerm)}</p>
                    <p><strong>File:</strong> ${highlightText(doc.fileName, currentSearchTerm)}</p>
                    <p><strong>Uploaded:</strong> ${new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    <span class="result-badge document-badge">${doc.type}</span>
                </div>`;
        });
        html += '</div>';
    }
    
    display.innerHTML = html;
}

function highlightText(text, searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return sanitizeHTML(text);
    
    const safeText = sanitizeHTML(text);
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return safeText.replace(regex, '<mark>$1</mark>');
}

function startGlobalVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceSearchRecognition = new SpeechRecognition();
    voiceSearchRecognition.lang = 'en-IN';
    voiceSearchRecognition.continuous = false;
    voiceSearchRecognition.interimResults = false;
    
    const voiceBtn = document.getElementById('global-voice-btn');
    const searchInput = document.getElementById('global-search-input');
    
    voiceSearchRecognition.onstart = function() {
        voiceBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
        voiceBtn.style.animation = 'pulse 1.5s infinite';
        searchInput.placeholder = 'Listening...';
        document.getElementById('global-search-status').textContent = '🎤 Listening...';
    };
    
    voiceSearchRecognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        performGlobalSearch();
    };
    
    voiceSearchRecognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
        resetVoiceButton();
    };
    
    voiceSearchRecognition.onend = function() {
        resetVoiceButton();
    };
    
    voiceSearchRecognition.start();
}

function startSearchResultsVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    const searchInput = document.getElementById('search-results-input');
    
    recognition.onstart = function() {
        searchInput.placeholder = 'Listening...';
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        performGlobalSearchFromResults();
    };
    
    recognition.onerror = function(event) {
        alert('Voice recognition error: ' + event.error);
        searchInput.placeholder = 'Search across all services...';
    };
    
    recognition.onend = function() {
        searchInput.placeholder = 'Search across all services...';
    };
    
    recognition.start();
}

function resetVoiceButton() {
    const voiceBtn = document.getElementById('global-voice-btn');
    const searchInput = document.getElementById('global-search-input');
    if (voiceBtn) {
        voiceBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        voiceBtn.style.animation = 'none';
    }
    if (searchInput) {
        searchInput.placeholder = 'Search across all services...';
    }
}

function showUserAnalytics() {
    displayUserAnalytics();
    showScreen('user-analytics-screen');
}

function showOfficialAnalytics() {
    displayOfficialAnalytics();
    showScreen('official-analytics-screen');
}

function displayUserAnalytics() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const userComplaints = complaints.filter(c => c.userId === currentUser.phone);
    
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const userPayments = payments.filter(p => p.userId === currentUser.phone);
    
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const userDocuments = documents.filter(d => d.userId === currentUser.phone);
    
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const userChildren = children.filter(c => c.userId === currentUser.phone);
    
    document.getElementById('user-total-complaints').textContent = userComplaints.length;
    displayUserComplaintsChart(userComplaints);
    
    const totalAmount = userPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    document.getElementById('user-total-payments').textContent = userPayments.length;
    document.getElementById('user-total-amount').textContent = `₹${totalAmount.toFixed(2)}`;
    displayUserPaymentsChart(userPayments);
    
    document.getElementById('user-total-documents').textContent = userDocuments.length;
    displayUserDocumentsBreakdown(userDocuments);
    
    displayUserChildrenAttendance(userChildren);
}

function displayUserComplaintsChart(complaints) {
    const statusCounts = {};
    complaints.forEach(c => {
        statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });
    
    const breakdownEl = document.getElementById('user-complaints-breakdown');
    const canvas = document.getElementById('user-complaints-chart');
    
    if (Object.keys(statusCounts).length === 0) {
        breakdownEl.innerHTML = '<p class="no-data-message">No complaints data available</p>';
        if (canvas) {
            canvas.style.display = 'none';
        }
        return;
    }
    
    if (canvas) {
        canvas.style.display = 'block';
    }
    
    const colors = {
        'Pending': '#ffc107',
        'In Progress': '#17a2b8',
        'Resolved': '#28a745',
        'Verified': '#6f42c1'
    };
    
    const total = complaints.length;
    breakdownEl.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const color = colors[status] || '#667eea';
        return `
            <div class="breakdown-item">
                <span class="breakdown-label">${status}</span>
                <div class="breakdown-bar" style="background: ${color}; width: ${percentage}%;"></div>
                <span class="breakdown-value">${count} (${percentage}%)</span>
            </div>
        `;
    }).join('');
    
    drawPieChart('user-complaints-chart', statusCounts, colors);
}

function displayUserPaymentsChart(payments) {
    const billTypeCounts = {};
    payments.forEach(p => {
        billTypeCounts[p.billType] = (billTypeCounts[p.billType] || 0) + parseFloat(p.amount);
    });
    
    const canvas = document.getElementById('user-payments-chart');
    const container = canvas.parentElement;
    
    let noDataMsg = container.querySelector('.no-data-message');
    
    if (Object.keys(billTypeCounts).length === 0) {
        canvas.style.display = 'none';
        if (!noDataMsg) {
            noDataMsg = document.createElement('p');
            noDataMsg.className = 'no-data-message';
            noDataMsg.textContent = 'No payment data available';
            container.appendChild(noDataMsg);
        }
        noDataMsg.style.display = 'block';
        return;
    }
    
    canvas.style.display = 'block';
    if (noDataMsg) {
        noDataMsg.style.display = 'none';
    }
    
    const colors = {
        'Electricity': '#ffc107',
        'Water': '#17a2b8',
        'Gas': '#dc3545'
    };
    
    drawBarChart('user-payments-chart', billTypeCounts, colors);
}

function displayUserDocumentsBreakdown(documents) {
    const typeCounts = {};
    documents.forEach(d => {
        typeCounts[d.type] = (typeCounts[d.type] || 0) + 1;
    });
    
    const breakdownEl = document.getElementById('user-documents-breakdown');
    if (Object.keys(typeCounts).length === 0) {
        breakdownEl.innerHTML = '<p class="no-data-message">No documents uploaded yet</p>';
        return;
    }
    
    breakdownEl.innerHTML = Object.entries(typeCounts).map(([type, count]) => `
        <div class="breakdown-item">
            <span class="breakdown-label">${type}</span>
            <span class="breakdown-value">${count} document${count > 1 ? 's' : ''}</span>
        </div>
    `).join('');
}

function displayUserChildrenAttendance(children) {
    const attendanceEl = document.getElementById('user-children-attendance');
    
    if (children.length === 0) {
        attendanceEl.innerHTML = '<p class="no-data-message">No children records available</p>';
        return;
    }
    
    attendanceEl.innerHTML = children.map(child => {
        const streak = calculateStreak(child.attendance || []);
        return `
            <div class="child-attendance-card">
                <h4>${child.name}</h4>
                <div class="attendance-streak-display">
                    <div class="streak-badge">🔥 ${streak}</div>
                    <div class="streak-info">
                        <p><strong>Current Streak</strong></p>
                        <p>${streak} day${streak !== 1 ? 's' : ''} of consecutive attendance</p>
                        <p>Total: ${(child.attendance || []).length} days attended</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function displayOfficialAnalytics() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    document.getElementById('official-total-complaints').textContent = complaints.length;
    
    displayDepartmentComplaintsChart(complaints);
    displayStatusChart(complaints);
    displayCategoriesChart(complaints);
}

function displayDepartmentComplaintsChart(complaints) {
    const deptCounts = {};
    complaints.forEach(c => {
        deptCounts[c.department] = (deptCounts[c.department] || 0) + 1;
    });
    
    const breakdownEl = document.getElementById('dept-complaints-breakdown');
    if (Object.keys(deptCounts).length === 0) {
        breakdownEl.innerHTML = '<p class="no-data-message">No complaints data available</p>';
        return;
    }
    
    const sortedDepts = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]);
    const total = complaints.length;
    
    breakdownEl.innerHTML = sortedDepts.map(([dept, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return `
            <div class="breakdown-item">
                <span class="breakdown-label">${dept}</span>
                <div class="breakdown-bar" style="width: ${percentage}%;"></div>
                <span class="breakdown-value">${count} (${percentage}%)</span>
            </div>
        `;
    }).join('');
    
    const colors = generateColors(Object.keys(deptCounts).length);
    drawBarChart('dept-complaints-chart', deptCounts, colors);
}

function displayStatusChart(complaints) {
    const statusCounts = {};
    complaints.forEach(c => {
        const status = c.status;
        if (status === 'Pending' || status === 'In Progress') {
            statusCounts['Pending'] = (statusCounts['Pending'] || 0) + 1;
        } else {
            statusCounts['Resolved'] = (statusCounts['Resolved'] || 0) + 1;
        }
    });
    
    const breakdownEl = document.getElementById('status-breakdown');
    if (Object.keys(statusCounts).length === 0) {
        breakdownEl.innerHTML = '<p class="no-data-message">No complaints data available</p>';
        return;
    }
    
    const total = complaints.length;
    const colors = {
        'Pending': '#ffc107',
        'Resolved': '#28a745'
    };
    
    breakdownEl.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return `
            <div class="breakdown-item">
                <span class="breakdown-label">${status}</span>
                <div class="breakdown-bar" style="background: ${colors[status]}; width: ${percentage}%;"></div>
                <span class="breakdown-value">${count} (${percentage}%)</span>
            </div>
        `;
    }).join('');
    
    drawPieChart('status-chart', statusCounts, colors);
}

function displayCategoriesChart(complaints) {
    const deptCounts = {};
    complaints.forEach(c => {
        deptCounts[c.department] = (deptCounts[c.department] || 0) + 1;
    });
    
    const sortedDepts = Object.entries(deptCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    
    const breakdownEl = document.getElementById('categories-breakdown');
    if (sortedDepts.length === 0) {
        breakdownEl.innerHTML = '<p class="no-data-message">No complaints data available</p>';
        return;
    }
    
    breakdownEl.innerHTML = sortedDepts.map(([dept, count], index) => {
        const medal = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][index] || '';
        return `
            <div class="breakdown-item">
                <span class="breakdown-label">${medal} ${dept}</span>
                <span class="breakdown-value">${count} complaints</span>
            </div>
        `;
    }).join('');
    
    const chartData = {};
    sortedDepts.forEach(([dept, count]) => {
        chartData[dept] = count;
    });
    
    const colors = generateColors(sortedDepts.length);
    drawBarChart('categories-chart', chartData, colors);
}

function drawPieChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = 300;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2;
    
    ctx.clearRect(0, 0, width, height);
    
    Object.entries(data).forEach(([label, value]) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        const color = colors[label] || '#667eea';
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
}

function drawBarChart(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = 400;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
    
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    ctx.clearRect(0, 0, width, height);
    
    const entries = Object.entries(data);
    const maxValue = Math.max(...Object.values(data));
    const barWidth = chartWidth / entries.length - 10;
    
    entries.forEach(([label, value], index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * (chartWidth / entries.length);
        const y = height - padding - barHeight;
        
        const colorKey = Object.keys(colors)[index % Object.keys(colors).length];
        const color = colors[colorKey] || colors[label] || '#667eea';
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
}

function generateColors(count) {
    const baseColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'];
    const colors = {};
    for (let i = 0; i < count; i++) {
        colors[i] = baseColors[i % baseColors.length];
    }
    return colors;
}

function applyForScheme(schemeId) {
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    const scheme = schemes.find(s => s.id === schemeId);
    
    if (!scheme) {
        alert('Scheme not found');
        return;
    }
    
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    
    const existingApplication = applications.find(a => 
        a.userId === currentUser.phone && a.schemeId === schemeId
    );
    
    if (existingApplication) {
        alert('You have already applied for this scheme');
        return;
    }
    
    const newApplication = {
        id: 'SA' + Date.now(),
        userId: currentUser.phone,
        userEmail: currentUser.email,
        schemeId: schemeId,
        schemeName: scheme.name,
        status: 'Pending',
        appliedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    localStorage.setItem('schemeApplications', JSON.stringify(applications));
    
    alert(`Application submitted successfully for ${scheme.name}!\nApplication ID: ${newApplication.id}`);
    displaySchemes(document.getElementById('scheme-search').value);
    
    if (typeof displayDashboardSummary === 'function') {
        displayDashboardSummary();
    }
}

function displayUserSchemeApplications() {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const userApplications = applications.filter(a => a.userId === currentUser.phone);
    
    const container = document.getElementById('user-scheme-applications');
    if (!container) return;
    
    if (userApplications.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No scheme applications yet</p>';
        return;
    }
    
    container.innerHTML = userApplications.map(app => {
        const statusClass = app.status.toLowerCase();
        return `
            <div class="application-item">
                <h4>${app.schemeName}</h4>
                <p><strong>Application ID:</strong> ${app.id}</p>
                <p><strong>Applied On:</strong> ${new Date(app.appliedAt).toLocaleString()}</p>
                <span class="application-status status-${statusClass}">${app.status}</span>
            </div>
        `;
    }).join('');
}

function displayOfficialSchemeApplications() {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const container = document.getElementById('official-scheme-applications-list');
    
    if (!container) return;
    
    if (applications.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No scheme applications</p>';
        return;
    }
    
    container.innerHTML = applications.map(app => {
        const statusClass = app.status.toLowerCase();
        let actionButtons = '';
        
        if (app.status === 'Pending') {
            actionButtons = `
                <div class="application-actions">
                    <button class="btn-accept" onclick="updateSchemeApplicationStatus('${app.id}', 'Accepted')">Accept</button>
                    <button class="btn-reject" onclick="updateSchemeApplicationStatus('${app.id}', 'Rejected')">Reject</button>
                </div>
            `;
        }
        
        return `
            <div class="application-item">
                <h4>${app.schemeName}</h4>
        
        if (typeof updateComplaintStatusInGoogleSheets === 'function') {
            updateComplaintStatusInGoogleSheets(complaintId, newStatus).then(result => {
                if (result.success) {
                    console.log('Complaint status updated in Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
                <p><strong>Application ID:</strong> ${app.id}</p>
                <p><strong>User:</strong> ${app.userEmail} (${app.userId})</p>
                <p><strong>Applied On:</strong> ${new Date(app.appliedAt).toLocaleString()}</p>
                <span class="application-status status-${statusClass}">${app.status}</span>
                ${actionButtons}
            </div>
        `;
    }).join('');
}

function updateSchemeApplicationStatus(applicationId, newStatus) {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const appIndex = applications.findIndex(a => a.id === applicationId);
    
    if (appIndex !== -1) {
        applications[appIndex].status = newStatus;
        applications[appIndex].updatedAt = new Date().toISOString();
        applications[appIndex].updatedBy = currentOfficial.email;
        
        localStorage.setItem('schemeApplications', JSON.stringify(applications));
        
        alert(`Application ${applicationId} marked as ${newStatus}`);
        displayOfficialSchemeApplications();
    }
}

function updateComplaintStatusEnhanced(complaintId, newStatus) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    
    if (complaintIndex !== -1) {
        complaints[complaintIndex].status = newStatus;
        complaints[complaintIndex].updatedAt = new Date().toISOString();
        complaints[complaintIndex].updatedBy = currentOfficial.email;
        
        localStorage.setItem('complaints', JSON.stringify(complaints));
        
        alert(`Complaint ${complaintId} marked as ${newStatus}`);
        if (typeof closeComplaintDetailModal === 'function') {
            closeComplaintDetailModal();
        }
        displayOfficialComplaintsAll();
    }
}

function displayOfficialComplaintsAll() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintsListEl = document.getElementById('official-complaints-list');
    
    if (!complaintsListEl) return;
    
    if (complaints.length === 0) {
        complaintsListEl.innerHTML = '<p style="text-align: center; color: #666;">No complaints in system</p>';
        return;
    }
    
    complaintsListEl.innerHTML = complaints.map(complaint => {
        const statusClass = complaint.status.toLowerCase().replace(/ /g, '-');
        return `
            <div class="complaint-item" onclick="viewComplaintDetailEnhanced('${complaint.id}')">
                <h4>Complaint ID: ${complaint.id}</h4>
                <p><strong>Department:</strong> ${complaint.department}</p>
                <p><strong>Description:</strong> ${complaint.description.substring(0, 100)}${complaint.description.length > 100 ? '...' : ''}</p>
                <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
                <p><strong>User Phone:</strong> ${complaint.userId}</p>
                <span class="complaint-status status-${statusClass}">${complaint.status}</span>
            </div>
        `;
    }).join('');
}

function viewComplaintDetailEnhanced(complaintId) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (!complaint) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.phone === complaint.userId);
    
    let detailContent = `
        <p><strong>Complaint ID:</strong> ${complaint.id}</p>
        <p><strong>Department:</strong> ${complaint.department}</p>
        <p><strong>Status:</strong> <span class="complaint-status status-${complaint.status.toLowerCase().replace(/ /g, '-')}">${complaint.status}</span></p>
        <p><strong>Description:</strong> ${complaint.description}</p>
        <p><strong>Date:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
        <p><strong>User:</strong> ${user ? user.email : complaint.userId}</p>
    `;
    
    document.getElementById('complaint-detail-content').innerHTML = detailContent;
    
    let actionsHtml = '';
    if (complaint.status === 'Pending' || complaint.status === 'In Progress') {
        actionsHtml = `
            <button class="btn-primary" onclick="updateComplaintStatusEnhanced('${complaint.id}', 'Accepted')">Accept</button>
            <button class="btn-primary" onclick="updateComplaintStatusEnhanced('${complaint.id}', 'In Progress')">Mark In Progress</button>
            <button class="btn-reject" onclick="updateComplaintStatusEnhanced('${complaint.id}', 'Rejected')">Reject</button>
            <button class="btn-primary" onclick="updateComplaintStatusEnhanced('${complaint.id}', 'Resolved')">Mark Resolved</button>
        `;
    }
    
    document.getElementById('complaint-actions-section').innerHTML = actionsHtml;
    document.getElementById('complaint-detail-modal').style.display = 'flex';
}

function logActivity(activityType, data) {
    const activities = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    const activity = {
        id: 'ACT' + Date.now(),
        type: activityType,
        data: data,
        timestamp: new Date().toISOString()
    };
    activities.push(activity);
    localStorage.setItem('activityLogs', JSON.stringify(activities));
}

function showOfficialTab(tab) {
    document.querySelectorAll('.official-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.official-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.official-tab-btn')).find(
        btn => btn.textContent.toLowerCase().includes(tab)
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    const tabContent = document.getElementById('official-tab-' + tab);
    if (tabContent) {
        tabContent.classList.add('active');
    }
    
    switch(tab) {
        case 'users':
            displayAllUsers();
            break;
        case 'schemes':
            displayOfficialSchemeApplicationsNew();
            break;
        case 'complaints':
            displayOfficialComplaintsNew();
            break;
        case 'children':
            displayAllChildrenData();
            break;
        case 'payments':
            displayAllBillPayments();
            break;
        case 'documents':
            displayAllDocuments();
            break;
        case 'activity':
            displayAllActivityLogs();
            break;
    }
}



function applyForScheme(schemeId) {
    if (!currentUser) {
        alert('Please login first');
        return;
    }
    
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const existingApp = applications.find(a => a.userId === currentUser.phone && a.schemeId === schemeId);
    
    if (existingApp) {
        alert('You have already applied for this scheme');
        return;
    }
    
    const newApplication = {
        id: 'APP' + Date.now(),
        userId: currentUser.phone,
        schemeId: schemeId,
        status: 'Pending',
        appliedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    localStorage.setItem('schemeApplications', JSON.stringify(applications));
    
    logActivity('scheme_applied', {
        applicationId: newApplication.id,
        userId: currentUser.phone,
        schemeId: schemeId
    });
    
    if (typeof syncSchemeApplicationToGoogleSheets === 'function') {
        syncSchemeApplicationToGoogleSheets(newApplication).then(result => {
            if (result.success) {
                console.log('Scheme application synced to Google Sheets');
            } else {
                console.log('Google Sheets sync failed:', result.reason || result.error);
            }
        }).catch(err => {
            console.log('Google Sheets sync error:', err);
        });
    }
    
    alert('Application submitted successfully!');
    displaySchemes();
}

function displayUserSchemeApplications() {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const userApplications = applications.filter(a => a.userId === currentUser.phone);
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    
    const appElement = document.getElementById('user-scheme-applications');
    if (!appElement) return;
    
    if (userApplications.length === 0) {
        appElement.innerHTML = '<p style="color: #999;">No scheme applications yet</p>';
        return;
    }
    
    const statusCounts = {};
    userApplications.forEach(app => {
        statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });
    
    appElement.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
        let badgeClass = 'badge-pending';
        if (status.toLowerCase() === 'accepted') badgeClass = 'badge-resolved';
        else if (status.toLowerCase() === 'rejected') badgeClass = 'badge-in-progress';
        
        return `
            <div class="summary-item">
                <span>${sanitizeHTML(status)}</span>
                <span class="summary-badge ${badgeClass}">${count}</span>
            </div>
        `;
    }).join('') + `
        <div class="summary-item" style="margin-top: 10px; border-top: 2px solid #667eea; padding-top: 10px;">
            <strong>Total Applications</strong>
            <strong>${userApplications.length}</strong>
        </div>
    `;
}
function displayAllUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const usersList = document.getElementById('official-users-list');
    
    if (users.length === 0) {
        usersList.innerHTML = '<p style="text-align: center; color: #999;">No users registered yet</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-detail-card">
            <h4>User: ${sanitizeHTML(user.email)}</h4>
            <div class="user-info-grid">
                <div class="user-info-item">
                    <strong>Aadhaar Number</strong>
                    ${sanitizeHTML(user.aadhaar)}
                </div>
                <div class="user-info-item">
                    <strong>Phone Number</strong>
                    ${sanitizeHTML(user.phone)}
                </div>
                <div class="user-info-item">
                    <strong>Email</strong>
                    ${sanitizeHTML(user.email)}
                </div>
                <div class="user-info-item">
                    <strong>State</strong>
                    ${getStateFromAadhaar(user.aadhaar)}
                </div>
            </div>
            <div class="user-info-item" style="grid-column: 1 / -1;">
                <strong>Address</strong>
                ${sanitizeHTML(user.address)}
            </div>
            ${user.aadhaarPhoto ? `
                <div style="margin-top: 15px;">
                    <strong>Aadhaar Photo:</strong><br>
                    <img src="${user.aadhaarPhoto}" alt="Aadhaar" class="aadhaar-photo-preview">
                </div>
            ` : ''}
            ${user.familyMembers && user.familyMembers.length > 0 ? `
                <div class="family-members-section">
                    <strong>Family Members:</strong>
                    ${user.familyMembers.map(member => `
                        <div class="family-member-item">
                            <strong>${sanitizeHTML(member.name)}</strong> 
                            (${sanitizeHTML(member.relation)}, Age: ${sanitizeHTML(member.age)})
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <p style="margin-top: 15px; color: #999; font-size: 13px;">
                Registered: ${new Date(user.createdAt).toLocaleString()}
            </p>
        </div>
    `).join('');
}

function displayOfficialSchemeApplicationsNew() {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const schemesList = document.getElementById('official-schemes-list');
    
    if (applications.length === 0) {
        schemesList.innerHTML = '<p style="text-align: center; color: #999;">No scheme applications yet</p>';
        return;
    }
    
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    schemesList.innerHTML = applications.map(app => {
        const scheme = schemes.find(s => s.id === app.schemeId);
        const user = users.find(u => u.phone === app.userId);
        
        return `
            <div class="application-item">
                <h4>${scheme ? sanitizeHTML(scheme.name) : 'Unknown Scheme'}</h4>
                <p><strong>Applicant:</strong> ${user ? sanitizeHTML(user.email) : 'Unknown'} (${sanitizeHTML(app.userId)})</p>
                <p><strong>Applied On:</strong> ${new Date(app.appliedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span class="application-status status-${app.status.toLowerCase()}">${sanitizeHTML(app.status)}</span></p>
                ${app.status === 'Pending' ? `
                    <div class="application-actions">
                        <button class="btn-accept" onclick="updateApplicationStatus('${app.id}', 'Accepted')">✓ Accept</button>
                        <button class="btn-reject" onclick="updateApplicationStatus('${app.id}', 'Rejected')">✗ Reject</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function updateApplicationStatus(applicationId, newStatus) {
    const applications = JSON.parse(localStorage.getItem('schemeApplications') || '[]');
    const appIndex = applications.findIndex(a => a.id === applicationId);
        
        if (typeof updateSchemeStatusInGoogleSheets === 'function') {
            updateSchemeStatusInGoogleSheets(applicationId, newStatus).then(result => {
                if (result.success) {
                    console.log('Scheme status updated in Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
    
    if (appIndex !== -1) {
        applications[appIndex].status = newStatus;
        applications[appIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('schemeApplications', JSON.stringify(applications));
        
        logActivity('application_' + newStatus.toLowerCase(), {
            applicationId: applicationId,
            userId: applications[appIndex].userId,
            schemeId: applications[appIndex].schemeId,
            officialName: currentOfficial.name
        });
        
        alert(`Application ${newStatus.toLowerCase()} successfully!`);
        displayOfficialSchemeApplicationsNew();
    }
}

function displayOfficialComplaintsNew() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintsList = document.getElementById('official-complaints-list');
    
    if (complaints.length === 0) {
        complaintsList.innerHTML = '<p style="text-align: center; color: #999;">No complaints filed yet</p>';
        return;
    }
    
    const departments = [...new Set(complaints.map(c => c.department))];
    
    let html = `
        <div class="sector-filter">
            <label><strong>Filter by Sector:</strong></label>
            <select onchange="filterComplaintsBySector(this.value)" id="sector-filter">
                <option value="all">All Sectors</option>
                ${departments.map(dept => `<option value="${sanitizeHTML(dept)}">${sanitizeHTML(dept)}</option>`).join('')}
            </select>
        </div>
        <div id="filtered-complaints-list"></div>
    `;
    
    complaintsList.innerHTML = html;
    filterComplaintsBySector('all');
}

function filterComplaintsBySector(sector) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredComplaints = sector === 'all' ? complaints : complaints.filter(c => c.department === sector);
    
    const filteredList = document.getElementById('filtered-complaints-list');
    
    if (filteredComplaints.length === 0) {
        filteredList.innerHTML = '<p style="text-align: center; color: #999;">No complaints in this sector</p>';
        return;
    }
    
    filteredList.innerHTML = filteredComplaints.map(complaint => {
        const user = users.find(u => u.phone === complaint.userId);
        
        return `
            <div class="complaint-item">
                <h4>Complaint ID: ${sanitizeHTML(complaint.id)}</h4>
                <p><strong>User:</strong> ${user ? sanitizeHTML(user.email) : 'Unknown'} (${sanitizeHTML(complaint.userId)})</p>
                <p><strong>Department:</strong> ${sanitizeHTML(complaint.department)}</p>
                <p><strong>Description:</strong> ${sanitizeHTML(complaint.description)}</p>
                <p><strong>Filed On:</strong> ${new Date(complaint.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span class="complaint-status status-${complaint.status.toLowerCase().replace(' ', '-')}">${sanitizeHTML(complaint.status)}</span></p>
                ${complaint.status === 'Pending' ? `
                    <div class="application-actions">
                        <button class="btn-accept" onclick="updateComplaintStatus('${complaint.id}', 'In Progress')">📋 Accept</button>
                        <button class="btn-reject" onclick="updateComplaintStatus('${complaint.id}', 'Rejected')">✗ Reject</button>
                    </div>
                ` : ''}
                ${complaint.status === 'In Progress' ? `
                    <div class="application-actions">
                        <button class="btn-accept" onclick="updateComplaintStatus('${complaint.id}', 'Resolved')">✓ Resolve</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function updateComplaintStatus(complaintId, newStatus) {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    
    if (complaintIndex !== -1) {
        complaints[complaintIndex].status = newStatus;
        complaints[complaintIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('complaints', JSON.stringify(complaints));
        
        logActivity('complaint_' + newStatus.toLowerCase().replace(' ', '_'), {
            complaintId: complaintId,
            userId: complaints[complaintIndex].userId,
            department: complaints[complaintIndex].department,
            officialName: currentOfficial.name
        });
        
        alert(`Complaint ${newStatus.toLowerCase()} successfully!`);
        const sectorFilter = document.getElementById('sector-filter');
        if (sectorFilter) {
            filterComplaintsBySector(sectorFilter.value);
        }
    }
}

function displayAllChildrenData() {
    const children = JSON.parse(localStorage.getItem('children') || '[]');
    const childrenList = document.getElementById('official-children-list');
    
    if (children.length === 0) {
        childrenList.innerHTML = '<p style="text-align: center; color: #999;">No children data available</p>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    childrenList.innerHTML = children.map(child => {
        const user = users.find(u => u.phone === child.userId);
        const attendance = JSON.parse(localStorage.getItem('attendance') || '[]').filter(a => a.childId === child.id);
        const vaccines = JSON.parse(localStorage.getItem('vaccinations') || '[]').filter(v => v.childId === child.id);
        
        return `
            <div class="child-info-card">
                <h4>${sanitizeHTML(child.name)} (Age: ${sanitizeHTML(child.age)})</h4>
                <p><strong>Parent:</strong> ${user ? sanitizeHTML(user.email) : 'Unknown'}</p>
                <p><strong>Date of Birth:</strong> ${sanitizeHTML(child.dob)}</p>
                <p><strong>School:</strong> ${sanitizeHTML(child.school || 'Not specified')}</p>
                
                <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <strong>📚 Academic Streak:</strong> ${attendance.length} days
                </div>
                
                ${vaccines.length > 0 ? `
                    <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <strong>💉 Vaccination Records:</strong>
                        ${vaccines.map(v => `
                            <div style="margin-top: 8px; padding: 8px; background: white; border-radius: 6px;">
                                ${sanitizeHTML(v.name)} - ${new Date(v.date).toLocaleDateString()}
                                ${v.reminder ? ' (Reminder set)' : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="margin-top: 10px; color: #999;">No vaccination records</p>'}
            </div>
        `;
    }).join('');
}

function displayAllBillPayments() {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const paymentsList = document.getElementById('official-bills-list');
    
    if (payments.length === 0) {
        paymentsList.innerHTML = '<p style="text-align: center; color: #999;">No bill payments recorded</p>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    paymentsList.innerHTML = payments.map(payment => {
        const user = users.find(u => u.phone === payment.userId);
        
        return `
            <div class="payment-record-card">
                <h4>${sanitizeHTML(payment.billType)} Bill</h4>
                <p><strong>User:</strong> ${user ? sanitizeHTML(user.email) : 'Unknown'}</p>
                <p><strong>Consumer Number:</strong> ${sanitizeHTML(payment.consumerNumber)}</p>
                <p><strong>Amount:</strong> ₹${sanitizeHTML(payment.amount)}</p>
                <p><strong>Payment Method:</strong> ${sanitizeHTML(payment.upiApp || 'UPI')}</p>
                <p><strong>Payment Date:</strong> ${new Date(payment.timestamp).toLocaleString()}</p>
                <p><strong>Status:</strong> <span class="payment-status">${sanitizeHTML(payment.status)}</span></p>
            </div>
        `;
    }).join('');
}

function displayAllDocuments() {
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');
    const documentsList = document.getElementById('official-documents-list');
    
    if (documents.length === 0) {
        documentsList.innerHTML = '<p style="text-align: center; color: #999;">No documents uploaded yet</p>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    documentsList.innerHTML = documents.map(doc => {
        const user = users.find(u => u.phone === doc.userId);
        
        return `
            <div class="document-record-card">
                <h4>${sanitizeHTML(doc.name)}</h4>
                <p><strong>User:</strong> ${user ? sanitizeHTML(user.email) : 'Unknown'}</p>
                <p><strong>Document Type:</strong> ${sanitizeHTML(doc.type)}</p>
                <p><strong>Status:</strong> <span class="application-status status-${doc.status ? doc.status.toLowerCase() : 'pending'}">${sanitizeHTML(doc.status || 'Pending')}</span></p>
                <p><strong>Uploaded:</strong> ${new Date(doc.uploadedAt).toLocaleString()}</p>
                ${doc.fileData ? `
                    <div style="margin-top: 10px;">
                        <img src="${doc.fileData}" alt="${sanitizeHTML(doc.name)}" style="max-width: 200px; border-radius: 8px;">
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function displayAllActivityLogs() {
    const activities = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    const activityList = document.getElementById('official-activity-list');
    
    if (activities.length === 0) {
        activityList.innerHTML = '<p style="text-align: center; color: #999;">No activity logs yet</p>';
        return;
    }
    
    const sortedActivities = activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    activityList.innerHTML = sortedActivities.map(activity => {
        let icon = '📋';
        let text = '';
        
        switch(activity.type) {
            case 'user_registered':
                icon = '👤';
                text = `User ${activity.data.email} registered`;
                break;
            case 'official_registered':
                icon = '🏛️';
                text = `Official ${activity.data.officialName} registered`;
                break;
            case 'scheme_applied':
                icon = '📝';
                text = `User applied for scheme (ID: ${activity.data.schemeId})`;
                break;
            case 'application_accepted':
                icon = '✅';
                text = `Application ${activity.data.applicationId} accepted by ${activity.data.officialName}`;
                break;
            case 'application_rejected':
                icon = '❌';
                text = `Application ${activity.data.applicationId} rejected by ${activity.data.officialName}`;
                break;
            case 'complaint_filed':
                icon = '📢';
                text = `Complaint filed: ${activity.data.complaintId} (${activity.data.department})`;
                break;
            case 'complaint_in_progress':
                icon = '🔄';
                text = `Complaint ${activity.data.complaintId} accepted by ${activity.data.officialName}`;
                break;
            case 'complaint_resolved':
                icon = '✓';
                text = `Complaint ${activity.data.complaintId} resolved by ${activity.data.officialName}`;
                break;
            case 'complaint_rejected':
                icon = '✗';
                text = `Complaint ${activity.data.complaintId} rejected by ${activity.data.officialName}`;
                break;
            case 'bill_paid':
                icon = '💰';
                text = `Bill payment: ₹${activity.data.amount} for ${activity.data.serviceType}`;
                break;
            case 'document_uploaded':
                icon = '📄';
                text = `Document uploaded: ${activity.data.documentName}`;
                break;
            case 'child_added':
                icon = '👶';
                text = `Child added: ${activity.data.childName}`;
                break;
            default:
                text = `Activity: ${activity.type}`;
        }
        
        return `
            <div class="activity-log-item">
                <span class="activity-icon">${icon}</span>
                <span class="activity-text">${sanitizeHTML(text)}</span>
                <span class="activity-time">${new Date(activity.timestamp).toLocaleString()}</span>
            </div>
        `;
    }).join('');
}

const originalUserRegister = document.getElementById('user-register-form').onsubmit;
document.getElementById('user-register-form').addEventListener('submit', function(e) {
    logActivity('user_registered', { 
        email: document.getElementById('user-email').value,
        phone: document.getElementById('user-phone').value
    });
});

