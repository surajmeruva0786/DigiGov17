function displayOfficialFeedbackDashboard() {
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const feedbackListEl = document.getElementById('official-feedback-list');
    const analyticsEl = document.getElementById('feedback-analytics');
    
    if (!feedbackListEl || !analyticsEl) return;
    
    if (feedbackData.length === 0) {
        feedbackListEl.innerHTML = '<p style="text-align: center; color: #999;">No feedback submitted yet</p>';
        analyticsEl.innerHTML = '';
        return;
    }
    
    displayFeedbackAnalytics(feedbackData, analyticsEl);
    displayRecentFeedback(feedbackData, users, feedbackListEl);
}

function displayFeedbackAnalytics(feedbackData, analyticsEl) {
    const serviceStats = {};
    
    feedbackData.forEach(feedback => {
        const serviceType = feedback.serviceType;
        if (!serviceStats[serviceType]) {
            serviceStats[serviceType] = {
                totalRatings: 0,
                sumRatings: 0,
                count: 0,
                ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }
        serviceStats[serviceType].sumRatings += feedback.rating;
        serviceStats[serviceType].count += 1;
        serviceStats[serviceType].ratings[feedback.rating] = (serviceStats[serviceType].ratings[feedback.rating] || 0) + 1;
    });
    
    const avgRatings = Object.keys(serviceStats).map(serviceType => {
        const stats = serviceStats[serviceType];
        const average = (stats.sumRatings / stats.count).toFixed(2);
        return {
            serviceType,
            average,
            count: stats.count,
            ratings: stats.ratings
        };
    });
    
    avgRatings.sort((a, b) => b.average - a.average);
    
    analyticsEl.innerHTML = `
        <h3>📊 Service Rating Analytics</h3>
        <div class="feedback-stats-grid">
            ${avgRatings.map(stat => `
                <div class="feedback-stat-card">
                    <h4>${sanitizeHTML(getServiceLabelFromType(stat.serviceType))}</h4>
                    <div class="average-rating">
                        <span class="rating-number">${stat.average}</span>
                        <span class="rating-stars">${generateStarDisplay(Math.round(parseFloat(stat.average)))}</span>
                    </div>
                    <p class="feedback-count">${stat.count} ${stat.count === 1 ? 'review' : 'reviews'}</p>
                    <div class="rating-breakdown">
                        ${[5, 4, 3, 2, 1].map(rating => {
                            const count = stat.ratings[rating] || 0;
                            const percentage = ((count / stat.count) * 100).toFixed(0);
                            return `
                                <div class="rating-bar-row">
                                    <span>${rating}★</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <span>${count}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayRecentFeedback(feedbackData, users, feedbackListEl) {
    const sortedFeedback = [...feedbackData].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    feedbackListEl.innerHTML = `
        <h3>📝 Recent Feedback</h3>
        <div class="filter-section">
            <label><strong>Filter by Service:</strong></label>
            <select id="feedback-service-filter" onchange="filterOfficialFeedback()">
                <option value="all">All Services</option>
                ${getUniqueServiceTypes(feedbackData).map(service => 
                    `<option value="${service}">${sanitizeHTML(getServiceLabelFromType(service))}</option>`
                ).join('')}
            </select>
            <label style="margin-left: 20px;"><strong>Filter by Rating:</strong></label>
            <select id="feedback-rating-filter" onchange="filterOfficialFeedback()">
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
            </select>
        </div>
        <div id="filtered-feedback-list">
            ${sortedFeedback.map(feedback => {
                const user = users.find(u => u.phone === feedback.userId);
                const userName = user ? (user.name || user.email) : feedback.userId;
                const date = new Date(feedback.timestamp).toLocaleString();
                const serviceLabel = getServiceLabelFromType(feedback.serviceType);
                
                return `
                    <div class="official-feedback-item">
                        <div class="feedback-item-header">
                            <div>
                                <strong>${sanitizeHTML(userName)}</strong>
                                <span class="feedback-phone">(${sanitizeHTML(feedback.userId)})</span>
                            </div>
                            <span class="feedback-date">${sanitizeHTML(date)}</span>
                        </div>
                        <div class="feedback-service-info">
                            <span class="service-badge">${sanitizeHTML(serviceLabel)}</span>
                        </div>
                        <div class="feedback-rating">
                            ${generateStarDisplay(feedback.rating)}
                            <span class="rating-text">(${feedback.rating}/5)</span>
                        </div>
                        ${feedback.comment ? `
                            <div class="feedback-comment-box">
                                <strong>Comment:</strong>
                                <p>${sanitizeHTML(feedback.comment)}</p>
                            </div>
                        ` : '<p class="no-comment">No comment provided</p>'}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function filterOfficialFeedback() {
    const serviceFilter = document.getElementById('feedback-service-filter');
    const ratingFilter = document.getElementById('feedback-rating-filter');
    
    if (!serviceFilter || !ratingFilter) return;
    
    const selectedService = serviceFilter.value;
    const selectedRating = ratingFilter.value;
    
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    let filteredData = feedbackData;
    
    if (selectedService !== 'all') {
        filteredData = filteredData.filter(f => f.serviceType === selectedService);
    }
    
    if (selectedRating !== 'all') {
        filteredData = filteredData.filter(f => f.rating === parseInt(selectedRating));
    }
    
    filteredData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const filteredListEl = document.getElementById('filtered-feedback-list');
    if (!filteredListEl) return;
    
    if (filteredData.length === 0) {
        filteredListEl.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No feedback matches the selected filters</p>';
        return;
    }
    
    filteredListEl.innerHTML = filteredData.map(feedback => {
        const user = users.find(u => u.phone === feedback.userId);
        const userName = user ? (user.name || user.email) : feedback.userId;
        const date = new Date(feedback.timestamp).toLocaleString();
        const serviceLabel = getServiceLabelFromType(feedback.serviceType);
        
        return `
            <div class="official-feedback-item">
                <div class="feedback-item-header">
                    <div>
                        <strong>${sanitizeHTML(userName)}</strong>
                        <span class="feedback-phone">(${sanitizeHTML(feedback.userId)})</span>
                    </div>
                    <span class="feedback-date">${sanitizeHTML(date)}</span>
                </div>
                <div class="feedback-service-info">
                    <span class="service-badge">${sanitizeHTML(serviceLabel)}</span>
                </div>
                <div class="feedback-rating">
                    ${generateStarDisplay(feedback.rating)}
                    <span class="rating-text">(${feedback.rating}/5)</span>
                </div>
                ${feedback.comment ? `
                    <div class="feedback-comment-box">
                        <strong>Comment:</strong>
                        <p>${sanitizeHTML(feedback.comment)}</p>
                    </div>
                ` : '<p class="no-comment">No comment provided</p>'}
            </div>
        `;
    }).join('');
}

function getUniqueServiceTypes(feedbackData) {
    const serviceTypes = feedbackData.map(f => f.serviceType);
    return [...new Set(serviceTypes)];
}

function getServiceLabelFromType(serviceType) {
    const serviceLabels = {
        'government_schemes': 'Government Schemes',
        'complaints': 'Complaints Management',
        'bill_payments': 'Bill Payments',
        'documents': 'Document Management',
        'children_services': 'Children Services',
        'blood_donation': 'Blood Donation',
        'organ_donation': 'Organ Donation',
        'digital_id_card': 'Digital ID Card',
        'health_services': 'Health Services',
        'overall_portal': 'Overall Portal Experience'
    };
    
    return serviceLabels[serviceType] || serviceType;
}

function generateStarDisplay(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star filled">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}

function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function syncAllFeedbackToGoogleSheets() {
    if (!GOOGLE_SHEETS_CONFIG.enabled) {
        alert('Please configure Google Sheets first via the dashboard settings');
        return;
    }
    
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    
    if (feedbackData.length === 0) {
        alert('No feedback data to sync');
        return;
    }
    
    let syncedCount = 0;
    let failedCount = 0;
    
    const syncPromises = feedbackData.map(feedback => 
        syncFeedbackToGoogleSheets(feedback)
            .then(result => {
                if (result.success) syncedCount++;
                else failedCount++;
            })
            .catch(() => failedCount++)
    );
    
    Promise.all(syncPromises).then(() => {
        alert(`Sync complete!\nSynced: ${syncedCount}\nFailed: ${failedCount}`);
    });
}
