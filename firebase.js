const firebaseConfig = {
  apiKey: "AIzaSyDwzhX2z2Cz2wDRkWwjGZSI6ReCxIiHckQ",
  authDomain: "digigov-325e9.firebaseapp.com",
  projectId: "digigov-325e9",
  storageBucket: "digigov-325e9.firebasestorage.app",
  messagingSenderId: "471958420418",
  appId: "1:471958420418:web:6fad92f7bc8cf182c4745b",
  measurementId: "G-LZDR1SVH98"
};

try {
    firebase.initializeApp(firebaseConfig);
    
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    
    window.addEventListener('DOMContentLoaded', function() {
        const loader = document.getElementById('firebase-loader');
        const statusText = document.getElementById('firebase-status-text');
        
        setTimeout(() => {
            statusText.textContent = 'Connected ✅';
            statusText.style.color = '#34e89e';
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 800);
        }, 1500);
    });
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    
    window.addEventListener('DOMContentLoaded', function() {
        const loader = document.getElementById('firebase-loader');
        const statusText = document.getElementById('firebase-status-text');
        
        statusText.textContent = 'Firebase connection failed ❌';
        statusText.style.color = '#ff6b6b';
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    });
}
