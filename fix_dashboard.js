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
        case 'documents':
            displayAllDocuments();
            break;
        case 'bills':
            displayAllBillPayments();
            break;
        case 'activity':
            displayAllActivityLogs();
            break;
        case 'health':
            displayAllHealthData();
            break;
        case 'scholarships':
            displayScholarshipVerifications();
            break;
        case 'feedback':
            displayOfficialFeedbackDashboard();
            break;
    }
}

window.addEventListener('storage', function(e) {
    if (currentOfficial && document.getElementById('official-dashboard-screen').classList.contains('active')) {
        const currentTab = document.querySelector('.official-tab-content.active');
        if (currentTab) {
            const tabId = currentTab.id.replace('official-tab-', '');
            showOfficialTab(tabId);
        }
    }
    
    if (currentUser && document.getElementById('user-dashboard-screen').classList.contains('active')) {
        displayDashboardSummary();
        displayUserSchemeApplications();
    }
});

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
    
    const schemes = JSON.parse(localStorage.getItem('schemes') || '[]');
    const scheme = schemes.find(s => s.id == schemeId);
    
    const newApplication = {
        id: 'APP' + Date.now(),
        userId: currentUser.phone,
        schemeId: schemeId,
        schemeName: scheme ? scheme.name : 'Unknown',
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

function displayScholarshipVerifications() {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const eligibleApplications = applications.filter(app => app.eligibility && app.eligibility.eligible && app.status === 'Under Review');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const container = document.getElementById('official-scholarships-list');
    if (!container) return;
    
    if (eligibleApplications.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No scholarship applications pending verification</p>';
        return;
    }
    
    eligibleApplications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
    
    const statusColors = {
        'Under Review': '#ff9800',
        'Approved': '#4caf50',
        'Rejected': '#f44336'
    };
    
    container.innerHTML = eligibleApplications.map(app => {
        const user = users.find(u => u.phone === app.userId);
        const userName = user ? (user.name || user.email) : (app.userName || app.userId);
        const userEmail = user ? user.email : (app.userEmail || 'N/A');
        
        return `
            <div class="verification-card" style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 5px solid ${statusColors[app.status] || '#999'};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div>
                        <h4 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">
                            ${sanitizeHTML(app.studentName)}
                        </h4>
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            <strong>Applied by:</strong> ${sanitizeHTML(userName)} (${sanitizeHTML(userEmail)})
                        </p>
                        <p style="margin: 5px 0 0 0; color: #888; font-size: 13px;">
                            <strong>Application ID:</strong> ${sanitizeHTML(app.id)}
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <span class="application-status" style="background: ${statusColors[app.status] || '#999'}; color: white; padding: 6px 15px; border-radius: 20px; font-size: 13px; font-weight: 600; display: inline-block;">
                            ${sanitizeHTML(app.status)}
                        </span>
                        <p style="margin: 8px 0 0 0; color: #888; font-size: 12px;">
                            ${new Date(app.appliedAt).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                        ${app.scholarshipTitle ? `<p style="margin: 0;"><strong>Scholarship:</strong> ${sanitizeHTML(app.scholarshipTitle)}</p>` : ''}
                        <p style="margin: 0;"><strong>Course:</strong> ${sanitizeHTML(app.course)}</p>
                        <p style="margin: 0;"><strong>Grade:</strong> ${app.gradePercentage}%</p>
                        <p style="margin: 0;"><strong>Family Income:</strong> ₹${app.familyIncome.toLocaleString('en-IN')}/year</p>
                        <p style="margin: 0;"><strong>Mark Sheets:</strong> ${app.markSheets ? app.markSheets.length : 0} uploaded</p>
                    </div>
                    ${app.purpose ? `<p style="margin: 12px 0 0 0;"><strong>Purpose:</strong> ${sanitizeHTML(app.purpose)}</p>` : ''}
                </div>
                
                ${app.eligibility && app.eligibility.suggestions && app.eligibility.suggestions.length > 0 ? `
                    <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                        <p style="margin: 0; color: #2e7d32; font-weight: 600;">✓ Eligible for: ${app.eligibility.suggestions.join(', ')}</p>
                    </div>
                ` : ''}
                
                ${app.officialRemarks ? `
                    <div style="background: #fff3cd; padding: 12px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid #ffc107;">
                        <p style="margin: 0;"><strong>Official Remarks:</strong> ${sanitizeHTML(app.officialRemarks)}</p>
                    </div>
                ` : ''}
                
                ${app.statusHistory && app.statusHistory.length > 1 ? `
                    <div style="margin-bottom: 15px;">
                        <p style="margin: 0 0 8px 0; font-weight: 600; color: #555;">Status History:</p>
                        <div style="font-size: 13px; color: #666;">
                            ${app.statusHistory.slice().reverse().map(history => `
                                <div style="padding: 6px 0; border-bottom: 1px solid #eee;">
                                    <strong>${sanitizeHTML(history.status)}</strong> - ${new Date(history.timestamp).toLocaleString('en-IN')}
                                    <br><em>By: ${sanitizeHTML(history.updatedBy)}</em>
                                    ${history.remarks ? `<br>${sanitizeHTML(history.remarks)}` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${app.markSheets && app.markSheets.length > 0 ? `
                        <button class="btn-secondary" onclick="viewScholarshipMarkSheets('${app.id}')" style="flex: 1; min-width: 120px;">
                            📄 View Documents
                        </button>
                    ` : ''}
                    ${app.status === 'Under Review' ? `
                        <button class="btn-primary" onclick="approveScholarship('${app.id}')" style="flex: 1; min-width: 120px; background: #4caf50;">
                            ✓ Approve
                        </button>
                        <button class="btn-secondary" onclick="rejectScholarship('${app.id}')" style="flex: 1; min-width: 120px; background: #f44336; color: white;">
                            ✗ Reject
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function approveScholarship(applicationId) {
    const remarks = prompt('Enter approval remarks (optional):');
    if (remarks === null) return;
    
    updateScholarshipStatus(applicationId, 'Approved', remarks || 'Application approved by official');
}

function rejectScholarship(applicationId) {
    const remarks = prompt('Enter rejection reason:');
    if (!remarks) {
        alert('Rejection reason is required');
        return;
    }
    
    updateScholarshipStatus(applicationId, 'Rejected', remarks);
}

function updateScholarshipStatus(applicationId, newStatus, remarks) {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const appIndex = applications.findIndex(app => app.id === applicationId);
    
    if (appIndex === -1) {
        alert('Application not found');
        return;
    }
    
    const application = applications[appIndex];
    
    if (!application.statusHistory) {
        application.statusHistory = [];
    }
    
    application.statusHistory.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        updatedBy: currentOfficial ? currentOfficial.name : 'Official',
        remarks: remarks
    });
    
    application.status = newStatus;
    application.officialRemarks = remarks;
    
    applications[appIndex] = application;
    localStorage.setItem('scholarshipApplications', JSON.stringify(applications));
    
    
    if (typeof updateScholarshipStatusInGoogleSheets === 'function') {
        updateScholarshipStatusInGoogleSheets(applicationId, newStatus, remarks).then(result => {
            if (result.success) {
                console.log('✓ Scholarship status update synced to Google Sheets');
            } else {
                console.log('✗ Google Sheets sync failed:', result.reason || result.error);
            }
        }).catch(err => {
            console.log('✗ Google Sheets sync error:', err);
        });
    }
    alert(`Application ${newStatus.toLowerCase()} successfully!`);
    
    displayScholarshipVerifications();
}

function viewScholarshipMarkSheets(applicationId) {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const application = applications.find(app => app.id === applicationId);
    
    if (!application || !application.markSheets || application.markSheets.length === 0) {
        alert('No mark sheets found');
        return;
    }
    
    const markSheetsHtml = `
        <div class="modal-overlay" onclick="closeScholarshipModal(event)">
            <div class="modal-content modal-large" onclick="event.stopPropagation()">
                <h3>📄 Mark Sheets - ${sanitizeHTML(application.studentName)}</h3>
                <p><strong>Application ID:</strong> ${sanitizeHTML(application.id)}</p>
                <p><strong>Course:</strong> ${sanitizeHTML(application.course)} | <strong>Grade:</strong> ${application.gradePercentage}%</p>
                <div class="marksheets-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                    ${application.markSheets.map((sheet, index) => `
                        <div class="marksheet-item" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: white;">
                            <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #667eea;">${sanitizeHTML(sheet.name)}</h4>
                            <img src="${sheet.data}" alt="${sanitizeHTML(sheet.name)}" style="max-width: 100%; border-radius: 8px; margin: 10px 0; cursor: pointer;" onclick="window.open('${sheet.data}', '_blank')">
                            <p style="margin: 5px 0 0 0; font-size: 12px; color: #888;">
                                <small>Uploaded: ${new Date(sheet.uploadedAt).toLocaleString('en-IN')}</small>
                            </p>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-primary" onclick="closeScholarshipModal()" style="margin-top: 20px;">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', markSheetsHtml);
}

function closeScholarshipModal(event) {
    if (event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.remove();
        }
    } else {
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
    }
}

function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

window.addEventListener('storage', function(e) {
    if (e.key === 'scholarshipApplications' && typeof currentOfficial !== 'undefined' && currentOfficial) {
        const currentTab = document.querySelector('.official-tab-content.active');
        if (currentTab && currentTab.id === 'official-tab-scholarships') {
            displayScholarshipVerifications();
        }
    }
});
