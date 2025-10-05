const translations = {
    en: {
        code: 'en',
        name: 'English',
        voiceLang: 'en-IN',
        
        home: {
            title: 'Government Service Portal',
            subtitle: 'Digital India Initiative',
            userBlock: 'User',
            userDesc: 'Access citizen services',
            officialBlock: 'Government Official',
            officialDesc: 'Admin portal'
        },
        
        common: {
            back: 'Back',
            login: 'Login',
            register: 'Register',
            logout: 'Logout',
            submit: 'Submit',
            cancel: 'Cancel',
            save: 'Save',
            delete: 'Delete',
            edit: 'Edit',
            search: 'Search',
            apply: 'Apply',
            close: 'Close',
            yes: 'Yes',
            no: 'No',
            loading: 'Loading...',
            viewDetails: 'View Details',
            download: 'Download'
        },
        
        userLogin: {
            title: 'User Login',
            phone: 'Phone Number',
            phonePlaceholder: '10-digit phone number',
            password: 'Password',
            passwordPlaceholder: 'Enter password',
            loginButton: 'Login',
            noAccount: "Don't have an account?",
            registerLink: 'Register',
            invalidCredentials: 'Invalid phone number or password'
        },
        
        userRegister: {
            title: 'User Registration',
            aadhaar: 'Aadhaar Number *',
            aadhaarPlaceholder: '12-digit Aadhaar number',
            aadhaarPhoto: 'Aadhaar Photo *',
            phone: 'Phone Number *',
            phonePlaceholder: '10-digit phone number',
            email: 'Email *',
            emailPlaceholder: 'your.email@example.com',
            password: 'Password *',
            passwordPlaceholder: 'Create password',
            address: 'Address *',
            addressPlaceholder: 'Enter full address',
            familyMembers: 'Family Members',
            addFamilyMember: '+ Add Family Member',
            registerButton: 'Register',
            memberName: 'Name',
            memberNamePlaceholder: 'Family member name',
            relationship: 'Relationship',
            relationshipPlaceholder: 'e.g., Spouse, Child',
            age: 'Age',
            agePlaceholder: 'Age',
            uploadAadhaar: 'Please upload Aadhaar photo',
            userExists: 'User with this phone number already exists',
            registrationSuccess: 'Registration successful! Please login.'
        },
        
        officialLogin: {
            title: 'Official Login',
            email: 'Email',
            emailPlaceholder: 'Official email',
            password: 'Password',
            passwordPlaceholder: 'Enter password',
            loginButton: 'Login',
            noAccount: "Don't have an account?",
            registerLink: 'Register',
            invalidCredentials: 'Invalid email or password'
        },
        
        officialRegister: {
            title: 'Official Registration',
            name: 'Full Name *',
            namePlaceholder: 'Enter full name',
            email: 'Email *',
            emailPlaceholder: 'official.email@gov.in',
            password: 'Password *',
            passwordPlaceholder: 'Create password',
            qualification: 'Qualification *',
            qualificationPlaceholder: 'e.g., B.Tech, MBA',
            department: 'Department *',
            departmentPlaceholder: 'e.g., Revenue, Health',
            registerButton: 'Register',
            officialExists: 'Official with this email already exists',
            registrationSuccess: 'Registration successful! Please login.'
        },
        
        voiceSetup: {
            title: 'Voice Assistance Setup',
            heading: 'Enable Voice Assistance?',
            description: 'Voice assistance helps you navigate the portal using voice commands',
            enableButton: 'Yes, Enable',
            disableButton: 'No, Thanks'
        },
        
        dashboard: {
            welcome: 'Welcome',
            documentsSummary: '📄 Documents Summary',
            complaintsSummary: '📝 Complaints Status',
            schemeSummary: '📋 Scheme Applications',
            noDocuments: 'No documents uploaded yet',
            noComplaints: 'No complaints filed yet',
            noApplications: 'No scheme applications yet',
            total: 'Total',
            totalComplaints: 'Total Complaints',
            totalApplications: 'Total Applications',
            recentUpdates: 'Recent Updates:',
            globalSearch: '🔍 Global Search',
            searchPlaceholder: 'Search across all services...',
            viewAnalytics: '📊 View My Analytics',
            governmentSchemes: 'Government Schemes',
            governmentSchemesDesc: 'Browse available schemes',
            complaints: 'Complaints',
            complaintsDesc: 'File a complaint',
            children: 'Children',
            childrenDesc: 'Manage child records',
            billPayments: 'Bill Payments',
            billPaymentsDesc: 'Pay your bills',
            documents: 'Documents',
            documentsDesc: 'Manage documents',
            citizenFeedback: 'Citizen Feedback',
            citizenFeedbackDesc: 'Rate your service experience',
            educationAssistance: 'Education Assistance',
            educationAssistanceDesc: 'Apply for scholarships',
            document: 'document',
            documents_plural: 'documents'
        },
        
        feedback: {
            title: 'Citizen Feedback',
            submitNew: '+ Submit New Feedback',
            yourFeedback: 'Your Feedback History',
            filterByService: 'Filter by Service Type',
            allServices: 'All Services',
            selectService: 'Select Service to Rate',
            selectServicePlaceholder: 'Select a service to rate',
            rating: 'Your Rating',
            poor: 'Poor',
            excellent: 'Excellent',
            comments: 'Comments (Optional)',
            commentsPlaceholder: 'Share your experience and suggestions...',
            voiceInput: 'Voice Input',
            listening: 'Listening...',
            submit: 'Submit Feedback',
            submitFeedback: 'Submit Feedback',
            thankYou: 'Thank you for your feedback! Your rating has been submitted.',
            selectServiceError: 'Please select a service to rate',
            selectRatingError: 'Please select a star rating',
            noFeedback: 'No feedback submitted yet'
        },
        
        education: {
            title: 'Education Assistance',
            applyScholarship: '+ Apply for Scholarship',
            yourApplications: 'Your Scholarship Applications',
            applicationForm: 'Scholarship Application',
            studentName: 'Student Name *',
            studentNamePlaceholder: 'Full name of the student',
            course: 'Course/Class *',
            selectCourse: 'Select Course/Class',
            gradePercentage: 'Grade/Percentage (%) *',
            gradePlaceholder: 'Enter percentage (0-100)',
            familyIncome: 'Family Annual Income (₹) *',
            incomePlaceholder: 'Enter annual family income',
            purpose: 'Purpose/Remarks',
            purposePlaceholder: 'Why do you need this scholarship?',
            markSheets: 'Upload Mark Sheets *',
            markSheetsHint: 'Upload latest mark sheets/grade cards (multiple files allowed)',
            submitApplication: 'Submit Application'
        },
        
        schemes: {
            title: 'Government Schemes',
            state: 'State',
            searchPlaceholder: 'Search schemes...',
            noSchemes: 'No schemes found',
            description: 'Description:',
            benefits: 'Benefits:',
            eligibility: 'Eligibility:',
            apply: 'Apply',
            alreadyApplied: 'You have already applied for this scheme',
            applicationSuccess: 'Application submitted successfully!',
            quickComplaint: 'Quick Complaint',
            complaintPlaceholder: 'Type your complaint here...',
            voiceInput: '🎤 Voice Input',
            submitComplaint: 'Submit Complaint',
            enterComplaint: 'Please enter a complaint',
            complaintSubmitted: 'Complaint submitted successfully! ID:',
            status: {
                pending: 'Pending',
                accepted: 'Accepted',
                rejected: 'Rejected'
            }
        },
        
        complaints: {
            title: 'File a Complaint',
            yourComplaints: 'Your Complaints',
            fileComplaint: 'File Complaint',
            selectDepartment: 'Select Department',
            complaintDescription: 'Complaint Description',
            descriptionPlaceholder: 'Describe your complaint...',
            voiceInput: '🎤 Voice Input',
            submitButton: 'Submit Complaint',
            cancelButton: 'Cancel',
            enterDescription: 'Please enter complaint description',
            complaintId: 'Complaint ID:',
            department: 'Department:',
            status: 'Status:',
            description: 'Description:',
            date: 'Date:',
            noComplaints: 'No complaints filed yet',
            complaintSubmitted: 'Complaint submitted successfully! ID:',
            voiceNotSupported: 'Voice recognition not supported in this browser. Please use Chrome or Edge.',
            voiceError: 'Voice recognition error:'
        },
        
        billPayments: {
            title: 'Bill Payments',
            electricity: 'Electricity',
            electricityDesc: 'Pay your electricity bill',
            water: 'Water',
            waterDesc: 'Pay your water bill',
            gas: 'Gas',
            gasDesc: 'Pay your gas bill',
            payBill: 'Pay',
            billTitle: 'Bill',
            consumerNumber: 'Consumer Number',
            consumerPlaceholder: 'Enter consumer number',
            amount: 'Amount (₹)',
            amountPlaceholder: 'Enter amount',
            proceedPayment: 'Proceed to Payment',
            cancel: 'Cancel',
            paymentHistory: 'Payment History',
            noHistory: 'No payment history yet',
            selectUPI: 'Select UPI App',
            verifyPIN: '🔒 Verify PIN',
            pinDescription: 'Enter your 4-digit PIN to continue payment',
            paymentSuccess: 'Payment successful!',
            paymentFailed: 'Payment failed. Please try again.'
        },
        
        children: {
            title: 'Children',
            addChild: '+ Add Child',
            addChildProfile: 'Add Child Profile',
            childName: 'Child Name *',
            namePlaceholder: 'Enter child name',
            dateOfBirth: 'Date of Birth *',
            gender: 'Gender *',
            male: 'Male',
            female: 'Female',
            other: 'Other',
            birthCertificate: 'Birth Certificate Number',
            certificatePlaceholder: 'Enter birth certificate number',
            schoolName: 'School Name',
            schoolPlaceholder: 'Enter school name',
            grade: 'Grade/Class',
            gradePlaceholder: 'Enter grade',
            saveButton: 'Save Child',
            cancelButton: 'Cancel',
            yourChildren: 'Your Children',
            noChildren: 'No children registered yet',
            age: 'Age',
            years: 'years',
            school: 'School:',
            class: 'Class:',
            certificate: 'Certificate:',
            childSaved: 'Child profile saved successfully!',
            enterName: 'Please enter child name',
            enterDOB: 'Please enter date of birth'
        },
        
        documents: {
            title: 'Documents',
            uploadDocument: '+ Upload Document',
            uploadNew: 'Upload New Document',
            documentType: 'Document Type *',
            selectType: 'Select document type',
            aadhaarCard: 'Aadhaar Card',
            rationCard: 'Ration Card',
            birthCertificate: 'Birth Certificate',
            incomeCertificate: 'Income Certificate',
            casteCertificate: 'Caste Certificate',
            other: 'Other',
            documentFile: 'Document File *',
            uploadButton: 'Upload Document',
            cancelButton: 'Cancel',
            yourDocuments: 'Your Documents',
            noDocuments: 'No documents uploaded yet',
            type: 'Type:',
            uploadedOn: 'Uploaded:',
            view: 'View',
            downloadButton: 'Download',
            selectDocType: 'Please select document type',
            selectFile: 'Please select a file',
            uploadSuccess: 'Document uploaded successfully!',
            uploadedDate: 'Uploaded on'
        },
        
        searchResults: {
            title: 'Search Results',
            searchPlaceholder: 'Search across all services...',
            filters: 'Filters',
            complaints: 'Complaints',
            allDepartments: 'All Departments',
            allStatus: 'All Status',
            pending: 'Pending',
            inProgress: 'In Progress',
            resolved: 'Resolved',
            documents: 'Documents',
            allTypes: 'All Types',
            payments: 'Payments',
            allServices: 'All Services',
            clearFilters: 'Clear All Filters',
            searchInfo: 'Enter a search term to find results across Schemes, Complaints, Payments, Children, and Documents',
            noResults: 'No results found',
            foundIn: 'Found in'
        },
        
        settings: {
            title: 'Settings',
            language: 'Language',
            selectLanguage: 'Select Language',
            voiceSettings: 'Voice Settings',
            enableVoice: 'Enable Voice Assistance',
            disableVoice: 'Disable Voice Assistance',
            voiceEnabled: 'Voice assistance is active',
            voiceDisabled: 'Voice assistance is off',
            saveSettings: 'Save Settings',
            settingsSaved: 'Settings saved successfully!'
        },
        
        voice: {
            enabled: 'Voice assistance enabled',
            disabled: 'Voice assistance disabled',
            loginSuccess: 'Login successful. Welcome to your dashboard.',
            officialLoginSuccess: 'Official login successful. Welcome to the admin dashboard.',
            registrationSuccess: 'Registration successful! Please login to continue.',
            navigatingTo: 'Navigating to',
            openingSchemes: 'Opening government schemes section',
            openingComplaints: 'Opening complaints section',
            openingChildren: 'Opening children management section',
            openingBillPayments: 'Opening bill payments section',
            openingDocuments: 'Opening documents section',
            returningDashboard: 'Returning to dashboard',
            openingAnalytics: 'Opening analytics dashboard',
            loggingOut: 'Logging out. Goodbye!',
            applying: 'Applying for',
            scheme: 'scheme',
            complaintFiled: 'Complaint filed successfully. Your complaint ID is',
            documentUploaded: 'uploaded successfully',
            proceedingPayment: 'Proceeding to pay',
            bill: 'bill of rupees',
            childAdded: 'has been added to your children list',
            error: 'Error:',
            listening: 'Listening...'
        },

        language: {
            select: 'Select Language',
            english: 'English',
            hindi: 'हिंदी (Hindi)',
            telugu: 'తెలుగు (Telugu)',
            tamil: 'தமிழ் (Tamil)',
            kannada: 'ಕನ್ನಡ (Kannada)',
            malayalam: 'മലയാളം (Malayalam)',
            bengali: 'বাংলা (Bengali)',
            gujarati: 'ગુજરાતી (Gujarati)'
        }
    },
    
    hi: {
        code: 'hi',
        name: 'हिंदी',
        voiceLang: 'hi-IN',
        
        home: {
            title: 'सरकारी सेवा पोर्टल',
            subtitle: 'डिजिटल इंडिया पहल',
            userBlock: 'उपयोगकर्ता',
            userDesc: 'नागरिक सेवाएं प्राप्त करें',
            officialBlock: 'सरकारी अधिकारी',
            officialDesc: 'प्रशासक पोर्टल'
        },
        
        common: {
            back: 'वापस',
            login: 'लॉगिन',
            register: 'पंजीकरण',
            logout: 'लॉगआउट',
            submit: 'जमा करें',
            cancel: 'रद्द करें',
            save: 'सहेजें',
            delete: 'हटाएं',
            edit: 'संपादित करें',
            search: 'खोजें',
            apply: 'आवेदन करें',
            close: 'बंद करें',
            yes: 'हां',
            no: 'नहीं',
            loading: 'लोड हो रहा है...',
            viewDetails: 'विवरण देखें',
            download: 'डाउनलोड करें'
        },
        
        userLogin: {
            title: 'उपयोगकर्ता लॉगिन',
            phone: 'फोन नंबर',
            phonePlaceholder: '10 अंकों का फोन नंबर',
            password: 'पासवर्ड',
            passwordPlaceholder: 'पासवर्ड दर्ज करें',
            loginButton: 'लॉगिन',
            noAccount: 'खाता नहीं है?',
            registerLink: 'पंजीकरण करें',
            invalidCredentials: 'अमान्य फोन नंबर या पासवर्ड'
        },
        
        userRegister: {
            title: 'उपयोगकर्ता पंजीकरण',
            aadhaar: 'आधार नंबर *',
            aadhaarPlaceholder: '12 अंकों का आधार नंबर',
            aadhaarPhoto: 'आधार फोटो *',
            phone: 'फोन नंबर *',
            phonePlaceholder: '10 अंकों का फोन नंबर',
            email: 'ईमेल *',
            emailPlaceholder: 'आपका.ईमेल@example.com',
            password: 'पासवर्ड *',
            passwordPlaceholder: 'पासवर्ड बनाएं',
            address: 'पता *',
            addressPlaceholder: 'पूरा पता दर्ज करें',
            familyMembers: 'परिवार के सदस्य',
            addFamilyMember: '+ परिवार का सदस्य जोड़ें',
            registerButton: 'पंजीकरण करें',
            memberName: 'नाम',
            memberNamePlaceholder: 'परिवार के सदस्य का नाम',
            relationship: 'रिश्ता',
            relationshipPlaceholder: 'जैसे, पति/पत्नी, बच्चा',
            age: 'उम्र',
            agePlaceholder: 'उम्र',
            uploadAadhaar: 'कृपया आधार फोटो अपलोड करें',
            userExists: 'इस फोन नंबर वाला उपयोगकर्ता पहले से मौजूद है',
            registrationSuccess: 'पंजीकरण सफल! कृपया लॉगिन करें।'
        },
        
        officialLogin: {
            title: 'अधिकारी लॉगिन',
            email: 'ईमेल',
            emailPlaceholder: 'आधिकारिक ईमेल',
            password: 'पासवर्ड',
            passwordPlaceholder: 'पासवर्ड दर्ज करें',
            loginButton: 'लॉगिन',
            noAccount: 'खाता नहीं है?',
            registerLink: 'पंजीकरण करें',
            invalidCredentials: 'अमान्य ईमेल या पासवर्ड'
        },
        
        officialRegister: {
            title: 'अधिकारी पंजीकरण',
            name: 'पूरा नाम *',
            namePlaceholder: 'पूरा नाम दर्ज करें',
            email: 'ईमेल *',
            emailPlaceholder: 'अधिकारी.ईमेल@gov.in',
            password: 'पासवर्ड *',
            passwordPlaceholder: 'पासवर्ड बनाएं',
            qualification: 'योग्यता *',
            qualificationPlaceholder: 'जैसे, B.Tech, MBA',
            department: 'विभाग *',
            departmentPlaceholder: 'जैसे, राजस्व, स्वास्थ्य',
            registerButton: 'पंजीकरण करें',
            officialExists: 'इस ईमेल वाला अधिकारी पहले से मौजूद है',
            registrationSuccess: 'पंजीकरण सफल! कृपया लॉगिन करें।'
        },
        
        voiceSetup: {
            title: 'वॉयस सहायता सेटअप',
            heading: 'वॉयस सहायता सक्षम करें?',
            description: 'वॉयस सहायता आपको वॉयस कमांड का उपयोग करके पोर्टल नेविगेट करने में मदद करती है',
            enableButton: 'हां, सक्षम करें',
            disableButton: 'नहीं, धन्यवाद'
        },
        
        dashboard: {
            welcome: 'स्वागत है',
            documentsSummary: '📄 दस्तावेज़ सारांश',
            complaintsSummary: '📝 शिकायत स्थिति',
            schemeSummary: '📋 योजना आवेदन',
            noDocuments: 'अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया',
            noComplaints: 'अभी तक कोई शिकायत दर्ज नहीं की गई',
            noApplications: 'अभी तक कोई योजना आवेदन नहीं',
            educationAssistance: 'शिक्षा सहायता',
            educationAssistanceDesc: 'छात्रवृत्ति के लिए आवेदन करें',
            total: 'कुल',
            totalComplaints: 'कुल शिकायतें',
            totalApplications: 'कुल आवेदन',
            recentUpdates: 'हालिया अपडेट:',
            globalSearch: '🔍 वैश्विक खोज',
            searchPlaceholder: 'सभी सेवाओं में खोजें...',
            viewAnalytics: '📊 मेरा विश्लेषण देखें',
            governmentSchemes: 'सरकारी योजनाएं',
            governmentSchemesDesc: 'उपलब्ध योजनाएं देखें',
            complaints: 'शिकायतें',
            complaintsDesc: 'शिकायत दर्ज करें',
            children: 'बच्चे',
            childrenDesc: 'बच्चों के रिकॉर्ड प्रबंधित करें',
            billPayments: 'बिल भुगतान',
            billPaymentsDesc: 'अपने बिल का भुगतान करें',
            documents: 'दस्तावेज़',
            documentsDesc: 'दस्तावेज़ प्रबंधित करें',
            citizenFeedback: 'नागरिक प्रतिक्रिया',
            citizenFeedbackDesc: 'अपनी सेवा के अनुभव को रेट करें',
            document: 'दस्तावेज़',
            documents_plural: 'दस्तावेज़'
        },
        
        feedback: {
            title: 'नागरिक प्रतिक्रिया',
            submitNew: '+ नई प्रतिक्रिया जमा करें',
            yourFeedback: 'आपकी प्रतिक्रिया इतिहास',
            filterByService: 'सेवा प्रकार के अनुसार फ़िल्टर करें',
            allServices: 'सभी सेवाएं',
            selectService: 'रेट करने के लिए सेवा चुनें',
            selectServicePlaceholder: 'रेट करने के लिए सेवा चुनें',
            rating: 'आपकी रेटिंग',
            poor: 'खराब',
            excellent: 'उत्कृष्ट',
            comments: 'टिप्पणियां (वैकल्पिक)',
            commentsPlaceholder: 'अपना अनुभव और सुझाव साझा करें...',
            voiceInput: 'वॉयस इनपुट',
            listening: 'सुन रहा है...',
            submit: 'प्रतिक्रिया जमा करें',
            submitFeedback: 'प्रतिक्रिया जमा करें',
            thankYou: 'आपकी प्रतिक्रिया के लिए धन्यवाद! आपकी रेटिंग जमा कर दी गई है।',
            selectServiceError: 'कृपया रेट करने के लिए सेवा चुनें',
            selectRatingError: 'कृपया स्टार रेटिंग चुनें',
            noFeedback: 'अभी तक कोई प्रतिक्रिया जमा नहीं की गई'
        },
        
        schemes: {
            title: 'सरकारी योजनाएं',
            state: 'राज्य',
            searchPlaceholder: 'योजनाएं खोजें...',
            noSchemes: 'कोई योजना नहीं मिली',
            description: 'विवरण:',
            benefits: 'लाभ:',
            eligibility: 'पात्रता:',
            apply: 'आवेदन करें',
            alreadyApplied: 'आपने इस योजना के लिए पहले ही आवेदन कर दिया है',
            applicationSuccess: 'आवेदन सफलतापूर्वक जमा किया गया!',
            quickComplaint: 'त्वरित शिकायत',
            complaintPlaceholder: 'अपनी शिकायत यहां लिखें...',
            voiceInput: '🎤 वॉयस इनपुट',
            submitComplaint: 'शिकायत जमा करें',
            enterComplaint: 'कृपया शिकायत दर्ज करें',
            complaintSubmitted: 'शिकायत सफलतापूर्वक जमा की गई! आईडी:',
            status: {
                pending: 'लंबित',
                accepted: 'स्वीकृत',
                rejected: 'अस्वीकृत'
            }
        },
        
        complaints: {
            title: 'शिकायत दर्ज करें',
            yourComplaints: 'आपकी शिकायतें',
            fileComplaint: 'शिकायत दर्ज करें',
            selectDepartment: 'विभाग चुनें',
            complaintDescription: 'शिकायत विवरण',
            descriptionPlaceholder: 'अपनी शिकायत का वर्णन करें...',
            voiceInput: '🎤 वॉयस इनपुट',
            submitButton: 'शिकायत जमा करें',
            cancelButton: 'रद्द करें',
            enterDescription: 'कृपया शिकायत विवरण दर्ज करें',
            complaintId: 'शिकायत आईडी:',
            department: 'विभाग:',
            status: 'स्थिति:',
            description: 'विवरण:',
            date: 'तारीख:',
            noComplaints: 'अभी तक कोई शिकायत दर्ज नहीं की गई',
            complaintSubmitted: 'शिकायत सफलतापूर्वक जमा की गई! आईडी:',
            voiceNotSupported: 'इस ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।',
            voiceError: 'वॉयस रिकग्निशन त्रुटि:'
        },
        
        billPayments: {
            title: 'बिल भुगतान',
            electricity: 'बिजली',
            electricityDesc: 'अपना बिजली बिल भुगतान करें',
            water: 'पानी',
            waterDesc: 'अपना पानी का बिल भुगतान करें',
            gas: 'गैस',
            gasDesc: 'अपना गैस बिल भुगतान करें',
            payBill: 'भुगतान करें',
            billTitle: 'बिल',
            consumerNumber: 'उपभोक्ता संख्या',
            consumerPlaceholder: 'उपभोक्ता संख्या दर्ज करें',
            amount: 'राशि (₹)',
            amountPlaceholder: 'राशि दर्ज करें',
            proceedPayment: 'भुगतान के लिए आगे बढ़ें',
            cancel: 'रद्द करें',
            paymentHistory: 'भुगतान इतिहास',
            noHistory: 'अभी तक कोई भुगतान इतिहास नहीं',
            selectUPI: 'UPI ऐप चुनें',
            verifyPIN: '🔒 PIN सत्यापित करें',
            pinDescription: 'भुगतान जारी रखने के लिए अपना 4 अंकों का PIN दर्ज करें',
            paymentSuccess: 'भुगतान सफल!',
            paymentFailed: 'भुगतान विफल। कृपया पुनः प्रयास करें।'
        },
        
        children: {
            title: 'बच्चे',
            addChild: '+ बच्चा जोड़ें',
            addChildProfile: 'बच्चे की प्रोफ़ाइल जोड़ें',
            childName: 'बच्चे का नाम *',
            namePlaceholder: 'बच्चे का नाम दर्ज करें',
            dateOfBirth: 'जन्म तिथि *',
            gender: 'लिंग *',
            male: 'पुरुष',
            female: 'महिला',
            other: 'अन्य',
            birthCertificate: 'जन्म प्रमाण पत्र संख्या',
            certificatePlaceholder: 'जन्म प्रमाण पत्र संख्या दर्ज करें',
            schoolName: 'स्कूल का नाम',
            schoolPlaceholder: 'स्कूल का नाम दर्ज करें',
            grade: 'कक्षा',
            gradePlaceholder: 'कक्षा दर्ज करें',
            saveButton: 'बच्चा सहेजें',
            cancelButton: 'रद्द करें',
            yourChildren: 'आपके बच्चे',
            noChildren: 'अभी तक कोई बच्चा पंजीकृत नहीं है',
            age: 'उम्र',
            years: 'वर्ष',
            school: 'स्कूल:',
            class: 'कक्षा:',
            certificate: 'प्रमाण पत्र:',
            childSaved: 'बच्चे की प्रोफ़ाइल सफलतापूर्वक सहेजी गई!',
            enterName: 'कृपया बच्चे का नाम दर्ज करें',
            enterDOB: 'कृपया जन्म तिथि दर्ज करें'
        },
        
        documents: {
            title: 'दस्तावेज़',
            uploadDocument: '+ दस्तावेज़ अपलोड करें',
            uploadNew: 'नया दस्तावेज़ अपलोड करें',
            documentType: 'दस्तावेज़ प्रकार *',
            selectType: 'दस्तावेज़ प्रकार चुनें',
            aadhaarCard: 'आधार कार्ड',
            rationCard: 'राशन कार्ड',
            birthCertificate: 'जन्म प्रमाण पत्र',
            incomeCertificate: 'आय प्रमाण पत्र',
            casteCertificate: 'जाति प्रमाण पत्र',
            other: 'अन्य',
            documentFile: 'दस्तावेज़ फ़ाइल *',
            uploadButton: 'दस्तावेज़ अपलोड करें',
            cancelButton: 'रद्द करें',
            yourDocuments: 'आपके दस्तावेज़',
            noDocuments: 'अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया',
            type: 'प्रकार:',
            uploadedOn: 'अपलोड किया गया:',
            view: 'देखें',
            downloadButton: 'डाउनलोड करें',
            selectDocType: 'कृपया दस्तावेज़ प्रकार चुनें',
            selectFile: 'कृपया एक फ़ाइल चुनें',
            uploadSuccess: 'दस्तावेज़ सफलतापूर्वक अपलोड किया गया!',
            uploadedDate: 'अपलोड की तारीख'
        },
        
        searchResults: {
            title: 'खोज परिणाम',
            searchPlaceholder: 'सभी सेवाओं में खोजें...',
            filters: 'फ़िल्टर',
            complaints: 'शिकायतें',
            allDepartments: 'सभी विभाग',
            allStatus: 'सभी स्थिति',
            pending: 'लंबित',
            inProgress: 'प्रगति में',
            resolved: 'हल हो गया',
            documents: 'दस्तावेज़',
            allTypes: 'सभी प्रकार',
            payments: 'भुगतान',
            allServices: 'सभी सेवाएं',
            clearFilters: 'सभी फ़िल्टर साफ़ करें',
            searchInfo: 'योजनाओं, शिकायतों, भुगतान, बच्चों और दस्तावेज़ों में परिणाम खोजने के लिए खोज शब्द दर्ज करें',
            noResults: 'कोई परिणाम नहीं मिला',
            foundIn: 'में पाया गया'
        },
        
        settings: {
            title: 'सेटिंग्स',
            language: 'भाषा',
            selectLanguage: 'भाषा चुनें',
            voiceSettings: 'वॉयस सेटिंग्स',
            enableVoice: 'वॉयस सहायता सक्षम करें',
            disableVoice: 'वॉयस सहायता अक्षम करें',
            voiceEnabled: 'वॉयस सहायता सक्रिय है',
            voiceDisabled: 'वॉयस सहायता बंद है',
            saveSettings: 'सेटिंग्स सहेजें',
            settingsSaved: 'सेटिंग्स सफलतापूर्वक सहेजी गईं!'
        },
        
        voice: {
            enabled: 'वॉयस सहायता सक्षम है',
            disabled: 'वॉयस सहायता अक्षम है',
            loginSuccess: 'लॉगिन सफल। आपके डैशबोर्ड में आपका स्वागत है।',
            officialLoginSuccess: 'अधिकारी लॉगिन सफल। एडमिन डैशबोर्ड में आपका स्वागत है।',
            registrationSuccess: 'पंजीकरण सफल! जारी रखने के लिए कृपया लॉगिन करें।',
            navigatingTo: 'नेविगेट कर रहे हैं',
            openingSchemes: 'सरकारी योजना अनुभाग खोल रहे हैं',
            openingComplaints: 'शिकायत अनुभाग खोल रहे हैं',
            openingChildren: 'बच्चों का प्रबंधन अनुभाग खोल रहे हैं',
            openingBillPayments: 'बिल भुगतान अनुभाग खोल रहे हैं',
            openingDocuments: 'दस्तावेज़ अनुभाग खोल रहे हैं',
            returningDashboard: 'डैशबोर्ड पर वापस जा रहे हैं',
            openingAnalytics: 'विश्लेषण डैशबोर्ड खोल रहे हैं',
            loggingOut: 'लॉगआउट हो रहे हैं। अलविदा!',
            applying: 'आवेदन कर रहे हैं',
            scheme: 'योजना',
            complaintFiled: 'शिकायत सफलतापूर्वक दर्ज की गई। आपकी शिकायत आईडी है',
            documentUploaded: 'सफलतापूर्वक अपलोड किया गया',
            proceedingPayment: 'भुगतान के लिए आगे बढ़ रहे हैं',
            bill: 'रुपये का बिल',
            childAdded: 'आपकी बच्चों की सूची में जोड़ा गया है',
            error: 'त्रुटि:',
            listening: 'सुन रहे हैं...'
        },

        language: {
            select: 'भाषा चुनें',
            english: 'English',
            hindi: 'हिंदी',
            telugu: 'తెలుగు (Telugu)',
            tamil: 'தமிழ் (Tamil)',
            kannada: 'ಕನ್ನಡ (Kannada)',
            malayalam: 'മലയാളം (Malayalam)',
            bengali: 'বাংলা (Bengali)',
            gujarati: 'ગુજરાતી (Gujarati)'
        }
    },
    
    te: {
        code: 'te',
        name: 'తెలుగు',
        voiceLang: 'te-IN',
        
        home: {
            title: 'ప్రభుత్వ సేవా పోర్టల్',
            subtitle: 'డిజిటల్ ఇండియా కార్యక్రమం',
            userBlock: 'వినియోగదారు',
            userDesc: 'పౌర సేవలను యాక్సెస్ చేయండి',
            officialBlock: 'ప్రభుత్వ అధికారి',
            officialDesc: 'అడ్మిన్ పోర్టల్'
        },
        
        common: {
            back: 'వెనక్కి',
            login: 'లాగిన్',
            register: 'నమోదు',
            logout: 'లాగ్అవుట్',
            submit: 'సమర్పించండి',
            cancel: 'రద్దు చేయండి',
            save: 'సేవ్ చేయండి',
            delete: 'తొలగించండి',
            edit: 'సవరించండి',
            search: 'వెతకండి',
            apply: 'దరఖాస్తు చేయండి',
            close: 'మూసివేయండి',
            yes: 'అవును',
            no: 'కాదు',
            loading: 'లోడ్ అవుతోంది...',
            viewDetails: 'వివరాలు చూడండి',
            download: 'డౌన్‌లోడ్ చేయండి'
        },
        
        userLogin: {
            title: 'వినియోగదారు లాగిన్',
            phone: 'ఫోన్ నంబర్',
            phonePlaceholder: '10 అంకెల ఫోన్ నంబర్',
            password: 'పాస్‌వర్డ్',
            passwordPlaceholder: 'పాస్‌వర్డ్ నమోదు చేయండి',
            loginButton: 'లాగిన్',
            noAccount: 'ఖాతా లేదా?',
            registerLink: 'నమోదు చేయండి',
            invalidCredentials: 'చెల్లని ఫోన్ నంబర్ లేదా పాస్‌వర్డ్'
        },
        
        userRegister: {
            title: 'వినియోగదారు నమోదు',
            aadhaar: 'ఆధార్ నంబర్ *',
            aadhaarPlaceholder: '12 అంకెల ఆధార్ నంబర్',
            aadhaarPhoto: 'ఆధార్ ఫోటో *',
            phone: 'ఫోన్ నంబర్ *',
            phonePlaceholder: '10 అంకెల ఫోన్ నంబర్',
            email: 'ఇమెయిల్ *',
            emailPlaceholder: 'మీ.ఇమెయిల్@example.com',
            password: 'పాస్‌వర్డ్ *',
            passwordPlaceholder: 'పాస్‌వర్డ్ సృష్టించండి',
            address: 'చిరునామా *',
            addressPlaceholder: 'పూర్తి చిరునామా నమోదు చేయండి',
            familyMembers: 'కుటుంబ సభ్యులు',
            addFamilyMember: '+ కుటుంబ సభ్యుడిని జోడించండి',
            registerButton: 'నమోదు చేయండి',
            memberName: 'పేరు',
            memberNamePlaceholder: 'కుటుంబ సభ్యుడి పేరు',
            relationship: 'సంబంధం',
            relationshipPlaceholder: 'ఉదా., భార్య/భర్త, పిల్లలు',
            age: 'వయస్సు',
            agePlaceholder: 'వయస్సు',
            uploadAadhaar: 'దయచేసి ఆధార్ ఫోటో అప్‌లోడ్ చేయండి',
            userExists: 'ఈ ఫోన్ నంబర్‌తో వినియోగదారుడు ఇప్పటికే ఉన్నారు',
            registrationSuccess: 'నమోదు విజయవంతం! దయచేసి లాగిన్ చేయండి.'
        },
        
        officialLogin: {
            title: 'అధికారి లాగిన్',
            email: 'ఇమెయిల్',
            emailPlaceholder: 'అధికారిక ఇమెయిల్',
            password: 'పాస్‌వర్డ్',
            passwordPlaceholder: 'పాస్‌వర్డ్ నమోదు చేయండి',
            loginButton: 'లాగిన్',
            noAccount: 'ఖాతా లేదా?',
            registerLink: 'నమోదు చేయండి',
            invalidCredentials: 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్'
        },
        
        officialRegister: {
            title: 'అధికారి నమోదు',
            name: 'పూర్తి పేరు *',
            namePlaceholder: 'పూర్తి పేరు నమోదు చేయండి',
            email: 'ఇమెయిల్ *',
            emailPlaceholder: 'అధికారి.ఇమెయిల్@gov.in',
            password: 'పాస్‌వర్డ్ *',
            passwordPlaceholder: 'పాస్‌వర్డ్ సృష్టించండి',
            qualification: 'అర్హత *',
            qualificationPlaceholder: 'ఉదా., B.Tech, MBA',
            department: 'విభాగం *',
            departmentPlaceholder: 'ఉదా., రెవెన్యూ, ఆరోగ్యం',
            registerButton: 'నమోదు చేయండి',
            officialExists: 'ఈ ఇమెయిల్‌తో అధికారి ఇప్పటికే ఉన్నారు',
            registrationSuccess: 'నమోదు విజయవంతం! దయచేసి లాగిన్ చేయండి.'
        },
        
        voiceSetup: {
            title: 'వాయిస్ సహాయం సెటప్',
            heading: 'వాయిస్ సహాయాన్ని ప్రారంభించాలా?',
            description: 'వాయిస్ సహాయం వాయిస్ కమాండ్‌లను ఉపయోగించి పోర్టల్‌ని నావిగేట్ చేయడంలో మీకు సహాయపడుతుంది',
            enableButton: 'అవును, ప్రారంభించండి',
            disableButton: 'కాదు, ధన్యవాదాలు'
        },
        
        dashboard: {
            welcome: 'స్వాగతం',
            documentsSummary: '📄 పత్రాల సారాంశం',
            complaintsSummary: '📝 ఫిర్యాదుల స్థితి',
            schemeSummary: '📋 పథకం దరఖాస్తులు',
            noDocuments: 'ఇంకా పత్రాలు అప్‌లోడ్ చేయలేదు',
            noComplaints: 'ఇంకా ఫిర్యాదులు దాఖలు చేయలేదు',
            noApplications: 'ఇంకా పథకం దరఖాస్తులు లేవు',
            total: 'మొత్తం',
            totalComplaints: 'మొత్తం ఫిర్యాదులు',
            totalApplications: 'మొత్తం దరఖాస్తులు',
            recentUpdates: 'ఇటీవలి నవీకరణలు:',
            globalSearch: '🔍 గ్లోబల్ శోధన',
            searchPlaceholder: 'అన్ని సేవల్లో వెతకండి...',
            viewAnalytics: '📊 నా విశ్లేషణ చూడండి',
            governmentSchemes: 'ప్రభుత్వ పథకాలు',
            governmentSchemesDesc: 'అందుబాటులో ఉన్న పథకాలను చూడండి',
            complaints: 'ఫిర్యాదులు',
            complaintsDesc: 'ఫిర్యాదు దాఖలు చేయండి',
            children: 'పిల్లలు',
            childrenDesc: 'పిల్లల రికార్డులను నిర్వహించండి',
            billPayments: 'బిల్లు చెల్లింపులు',
            billPaymentsDesc: 'మీ బిల్లులు చెల్లించండి',
            documents: 'పత్రాలు',
            documentsDesc: 'పత్రాలను నిర్వహించండి',
            document: 'పత్రం',
            documents_plural: 'పత్రాలు'
        },
        
        schemes: {
            title: 'ప్రభుత్వ పథకాలు',
            state: 'రాష్ట్రం',
            searchPlaceholder: 'పథకాలను వెతకండి...',
            noSchemes: 'పథకాలు కనుగొనబడలేదు',
            description: 'వివరణ:',
            benefits: 'ప్రయోజనాలు:',
            eligibility: 'అర్హత:',
            apply: 'దరఖాస్తు చేయండి',
            alreadyApplied: 'మీరు ఇప్పటికే ఈ పథకం కోసం దరఖాస్తు చేసుకున్నారు',
            applicationSuccess: 'దరఖాస్తు విజయవంతంగా సమర్పించబడింది!',
            quickComplaint: 'త్వరిత ఫిర్యాదు',
            complaintPlaceholder: 'మీ ఫిర్యాదును ఇక్కడ టైప్ చేయండి...',
            voiceInput: '🎤 వాయిస్ ఇన్‌పుట్',
            submitComplaint: 'ఫిర్యాదు సమర్పించండి',
            enterComplaint: 'దయచేసి ఫిర్యాదు నమోదు చేయండి',
            complaintSubmitted: 'ఫిర్యాదు విజయవంతంగా సమర్పించబడింది! ID:',
            status: {
                pending: 'పెండింగ్',
                accepted: 'ఆమోదించబడింది',
                rejected: 'తిరస్కరించబడింది'
            }
        },
        
        complaints: {
            title: 'ఫిర్యాదు దాఖలు చేయండి',
            yourComplaints: 'మీ ఫిర్యాదులు',
            fileComplaint: 'ఫిర్యాదు దాఖలు చేయండి',
            selectDepartment: 'విభాగాన్ని ఎంచుకోండి',
            complaintDescription: 'ఫిర్యాదు వివరణ',
            descriptionPlaceholder: 'మీ ఫిర్యాదును వివరించండి...',
            voiceInput: '🎤 వాయిస్ ఇన్‌పుట్',
            submitButton: 'ఫిర్యాదు సమర్పించండి',
            cancelButton: 'రద్దు చేయండి',
            enterDescription: 'దయచేసి ఫిర్యాదు వివరణ నమోదు చేయండి',
            complaintId: 'ఫిర్యాదు ID:',
            department: 'విభాగం:',
            status: 'స్థితి:',
            description: 'వివరణ:',
            date: 'తేదీ:',
            noComplaints: 'ఇంకా ఫిర్యాదులు దాఖలు చేయలేదు',
            complaintSubmitted: 'ఫిర్యాదు విజయవంతంగా సమర్పించబడింది! ID:',
            voiceNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ మద్దతు లేదు. దయచేసి Chrome లేదా Edge ఉపయోగించండి।',
            voiceError: 'వాయిస్ రికగ్నిషన్ లోపం:'
        },
        
        billPayments: {
            title: 'బిల్లు చెల్లింపులు',
            electricity: 'విద్యుత్',
            electricityDesc: 'మీ విద్యుత్ బిల్లును చెల్లించండి',
            water: 'నీరు',
            waterDesc: 'మీ నీటి బిల్లును చెల్లించండి',
            gas: 'గ్యాస్',
            gasDesc: 'మీ గ్యాస్ బిల్లును చెల్లించండి',
            payBill: 'చెల్లించండి',
            billTitle: 'బిల్లు',
            consumerNumber: 'వినియోగదారు సంఖ్య',
            consumerPlaceholder: 'వినియోగదారు సంఖ్యను నమోదు చేయండి',
            amount: 'మొత్తం (₹)',
            amountPlaceholder: 'మొత్తం నమోదు చేయండి',
            proceedPayment: 'చెల్లింపు కోసం కొనసాగండి',
            cancel: 'రద్దు చేయండి',
            paymentHistory: 'చెల్లింపు చరిత్ర',
            noHistory: 'ఇంకా చెల్లింపు చరిత్ర లేదు',
            selectUPI: 'UPI యాప్‌ను ఎంచుకోండి',
            verifyPIN: '🔒 PIN ధృవీకరించండి',
            pinDescription: 'చెల్లింపును కొనసాగించడానికి మీ 4-అంకెల PIN నమోదు చేయండి',
            paymentSuccess: 'చెల్లింపు విజయవంతం!',
            paymentFailed: 'చెల్లింపు విఫలమైంది। దయచేసి మళ్లీ ప్రయత్నించండి।'
        },
        
        children: {
            title: 'పిల్లలు',
            addChild: '+ పిల్లవాడిని జోడించండి',
            addChildProfile: 'పిల్లల ప్రొఫైల్‌ను జోడించండి',
            childName: 'పిల్లల పేరు *',
            namePlaceholder: 'పిల్లల పేరు నమోదు చేయండి',
            dateOfBirth: 'పుట్టిన తేదీ *',
            gender: 'లింగం *',
            male: 'పురుషుడు',
            female: 'స్త్రీ',
            other: 'ఇతరులు',
            birthCertificate: 'జనన ధృవపత్రం సంఖ్య',
            certificatePlaceholder: 'జనన ధృవపత్రం సంఖ్యను నమోదు చేయండి',
            schoolName: 'పాఠశాల పేరు',
            schoolPlaceholder: 'పాఠశాల పేరు నమోదు చేయండి',
            grade: 'తరగతి',
            gradePlaceholder: 'తరగతి నమోదు చేయండి',
            saveButton: 'పిల్లవాడిని సేవ్ చేయండి',
            cancelButton: 'రద్దు చేయండి',
            yourChildren: 'మీ పిల్లలు',
            noChildren: 'ఇంకా పిల్లలు నమోదు చేయబడలేదు',
            age: 'వయస్సు',
            years: 'సంవత్సరాలు',
            school: 'పాఠశాల:',
            class: 'తరగతి:',
            certificate: 'ధృవపత్రం:',
            childSaved: 'పిల్లల ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!',
            enterName: 'దయచేసి పిల్లల పేరు నమోదు చేయండి',
            enterDOB: 'దయచేసి పుట్టిన తేదీని నమోదు చేయండి'
        },
        
        documents: {
            title: 'పత్రాలు',
            uploadDocument: '+ పత్రం అప్‌లోడ్ చేయండి',
            uploadNew: 'కొత్త పత్రం అప్‌లోడ్ చేయండి',
            documentType: 'పత్ర రకం *',
            selectType: 'పత్ర రకాన్ని ఎంచుకోండి',
            aadhaarCard: 'ఆధార్ కార్డ్',
            rationCard: 'రేషన్ కార్డ్',
            birthCertificate: 'జనన ధృవపత్రం',
            incomeCertificate: 'ఆదాయ ధృవపత్రం',
            casteCertificate: 'కుల ధృవపత్రం',
            other: 'ఇతరత',
            documentFile: 'పత్ర ఫైల్ *',
            uploadButton: 'పత్రం అప్‌లోడ్ చేయండి',
            cancelButton: 'రద్దు చేయండి',
            yourDocuments: 'మీ పత్రాలు',
            noDocuments: 'ఇంకా పత్రాలు అప్‌లోడ్ చేయలేదు',
            type: 'రకం:',
            uploadedOn: 'అప్‌లోడ్ చేయబడింది:',
            view: 'చూడండి',
            downloadButton: 'డౌన్‌లోడ్ చేయండి',
            selectDocType: 'దయచేసి పత్ర రకాన్ని ఎంచుకోండి',
            selectFile: 'దయచేసి ఫైల్‌ను ఎంచుకోండి',
            uploadSuccess: 'పత్రం విజయవంతంగా అప్‌లోడ్ చేయబడింది!',
            uploadedDate: 'అప్‌లోడ్ తేదీ'
        },
        
        searchResults: {
            title: 'శోధన ఫలితాలు',
            searchPlaceholder: 'అన్ని సేవల్లో వెతకండి...',
            filters: 'ఫిల్టర్‌లు',
            complaints: 'ఫిర్యాదులు',
            allDepartments: 'అన్ని విభాగాలు',
            allStatus: 'అన్ని స్థితులు',
            pending: 'పెండింగ్',
            inProgress: 'ప్రగతిలో ఉంది',
            resolved: 'పరిష్కరించబడింది',
            documents: 'పత్రాలు',
            allTypes: 'అన్ని రకాలు',
            payments: 'చెల్లింపులు',
            allServices: 'అన్ని సేవలు',
            clearFilters: 'అన్ని ఫిల్టర్‌లను క్లియర్ చేయండి',
            searchInfo: 'పథకాలు, ఫిర్యాదులు, చెల్లింపులు, పిల్లలు మరియు పత్రాలలో ఫలితాలను కనుగొనడానికి శోధన పదాన్ని నమోదు చేయండి',
            noResults: 'ఫలితాలు కనుగొనబడలేదు',
            foundIn: 'లో కనుగొనబడింది'
        },
        
        settings: {
            title: 'సెట్టింగ్‌లు',
            language: 'భాష',
            selectLanguage: 'భాషను ఎంచుకోండి',
            voiceSettings: 'వాయిస్ సెట్టింగ్‌లు',
            enableVoice: 'వాయిస్ సహాయాన్ని ప్రారంభించండి',
            disableVoice: 'వాయిస్ సహాయాన్ని నిలిపివేయండి',
            voiceEnabled: 'వాయిస్ సహాయం చురుకుగా ఉంది',
            voiceDisabled: 'వాయిస్ సహాయం ఆఫ్ చేయబడింది',
            saveSettings: 'సెట్టింగ్‌లను సేవ్ చేయండి',
            settingsSaved: 'సెట్టింగ్‌లు విజయవంతంగా సేవ్ చేయబడ్డాయి!'
        },
        
        voice: {
            enabled: 'వాయిస్ సహాయం ప్రారంభించబడింది',
            disabled: 'వాయిస్ సహాయం నిలిపివేయబడింది',
            loginSuccess: 'లాగిన్ విజయవంతం। మీ డాష్‌బోర్డ్‌కు స్వాగతం।',
            officialLoginSuccess: 'అధికారి లాగిన్ విజయవంతం। అడ్మిన్ డాష్‌బోర్డ్‌కు స్వాగతం।',
            registrationSuccess: 'నమోదు విజయవంతం! కొనసాగించడానికి దయచేసి లాగిన్ చేయండి।',
            navigatingTo: 'నావిగేట్ చేస్తోంది',
            openingSchemes: 'ప్రభుత్వ పథకాల విభాగాన్ని తెరుస్తోంది',
            openingComplaints: 'ఫిర్యాదుల విభాగాన్ని తెరుస్తోంది',
            openingChildren: 'పిల్లల నిర్వహణ విభాగాన్ని తెరుస్తోంది',
            openingBillPayments: 'బిల్లు చెల్లింపుల విభాగాన్ని తెరుస్తోంది',
            openingDocuments: 'పత్రాల విభాగాన్ని తెరుస్తోంది',
            returningDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్తోంది',
            openingAnalytics: 'విశ్లేషణ డాష్‌బోర్డ్‌ను తెరుస్తోంది',
            loggingOut: 'లాగ్అవుట్ అవుతోంది। వీడ్కోలు!',
            applying: 'దరఖాస్తు చేస్తోంది',
            scheme: 'పథకం',
            complaintFiled: 'ఫిర్యాదు విజయవంతంగా దాఖలు చేయబడింది। మీ ఫిర్యాదు ID',
            documentUploaded: 'విజయవంతంగా అప్‌లోడ్ చేయబడింది',
            proceedingPayment: 'చెల్లింపు కోసం కొనసాగుతోంది',
            bill: 'రూపాయల బిల్లు',
            childAdded: 'మీ పిల్లల జాబితాకు జోడించబడింది',
            error: 'లోపం:',
            listening: 'వింటోంది...'
        },

        language: {
            select: 'భాషను ఎంచుకోండి',
            english: 'English',
            hindi: 'हिंदी (Hindi)',
            telugu: 'తెలుగు',
            tamil: 'தமிழ் (Tamil)',
            kannada: 'ಕನ್ನಡ (Kannada)',
            malayalam: 'മലയാളം (Malayalam)',
            bengali: 'বাংলা (Bengali)',
            gujarati: 'ગુજરાતી (Gujarati)'
        }
    },
    
    ta: {
        code: 'ta',
        name: 'தமிழ்',
        voiceLang: 'ta-IN',
        
        home: {
            title: 'அரசு சேவை போர்ட்டல்',
            subtitle: 'டிஜிட்டல் இந்தியா முயற்சி',
            userBlock: 'பயனர்',
            userDesc: 'குடிமக்கள் சேவைகளை அணுகவும்',
            officialBlock: 'அரசு அதிகாரி',
            officialDesc: 'நிர்வாக போர்ட்டல்'
        },
        
        common: {
            back: 'பின்னால்',
            login: 'உள்நுழை',
            register: 'பதிவு',
            logout: 'வெளியேறு',
            submit: 'சமர்ப்பி',
            cancel: 'ரத்து',
            save: 'சேமி',
            delete: 'நீக்கு',
            edit: 'திருத்து',
            search: 'தேடு',
            apply: 'விண்ணப்பி',
            close: 'மூடு',
            yes: 'ஆம்',
            no: 'இல்லை',
            loading: 'ஏற்றுகிறது...',
            viewDetails: 'விவரங்களை காண்க',
            download: 'பதிவிறக்க'
        },
        
        userLogin: {
            title: 'பயனர் உள்நுழை',
            phone: 'தொலைபேசி எண்',
            phonePlaceholder: '10 இலக்க தொலைபேசி எண்',
            password: 'கடவுச்சொல்',
            passwordPlaceholder: 'கடவுச்சொல்லை உள்ளிடவும்',
            loginButton: 'உள்நுழை',
            noAccount: 'கணக்கு இல்லையா?',
            registerLink: 'பதிவு செய்க',
            invalidCredentials: 'தவறான தொலைபேசி எண் அல்லது கடவுச்சொல்'
        },
        
        userRegister: {
            title: 'பயனர் பதிவு',
            aadhaar: 'ஆதார் எண் *',
            aadhaarPlaceholder: '12 இலக்க ஆதார் எண்',
            aadhaarPhoto: 'ஆதார் புகைப்படம் *',
            phone: 'தொலைபேசி எண் *',
            phonePlaceholder: '10 இலக்க தொலைபேசி எண்',
            email: 'மின்னஞ்சல் *',
            emailPlaceholder: 'உங்கள்.மின்னஞ்சல்@example.com',
            password: 'கடவுச்சொல் *',
            passwordPlaceholder: 'கடவுச்சொல்லை உருவாக்கவும்',
            address: 'முகவரி *',
            addressPlaceholder: 'முழு முகவரியை உள்ளிடவும்',
            familyMembers: 'குடும்ப உறுப்பினர்கள்',
            addFamilyMember: '+ குடும்ப உறுப்பினரை சேர்க்கவும்',
            registerButton: 'பதிவு செய்க',
            memberName: 'பெயர்',
            memberNamePlaceholder: 'குடும்ப உறுப்பினர் பெயர்',
            relationship: 'உறவு',
            relationshipPlaceholder: 'உதா., மனைவி/கணவர், குழந்தை',
            age: 'வயது',
            agePlaceholder: 'வயது',
            uploadAadhaar: 'தயவுசெய்து ஆதார் புகைப்படத்தை பதிவேற்றவும்',
            userExists: 'இந்த தொலைபேசி எண்ணுடன் பயனர் ஏற்கனவே உள்ளார்',
            registrationSuccess: 'பதிவு வெற்றிகரமாக! தயவுசெய்து உள்நுழையவும்.'
        },
        
        officialLogin: {
            title: 'அதிகாரி உள்நுழை',
            email: 'மின்னஞ்சல்',
            emailPlaceholder: 'அதிகாரம் மின்னஞ்சல்',
            password: 'கடவுச்சொல்',
            passwordPlaceholder: 'கடவுச்சொல்லை உள்ளிடவும்',
            loginButton: 'உள்நுழை',
            noAccount: 'கணக்கு இல்லையா?',
            registerLink: 'பதிவு செய்க',
            invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்'
        },
        
        officialRegister: {
            title: 'அதிகாரி பதிவு',
            name: 'முழு பெயர் *',
            namePlaceholder: 'முழு பெயரை உள்ளிடவும்',
            email: 'மின்னஞ்சல் *',
            emailPlaceholder: 'அதிகாரி.மின்னஞ்சல்@gov.in',
            password: 'கடவுச்சொல் *',
            passwordPlaceholder: 'கடவுச்சொல்லை உருவாக்கவும்',
            qualification: 'தகுதி *',
            qualificationPlaceholder: 'உதா., B.Tech, MBA',
            department: 'துறை *',
            departmentPlaceholder: 'உதா., வருவாய், சுகாதாரம்',
            registerButton: 'பதிவு செய்க',
            officialExists: 'இந்த மின்னஞ்சலுடன் அதிகாரி ஏற்கனவே உள்ளார்',
            registrationSuccess: 'பதிவு வெற்றிகரமாக! தயவுசெய்து உள்நுழையவும்.'
        },
        
        voiceSetup: {
            title: 'குரல் உதவி அமைப்பு',
            heading: 'குரல் உதவியை இயக்கவா?',
            description: 'குரல் உதவி குரல் கட்டளைகளைப் பயன்படுத்தி போர்ட்டலை நேவிகேட் செய்ய உதவுகிறது',
            enableButton: 'ஆம், இயக்கவும்',
            disableButton: 'இல்லை, நன்றி'
        },
        
        dashboard: {
            welcome: 'வரவேற்கிறோம்',
            documentsSummary: '📄 ஆவணங்கள் சுருக்கம்',
            complaintsSummary: '📝 புகார்கள் நிலை',
            schemeSummary: '📋 திட்ட விண்ணப்பங்கள்',
            noDocuments: 'இன்னும் ஆவணங்கள் பதிவேற்றப்படவில்லை',
            noComplaints: 'இன்னும் புகார்கள் பதிவு செய்யப்படவில்லை',
            noApplications: 'இன்னும் திட்ட விண்ணப்பங்கள் இல்லை',
            total: 'மொத்தம்',
            totalComplaints: 'மொத்த புகார்கள்',
            totalApplications: 'மொத்த விண்ணப்பங்கள்',
            recentUpdates: 'சமீபத்திய புதுப்பிப்புகள்:',
            globalSearch: '🔍 உலகளாவிய தேடல்',
            searchPlaceholder: 'அனைத்து சேவைகளிலும் தேடவும்...',
            viewAnalytics: '📊 எனது பகுப்பாய்வைக் காண்க',
            governmentSchemes: 'அரசு திட்டங்கள்',
            governmentSchemesDesc: 'கிடைக்கும் திட்டங்களைப் பாருங்கள்',
            complaints: 'புகார்கள்',
            complaintsDesc: 'புகார் பதிவு செய்க',
            children: 'குழந்தைகள்',
            childrenDesc: 'குழந்தை பதிவுகளை நிர்வகிக்கவும்',
            billPayments: 'பில் பணம் செலுத்துதல்',
            billPaymentsDesc: 'உங்கள் பில்களை செலுத்துங்கள்',
            documents: 'ஆவணங்கள்',
            documentsDesc: 'ஆவணங்களை நிர்வகிக்கவும்',
            document: 'ஆவணம்',
            documents_plural: 'ஆவணங்கள்'
        },
        
        schemes: {
            title: 'அரசு திட்டங்கள்',
            state: 'மாநிலம்',
            searchPlaceholder: 'திட்டங்களைத் தேடவும்...',
            noSchemes: 'திட்டங்கள் இல்லை',
            description: 'விளக்கம்:',
            benefits: 'நன்மைகள்:',
            eligibility: 'தகுதி:',
            apply: 'விண்ணப்பிக்கவும்',
            alreadyApplied: 'நீங்கள் ஏற்கனவே இந்த திட்டத்திற்கு விண்ணப்பித்துள்ளீர்கள்',
            applicationSuccess: 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
            quickComplaint: 'விரைவு புகார்',
            complaintPlaceholder: 'உங்கள் புகாரை இங்கே தட்டச்சு செய்யவும்...',
            voiceInput: '🎤 குரல் உள்ளீடு',
            submitComplaint: 'புகார் சமர்ப்பி',
            enterComplaint: 'தயவுசெய்து புகாரை உள்ளிடவும்',
            complaintSubmitted: 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! ID:',
            status: {
                pending: 'நிலுவையில்',
                accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
                rejected: 'நிராகரிக்கப்பட்டது'
            }
        },
        
        complaints: {
            title: 'புகார் பதிவு செய்க',
            yourComplaints: 'உங்கள் புகார்கள்',
            fileComplaint: 'புகார் பதிவு செய்க',
            selectDepartment: 'துறையைத் தேர்ந்தெடுக்கவும்',
            complaintDescription: 'புகார் விளக்கம்',
            descriptionPlaceholder: 'உங்கள் புகாரை விவரிக்கவும்...',
            voiceInput: '🎤 குரல் உள்ளீடு',
            submitButton: 'புகார் சமர்ப்பி',
            cancelButton: 'ரத்து',
            enterDescription: 'தயவுசெய்து புகார் விளக்கத்தை உள்ளிடவும்',
            complaintId: 'புகார் ID:',
            department: 'துறை:',
            status: 'நிலை:',
            description: 'விளக்கம்:',
            date: 'தேதி:',
            noComplaints: 'இன்னும் புகார்கள் பதிவு செய்யப்படவில்லை',
            complaintSubmitted: 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! ID:',
            voiceNotSupported: 'இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை। தயவுசெய்து Chrome அல்லது Edge ஐப் பயன்படுத்தவும்।',
            voiceError: 'குரல் அங்கீகார பிழை:'
        },
        
        billPayments: {
            title: 'பில் பணம் செலுத்துதல்',
            electricity: 'மின்சாரம்',
            electricityDesc: 'உங்கள் மின்சாரம் பில்லை செலுத்துங்கள்',
            water: 'தண்ணீர்',
            waterDesc: 'உங்கள் தண்ணீர் பில்லை செலுத்துங்கள்',
            gas: 'எரிவாயு',
            gasDesc: 'உங்கள் எரிவாயு பில்லை செலுத்துங்கள்',
            payBill: 'செலுத்துங்கள்',
            billTitle: 'பில்',
            consumerNumber: 'நுகர்வோர் எண்',
            consumerPlaceholder: 'நுகர்வோர் எண்ணை உள்ளிடவும்',
            amount: 'தொகை (₹)',
            amountPlaceholder: 'தொகையை உள்ளிடவும்',
            proceedPayment: 'பணம் செலுத்துவதற்கு தொடரவும்',
            cancel: 'ரத்து',
            paymentHistory: 'பணம் செலுத்துதல் வரலாறு',
            noHistory: 'இன்னும் பணம் செலுத்துதல் வரலாறு இல்லை',
            selectUPI: 'UPI பயன்பாட்டைத் தேர்ந்தெடுக்கவும்',
            verifyPIN: '🔒 PIN ஐ சரிபார்க்கவும்',
            pinDescription: 'பணம் செலுத்துவதைத் தொடர உங்கள் 4 இலக்க PIN ஐ உள்ளிடவும்',
            paymentSuccess: 'பணம் செலுத்துதல் வெற்றிகரமாக!',
            paymentFailed: 'பணம் செலுத்துதல் தோல்வியடைந்தது। தயவுசெய்து மீண்டும் முயற்சிக்கவும்।'
        },
        
        children: {
            title: 'குழந்தைகள்',
            addChild: '+ குழந்தையைச் சேர்க்கவும்',
            addChildProfile: 'குழந்தை சுயவிவரத்தைச் சேர்க்கவும்',
            childName: 'குழந்தையின் பெயர் *',
            namePlaceholder: 'குழந்தையின் பெயரை உள்ளிடவும்',
            dateOfBirth: 'பிறந்த தேதி *',
            gender: 'பாலினம் *',
            male: 'ஆண்',
            female: 'பெண்',
            other: 'மற்றவை',
            birthCertificate: 'பிறப்பு சான்றிதழ் எண்',
            certificatePlaceholder: 'பிறப்பு சான்றிதழ் எண்ணை உள்ளிடவும்',
            schoolName: 'பள்ளியின் பெயர்',
            schoolPlaceholder: 'பள்ளியின் பெயரை உள்ளிடவும்',
            grade: 'வகுப்பு',
            gradePlaceholder: 'வகுப்பை உள்ளிடவும்',
            saveButton: 'குழந்தையைச் சேமிக்கவும்',
            cancelButton: 'ரத்து',
            yourChildren: 'உங்கள் குழந்தைகள்',
            noChildren: 'இன்னும் குழந்தைகள் பதிவு செய்யப்படவில்லை',
            age: 'வயது',
            years: 'வருடங்கள்',
            school: 'பள்ளி:',
            class: 'வகுப்பு:',
            certificate: 'சான்றிதழ்:',
            childSaved: 'குழந்தை சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!',
            enterName: 'தயவுசெய்து குழந்தையின் பெயரை உள்ளிடவும்',
            enterDOB: 'தயவுசெய்து பிறந்த தேதியை உள்ளிடவும்'
        },
        
        documents: {
            title: 'ஆவணங்கள்',
            uploadDocument: '+ ஆவணத்தைப் பதிவேற்றவும்',
            uploadNew: 'புதிய ஆவணத்தைப் பதிவேற்றவும்',
            documentType: 'ஆவண வகை *',
            selectType: 'ஆவண வகையைத் தேர்ந்தெடுக்கவும்',
            aadhaarCard: 'ஆதார் அட்டை',
            rationCard: 'ரேஷன் அட்டை',
            birthCertificate: 'பிறப்பு சான்றிதழ்',
            incomeCertificate: 'வருமான சான்றிதழ்',
            casteCertificate: 'சாதி சான்றிதழ்',
            other: 'மற்றவை',
            documentFile: 'ஆவண கோப்பு *',
            uploadButton: 'ஆவணத்தைப் பதிவேற்றவும்',
            cancelButton: 'ரத்து',
            yourDocuments: 'உங்கள் ஆவணங்கள்',
            noDocuments: 'இன்னும் ஆவணங்கள் பதிவேற்றப்படவில்லை',
            type: 'வகை:',
            uploadedOn: 'பதிவேற்றப்பட்டது:',
            view: 'காண்க',
            downloadButton: 'பதிவிறக்க',
            selectDocType: 'தயவுசெய்து ஆவண வகையைத் தேர்ந்தெடுக்கவும்',
            selectFile: 'தயவுசெய்து ஒரு கோப்பைத் தேர்ந்தெடுக்கவும்',
            uploadSuccess: 'ஆவணம் வெற்றிகரமாக பதிவேற்றப்பட்டது!',
            uploadedDate: 'பதிவேற்ற தேதி'
        },
        
        searchResults: {
            title: 'தேடல் முடிவுகள்',
            searchPlaceholder: 'அனைத்து சேவைகளிலும் தேடவும்...',
            filters: 'வடிகட்டிகள்',
            complaints: 'புகார்கள்',
            allDepartments: 'அனைத்து துறைகள்',
            allStatus: 'அனைத்து நிலை',
            pending: 'நிலுவையில்',
            inProgress: 'முன்னேற்றத்தில்',
            resolved: 'தீர்க்கப்பட்டது',
            documents: 'ஆவணங்கள்',
            allTypes: 'அனைத்து வகைகள்',
            payments: 'பணம் செலுத்துதல்',
            allServices: 'அனைத்து சேவைகள்',
            clearFilters: 'அனைத்து வடிகட்டிகளையும் அழிக்கவும்',
            searchInfo: 'திட்டங்கள், புகார்கள், பணம் செலுத்துதல், குழந்தைகள் மற்றும் ஆவணங்களில் முடிவுகளைக் கண்டறிய தேடல் சொல்லை உள்ளிடவும்',
            noResults: 'முடிவுகள் கிடைக்கவில்லை',
            foundIn: 'இல் காணப்பட்டது'
        },
        
        settings: {
            title: 'அமைப்புகள்',
            language: 'மொழி',
            selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
            voiceSettings: 'குரல் அமைப்புகள்',
            enableVoice: 'குரல் உதவியை இயக்கவும்',
            disableVoice: 'குரல் உதவியை முடக்கவும்',
            voiceEnabled: 'குரல் உதவி செயலில் உள்ளது',
            voiceDisabled: 'குரல் உதவி முடக்கப்பட்டது',
            saveSettings: 'அமைப்புகளைச் சேமிக்கவும்',
            settingsSaved: 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!'
        },
        
        voice: {
            enabled: 'குரல் உதவி இயக்கப்பட்டது',
            disabled: 'குரல் உதவி முடக்கப்பட்டது',
            loginSuccess: 'உள்நுழைவு வெற்றிகரமாக। உங்கள் டாஷ்போர்டுக்கு வரவேற்கிறோம்।',
            officialLoginSuccess: 'அதிகாரி உள்நுழைவு வெற்றிகரமாக। நிர்வாக டாஷ்போர்டுக்கு வரவேற்கிறோம்।',
            registrationSuccess: 'பதிவு வெற்றிகரமாக! தொடர தயவுசெய்து உள்நுழையவும்।',
            navigatingTo: 'நேவிகேட் செய்கிறது',
            openingSchemes: 'அரசு திட்டங்கள் பிரிவை திறக்கிறது',
            openingComplaints: 'புகார்கள் பிரிவை திறக்கிறது',
            openingChildren: 'குழந்தைகள் நிர்வாக பிரிவை திறக்கிறது',
            openingBillPayments: 'பில் பணம் செலுத்துதல் பிரிவை திறக்கிறது',
            openingDocuments: 'ஆவணங்கள் பிரிவை திறக்கிறது',
            returningDashboard: 'டாஷ்போர்டுக்கு திரும்புகிறது',
            openingAnalytics: 'பகுப்பாய்வு டாஷ்போர்டை திறக்கிறது',
            loggingOut: 'வெளியேறுகிறது। பிரியாவிடை!',
            applying: 'விண்ணப்பிக்கிறது',
            scheme: 'திட்டம்',
            complaintFiled: 'புகார் வெற்றிகரமாக பதிவு செய்யப்பட்டது। உங்கள் புகார் ID',
            documentUploaded: 'வெற்றிகரமாக பதிவேற்றப்பட்டது',
            proceedingPayment: 'பணம் செலுத்துவதற்கு தொடர்கிறது',
            bill: 'ரூபாய் பில்',
            childAdded: 'உங்கள் குழந்தைகள் பட்டியலில் சேர்க்கப்பட்டது',
            error: 'பிழை:',
            listening: 'கேட்கிறது...'
        },

        language: {
            select: 'மொழியைத் தேர்ந்தெடுக்கவும்',
            english: 'English',
            hindi: 'हिंदी (Hindi)',
            telugu: 'తెలుగు (Telugu)',
            tamil: 'தமிழ்',
            kannada: 'ಕನ್ನಡ (Kannada)',
            malayalam: 'മലയാളം (Malayalam)',
            bengali: 'বাংলা (Bengali)',
            gujarati: 'ગુજરાતી (Gujarati)'
        }
    }
};

function getTranslation(key) {
    const lang = localStorage.getItem('language') || 'en';
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        value = value[k];
        if (value === undefined) break;
    }
    
    if (value === undefined) {
        value = translations['en'];
        for (const k of keys) {
            value = value[k];
            if (value === undefined) return key;
        }
    }
    
    return value;
}

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function setLanguage(langCode) {
    localStorage.setItem('language', langCode);
    updatePageLanguage();
    
    const voiceSettings = JSON.parse(localStorage.getItem('voiceSettings') || '{"enabled": false, "ttsEnabled": true, "sttEnabled": true}');
    if (voiceSettings.enabled) {
        voiceSettings.voiceLang = translations[langCode].voiceLang;
        localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
    }
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.hasAttribute('placeholder')) {
                el.placeholder = translation;
            } else {
                el.value = translation;
            }
        } else {
            el.textContent = translation;
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('language');
    if (!savedLang) {
        localStorage.setItem('language', 'en');
    }
    updatePageLanguage();
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initLanguage);
}
