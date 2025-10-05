function initializeScholarshipsData() {
    if (!localStorage.getItem('scholarships')) {
        const scholarships = [
            {
                id: 'SCH001',
                title: 'National Merit Scholarship',
                description: 'Government scholarship for students with outstanding academic performance',
                amount: '₹50,000 per year',
                eligibility: {
                    minGrade: 85,
                    maxIncome: 800000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate']
                },
                category: 'Merit-Based'
            },
            {
                id: 'SCH002',
                title: 'Post-Matric Scholarship',
                description: 'Financial assistance for students from economically weaker sections',
                amount: '₹30,000 per year',
                eligibility: {
                    minGrade: 50,
                    maxIncome: 250000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma']
                },
                category: 'Need-Based'
            },
            {
                id: 'SCH003',
                title: 'Excellence Scholarship',
                description: 'Premium scholarship for top performers nationwide',
                amount: '₹1,00,000 per year',
                eligibility: {
                    minGrade: 90,
                    maxIncome: 500000,
                    courses: ['Undergraduate', 'Postgraduate', 'Professional Course']
                },
                category: 'Merit-Based'
            },
            {
                id: 'SCH004',
                title: 'Middle Class Merit Scholarship',
                description: 'Support for middle-class families with meritorious students',
                amount: '₹40,000 per year',
                eligibility: {
                    minGrade: 75,
                    maxIncome: 500000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate']
                },
                category: 'Mixed Criteria'
            },
            {
                id: 'SCH005',
                title: 'Social Welfare Scholarship',
                description: 'Government aid for students from disadvantaged backgrounds',
                amount: '₹35,000 per year',
                eligibility: {
                    minGrade: 60,
                    maxIncome: 200000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma']
                },
                category: 'Need-Based'
            },
            {
                id: 'SCH006',
                title: 'BPL Scholarship',
                description: 'Exclusive scholarship for Below Poverty Line families',
                amount: '₹45,000 per year',
                eligibility: {
                    minGrade: 50,
                    maxIncome: 150000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma', 'Professional Course']
                },
                category: 'Need-Based'
            },
            {
                id: 'SCH007',
                title: 'General Scholarship Scheme',
                description: 'Basic financial support for all eligible students',
                amount: '₹25,000 per year',
                eligibility: {
                    minGrade: 50,
                    maxIncome: 800000,
                    courses: ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma', 'Professional Course']
                },
                category: 'General'
            },
            {
                id: 'SCH008',
                title: 'Professional Course Scholarship',
                description: 'Support for students pursuing professional degrees',
                amount: '₹75,000 per year',
                eligibility: {
                    minGrade: 70,
                    maxIncome: 600000,
                    courses: ['Professional Course', 'Postgraduate']
                },
                category: 'Merit-Based'
            }
        ];
        localStorage.setItem('scholarships', JSON.stringify(scholarships));
    }
}

function showEducationAssistance() {
    initializeScholarshipsData();
    showScreen('education-assistance-screen');
    loadAvailableScholarships();
    loadScholarshipApplications();
}

function loadAvailableScholarships() {
    const scholarships = JSON.parse(localStorage.getItem('scholarships') || '[]');
    const container = document.getElementById('available-scholarships-list');
    
    if (!container) return;
    
    if (scholarships.length === 0) {
        container.innerHTML = '<p class="empty-state">No scholarships available at this time.</p>';
        return;
    }
    
    container.innerHTML = scholarships.map(scholarship => `
        <div class="scholarship-card">
            <div class="scholarship-header">
                <h4>${sanitizeHTML(scholarship.title)}</h4>
                <span class="scholarship-category ${getCategoryClass(scholarship.category)}">${sanitizeHTML(scholarship.category)}</span>
            </div>
            <div class="scholarship-body">
                <p class="scholarship-description">${sanitizeHTML(scholarship.description)}</p>
                <div class="scholarship-amount">
                    <span class="amount-label">Scholarship Amount:</span>
                    <span class="amount-value">${sanitizeHTML(scholarship.amount)}</span>
                </div>
                <div class="scholarship-eligibility">
                    <h5>Eligibility Criteria:</h5>
                    <ul>
                        <li>Minimum Grade: <strong>${scholarship.eligibility.minGrade}%</strong></li>
                        <li>Maximum Family Income: <strong>₹${scholarship.eligibility.maxIncome.toLocaleString('en-IN')}/year</strong></li>
                        <li>Eligible Courses: <strong>${scholarship.eligibility.courses.join(', ')}</strong></li>
                    </ul>
                </div>
            </div>
            <div class="scholarship-footer">
                <button class="btn-primary" onclick="applyForScholarship('${scholarship.id}')">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function getCategoryClass(category) {
    const classMap = {
        'Merit-Based': 'category-merit',
        'Need-Based': 'category-need',
        'Mixed Criteria': 'category-mixed',
        'General': 'category-general'
    };
    return classMap[category] || 'category-general';
}

let selectedScholarshipId = null;

function applyForScholarship(scholarshipId) {
    if (!currentUser) {
        alert('Please login to apply for scholarships');
        return;
    }
    
    const scholarships = JSON.parse(localStorage.getItem('scholarships') || '[]');
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    
    if (!scholarship) {
        alert('Scholarship not found');
        return;
    }
    
    selectedScholarshipId = scholarshipId;
    
    document.getElementById('selected-scholarship-info').innerHTML = `
        <div class="selected-scholarship-banner">
            <h4>Applying for: ${sanitizeHTML(scholarship.title)}</h4>
            <p>${sanitizeHTML(scholarship.description)}</p>
            <p><strong>Amount:</strong> ${sanitizeHTML(scholarship.amount)}</p>
        </div>
    `;
    
    showScholarshipApplicationForm();
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
                <h4>${sanitizeHTML(app.studentName)}</h4>
                <span class="application-status status-${app.status.toLowerCase().replace(' ', '-')}">${sanitizeHTML(app.status)}</span>
            </div>
            <div class="application-details">
                ${app.scholarshipTitle ? `<p><strong>Scholarship:</strong> ${sanitizeHTML(app.scholarshipTitle)}</p>` : ''}
                <p><strong>Course:</strong> ${sanitizeHTML(app.course)}</p>
                <p><strong>Grade/Percentage:</strong> ${app.gradePercentage}%</p>
                <p><strong>Family Income:</strong> ₹${app.familyIncome.toLocaleString('en-IN')}/year</p>
                <p><strong>Eligibility:</strong> <span class="eligibility-tag ${app.eligibility.eligible ? 'eligible' : 'not-eligible'}">${app.eligibility.eligible ? '✓ Eligible' : '✗ Not Eligible'}</span></p>
                ${app.eligibility.eligible ? `<p><strong>Matched Scholarships:</strong> ${app.eligibility.suggestions.join(', ')}</p>` : `<p><strong>Reason:</strong> ${sanitizeHTML(app.eligibility.reason)}</p>`}
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

function checkScholarshipEligibility(scholarshipId, gradePercentage, familyIncome, course) {
    const scholarships = JSON.parse(localStorage.getItem('scholarships') || '[]');
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    
    if (!scholarship) return { eligible: false, reason: 'Scholarship not found' };
    
    const grade = parseFloat(gradePercentage);
    const income = parseFloat(familyIncome);
    
    if (grade < scholarship.eligibility.minGrade) {
        return {
            eligible: false,
            reason: `Grade percentage (${grade}%) is below minimum requirement (${scholarship.eligibility.minGrade}%)`
        };
    }
    
    if (income > scholarship.eligibility.maxIncome) {
        return {
            eligible: false,
            reason: `Family income (₹${income.toLocaleString('en-IN')}) exceeds maximum limit (₹${scholarship.eligibility.maxIncome.toLocaleString('en-IN')})`
        };
    }
    
    if (!scholarship.eligibility.courses.includes(course)) {
        return {
            eligible: false,
            reason: `Your course (${course}) is not eligible for this scholarship`
        };
    }
    
    return { eligible: true, reason: '' };
}

function calculateEligibility(gradePercentage, familyIncome, course) {
    const grade = parseFloat(gradePercentage);
    const income = parseFloat(familyIncome);
    const scholarships = JSON.parse(localStorage.getItem('scholarships') || '[]');
    
    const eligibility = {
        eligible: false,
        suggestions: [],
        reason: ''
    };
    
    scholarships.forEach(scholarship => {
        const check = checkScholarshipEligibility(scholarship.id, grade, income, course);
        if (check.eligible) {
            eligibility.eligible = true;
            eligibility.suggestions.push(scholarship.title);
        }
    });
    
    if (!eligibility.eligible) {
        if (grade < 50) {
            eligibility.reason = 'Grade percentage below minimum requirement (50%)';
        } else if (income > 800000) {
            eligibility.reason = 'Family income exceeds eligibility threshold for all scholarships (₹8L/year)';
        } else {
            eligibility.reason = 'Does not meet eligibility criteria for any available scholarship';
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
        let eligibilityResult;
        let scholarshipTitle = null;
        
        if (selectedScholarshipId) {
            const scholarships = JSON.parse(localStorage.getItem('scholarships') || '[]');
            const scholarship = scholarships.find(s => s.id === selectedScholarshipId);
            scholarshipTitle = scholarship ? scholarship.title : null;
            
            const specificCheck = checkScholarshipEligibility(selectedScholarshipId, gradePercentage, familyIncome, course);
            
            if (specificCheck.eligible) {
                eligibilityResult = {
                    eligible: true,
                    suggestions: [scholarshipTitle],
                    reason: ''
                };
            } else {
                eligibilityResult = calculateEligibility(gradePercentage, familyIncome, course);
                if (eligibilityResult.eligible) {
                    eligibilityResult.reason = `Not eligible for ${scholarshipTitle}. ${specificCheck.reason}. However, you are eligible for other scholarships listed above.`;
                } else {
                    eligibilityResult.reason = specificCheck.reason;
                }
            }
        } else {
            eligibilityResult = calculateEligibility(gradePercentage, familyIncome, course);
        }
        
        const applicationData = {
            id: 'SA' + Date.now(),
            userId: currentUser.phone,
            scholarshipId: selectedScholarshipId,
            scholarshipTitle: scholarshipTitle,
            studentName,
            course,
            gradePercentage: parseFloat(gradePercentage),
            familyIncome: parseFloat(familyIncome),
            purpose,
            markSheets,
            eligibility: eligibilityResult,
            status: eligibilityResult.eligible ? 'Under Review' : 'Not Eligible',
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
            eligibility: eligibilityResult.eligible
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
        
        if (eligibilityResult.eligible) {
            alert(`✓ Application submitted successfully!\n\nYou are eligible for:\n${eligibilityResult.suggestions.join('\n')}\n\nYour application status: ${applicationData.status}`);
        } else {
            alert(`✗ Application submitted.\n\nNot eligible at this time.\nReason: ${eligibilityResult.reason}\n\nYou can reapply if your circumstances change.`);
        }
        
        document.getElementById('scholarship-application-form').reset();
        document.getElementById('marksheets-preview').innerHTML = '';
        document.getElementById('selected-scholarship-info').innerHTML = '';
        selectedScholarshipId = null;
        showEducationAssistance();
    }).catch(err => {
        console.error('Error processing mark sheets:', err);
        alert('Error uploading mark sheets. Please try again.');
    });
});

document.getElementById('scholarship-marksheets').addEventListener('change', function(e) {
    const files = e.target.files;
    const preview = document.getElementById('marksheets-preview');
    
    if (files.length === 0) {
        preview.innerHTML = '';
        return;
    }
    
    preview.innerHTML = `<p><strong>Selected files:</strong></p><ul>`;
    Array.from(files).forEach(file => {
        preview.innerHTML += `<li>${sanitizeHTML(file.name)} (${(file.size / 1024).toFixed(2)} KB)</li>`;
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
                    <p><strong>Application ID:</strong> ${sanitizeHTML(application.id)}</p>
                    ${application.scholarshipTitle ? `<p><strong>Scholarship:</strong> ${sanitizeHTML(application.scholarshipTitle)}</p>` : ''}
                    <p><strong>Student Name:</strong> ${sanitizeHTML(application.studentName)}</p>
                    <p><strong>Course:</strong> ${sanitizeHTML(application.course)}</p>
                    <p><strong>Grade/Percentage:</strong> ${application.gradePercentage}%</p>
                    <p><strong>Family Income:</strong> ₹${application.familyIncome.toLocaleString('en-IN')}/year</p>
                    <p><strong>Purpose:</strong> ${sanitizeHTML(application.purpose)}</p>
                    <p><strong>Status:</strong> <span class="application-status status-${application.status.toLowerCase().replace(' ', '-')}">${sanitizeHTML(application.status)}</span></p>
                    <p><strong>Eligibility:</strong> <span class="eligibility-tag ${application.eligibility.eligible ? 'eligible' : 'not-eligible'}">${application.eligibility.eligible ? '✓ Eligible' : '✗ Not Eligible'}</span></p>
                    ${application.eligibility.eligible ? `<p><strong>Matched Scholarships:</strong><br>${application.eligibility.suggestions.join('<br>')}</p>` : `<p><strong>Reason:</strong> ${sanitizeHTML(application.eligibility.reason)}</p>`}
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
                <h3>Mark Sheets - ${sanitizeHTML(application.studentName)}</h3>
                <div class="marksheets-gallery">
                    ${application.markSheets.map((sheet, index) => `
                        <div class="marksheet-item">
                            <h4>${sanitizeHTML(sheet.name)}</h4>
                            <img src="${sheet.data}" alt="${sanitizeHTML(sheet.name)}" style="max-width: 100%; border-radius: 8px; margin: 10px 0;">
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

function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
