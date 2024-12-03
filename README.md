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

## Demo & Screenshots

![WTWR Demo](path/to/demo.gif)

### Desktop View

![Desktop Screenshot](path/to/desktop.png)

### Mobile View

![Mobile Screenshot](path/to/mobile.png)

## Technologies & Tools

### Frontend

- React 18 with Vite
- React Router v6
- Context API for state management
- CSS3 with BEM methodology

### Backend

- Node.js & Express
- MongoDB
- JWT Authentication
- API

### Development Tools

- ESLint & Prettier
- Git & GitHub
- Google Chrome DevTools
- Postman for API testing

## Links

- [Backend Repository](https://github.com/jackmalzone/se_project_express)
- [Live Demo](your-deployed-url)

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/jackmalzone/se_project_react.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env file in the root directory

   ```env
   VITE_WEATHER_API_KEY=your_api_key
   VITE_BASE_URL=your_backend_url
   ```

4. Start the development server

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

## Could be improved

COULD BE IMPROVED

<!-- If it’s interesting for you here is a way to make a special wrapper for any modal with cross button, Escape and overlay listeners inside. You should create component Modal, store it in Modal.js.


import { useEffect } from "react";

export const Modal = ({ name, onClose, children }) => {
  // here is `useEffect` for the `Escape` listener
  useEffect(() => {
    // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // don’t forget to remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // here is the overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // then we add the main wrapper with class `modal`
  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      {/* the container for the contents */}
      <div className="modal__container">
        {/* here will be anything you add as `children`*/}
        {children}
        {/* add the close button */}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};


And now you can use Modal for any popup in the project:  ItemModal  and ModalWithForm



function ModalWithForm({ name, onClose, ...props}) {
  return (
    <Modal name={name} onClose={onClose}>
        <h2 className='modal__title'>{props.title}</h2>

You can make also Input for inputs and Form for any form in the project. -->
