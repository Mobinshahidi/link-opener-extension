# Smart Open Links - Firefox Extension

A simple, safe Firefox extension that lets you right-click to open multiple links matching specific criteria.

## Features
- ✅ Right-click context menu on any webpage
- ✅ 8 preset quick options (YouTube, GitHub, Reddit, Wikipedia, PDF, images, download, login)
- ✅ Custom word search option
- ✅ Opens links in background tabs with smart delay
- ✅ Shows completion alert
- ✅ 100% local - no internet permissions, no data collection
- ✅ Minimal permissions (only activeTab and tabs)

## Installation Instructions

### Method 1: Temporary Installation (Testing/Development)

1. **Open Firefox** and type `about:debugging` in the address bar
2. Click **"This Firefox"** in the left sidebar
3. Click **"Load Temporary Add-on..."** button
4. Navigate to the folder containing these files
5. Select the `manifest.json` file
6. Done! The extension is now loaded

**Note:** Temporary add-ons are removed when Firefox closes. You'll need to reload it each time you restart Firefox.

### Method 2: Permanent Installation (Unsigned)

**This option it's not safe and not recommended !**
For permanent installation without signing (requires changing Firefox settings):

1. Type `about:config` in Firefox address bar
2. Click "Accept the Risk and Continue"
3. Search for `xpinstall.signatures.required`
4. Double-click to set it to `false`
5. Create a ZIP file of all extension files:
   - Right-click the folder → Send to → Compressed folder
   - OR use command line: `zip -r smart-open-links.zip *`
6. Rename the `.zip` to `.xpi`
7. Drag the `.xpi` file into Firefox
8. Click "Add" when prompted

### Method 3: Install from ZIP (Easiest for Daily Use)

If you want to keep using it without reloading:
1. Keep the files in a permanent location on your computer
2. Use Method 1 but note the location
3. Each time you start Firefox, repeat Method 1 (takes 10 seconds)

## How to Use

1. **Right-click anywhere** on any webpage
2. Hover over **"Smart Open Links"** in the context menu
3. Choose an option:

### Preset Options (One Click):
- **Open all YouTube links** - Opens all youtube.com and youtu.be links
- **Open all GitHub links** - Opens all github.com links
- **Open all Reddit links** - Opens all reddit.com links
- **Open all Wikipedia links** - Opens all wikipedia.org links
- **Open all PDF links** - Opens all links ending in .pdf
- **Open all image links** - Opens all .jpg, .jpeg, .png, .gif, .webp links
- **Open all links containing "download"** - Opens links with "download" in URL or text
- **Open all links containing "login"** - Opens links with "login" in URL or text

### Custom Search:
- **Open links containing... (type your own word)**
  - Click this option
  - A popup appears asking you to type a word or phrase
  - Type anything: "2025", "free", "report", "blog", etc.
  - Press OK or Enter
  - All matching links open in new background tabs

4. **See results**: A small alert shows "Opened X links!"

## Examples

**Scenario 1:** You're on a blog with many article links. You want only articles from 2025.
- Right-click → Smart Open Links → "Open links containing..."
- Type: `2025`
- All links containing "2025" open in new tabs

**Scenario 2:** You're on a GitHub repository page with many files.
- Right-click → Smart Open Links → "Open all PDF links"
- All PDF documentation opens instantly

**Scenario 3:** You're on a Reddit thread with YouTube videos scattered throughout.
- Right-click → Smart Open Links → "Open all YouTube links"
- All YouTube videos open in separate tabs for easy viewing

## Technical Details

- **Manifest Version:** 2 (compatible with all Firefox versions)
- **Permissions:** 
  - `contextMenus` - To add right-click menu
  - `activeTab` - To scan links on current page only
  - `tabs` - To open new tabs
- **No network access** - Completely local, no data sent anywhere
- **Tab delay:** 100ms between each tab to prevent browser freeze
- **Duplicate removal:** Each unique URL only opens once

## Files Included

- `manifest.json` - Extension configuration
- `background.js` - Main extension logic
- `icon.png` - Extension icon
- `README.md` - This file

## Troubleshooting

**Extension doesn't appear in context menu:**
- Reload the extension in about:debugging
- Try right-clicking on different parts of the page

**No links found:**
- Make sure you're on a page with actual `<a href>` links
- The page might use JavaScript links that aren't standard `<a>` tags

**Too many tabs opening at once:**
- The extension uses 100ms delay between tabs
- For 50+ links, it may take a few seconds

**Custom prompt doesn't appear:**
- Make sure popups aren't blocked for the current site
- Try clicking the preset options first to test

## Privacy & Security

✅ **100% local** - No data leaves your browser
✅ **No tracking** - No analytics, no telemetry
✅ **No network access** - Can't send data anywhere
✅ **Minimal permissions** - Only what's needed to function
✅ **Open source** - You can read all the code

## Version History

**v1.0.0** (December 2025)
- Initial release
- 8 preset filters
- Custom word search
- Background tab opening with delay
- Completion alerts

## Support

This extension is provided as-is. The code is simple and safe. If you encounter issues:
1. Check the troubleshooting section above
2. Reload the extension in about:debugging
3. Restart Firefox

## License

Free to use, modify, and distribute. No attribution required.
