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
