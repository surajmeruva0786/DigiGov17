let voiceSettings = {
    enabled: false,
    ttsEnabled: true,
    sttEnabled: true,
    voiceLang: 'en-IN'
};

let voiceRecognition = null;
let synthesis = window.speechSynthesis;
let isListening = false;

function getVoiceLang() {
    const currentLang = localStorage.getItem('language') || 'en';
    if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].voiceLang) {
        return translations[currentLang].voiceLang;
    }
    return 'en-IN';
}

function initVoiceSystem() {
    const saved = localStorage.getItem('voiceSettings');
    if (saved) {
        try {
            voiceSettings = JSON.parse(saved);
        } catch (e) {
            voiceSettings = { enabled: false, ttsEnabled: true, sttEnabled: true, voiceLang: 'en-IN' };
        }
    }
    
    if (!voiceSettings.voiceLang) {
        voiceSettings.voiceLang = getVoiceLang();
    }
    
    if (voiceSettings.enabled) {
        startContinuousListening();
    }
}

function saveVoiceSettings() {
    localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
}

function speak(text, callback) {
    if (!voiceSettings.enabled || !voiceSettings.ttsEnabled) {
        if (callback) callback();
        return;
    }
    
    synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceSettings.voiceLang || getVoiceLang();
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    if (callback) {
        utterance.onend = callback;
    }
    
    synthesis.speak(utterance);
}

function toggleVoice(enable) {
    voiceSettings.enabled = enable;
    voiceSettings.voiceLang = getVoiceLang();
    saveVoiceSettings();
    
    if (enable) {
        const enabledMsg = typeof getTranslation === 'function' ? 
            getTranslation('voice.enabled') : 
            "Voice assistance enabled";
        speak(enabledMsg);
        startContinuousListening();
    } else {
        const disabledMsg = typeof getTranslation === 'function' ? 
            getTranslation('voice.disabled') : 
            "Voice assistance disabled";
        speak(disabledMsg);
        stopListening();
    }
    
    updateVoiceUI();
}

function updateVoiceUI() {
    const voiceToggle = document.getElementById('voice-toggle');
    const voiceStatus = document.getElementById('voice-status');
    const listeningIndicator = document.getElementById('listening-indicator');
    
    if (voiceToggle) {
        voiceToggle.textContent = voiceSettings.enabled ? '🔊 Voice On' : '🔇 Voice Off';
        voiceToggle.className = voiceSettings.enabled ? 'voice-toggle-btn active' : 'voice-toggle-btn';
    }
    
    if (voiceStatus) {
        voiceStatus.textContent = voiceSettings.enabled ? 'Voice assistance is active' : 'Voice assistance is off';
    }
    
    if (listeningIndicator) {
        listeningIndicator.style.display = isListening && voiceSettings.enabled ? 'flex' : 'none';
    }
}

function startContinuousListening() {
    if (!voiceSettings.enabled || !voiceSettings.sttEnabled) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Voice recognition not supported');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceRecognition = new SpeechRecognition();
    voiceRecognition.lang = voiceSettings.voiceLang || getVoiceLang();
    voiceRecognition.continuous = true;
    voiceRecognition.interimResults = false;
    
    voiceRecognition.onstart = function() {
        isListening = true;
        updateVoiceUI();
    };
    
    voiceRecognition.onresult = function(event) {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        showVoiceCommand(command);
        handleVoiceCommand(command);
    };
    
    voiceRecognition.onerror = function(event) {
        if (event.error === 'no-speech') {
            return;
        }
        console.log('Voice recognition error:', event.error);
    };
    
    voiceRecognition.onend = function() {
        isListening = false;
        updateVoiceUI();
        
        if (voiceSettings.enabled && voiceSettings.sttEnabled) {
            setTimeout(() => {
                try {
                    voiceRecognition.start();
                } catch (e) {
                    console.log('Restart failed:', e);
                }
            }, 1000);
        }
    };
    
    try {
        voiceRecognition.start();
    } catch (e) {
        console.log('Failed to start recognition:', e);
    }
}

function stopListening() {
    if (voiceRecognition) {
        try {
            voiceRecognition.stop();
            voiceRecognition = null;
        } catch (e) {
            console.log('Stop error:', e);
        }
    }
    isListening = false;
    updateVoiceUI();
}

function handleVoiceCommand(command) {
    const commandMap = {
        'schemes': showGovernmentSchemes,
        'scheme': showGovernmentSchemes,
        'government schemes': showGovernmentSchemes,
        'complaints': showComplaints,
        'complaint': showComplaints,
        'file complaint': showComplaints,
        'children': showChildren,
        'child': showChildren,
        'bill payments': showBillPayments,
        'bills': showBillPayments,
        'bill payment': showBillPayments,
        'pay bill': showBillPayments,
        'documents': showDocuments,
        'document': showDocuments,
        'health services': showHealthServices,
        'health': showHealthServices,
        'blood donor': showHealthServices,
        'organ donor': showHealthServices,
        'dashboard': () => {
            if (currentUser) showUserDashboard();
            else if (currentOfficial) showOfficialDashboard();
        },
        'home': () => {
            if (currentUser) showUserDashboard();
            else if (currentOfficial) showOfficialDashboard();
        },
        'logout': logout,
        'log out': logout,
        'sign out': logout,
        'analytics': showUserAnalytics,
        'help': showVoiceHelp,
        'commands': showVoiceHelp
    };
    
    for (const [key, action] of Object.entries(commandMap)) {
        if (command.includes(key)) {
            speak(`Opening ${key}`);
            action();
            return;
        }
    }
}

function showVoiceCommand(command) {
    const indicator = document.getElementById('voice-command-display');
    if (indicator) {
        indicator.textContent = `"${command}"`;
        indicator.style.display = 'block';
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 3000);
    }
}

function showVoiceHelp() {
    const helpModal = document.getElementById('voice-help-modal');
    if (helpModal) {
        helpModal.style.display = 'flex';
        speak("Here are the available voice commands");
    }
}

function closeVoiceHelp() {
    const helpModal = document.getElementById('voice-help-modal');
    if (helpModal) {
        helpModal.style.display = 'none';
    }
}

function announceLogin(userType) {
    if (userType === 'user') {
        const msg = typeof getTranslation === 'function' ? 
            getTranslation('voice.loginSuccess') : 
            'Login successful. Welcome to your dashboard.';
        speak(msg);
    } else {
        const msg = typeof getTranslation === 'function' ? 
            getTranslation('voice.officialLoginSuccess') : 
            'Official login successful. Welcome to the admin dashboard.';
        speak(msg);
    }
}

function announceRegistration() {
    const msg = typeof getTranslation === 'function' ? 
        getTranslation('voice.registrationSuccess') : 
        "Registration successful! Please login to continue.";
    speak(msg);
}

function announceNavigation(destination) {
    const messages = {
        'schemes': typeof getTranslation === 'function' ? getTranslation('voice.openingSchemes') : 'Opening government schemes section',
        'complaints': typeof getTranslation === 'function' ? getTranslation('voice.openingComplaints') : 'Opening complaints section',
        'children': typeof getTranslation === 'function' ? getTranslation('voice.openingChildren') : 'Opening children management section',
        'billPayments': typeof getTranslation === 'function' ? getTranslation('voice.openingBillPayments') : 'Opening bill payments section',
        'documents': typeof getTranslation === 'function' ? getTranslation('voice.openingDocuments') : 'Opening documents section',
        'dashboard': typeof getTranslation === 'function' ? getTranslation('voice.returningDashboard') : 'Returning to dashboard',
        'analytics': typeof getTranslation === 'function' ? getTranslation('voice.openingAnalytics') : 'Opening analytics dashboard'
    };
    
    speak(messages[destination] || (typeof getTranslation === 'function' ? getTranslation('voice.navigatingTo') : 'Navigating to') + ` ${destination}`);
}

function announceSchemeApplication(schemeName) {
    const msg = (typeof getTranslation === 'function' ? getTranslation('voice.applying') : 'Applying for') + ` ${schemeName} ` + 
        (typeof getTranslation === 'function' ? getTranslation('voice.scheme') : 'scheme');
    speak(msg);
}

function announceComplaintFiled(complaintId) {
    const msg = (typeof getTranslation === 'function' ? getTranslation('voice.complaintFiled') : 'Complaint filed successfully. Your complaint ID is') + ` ${complaintId}`;
    speak(msg);
}

function announceDocumentUpload(docType) {
    const msg = `${docType} ` + (typeof getTranslation === 'function' ? getTranslation('voice.documentUploaded') : 'uploaded successfully');
    speak(msg);
}

function announceBillPayment(billType, amount) {
    const msg = (typeof getTranslation === 'function' ? getTranslation('voice.proceedingPayment') : 'Proceeding to pay') + 
        ` ${billType} ` + (typeof getTranslation === 'function' ? getTranslation('voice.bill') : 'bill') + ` ${amount}`;
    speak(msg);
}

function announceChildAdded(childName) {
    const msg = `${childName} ` + (typeof getTranslation === 'function' ? getTranslation('voice.childAdded') : 'has been added to your children list');
    speak(msg);
}

function announceError(message) {
    const msg = (typeof getTranslation === 'function' ? getTranslation('voice.error') : 'Error:') + ` ${message}`;
    speak(msg);
}

function updateVoiceLanguage(langCode) {
    const newVoiceLang = getVoiceLang();
    voiceSettings.voiceLang = newVoiceLang;
    saveVoiceSettings();
    
    if (voiceSettings.enabled && voiceRecognition) {
        stopListening();
        setTimeout(() => {
            startContinuousListening();
        }, 500);
    }
}

initVoiceSystem();
