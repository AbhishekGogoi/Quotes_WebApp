# Quote Management Web Application

This is a simple web application that allows users to log in, fetch random quotes, and manage their favorite quotes. The application is built using React Vite and integrates with the API Ninjas to fetch random quotes.

## Features

- **User Login:** Users can log in with mock data, and the login info is displayed on the top left.
- **Fetch Random Quote:** Users can fetch a random quote as many times as they want.
- **Favorite a Quote:** Users can mark a quote as a favorite.
- **Unfavorite a Quote:** Users can remove a quote from their favorites.
- **Edit Quote:** Users can edit the text and author of a favorite quote.

## Technology Stack

- **Frontend:** React (with Vite)
- **UI Library:** Material UI
- **API Integration:** API Ninjas

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or above)
- **npm** (v6 or above) or **yarn** (v1.22 or above)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AbhishekGogoi/Quotes_WebApp.git
   ```

2. **Install dependencies:**

   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add the following:

   ```env
   VITE_API_Ninjas_API_KEY="your-api-key"
   ```

   Replace the value with your actual API key from API Ninjas.

### Running the Application

To run the application locally, use the following command:

If you're using npm:

```bash
npm run dev
```

Or if you're using yarn:

```bash
yarn dev
```

This will start the development server, and you can view the application by navigating to `http://localhost:3000` in your web browser.

### Build for Production

To create a production build of the application, use the following command:

If you're using npm:

```bash
npm run build
```

Or if you're using yarn:

```bash
yarn build
```

The optimized and minified output will be generated in the `dist` directory.

### Additional Information

- **API Ninjas Integration:** The application uses API Ninjas to fetch random quotes. Ensure your API key is correctly set up in the `.env` file.
- **UI Library:** The application uses Material UI components for styling and layout.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request. Please ensure that your code adheres to the existing code style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
