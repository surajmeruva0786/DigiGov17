function showEducationAssistance() {
    showScreen('education-assistance-screen');
    loadScholarshipApplications();
}

function showScholarshipApplicationForm() {
    showScreen('scholarship-application-form-screen');
}

function loadScholarshipApplications() {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const userApplications = applications.filter(app => app.userId === currentUser.phone);
    
    const container = document.getElementById('scholarship-applications-list');
    
    if (userApplications.length === 0) {
        container.innerHTML = '<p class="empty-state">No scholarship applications yet. Apply now to get started!</p>';
        return;
    }
    
    container.innerHTML = userApplications.map(app => `
        <div class="application-card">
            <div class="application-header">
                <h4>${app.studentName}</h4>
                <span class="application-status status-${app.status.toLowerCase().replace(' ', '-')}">${app.status}</span>
            </div>
            <div class="application-details">
                <p><strong>Course:</strong> ${app.course}</p>
                <p><strong>Grade/Percentage:</strong> ${app.gradePercentage}%</p>
                <p><strong>Family Income:</strong> ₹${app.familyIncome.toLocaleString('en-IN')}/year</p>
                <p><strong>Eligibility:</strong> <span class="eligibility-tag ${app.eligibility.eligible ? 'eligible' : 'not-eligible'}">${app.eligibility.eligible ? '✓ Eligible' : '✗ Not Eligible'}</span></p>
                ${app.eligibility.eligible ? `<p><strong>Suggested Scholarships:</strong> ${app.eligibility.suggestions.join(', ')}</p>` : `<p><strong>Reason:</strong> ${app.eligibility.reason}</p>`}
                <p><strong>Applied:</strong> ${new Date(app.appliedAt).toLocaleDateString('en-IN')}</p>
                ${app.markSheets && app.markSheets.length > 0 ? `<p><strong>Mark Sheets:</strong> ${app.markSheets.length} uploaded</p>` : ''}
            </div>
            <div class="application-actions">
                <button class="btn-secondary" onclick="viewApplicationDetails('${app.id}')">View Details</button>
                ${app.markSheets && app.markSheets.length > 0 ? `<button class="btn-secondary" onclick="viewMarkSheets('${app.id}')">View Mark Sheets</button>` : ''}
            </div>
        </div>
    `).join('');
}

function calculateEligibility(gradePercentage, familyIncome) {
    const grade = parseFloat(gradePercentage);
    const income = parseFloat(familyIncome);
    
    const eligibility = {
        eligible: false,
        suggestions: [],
        reason: ''
    };
    
    // Merit-based scholarships (high grades)
    if (grade >= 85) {
        eligibility.eligible = true;
        eligibility.suggestions.push('Merit Scholarship (85%+ grades)');
    }
    
    if (grade >= 90) {
        eligibility.suggestions.push('Top Performer Scholarship (90%+ grades)');
    }
    
    // Need-based scholarships (low income)
    if (income <= 250000) {
        eligibility.eligible = true;
        eligibility.suggestions.push('Need-Based Scholarship (Family income ≤ ₹2.5L)');
    }
    
    if (income <= 150000) {
        eligibility.suggestions.push('Below Poverty Line Scholarship (Family income ≤ ₹1.5L)');
    }
    
    // Combined criteria
    if (grade >= 75 && income <= 500000) {
        eligibility.eligible = true;
        eligibility.suggestions.push('Middle Class Merit Scholarship (75%+ grades, income ≤ ₹5L)');
    }
    
    // Moderate performers with low income
    if (grade >= 60 && income <= 200000) {
        eligibility.eligible = true;
        eligibility.suggestions.push('Social Welfare Scholarship (60%+ grades, income ≤ ₹2L)');
    }
    
    // General eligibility
    if (grade >= 50 && income <= 800000) {
        eligibility.eligible = true;
        if (eligibility.suggestions.length === 0) {
            eligibility.suggestions.push('General Scholarship (50%+ grades, income ≤ ₹8L)');
        }
    }
    
    if (!eligibility.eligible) {
        if (grade < 50) {
            eligibility.reason = 'Grade percentage below minimum requirement (50%)';
        } else if (income > 800000) {
            eligibility.reason = 'Family income exceeds eligibility threshold (₹8L/year)';
        } else {
            eligibility.reason = 'Does not meet combined eligibility criteria';
        }
    }
    
    return eligibility;
}

document.getElementById('scholarship-application-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('scholarship-student-name').value;
    const course = document.getElementById('scholarship-course').value;
    const gradePercentage = document.getElementById('scholarship-grade').value;
    const familyIncome = document.getElementById('scholarship-income').value;
    const purpose = document.getElementById('scholarship-purpose').value;
    const markSheetFiles = document.getElementById('scholarship-marksheets').files;
    
    // Convert mark sheets to base64
    const markSheetPromises = Array.from(markSheetFiles).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({
                name: file.name,
                data: e.target.result,
                uploadedAt: new Date().toISOString()
            });
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });
    
    Promise.all(markSheetPromises).then(markSheets => {
        const eligibility = calculateEligibility(gradePercentage, familyIncome);
        
        const applicationData = {
            id: 'SA' + Date.now(),
            userId: currentUser.phone,
            studentName,
            course,
            gradePercentage: parseFloat(gradePercentage),
            familyIncome: parseFloat(familyIncome),
            purpose,
            markSheets,
            eligibility,
            status: eligibility.eligible ? 'Under Review' : 'Not Eligible',
            appliedAt: new Date().toISOString()
        };
        
        const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
        applications.push(applicationData);
        localStorage.setItem('scholarshipApplications', JSON.stringify(applications));
        
        logActivity('scholarship_application_submitted', {
            applicationId: applicationData.id,
            userId: currentUser.phone,
            studentName: studentName,
            course: course,
            eligibility: eligibility.eligible
        });
        
        if (typeof syncScholarshipToGoogleSheets === 'function') {
            syncScholarshipToGoogleSheets(applicationData).then(result => {
                if (result.success) {
                    console.log('Scholarship application synced to Google Sheets');
                } else {
                    console.log('Google Sheets sync failed:', result.reason || result.error);
                }
            }).catch(err => {
                console.log('Google Sheets sync error:', err);
            });
        }
        
        // Show eligibility result
        if (eligibility.eligible) {
            alert(`Application submitted successfully!\n\n✓ You are eligible for:\n${eligibility.suggestions.join('\n')}\n\nYour application status: ${applicationData.status}`);
        } else {
            alert(`Application submitted.\n\n✗ Not eligible at this time.\nReason: ${eligibility.reason}\n\nYou can reapply if your circumstances change.`);
        }
        
        document.getElementById('scholarship-application-form').reset();
        document.getElementById('marksheets-preview').innerHTML = '';
        showEducationAssistance();
    }).catch(err => {
        console.error('Error processing mark sheets:', err);
        alert('Error uploading mark sheets. Please try again.');
    });
});

// Mark sheet preview
document.getElementById('scholarship-marksheets').addEventListener('change', function(e) {
    const files = e.target.files;
    const preview = document.getElementById('marksheets-preview');
    
    if (files.length === 0) {
        preview.innerHTML = '';
        return;
    }
    
    preview.innerHTML = `<p><strong>Selected files:</strong></p><ul>`;
    Array.from(files).forEach(file => {
        preview.innerHTML += `<li>${file.name} (${(file.size / 1024).toFixed(2)} KB)</li>`;
    });
    preview.innerHTML += `</ul>`;
});

function viewApplicationDetails(applicationId) {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const application = applications.find(app => app.id === applicationId);
    
    if (!application) {
        alert('Application not found');
        return;
    }
    
    const detailsHtml = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h3>Application Details</h3>
                <div class="details-grid">
                    <p><strong>Application ID:</strong> ${application.id}</p>
                    <p><strong>Student Name:</strong> ${application.studentName}</p>
                    <p><strong>Course:</strong> ${application.course}</p>
                    <p><strong>Grade/Percentage:</strong> ${application.gradePercentage}%</p>
                    <p><strong>Family Income:</strong> ₹${application.familyIncome.toLocaleString('en-IN')}/year</p>
                    <p><strong>Purpose:</strong> ${application.purpose}</p>
                    <p><strong>Status:</strong> <span class="application-status status-${application.status.toLowerCase().replace(' ', '-')}">${application.status}</span></p>
                    <p><strong>Eligibility:</strong> <span class="eligibility-tag ${application.eligibility.eligible ? 'eligible' : 'not-eligible'}">${application.eligibility.eligible ? '✓ Eligible' : '✗ Not Eligible'}</span></p>
                    ${application.eligibility.eligible ? `<p><strong>Suggested Scholarships:</strong><br>${application.eligibility.suggestions.join('<br>')}</p>` : `<p><strong>Reason:</strong> ${application.eligibility.reason}</p>`}
                    <p><strong>Applied:</strong> ${new Date(application.appliedAt).toLocaleString('en-IN')}</p>
                    <p><strong>Mark Sheets:</strong> ${application.markSheets ? application.markSheets.length : 0} uploaded</p>
                </div>
                <button class="btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detailsHtml);
}

function viewMarkSheets(applicationId) {
    const applications = JSON.parse(localStorage.getItem('scholarshipApplications') || '[]');
    const application = applications.find(app => app.id === applicationId);
    
    if (!application || !application.markSheets || application.markSheets.length === 0) {
        alert('No mark sheets found');
        return;
    }
    
    const markSheetsHtml = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content modal-large" onclick="event.stopPropagation()">
                <h3>Mark Sheets - ${application.studentName}</h3>
                <div class="marksheets-gallery">
                    ${application.markSheets.map((sheet, index) => `
                        <div class="marksheet-item">
                            <h4>${sheet.name}</h4>
                            <img src="${sheet.data}" alt="${sheet.name}" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">
                            <p><small>Uploaded: ${new Date(sheet.uploadedAt).toLocaleString('en-IN')}</small></p>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', markSheetsHtml);
}

function closeModal(event) {
    if (event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.remove();
        }
    } else {
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
    }
}
