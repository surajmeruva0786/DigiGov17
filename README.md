# Government Service Portal

## Overview

A progressive web application serving as a comprehensive digital platform for Indian citizens to access government services. Built as part of the Digital India Initiative, this client-side application provides access to government schemes, complaint filing, bill payments, document management, health services (blood/organ donation), digital ID cards, and multi-language voice assistance. The system supports dual authentication flows for both citizens and government officials, with optional Google Sheets integration for data backup and centralized records management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Single Page Application (SPA) Pattern**
- Pure vanilla JavaScript implementation without any frameworks or build tools
- Screen-based navigation system using CSS class toggling through `showScreen()` function
- Mobile-first responsive design with 480px maximum width constraint
- Modular JavaScript architecture organized by feature domains (health-services.js, digital-id-card.js, voice.js, citizen-feedback.js, etc.)
- HTML structure in single index.html with multiple screen sections toggled via `.active` class

**State Management & Data Persistence**
- Global state variables `currentUser` and `currentOfficial` manage authentication sessions
- Browser localStorage as primary data store (no backend database required)
- Key-value storage pattern: `users_${phoneNumber}`, `digitalID_${phoneNumber}`, `schemeApplications`, `complaints`, etc.
- All data changes trigger optional Google Sheets sync for backup/audit trail

**Authentication & Authorization**
- Dual authentication flows: Citizens (phone-based) and Government Officials (department-based)
- Phone number (10-digit) serves as unique user identifier
- Password-based authentication with credentials stored in localStorage
- Aadhaar number collection during registration enables state detection
- State mapping logic: First digit of Aadhaar determines user's state (8 states supported: Delhi, Maharashtra, Karnataka, Tamil Nadu, Gujarat, West Bengal, Rajasthan, Uttar Pradesh)

**Internationalization (i18n)**
- Multi-language support for 8 Indian languages (English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati)
- Translation system in translations.js with nested JSON structure
- Language selector persists choice in localStorage
- Voice assistance language automatically syncs with UI language selection

**Voice Assistance System**
- Text-to-Speech (TTS): Browser Speech Synthesis API for announcements
- Speech-to-Text (STT): Web Speech API for voice commands
- Continuous listening mode with language-specific recognition (en-IN, hi-IN, etc.)
- Voice settings persisted with enabled/disabled state for TTS and STT independently
- Navigation announcements and form field guidance for accessibility

### Core Service Modules

**Citizen Services**
1. **Government Schemes**: State-filtered scheme browsing and application with status tracking
2. **Complaints Management**: File, track, and receive updates on civic complaints by department
3. **Children Services**: Register children, access child welfare schemes and services
4. **Bill Payments**: Manage and track utility bill payments with payment history
5. **Document Management**: Upload, store, and organize personal documents in localStorage
6. **Digital ID Card**: Generate QR code-enabled digital identity cards with html2canvas and QRCode.js libraries
7. **Health Services**:
   - Blood Donation Registry: Register as donor with blood group, availability, location
   - Organ Donation Registry: Pledge organs with medical details and consent documentation
   - Blood Request System: Submit urgent requests with hospital and urgency information
   - Organ Request System: Request transplants with patient details and medical requirements
8. **Citizen Feedback**: Rate completed services and provide feedback on government service quality

**Government Official Dashboard**
- Tabbed interface for managing: Users, Schemes, Complaints, Children, Documents, Bills, Activity Logs, Health Data
- Accept/reject workflows for scheme applications and health service requests
- Real-time data synchronization across browser tabs using storage events
- Comprehensive audit trail of all administrative actions
- Google Sheets configuration interface for backup management

### Data Flow Architecture

**Local Storage Schema**
- `users_${phoneNumber}`: User profile with Aadhaar, address, family members
- `schemeApplications`: Array of all scheme applications across users
- `complaints`: Array of complaint records
- `digitalID_${phoneNumber}`: Generated ID card data per user
- `bloodDonors`, `organDonors`, `bloodRequests`, `organRequests`: Health service registries
- `voiceSettings`: Voice assistance preferences
- `language`: Current UI language selection

**Google Sheets Sync Flow**
- Optional bidirectional sync via Google Apps Script Web App deployment
- POST requests with `no-cors` mode to deployed Web App URL
- Data types synced: users, schemes, complaints, bills, children, documents, blood donors, organ donors, blood/organ requests
- Configuration stored in localStorage as `googleSheetsWebAppUrl`
- Sync triggered on all data mutations (create, update, status changes)

## External Dependencies

### Third-Party Libraries
- **QRCode.js** (v1.0.0): QR code generation for digital ID cards
- **html2canvas** (v1.4.1): Screenshot/download functionality for ID cards

### Browser APIs
- **Web Speech API**: Speech recognition for voice commands
- **Speech Synthesis API**: Text-to-speech for announcements
- **LocalStorage API**: Primary data persistence layer
- **Fetch API**: Google Sheets synchronization

### External Services
- **Google Apps Script Web App**: Optional data backup and centralized records management
  - Deployed as web service with POST endpoint
  - Handles 10 data types across separate Google Sheets tabs
  - Configurable via admin dashboard with URL input
  - No authentication required (publicly accessible endpoint with `no-cors` mode)

### Development & Deployment
- No build process or bundler required
- Static file hosting compatible (HTML, CSS, JS)
- Progressive Web App capable (client-side only)
- No server-side dependencies or database setup needed
