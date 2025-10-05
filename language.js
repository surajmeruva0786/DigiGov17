function changeLanguage(langCode) {
    setLanguage(langCode);
    
    const selector = document.getElementById('global-language-selector');
    if (selector) {
        selector.value = langCode;
    }
    
    const lang = translations[langCode];
    if (lang && lang.voiceLang && typeof updateVoiceLanguage === 'function') {
        updateVoiceLanguage(langCode);
    }
    
    const voiceSettings = JSON.parse(localStorage.getItem('voiceSettings') || '{"enabled": false, "ttsEnabled": true, "sttEnabled": true}');
    if (voiceSettings.enabled && typeof speak === 'function') {
        speak(getTranslation('voice.enabled'));
    }
}

function updateVoiceLanguage(langCode) {
    const voiceSettings = JSON.parse(localStorage.getItem('voiceSettings') || '{"enabled": false, "ttsEnabled": true, "sttEnabled": true}');
    if (translations[langCode]) {
        voiceSettings.voiceLang = translations[langCode].voiceLang;
        localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
        
        if (typeof window.voiceSettings !== 'undefined') {
            window.voiceSettings.voiceLang = translations[langCode].voiceLang;
        }
        
        if (voiceSettings.enabled && typeof stopListening === 'function' && typeof startContinuousListening === 'function') {
            try {
                stopListening();
                setTimeout(() => {
                    startContinuousListening();
                }, 500);
            } catch (e) {
                console.log('Voice restart error:', e);
            }
        }
    }
}

function initializeLanguageSelector() {
    const savedLang = localStorage.getItem('language') || 'en';
    const selector = document.getElementById('global-language-selector');
    if (selector) {
        selector.value = savedLang;
    }
    
    updatePageLanguage();
}

function translateAlerts() {
    const originalAlert = window.alert;
    window.alert = function(message) {
        const translatedMessage = translateDynamicText(message);
        originalAlert(translatedMessage);
    };
}

function translateDynamicText(text) {
    const translationMap = {
        'Please upload Aadhaar photo': getTranslation('userRegister.uploadAadhaar'),
        'User with this phone number already exists': getTranslation('userRegister.userExists'),
        'Registration successful! Please login.': getTranslation('userRegister.registrationSuccess'),
        'Invalid phone number or password': getTranslation('userLogin.invalidCredentials'),
        'Invalid email or password': getTranslation('officialLogin.invalidCredentials'),
        'Official with this email already exists': getTranslation('officialRegister.officialExists'),
        'You have already applied for this scheme': getTranslation('schemes.alreadyApplied'),
        'Application submitted successfully!': getTranslation('schemes.applicationSuccess'),
        'Please enter a complaint': getTranslation('schemes.enterComplaint'),
        'Please enter complaint description': getTranslation('complaints.enterDescription'),
        'Voice recognition not supported in this browser. Please use Chrome or Edge.': getTranslation('complaints.voiceNotSupported'),
        'Please enter child name': getTranslation('children.enterName'),
        'Please enter date of birth': getTranslation('children.enterDOB'),
        'Child profile saved successfully!': getTranslation('children.childSaved'),
        'Please select document type': getTranslation('documents.selectDocType'),
        'Please select a file': getTranslation('documents.selectFile'),
        'Document uploaded successfully!': getTranslation('documents.uploadSuccess')
    };
    
    if (translationMap[text]) {
        return translationMap[text];
    }
    
    if (text.startsWith('Complaint submitted successfully! ID:')) {
        const id = text.split('ID:')[1];
        return getTranslation('schemes.complaintSubmitted') + id;
    }
    
    if (text.startsWith('Voice recognition error:')) {
        const error = text.split(':')[1];
        return getTranslation('complaints.voiceError') + error;
    }
    
    return text;
}

function updateDynamicContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translation);
            }
        } else if (el.tagName === 'OPTION') {
            el.textContent = translation;
        } else {
            if (el.children.length === 0) {
                el.textContent = translation;
            } else {
                const textNode = Array.from(el.childNodes).find(node => node.nodeType === 3);
                if (textNode) {
                    textNode.nodeValue = translation;
                }
            }
        }
    });
    
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', translation);
        }
    });
    
    document.title = getTranslation('home.title');
}

const originalAddFamilyMember = window.addFamilyMember;
window.addFamilyMember = function() {
    if (typeof originalAddFamilyMember === 'function') {
        originalAddFamilyMember();
    }
    
    setTimeout(() => {
        const familyMembers = document.querySelectorAll('.family-member');
        const lastMember = familyMembers[familyMembers.length - 1];
        if (lastMember) {
            const labels = lastMember.querySelectorAll('label');
            const inputs = lastMember.querySelectorAll('input');
            
            if (labels[0]) labels[0].textContent = getTranslation('userRegister.memberName');
            if (labels[1]) labels[1].textContent = getTranslation('userRegister.relationship');
            if (labels[2]) labels[2].textContent = getTranslation('userRegister.age');
            
            if (inputs[0]) inputs[0].setAttribute('placeholder', getTranslation('userRegister.memberNamePlaceholder'));
            if (inputs[1]) inputs[1].setAttribute('placeholder', getTranslation('userRegister.relationshipPlaceholder'));
            if (inputs[2]) inputs[2].setAttribute('placeholder', getTranslation('userRegister.agePlaceholder'));
        }
    }, 100);
};

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        initializeLanguageSelector();
        translateAlerts();
    });
    
    const originalShowScreen = window.showScreen;
    if (typeof originalShowScreen === 'function') {
        window.showScreen = function(screenId) {
            originalShowScreen(screenId);
            setTimeout(updateDynamicContent, 50);
        };
    }
}

setInterval(updateDynamicContent, 1000);
