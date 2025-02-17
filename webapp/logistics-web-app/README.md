# Logistics Web Application

This project is a web application designed to read and display logistics network data from a JSON file in a tabbed interface. The application allows users to view different sections of the logistics data in a user-friendly manner.

## Project Structure

```
logistics-web-app
├── public
│   ├── index.html          # Main HTML document
│   └── styles.css         # Styles for the web application
├── src
│   ├── App.js             # Main component managing state and rendering tabs
│   ├── components
│   │   ├── Tab.js         # Component representing a single tab
│   │   ├── TabContent.js   # Component displaying content for the active tab
│   │   └── Table.js       # Component rendering data in a formatted table
│   ├── data
│   │   └── logistics_networks.json  # JSON data file
│   └── index.js           # Entry point for the React application
├── package.json           # Configuration file for npm
├── .gitignore             # Specifies files to ignore by Git
└── README.md              # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd logistics-web-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Usage

- The application displays logistics network data in a tabbed interface.
- Each tab corresponds to a different section of the data, allowing users to easily switch between views.
- The data is presented in formatted tables for better readability.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.