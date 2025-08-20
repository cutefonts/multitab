// Multi Tab Search Extension
// Core search functionality without premium features

class MultiTabSearch {
    constructor() {
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateUI();
    }

    loadSettings() {
        chrome.storage.local.get([
            'searchEngine',
            'removeYoutube',
            'removeSoundcloud',
            'removeItunes',
            'removeBeatport',
            'removeFacebook',
            'removeDiscogs',
            'removeMixcloud',
            'removeTraxsource',
            'removeResidentadvisor',
            'removeTrackitdown',
            'removeDjdownload',
            'removeJunodownload',
            'selectAll',
            'clearWords',
            'addHttps',
            'surroundQuotes',
            'trimLines',
            'extraParameters'
        ], (result) => {
            // Set search engine
            if (result.searchEngine) {
                document.getElementById('search-engine').value = result.searchEngine;
            }

            // Set filter checkboxes
            if (result.removeYoutube) document.getElementById('remove-youtube').checked = true;
            if (result.removeSoundcloud) document.getElementById('remove-soundcloud').checked = true;
            if (result.removeItunes) document.getElementById('remove-itunes').checked = true;
            if (result.removeBeatport) document.getElementById('remove-beatport').checked = true;
            if (result.removeFacebook) document.getElementById('remove-facebook').checked = true;
            if (result.removeDiscogs) document.getElementById('remove-discogs').checked = true;
            if (result.removeMixcloud) document.getElementById('remove-mixcloud').checked = true;
            if (result.removeTraxsource) document.getElementById('remove-traxsource').checked = true;
            if (result.removeResidentadvisor) document.getElementById('remove-residentadvisor').checked = true;
            if (result.removeTrackitdown) document.getElementById('remove-trackitdown').checked = true;
            if (result.removeDjdownload) document.getElementById('remove-djdownload').checked = true;
            if (result.removeJunodownload) document.getElementById('remove-junodownload').checked = true;

            // Set option checkboxes
            if (result.selectAll) document.getElementById('select-all').checked = true;
            if (result.clearWords) document.getElementById('clear-words').checked = true;
            if (result.addHttps) document.getElementById('add-https').checked = true;
            if (result.surroundQuotes) document.getElementById('surround-quotes').checked = true;
            if (result.trimLines) document.getElementById('trim-lines').checked = true;

            // Set extra parameters
            if (result.extraParameters) {
                document.getElementById('extra-parameters').value = result.extraParameters;
            }
        });
    }

    setupEventListeners() {
        // Search button
        document.getElementById('search-btn').addEventListener('click', () => {
            this.performSearch();
        });

        // Open URLs button
        document.getElementById('open-urls-btn').addEventListener('click', () => {
            this.openURLs();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetSettings();
        });

        // Select all checkbox
        document.getElementById('select-all').addEventListener('change', (e) => {
            this.toggleAllFilters(e.target.checked);
        });

        // Save settings on change
        this.setupSettingsListeners();
    }

    setupSettingsListeners() {
        // Search engine change
        document.getElementById('search-engine').addEventListener('change', (e) => {
            this.saveSetting('searchEngine', e.target.value);
        });

        // Filter checkboxes
        const filterCheckboxes = [
            'remove-youtube', 'remove-soundcloud', 'remove-itunes', 'remove-beatport',
            'remove-facebook', 'remove-discogs', 'remove-mixcloud', 'remove-traxsource',
            'remove-residentadvisor', 'remove-trackitdown', 'remove-djdownload', 'remove-junodownload'
        ];

        filterCheckboxes.forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                const settingName = id.replace('remove-', 'remove').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                this.saveSetting(settingName, e.target.checked);
            });
        });

        // Option checkboxes
        const optionCheckboxes = ['select-all', 'clear-words', 'add-https', 'surround-quotes', 'trim-lines'];
        optionCheckboxes.forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                const settingName = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                this.saveSetting(settingName, e.target.checked);
            });
        });

        // Extra parameters
        document.getElementById('extra-parameters').addEventListener('input', (e) => {
            this.saveSetting('extraParameters', e.target.value);
        });
    }

    saveSetting(key, value) {
        chrome.storage.local.set({ [key]: value });
    }

    toggleAllFilters(checked) {
        const filterCheckboxes = [
            'remove-youtube', 'remove-soundcloud', 'remove-itunes', 'remove-beatport',
            'remove-facebook', 'remove-discogs', 'remove-mixcloud', 'remove-traxsource',
            'remove-residentadvisor', 'remove-trackitdown', 'remove-djdownload', 'remove-junodownload'
        ];

        filterCheckboxes.forEach(id => {
            document.getElementById(id).checked = checked;
            const settingName = id.replace('remove-', 'remove').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            this.saveSetting(settingName, checked);
        });
    }

    performSearch() {
        const queries = this.getSearchQueries();
        if (!queries.length) {
            this.showStatus('Please enter some search queries', 'error');
            return;
        }

        // Disable buttons during processing
        this.setButtonsEnabled(false);

        const searchEngine = document.getElementById('search-engine').value;
        const searchResults = this.processQueries(queries, searchEngine);
        
        this.showStatus(`Processing ${searchResults.length} search queries...`, 'info');
        this.openTabs(searchResults);
        
        if (document.getElementById('clear-words').checked) {
            setTimeout(() => {
                document.getElementById('search-queries').value = '';
                this.setButtonsEnabled(true);
            }, 1000);
        } else {
            setTimeout(() => {
                this.setButtonsEnabled(true);
            }, 1000);
        }
    }

    openURLs() {
        const urls = this.getURLs();
        if (!urls.length) {
            this.showStatus('Please enter some URLs', 'error');
            return;
        }

        // Disable buttons during processing
        this.setButtonsEnabled(false);

        this.showStatus(`Processing ${urls.length} URLs...`, 'info');
        this.openTabs(urls);
        
        if (document.getElementById('clear-words').checked) {
            setTimeout(() => {
                document.getElementById('search-queries').value = '';
                this.setButtonsEnabled(true);
            }, 1000);
        } else {
            setTimeout(() => {
                this.setButtonsEnabled(true);
            }, 1000);
        }
    }

    setButtonsEnabled(enabled) {
        document.getElementById('search-btn').disabled = !enabled;
        document.getElementById('open-urls-btn').disabled = !enabled;
        document.getElementById('reset-btn').disabled = !enabled;
    }

    getSearchQueries() {
        const text = document.getElementById('search-queries').value;
        if (!text.trim()) return [];

        let lines = text.split('\n');
        
        if (document.getElementById('trim-lines').checked) {
            lines = lines.map(line => line.trim());
        }

        lines = lines.filter(line => line.trim() && !this.isURL(line.trim()));
        
        if (document.getElementById('surround-quotes').checked) {
            lines = lines.map(line => `"${line.trim()}"`);
        }

        return lines;
    }

    getURLs() {
        const text = document.getElementById('search-queries').value;
        if (!text.trim()) return [];

        let lines = text.split('\n');
        
        if (document.getElementById('trim-lines').checked) {
            lines = lines.map(line => line.trim());
        }

        lines = lines.filter(line => line.trim() && this.isURL(line.trim()));
        
        if (document.getElementById('add-https').checked) {
            lines = lines.map(line => {
                if (!line.startsWith('http://') && !line.startsWith('https://')) {
                    return 'https://' + line;
                }
                return line;
            });
        }

        return lines;
    }

    isURL(text) {
        return text.includes('.') && (text.includes('http') || text.includes('www') || text.includes('.com') || text.includes('.org') || text.includes('.net'));
    }

    processQueries(queries, searchEngine) {
        const searchUrls = {
            'google': 'https://www.google.com/search?q=',
            'bing': 'https://www.bing.com/search?q=',
            'duckduckgo': 'https://duckduckgo.com/?q=',
            'yahoo': 'https://search.yahoo.com/search?p='
        };

        const baseUrl = searchUrls[searchEngine] || searchUrls['google'];
        const extraParams = document.getElementById('extra-parameters').value.trim();
        
        // Get active filters
        const filters = this.getActiveFilters();
        
        return queries.map(query => {
            let searchQuery = query;
            
            // Add filters to search query
            if (filters.length > 0) {
                searchQuery += ' ' + filters.join(' ');
            }
            
            if (extraParams) {
                searchQuery += ' ' + extraParams;
            }
            
            return baseUrl + encodeURIComponent(searchQuery);
        });
    }

    getActiveFilters() {
        const filters = [];
        const filterMappings = {
            'remove-youtube': '-site:youtube.com',
            'remove-soundcloud': '-site:soundcloud.com',
            'remove-itunes': '-site:apple.com',
            'remove-beatport': '-site:beatport.com',
            'remove-facebook': '-site:facebook.com',
            'remove-discogs': '-site:discogs.com',
            'remove-mixcloud': '-site:mixcloud.com',
            'remove-traxsource': '-site:traxsource.com',
            'remove-residentadvisor': '-site:residentadvisor.net',
            'remove-trackitdown': '-site:trackitdown.net',
            'remove-djdownload': '-site:djdownload.com',
            'remove-junodownload': '-site:junodownload.com'
        };

        Object.keys(filterMappings).forEach(filterId => {
            if (document.getElementById(filterId).checked) {
                filters.push(filterMappings[filterId]);
            }
        });

        return filters;
    }

    openTabs(urls) {
        if (urls.length > 100) {
            if (!confirm(`You're about to open ${urls.length} tabs. This might slow down your browser. Continue?`)) {
                this.setButtonsEnabled(true);
                return;
            }
        }

        this.showProgress(true);
        this.openTabsSequentially(urls, 0);
    }

    openTabsSequentially(urls, index) {
        if (index >= urls.length) {
            this.showProgress(false);
            this.showStatus(`Successfully opened ${urls.length} tabs!`, 'success');
            this.setButtonsEnabled(true);
            return;
        }

        // Update progress
        const progress = Math.round((index / urls.length) * 100);
        this.updateProgress(progress, `Opening tab ${index + 1} of ${urls.length}`);

        // Open the current tab
        chrome.tabs.create({ 
            url: urls[index],
            active: false // Don't make each new tab active
        }, (tab) => {
            // Check if tab was created successfully
            if (chrome.runtime.lastError) {
                console.error('Error creating tab:', chrome.runtime.lastError);
                // Continue with next tab even if this one failed
                setTimeout(() => {
                    this.openTabsSequentially(urls, index + 1);
                }, 100);
            } else {
                // Continue with next tab immediately after successful creation
                this.openTabsSequentially(urls, index + 1);
            }
        });
    }

    showProgress(show) {
        const progressContainer = document.getElementById('progress-container');
        progressContainer.style.display = show ? 'block' : 'none';
        
        if (!show) {
            this.updateProgress(0, '');
        }
    }

    updateProgress(percentage, text) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = text || `${percentage}%`;
    }

    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            chrome.storage.local.clear(() => {
                location.reload();
            });
        }
    }

    showStatus(message, type = 'info') {
        const status = document.getElementById('status');
        status.textContent = message;
        status.className = `status ${type}`;
        status.style.display = 'block';
        
        if (type !== 'info') {
            setTimeout(() => {
                status.style.display = 'none';
            }, 5000);
        }
    }

    updateUI() {
        // Update any UI elements that need to be refreshed
        console.log('Multi Tab Search Extension loaded successfully');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MultiTabSearch();
}); 