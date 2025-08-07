# 🔐 Unique Code Generator

A modern React application that generates random alphanumeric codes with guaranteed uniqueness. Built with the latest React 18 and ready for Netlify deployment.

## ✨ Features

-   **Guaranteed Uniqueness**: Uses Set data structure to ensure no duplicate codes
-   **Customizable**: Set the number of codes and length of each code
-   **Modern UI**: Beautiful, responsive design with gradient backgrounds
-   **Multiple Export Options**: Download as .txt file or copy to clipboard
-   **Smart Validation**: Prevents impossible requests (e.g., generating more codes than mathematically possible)
-   **Loading States**: Visual feedback during code generation
-   **Mobile Responsive**: Works perfectly on all device sizes

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Start development server:**

    ```bash
    npm start
    ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🌐 Deploy to Netlify

### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically detect the React app and deploy it

### Option 2: Manual Deploy

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

## 🛠️ Technical Details

### Character Set

The app uses a carefully selected character set that excludes confusing characters:

-   **Included**: `0123456789ACDFGHJKMNPRUWY` (24 characters)
-   **Excluded**: `B, E, I, O, Q, S, V, X, Z` (to avoid confusion with similar-looking characters)

### Uniqueness Algorithm

1. Uses JavaScript's `Set` data structure for automatic deduplication
2. Generates codes using `Math.random()` for each character position
3. Continues generation until the requested number of unique codes is reached

### Mathematical Limits

-   **Maximum possible codes**: 24^length
-   **Example**: For 8-character codes, maximum is 24^8 = 110,075,314,176 codes
-   **Validation**: App prevents requests exceeding mathematical limits

## 📱 Browser Support

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)

## 🎨 Customization

### Styling

Modify `src/App.css` to customize the appearance:

-   Color schemes
-   Layout dimensions
-   Animations and transitions
-   Responsive breakpoints

### Character Set

To change the character set, modify the `characters` string in `src/App.js`:

```javascript
const characters = "YOUR_CUSTOM_CHARACTER_SET";
```

## 🔧 Available Scripts

-   `npm start` - Runs the app in development mode
-   `npm run build` - Builds the app for production
-   `npm test` - Launches the test runner
-   `npm run eject` - Ejects from Create React App (one-way operation)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
