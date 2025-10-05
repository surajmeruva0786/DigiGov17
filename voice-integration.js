(function() {
    var originals = {
        setVoicePreference: window.setVoicePreference,
        showUserDashboard: window.showUserDashboard,
        showOfficialDashboard: window.showOfficialDashboard,
        showGovernmentSchemes: window.showGovernmentSchemes,
        showComplaints: window.showComplaints,
        showChildren: window.showChildren,
        showBillPayments: window.showBillPayments,
        showDocuments: window.showDocuments,
        logout: window.logout
    };

    window.setVoicePreference = function(enabled) {
        const settings = {
            enabled: enabled,
            ttsEnabled: true,
            sttEnabled: true
        };
        localStorage.setItem('voiceSettings', JSON.stringify(settings));
        
        if (typeof voiceSettings !== 'undefined') {
            voiceSettings.enabled = enabled;
            voiceSettings.ttsEnabled = true;
            voiceSettings.sttEnabled = true;
            if (typeof saveVoiceSettings === 'function') saveVoiceSettings();
            if (enabled) {
                if (typeof speak === 'function') speak("Voice assistance enabled");
                if (typeof startContinuousListening === 'function') startContinuousListening();
            }
        }
        
        if (typeof currentUser !== 'undefined' && currentUser) {
            if (typeof originals.showUserDashboard === 'function') originals.showUserDashboard();
        } else if (typeof currentOfficial !== 'undefined' && currentOfficial) {
            if (typeof originals.showOfficialDashboard === 'function') originals.showOfficialDashboard();
        }
    };

    window.showUserDashboard = function() {
        if (typeof originals.showUserDashboard === 'function') {
            originals.showUserDashboard();
            if (typeof announceNavigation === 'function') {
                announceNavigation('dashboard');
            }
        }
    };

    window.showOfficialDashboard = function() {
        if (typeof originals.showOfficialDashboard === 'function') {
            originals.showOfficialDashboard();
            if (typeof announceNavigation === 'function') {
                announceNavigation('dashboard');
            }
        }
    };

    window.showGovernmentSchemes = function() {
        if (typeof originals.showGovernmentSchemes === 'function') {
            originals.showGovernmentSchemes();
            if (typeof announceNavigation === 'function') {
                announceNavigation('schemes');
            }
        }
    };

    window.showComplaints = function() {
        if (typeof originals.showComplaints === 'function') {
            originals.showComplaints();
            if (typeof announceNavigation === 'function') {
                announceNavigation('complaints');
            }
        }
    };

    window.showChildren = function() {
        if (typeof originals.showChildren === 'function') {
            originals.showChildren();
            if (typeof announceNavigation === 'function') {
                announceNavigation('children');
            }
        }
    };

    window.showBillPayments = function() {
        if (typeof originals.showBillPayments === 'function') {
            originals.showBillPayments();
            if (typeof announceNavigation === 'function') {
                announceNavigation('billPayments');
            }
        }
    };

    window.showDocuments = function() {
        if (typeof originals.showDocuments === 'function') {
            originals.showDocuments();
            if (typeof announceNavigation === 'function') {
                announceNavigation('documents');
            }
        }
    };

    window.logout = function() {
        if (typeof speak === 'function') {
            speak("Logging out. Goodbye!");
        }
        if (typeof stopListening === 'function') {
            stopListening();
        }
        if (typeof originals.logout === 'function') {
            originals.logout();
        }
    };

    if (typeof updateVoiceUI === 'function') {
        setTimeout(updateVoiceUI, 500);
    }
})();
