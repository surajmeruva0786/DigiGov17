function showDigitalIDCard() {
    showScreen('digital-id-card-screen');
    loadDigitalIDCard();
}

function getDigitalIDKey() {
    if (!currentUser || !currentUser.phone) {
        return null;
    }
    return `digitalID_${currentUser.phone}`;
}

function loadDigitalIDCard() {
    const idKey = getDigitalIDKey();
    
    if (!idKey) {
        document.getElementById('no-id-card-message').style.display = 'block';
        document.getElementById('id-card-display').style.display = 'none';
        return;
    }
    
    const digitalID = localStorage.getItem(idKey);
    
    if (digitalID) {
        try {
            const idData = JSON.parse(digitalID);
            displayIDCard(idData);
        } catch (e) {
            console.error('Error parsing digital ID:', e);
            document.getElementById('no-id-card-message').style.display = 'block';
            document.getElementById('id-card-display').style.display = 'none';
        }
    } else {
        document.getElementById('no-id-card-message').style.display = 'block';
        document.getElementById('id-card-display').style.display = 'none';
    }
}

function generateDigitalID() {
    if (!currentUser) {
        alert('Please login to generate your digital ID card');
        return;
    }

    const userName = currentUser.name || currentUser.email.split('@')[0];
    
    const idCardData = {
        name: userName,
        aadhaar: currentUser.aadhaar,
        address: currentUser.address,
        phone: currentUser.phone,
        photo: currentUser.aadhaarPhoto,
        generatedAt: new Date().toISOString()
    };

    const idKey = getDigitalIDKey();
    if (idKey) {
        localStorage.setItem(idKey, JSON.stringify(idCardData));
        displayIDCard(idCardData);
        alert('Digital ID Card generated successfully!');
    }
}

function displayIDCard(idData) {
    document.getElementById('no-id-card-message').style.display = 'none';
    document.getElementById('id-card-display').style.display = 'block';
    
    document.getElementById('id-photo').src = idData.photo;
    document.getElementById('id-name').textContent = idData.name;
    document.getElementById('id-aadhaar').textContent = formatAadhaar(idData.aadhaar);
    document.getElementById('id-address').textContent = idData.address;
    document.getElementById('id-phone').textContent = idData.phone;
    
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = '';
    
    const qrData = JSON.stringify({
        name: idData.name,
        aadhaar: idData.aadhaar,
        phone: idData.phone,
        address: idData.address
    });
    
    new QRCode(qrContainer, {
        text: qrData,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function formatAadhaar(aadhaar) {
    if (!aadhaar) return '';
    const str = aadhaar.toString();
    return str.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
}

function downloadIDCard() {
    const idCard = document.getElementById('id-card');
    
    html2canvas(idCard, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'digital-id-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        alert('Digital ID Card downloaded successfully!');
    }).catch(err => {
        console.error('Error downloading ID card:', err);
        alert('Error downloading ID card. Please try again.');
    });
}

function deleteIDCard() {
    if (confirm('Are you sure you want to delete your Digital ID Card? You can regenerate it anytime.')) {
        const idKey = getDigitalIDKey();
        
        if (idKey) {
            localStorage.removeItem(idKey);
            
            document.getElementById('no-id-card-message').style.display = 'block';
            document.getElementById('id-card-display').style.display = 'none';
            
            alert('Digital ID Card deleted successfully!');
        }
    }
}

function autoGenerateIDOnRegistration() {
    if (!currentUser) return;
    
    const idKey = getDigitalIDKey();
    if (!idKey) return;
    
    const digitalID = localStorage.getItem(idKey);
    if (!digitalID) {
        const userName = currentUser.name || currentUser.email.split('@')[0];
        
        const idCardData = {
            name: userName,
            aadhaar: currentUser.aadhaar,
            address: currentUser.address,
            phone: currentUser.phone,
            photo: currentUser.aadhaarPhoto,
            generatedAt: new Date().toISOString()
        };

        localStorage.setItem(idKey, JSON.stringify(idCardData));
        
        const idCardScreen = document.getElementById('digital-id-card-screen');
        if (idCardScreen && idCardScreen.classList.contains('active')) {
            displayIDCard(idCardData);
        }
    }
}
