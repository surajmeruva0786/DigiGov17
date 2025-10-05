function showCitizenFeedback() {
    showScreen('citizen-feedback-screen');
    loadFeedbackHistory();
}

function showSubmitFeedback() {
    showScreen('submit-feedback-screen');
    populateServiceOptions();
    resetFeedbackForm();
}

function populateServiceOptions() {
    const serviceSelect = document.getElementById('feedback-service-type');
    if (!serviceSelect) return;
    
    const completedServices = getCompletedServices();
    
    serviceSelect.innerHTML = '<option value="">Select a service to rate</option>';
    
    completedServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.value;
        option.textContent = service.label;
        serviceSelect.appendChild(option);
    });
}

function getCompletedServices() {
    if (!currentUser) return [];
    
    const services = [
        { value: 'government_schemes', label: 'Government Schemes' },
        { value: 'complaints', label: 'Complaints Management' },
        { value: 'bill_payments', label: 'Bill Payments' },
        { value: 'documents', label: 'Document Management' },
        { value: 'children_services', label: 'Children Services' },
        { value: 'blood_donation', label: 'Blood Donation' },
        { value: 'organ_donation', label: 'Organ Donation' },
        { value: 'digital_id_card', label: 'Digital ID Card' },
        { value: 'health_services', label: 'Health Services' },
        { value: 'overall_portal', label: 'Overall Portal Experience' }
    ];
    
    return services;
}

let currentRating = 0;
let isRecordingFeedback = false;
let feedbackRecognition = null;

function setRating(stars) {
    currentRating = stars;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`star-${i}`);
        if (star) {
            if (i <= stars) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        }
    }
}

function startVoiceFeedback() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    
    const voiceBtn = document.getElementById('voice-feedback-btn');
    const voiceIndicator = document.getElementById('voice-feedback-indicator');
    
    if (isRecordingFeedback && feedbackRecognition) {
        feedbackRecognition.stop();
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    feedbackRecognition = new SpeechRecognition();
    feedbackRecognition.lang = getVoiceLang();
    feedbackRecognition.continuous = false;
    feedbackRecognition.interimResults = false;
    
    feedbackRecognition.onstart = function() {
        isRecordingFeedback = true;
        if (voiceBtn) voiceBtn.textContent = '⏹️ Stop Recording';
        if (voiceIndicator) {
            voiceIndicator.style.display = 'block';
            voiceIndicator.textContent = '🎤 Listening...';
        }
    };
    
    feedbackRecognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const commentField = document.getElementById('feedback-comment');
        if (commentField) {
            const currentText = commentField.value;
            commentField.value = currentText ? currentText + ' ' + transcript : transcript;
            const charCount = document.getElementById('comment-char-count');
            if (charCount) {
                charCount.textContent = commentField.value.length;
            }
        }
    };
    
    feedbackRecognition.onerror = function(event) {
        console.error('Voice recognition error:', event.error);
        isRecordingFeedback = false;
        if (voiceBtn) voiceBtn.textContent = '🎤 Voice Input';
        if (voiceIndicator) {
            voiceIndicator.textContent = '❌ Error: ' + event.error;
            setTimeout(() => {
                voiceIndicator.style.display = 'none';
            }, 3000);
        }
    };
    
    feedbackRecognition.onend = function() {
        isRecordingFeedback = false;
        if (voiceBtn) voiceBtn.textContent = '🎤 Voice Input';
        if (voiceIndicator) {
            voiceIndicator.style.display = 'none';
        }
    };
    
    feedbackRecognition.start();
}

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('submit-feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFeedback();
        });
    }
});

function submitFeedback() {
    const serviceType = document.getElementById('feedback-service-type').value;
    const comment = document.getElementById('feedback-comment').value;
    
    if (!serviceType) {
        alert('Please select a service to rate');
        return;
    }
    
    if (currentRating === 0) {
        alert('Please select a star rating');
        return;
    }
    
    const feedbackData = {
        id: 'FB' + Date.now(),
        userId: currentUser.phone,
        serviceType: serviceType,
        rating: currentRating,
        comment: comment,
        timestamp: new Date().toISOString()
    };
    
    const allFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    allFeedback.push(feedbackData);
    localStorage.setItem('feedbackData', JSON.stringify(allFeedback));
    
    logActivity('feedback_submitted', {
        feedbackId: feedbackData.id,
        userId: currentUser.phone,
        serviceType: serviceType,
        rating: currentRating
    });
    
    if (typeof syncFeedbackToGoogleSheets === 'function') {
        syncFeedbackToGoogleSheets(feedbackData).then(result => {
            if (result.success) {
                console.log('Feedback synced to Google Sheets');
            } else {
                console.log('Google Sheets sync failed:', result.reason || result.error);
            }
        }).catch(err => {
            console.log('Google Sheets sync error:', err);
        });
    }
    
    alert('Thank you for your feedback! Your rating has been submitted.');
    
    resetFeedbackForm();
    showCitizenFeedback();
}

function resetFeedbackForm() {
    currentRating = 0;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`star-${i}`);
        if (star) {
            star.classList.remove('active');
        }
    }
    
    const serviceSelect = document.getElementById('feedback-service-type');
    const commentField = document.getElementById('feedback-comment');
    const charCount = document.getElementById('comment-char-count');
    
    if (serviceSelect) serviceSelect.value = '';
    if (commentField) commentField.value = '';
    if (charCount) charCount.textContent = '0';
}

function loadFeedbackHistory() {
    const allFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    const userFeedback = allFeedback.filter(f => f.userId === currentUser.phone);
    
    const feedbackDisplay = document.getElementById('feedback-history-display');
    const filterSelect = document.getElementById('feedback-filter');
    
    if (!feedbackDisplay) return;
    
    if (userFeedback.length === 0) {
        feedbackDisplay.innerHTML = '<p class="no-data-message">No feedback submitted yet</p>';
        return;
    }
    
    let filteredFeedback = userFeedback;
    if (filterSelect && filterSelect.value !== 'all') {
        const filterType = filterSelect.value;
        filteredFeedback = userFeedback.filter(f => f.serviceType.startsWith(filterType));
    }
    
    filteredFeedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    feedbackDisplay.innerHTML = filteredFeedback.map(feedback => {
        const serviceLabel = getServiceLabel(feedback.serviceType);
        const stars = generateStarDisplay(feedback.rating);
        const date = new Date(feedback.timestamp).toLocaleString();
        
        return `
            <div class="feedback-card">
                <div class="feedback-header">
                    <strong>${sanitizeHTML(serviceLabel)}</strong>
                    <span class="feedback-date">${sanitizeHTML(date)}</span>
                </div>
                <div class="feedback-stars">${stars}</div>
                ${feedback.comment ? `<p class="feedback-comment">${sanitizeHTML(feedback.comment)}</p>` : ''}
            </div>
        `;
    }).join('');
}

function getServiceLabel(serviceType) {
    const parts = serviceType.split('_');
    const type = parts[0];
    const id = parts.slice(1).join('_');
    
    const typeLabels = {
        'scheme': 'Government Scheme',
        'complaint': 'Complaint',
        'bill': 'Bill Payment',
        'document': 'Document Service',
        'bloodrequest': 'Blood Request',
        'organrequest': 'Organ Request'
    };
    
    return `${typeLabels[type] || type}: ${id}`;
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

function filterFeedback() {
    loadFeedbackHistory();
}

function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function syncUserFeedbackToSheets() {
    if (!GOOGLE_SHEETS_CONFIG || !GOOGLE_SHEETS_CONFIG.enabled) {
        alert('Google Sheets sync is not configured. Please configure it in the settings.');
        console.log('Google Sheets sync not configured');
        return;
    }
    
    const allFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
    const userFeedback = allFeedback.filter(f => f.userId === currentUser.phone);
    
    if (userFeedback.length === 0) {
        alert('No feedback to sync');
        return;
    }
    
    let syncedCount = 0;
    let failedCount = 0;
    
    const syncPromises = userFeedback.map(feedback => 
        syncFeedbackToGoogleSheets(feedback)
            .then(result => {
                if (result.success) {
                    syncedCount++;
                    console.log(`Synced feedback ${feedback.id} successfully`);
                } else {
                    failedCount++;
                    console.error(`Failed to sync feedback ${feedback.id}:`, result.reason || result.error);
                }
            })
            .catch(err => {
                failedCount++;
                console.error(`Error syncing feedback ${feedback.id}:`, err);
            })
    );
    
    Promise.all(syncPromises).then(() => {
        alert(`Sync complete!\nSynced: ${syncedCount}\nFailed: ${failedCount}`);
        console.log(`Feedback sync complete: ${syncedCount} synced, ${failedCount} failed`);
    });
}
