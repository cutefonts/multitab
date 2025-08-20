# Multi Tab Search Chrome Extension

A powerful Chrome extension that allows users to search multiple queries at once by opening multiple tabs, similar to popular bulk search tools.

## Features

### Core Functionality
- **Bulk Search**: Search 100+ queries simultaneously with one click
- **Multiple Search Engines**: Support for Google, Bing, DuckDuckGo, and Yahoo
- **URL Opening**: Open multiple URLs directly in new tabs
- **Smart Processing**: Automatically detects URLs vs search queries

### Website Filtering
- Remove results from specific websites including:
  - YouTube, SoundCloud, iTunes, Beatport
  - Facebook, Discogs, MixCloud, Traxsource
  - Resident Advisor, Trackitdown, DjDownload, JunoDownload

### Advanced Options
- **Extra Parameters**: Add custom search parameters
- **Quote Wrapping**: Automatically wrap queries in quotes for exact matches
- **Line Trimming**: Clean up whitespace from queries
- **HTTPS Addition**: Automatically add https:// to URLs
- **Auto-Clear**: Option to clear input after search
- **Settings Persistence**: All preferences are saved automatically

### Design Features
- Clean, professional interface inspired by modern design principles
- Responsive layout optimized for the Chrome extension popup
- Smooth animations and hover effects
- Color-coded status messages
- Grid-based layout for optimal space usage

## Installation

1. Download or clone this extension
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your Chrome toolbar

## Usage

1. **Adding Queries**: Type or paste your search terms in the text area, one per line
2. **Configure Filters**: Check boxes to exclude specific websites from results
3. **Set Options**: Choose your preferred search engine and other settings
4. **Search**: Click "Search" to open all queries in new tabs
5. **Open URLs**: Use "Open URLs" button for direct URL opening

## Technical Details

### File Structure
- `manifest.json` - Extension configuration and permissions
- `popup.html` - Main user interface
- `popup.css` - Styling with modern design principles
- `popup.js` - Core functionality and search logic
- `background.js` - Background service worker

### Permissions
- `tabs` - Required for opening new tabs
- `storage` - Used to save user preferences

### Browser Support
- Chrome (Manifest V3)
- Compatible with Chromium-based browsers

## Customization

The extension can be easily customized by modifying:
- Search engines in the dropdown (edit `popup.js`)
- Website filters in the checkboxes section (edit `popup.html`)
- Styling and colors (edit `popup.css`)
- Additional features (extend `popup.js`)

## Performance Considerations

- Built-in delays between tab openings to prevent browser overwhelm
- Confirmation dialogs for large numbers of tabs (100+ search queries, 50+ URLs)
- Efficient storage and retrieval of user settings
- Optimized for fast processing of large query lists

## Support and Troubleshooting

### Extension Issues
- Verify Chrome extension permissions
- Check for JavaScript errors in console
- Ensure all files are properly loaded
- Test basic functionality

## Future Enhancements

- Additional search engines
- Custom search templates
- Advanced filtering options
- Search history and analytics
- Export and import functionality

This extension provides a professional-grade solution for bulk searching with a clean, intuitive interface that matches modern design standards.