# Backend Setup for Express Application

This project is a backend setup using Express.js. It serves as a multi-server sample for a Visual Studio Code extension.

## Project Structure

- **src/app.ts**: Entry point of the application. Sets up the Express app, middleware, and routes.
- **src/controllers/index.ts**: Contains the `IndexController` class with a method to handle the root route.
- **src/routes/index.ts**: Exports the `setRoutes` function to configure application routes.
- **src/types/index.ts**: Defines custom interfaces for Request and Response extending Express interfaces.
- **tsconfig.json**: TypeScript configuration file specifying compiler options.
- **package.json**: NPM configuration file listing dependencies and scripts.

## Getting Started

1. **Install Dependencies**: Run `npm install` to install the required packages.
2. **Compile TypeScript**: Use `tsc` to compile the TypeScript files.
3. **Run the Application**: Start the server using `node dist/app.js` (assuming compiled files are in the `dist` folder).

## License

This project is licensed under the MIT License.