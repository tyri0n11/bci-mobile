# BCI Mobile - Brain-Computer Interface Mood Tracking App
![image](https://github.com/user-attachments/assets/27b61bdd-a8d7-4870-befc-c4a6d23be203)
![image](https://github.com/user-attachments/assets/ff4f19e9-06dd-45c5-8b31-67f828bd35ee)
![image](https://github.com/user-attachments/assets/39bca5ca-76b5-4b31-9379-18c99dc725af)
![image](https://github.com/user-attachments/assets/88797708-f039-45e2-9dad-952dacee756d)
![image](https://github.com/user-attachments/assets/e53763fe-de90-4bae-be93-20cd59c4ed5d)
![image](https://github.com/user-attachments/assets/fb509de5-2a2c-48d8-a599-6412ddf5db6e)
![image](https://github.com/user-attachments/assets/aba4ea37-bc70-4980-8e63-47f8aad66057)
![image](https://github.com/user-attachments/assets/2d826bcf-7c45-4b1e-85ea-24fba12c8992)
![image](https://github.com/user-attachments/assets/e104a9d1-22c6-4031-a0aa-c3a913372dbc)
![image](https://github.com/user-attachments/assets/dbe87f08-d245-4447-a390-20122a4019f2)


## 🧠 About

BCI Mobile is a cutting-edge Brain-Computer Interface application designed to monitor and track your mental state and mood patterns. The app combines traditional self-reporting with advanced EEG signal processing to provide comprehensive insights into your emotional well-being.

## 🎯 Business Logic

### Core Functionality

**Mood Tracking & Analytics**
- Real-time mood scoring (0-100 scale) with visual feedback
- Weekly mood history and trend analysis
- Automated mood categorization (Very Unpleasant to Very Pleasant)
- Personalized insights and suggestions based on mood patterns

**BCI Device Integration**
- Bluetooth connectivity to EEG/BCI devices
- Real-time EEG signal visualization (8-channel display)
- Automatic device scanning and pairing
- Connection status monitoring

**Emotion Logging**
- Manual emotion entry with feeling categorization
- Impact assessment on daily activities
- Historical emotion tracking and patterns
- Visual emotion selection interface

**AI-Powered Chat Support**
- Conversational AI for mental health support
- Contextual suggestions based on current mood
- 24/7 availability for mental wellness guidance

**User Management**
- Secure authentication via Supabase
- Personal data synchronization across devices
- Settings and preferences management
- Notification system for mood check-ins

### Target Users
- Individuals interested in mental health monitoring
- Researchers studying mood patterns and BCI technology
- Therapists and mental health professionals
- Anyone seeking data-driven insights into their emotional well-being

## 🛠 Technology Stack

### Frontend
- **React Native** (0.79.2) - Cross-platform mobile development
- **Expo** (~53.0.9) - Development and deployment platform
- **TypeScript** (~5.8.3) - Type-safe development
- **React Navigation** (^7.1.9) - Navigation system with bottom tabs and stack navigation

### UI/UX
- **React Native Paper** (^5.14.5) - Material Design components
- **React Native Linear Gradient** - Visual enhancements
- **Expo Vector Icons** - Comprehensive icon library
- **React Native Chart Kit** (^6.12.0) - Data visualization

### Backend & Database
- **Supabase** (^2.7.1) - Backend-as-a-Service
  - User authentication
  - Real-time database
  - Row Level Security (RLS)
  - Auto-generated APIs

### Connectivity & Hardware
- **Bluetooth Integration** - BCI device connectivity
- **React Native Async Storage** - Local data persistence
- **React Native URL Polyfill** - Web API compatibility

### Development Tools
- **Formik** (^2.4.6) & **Yup** (^1.6.1) - Form handling and validation
- **React Native Dotenv** - Environment variable management
- **Babel** - JavaScript compilation

### State Management
- **React Context API** - Global state management
  - AuthContext - User authentication state
  - BluetoothContext - Device connection management
  - EmotionContext - Emotion tracking state
  - MoodContext - Mood scoring and history

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bci-mobile
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To get Supabase credentials:**
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### 4. Database Setup
Set up the following tables in your Supabase database:

```sql
-- Users table (handled by Supabase Auth)

-- Mood entries
CREATE TABLE mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  score INTEGER NOT NULL,
  mood_text TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emotion logs
CREATE TABLE emotion_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  emotion_name TEXT NOT NULL,
  feelings TEXT[],
  impacts TEXT[],
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotion_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own emotion logs" ON emotion_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emotion logs" ON emotion_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Configure Expo
Update `app.config.js` if needed for your specific requirements:

```javascript
export default {
  expo: {
    name: "BCI Mobile",
    slug: "bci-mobile",
    // ... other configurations
  },
};
```

## 🏃‍♂️ How to Run

### Development Mode

**Start the development server:**
```bash
npm start
# or
yarn start
```

**Run on specific platforms:**
```bash
# iOS Simulator
npm run ios
# or
yarn ios

# Android Emulator
npm run android
# or
yarn android

# Web Browser
npm run web
# or
yarn web
```

### Using Expo Go (Recommended for Testing)
1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

### Production Build

**For iOS:**
```bash
expo build:ios
```

**For Android:**
```bash
expo build:android
```

## 📱 Features

### Current Features
- ✅ User authentication (Sign up/Sign in)
- ✅ Real-time mood tracking with visual feedback
- ✅ EEG signal visualization
- ✅ Bluetooth device connection simulation
- ✅ Emotion logging with categories
- ✅ Weekly mood analytics and charts
- ✅ AI chat interface
- ✅ Demo mode for testing
- ✅ Responsive design for all screen sizes

### Upcoming Features
- 🔄 Real Bluetooth BCI device integration
- 🔄 Advanced ML mood prediction
- 🔄 Social mood sharing
- 🔄 Therapist dashboard
- 🔄 Export data functionality
- 🔄 Offline mode support

## 🔧 Development

### Project Structure
```
bci-mobile/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── screens/            # App screens/pages
├── theme/              # Design system and styling
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Images, icons, fonts
├── App.tsx             # Main app component
├── supabase.ts         # Database configuration
└── package.json        # Dependencies and scripts
```

### Key Files
- `App.tsx` - Main application component with navigation setup
- `contexts/AuthContext.tsx` - User authentication management
- `contexts/BluetoothContext.tsx` - BCI device connection handling
- `contexts/EmotionContext.tsx` - Emotion tracking state
- `screens/MainScreen.tsx` - Dashboard with mood visualization
- `supabase.ts` - Database client configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Environment Variables Not Loading:**
- Ensure `.env` file is in the root directory
- Restart the development server after adding new variables
- Check that variable names match exactly

**Supabase Connection Issues:**
- Verify your Supabase URL and keys are correct
- Check your internet connection
- Ensure Supabase project is active

**Build Errors:**
- Clear Expo cache: `expo r -c`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

**Device Connection Issues:**
- Ensure Bluetooth is enabled on your device
- Check device permissions for Bluetooth access
- Currently uses simulated connections - real BCI integration coming soon

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ for mental health and BCI technology advancement** 
