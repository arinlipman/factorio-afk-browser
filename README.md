# Factorio AFK Browser

## Description
Factorio AFK Browser is a tool designed to help manage your AFK (Away From Keyboard) time in the game Factorio. This project aims to provide a seamless experience for players who want to monitor their productivity even when they are not actively playing.

## Installation
To install the Factorio AFK Browser, follow these steps:
1. Clone the repository into the Factorio Mods directory (see https://wiki.factorio.com/Application_directory):
   ```sh
   git clone https://github.com/arinlipman/factorio-afk-browser.git
   ```
2. Navigate to the project logistics-web-app directory:
   ```sh
   cd factorio-afk-browser/webapp/logistics-web-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Build the app:
   ```sh
   npm run build
   ```

## Usage
Factorio AFK Browser will need to be installed from within Factorio like any other mod (except it will already be present on the Installed tab).

To start using the Factorio AFK Browser's web app, run the following command from the logistics-web-app directory:
```sh
npm run start
```
This will launch the server and you can access to web app using http://localhost:3000

## Contributing
Contributions are welcome! If you have any ideas or improvements, feel free to open an issue or submit a pull request.
