# WTWR (What to Wear?)

## About

WTWR is a full-stack web application that helps users decide what to wear based on the weather. The app provides clothing recommendations tailored to current weather conditions, allowing users to manage their virtual wardrobe and receive personalized suggestions.

## Features

- Real-time weather data integration
- User authentication and authorization
- Personalized clothing recommendations
- Interactive clothing item management
- Responsive design for all devices
- Temperature unit toggle (Fahrenheit/Celsius)
- Like/unlike functionality for clothing items
- Modal-based user interface for item management

## Technologies & Tools

- React 18
- Vite
- React Router v6
- Context API for state management
- CSS3 with BEM methodology
- RESTful API integration

## Links

- [Backend Repository](https://github.com/jackmalzone/se_project_express)

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/jackmalzone/se_project_react.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production version of the app
- `npm run start`: Start the production server

## API Endpoints

### Items

- GET /items - Fetch all clothing items
- POST /items - Add new clothing item
- DELETE /items/:id - Remove clothing item
- PUT /items/:id/likes - Like an item
- DELETE /items/:id/likes - Unlike an item

### Authentication

- POST /signup - Register new user
- POST /signin - Login user
- GET /users/me - Get current user info

## Authentication Flow

1. User registers or logs in
2. User receives JWT token
3. User uses JWT token to authenticate requests to protected endpoints

## Security Measures

- JWT tokens are securely stored in localStorage
- All API requests are authenticated using JWT tokens
- Sensitive data is protected using HTTPS
- Error handling is implemented to provide user feedback in case of errors

## Future Improvements

1. Weather Forecast Integration

   - Add multi-day forecasts
   - Implement hourly weather updates
   - Enhanced weather data visualization

2. Social Features

   - Share outfits with other users
   - Follow other users
   - Community recommendations

3. AI-Powered Suggestions

   - Machine learning for smarter recommendations
   - Pattern recognition for outfit combinations
   - Seasonal trend analysis

4. Enhanced User Experience

   - Drag-and-drop interface
   - Advanced filtering options
   - Customizable categories

5. Mobile Optimization
   - Progressive Web App (PWA)
   - Native mobile app development
   - Offline functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
