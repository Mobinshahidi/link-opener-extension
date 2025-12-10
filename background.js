// Create context menu when extension loads
browser.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

browser.runtime.onStartup.addListener(() => {
  createContextMenu();
});

function createContextMenu() {
  // Remove any existing menu items
  browser.contextMenus.removeAll();

  // Create parent menu
  browser.contextMenus.create({
    id: "smart-open-links",
    title: "Smart Open Links",
    contexts: ["page", "link", "selection"],
  });

  // Create preset options
  const presets = [
    {
      id: "youtube",
      title: "Open all YouTube links",
      keywords: ["youtube.com", "youtu.be"],
    },
    { id: "github", title: "Open all GitHub links", keywords: ["github.com"] },
    { id: "reddit", title: "Open all Reddit links", keywords: ["reddit.com"] },
    { id: "pdf", title: "Open all PDF links", keywords: [".pdf"] },
    {
      id: "image",
      title: "Open all image links",
      keywords: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
    {
      id: "download",
      title: 'Open all links containing "download"',
      keywords: ["download"],
    },
    {
      id: "login",
      title: 'Open all links containing "login"',
      keywords: ["login"],
    },
  ];

  presets.forEach((preset) => {
    browser.contextMenus.create({
      id: preset.id,
      parentId: "smart-open-links",
      title: preset.title,
      contexts: ["page", "link", "selection"],
    });
  });

  // Add separator
  browser.contextMenus.create({
    id: "separator",
    parentId: "smart-open-links",
    type: "separator",
    contexts: ["page", "link", "selection"],
  });

  // Add custom option
  browser.contextMenus.create({
    id: "custom",
    parentId: "smart-open-links",
    title: "Open links containing… (type your own word)",
    contexts: ["page", "link", "selection"],
  });
}

// Handle menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  const presetKeywords = {
    youtube: ["youtube.com", "youtu.be"],
    github: ["github.com"],
    reddit: ["reddit.com"],
    wikipedia: ["wikipedia.org"],
    pdf: [".pdf"],
    image: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    download: ["download"],
    login: ["login"],
  };

  if (info.menuItemId === "custom") {
    // For custom, inject a script that prompts the user
    browser.tabs
      .executeScript(tab.id, {
        code: `
        (function() {
          const userInput = prompt("Enter a word or phrase to search for in links:");
          if (userInput && userInput.trim()) {
            return userInput.trim();
          }
          return null;
        })();
      `,
      })
      .then((results) => {
        if (results && results[0]) {
          openMatchingLinks(tab.id, [results[0].toLowerCase()]);
        }
      });
  } else if (presetKeywords[info.menuItemId]) {
    openMatchingLinks(tab.id, presetKeywords[info.menuItemId]);
  }
});

function openMatchingLinks(tabId, keywords) {
  // Inject script to find and collect matching links
  const code = `
    (function() {
      const keywords = ${JSON.stringify(keywords)};
      const links = Array.from(document.querySelectorAll('a[href]'));
      const matchingUrls = [];
      
      links.forEach(link => {
        const href = link.href.toLowerCase();
        const text = link.textContent.toLowerCase();
        
        // Check if any keyword matches the URL or text
        const matches = keywords.some(keyword => 
          href.includes(keyword.toLowerCase()) || text.includes(keyword.toLowerCase())
        );
        
        if (matches && link.href.startsWith('http')) {
          matchingUrls.push(link.href);
        }
      });
      
      // Remove duplicates
      return [...new Set(matchingUrls)];
    })();
  `;

  browser.tabs
    .executeScript(tabId, { code: code })
    .then((results) => {
      if (results && results[0]) {
        const urls = results[0];

        if (urls.length === 0) {
          browser.tabs.executeScript(tabId, {
            code: `alert("No matching links found on this page.");`,
          });
          return;
        }

        // Open links with delay to prevent browser freeze
        let opened = 0;
        urls.forEach((url, index) => {
          setTimeout(() => {
            browser.tabs
              .create({
                url: url,
                active: false,
              })
              .then(() => {
                opened++;

                // Show alert after last tab opens
                if (opened === urls.length) {
                  browser.tabs.executeScript(tabId, {
                    code: `alert("Opened ${opened} link${opened !== 1 ? "s" : ""}!");`,
                  });
                }
              });
          }, index * 100); // 100ms delay between each tab
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
