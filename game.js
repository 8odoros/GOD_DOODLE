// Main game logic for God Creator (Θεός Δημιουργός)
// Based on the Septuagint translation and Orthodox Christian tradition

class GodCreatorGame {
    constructor() {
        this.discoveredElements = new Map();
        this.currentDay = 1;
        this.combinations = 0;
        this.foundCombinations = new Set(); // Track unique combinations found
        this.selectedSlots = { slot1: null, slot2: null };
        this.gameComplete = false;
        
        this.initializeGame();
        this.setupEventListeners();
        
        // Try to auto-load saved game
        this.tryAutoLoad();
    }

    initializeGame() {
        // Initialize with the four primordial elements
        INITIAL_ELEMENTS.forEach(element => {
            this.discoveredElements.set(element.id, element);
        });
        
        this.updateDisplay();
        this.renderElements();
        
        // Show initial Genesis quote
        this.showBiblicalQuote({
            greek: 'Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν. ἡ δὲ γῆ ἦν ἀόρατος καὶ ἀκατασκεύαστος, καὶ σκότος ἐπάνω τῆς ἀβύσσου, καὶ πνεῦμα θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος.',
            reference: 'Γένεσις 1:1-2'
        });
    }

    toggleCategory(categorySection, categoryHeader) {
        const elementsGrid = categorySection.querySelector('.elements-grid');
        const toggle = categoryHeader.querySelector('.category-toggle');
        
        if (elementsGrid.classList.contains('collapsed')) {
            elementsGrid.classList.remove('collapsed');
            toggle.textContent = '▼';
        } else {
            elementsGrid.classList.add('collapsed');
            toggle.textContent = '▶';
        }
        
        // Play click sound
        this.playSound('click');
    }

    toggleAllCategories() {
        const elementsGrids = document.querySelectorAll('.elements-grid');
        const toggleAllBtn = document.getElementById('toggle-all-btn');
        
        // Check if any categories are collapsed
        const hasCollapsed = Array.from(elementsGrids).some(grid => grid.classList.contains('collapsed'));
        
        elementsGrids.forEach(grid => {
            const categorySection = grid.parentNode;
            const categoryHeader = categorySection.querySelector('.category-header');
            const toggle = categoryHeader.querySelector('.category-toggle');
            
            if (hasCollapsed) {
                // Expand all
                grid.classList.remove('collapsed');
                toggle.textContent = '▼';
            } else {
                // Collapse all
                grid.classList.add('collapsed');
                toggle.textContent = '▶';
            }
        });
        
        // Update button text
        toggleAllBtn.textContent = hasCollapsed ? 'Κλείσιμο Όλων' : 'Άνοιγμα Όλων';
        
        // Play click sound
        this.playSound('click');
    }

    showHints() {
        const availableHints = this.getAvailableHints();
        
        if (availableHints.length === 0) {
            this.showBiblicalQuote({
                greek: 'Μακάριοι οἱ ζητοῦντες τὴν σοφίαν! Συνεχίστε να ανακαλύπτετε τα μυστήρια της δημιουργίας.',
                reference: 'Υπόδειξη'
            });
            return;
        }

        const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
        const element1 = this.discoveredElements.get(randomHint.inputs[0]);
        const element2 = this.discoveredElements.get(randomHint.inputs[1]);
        
        this.showBiblicalQuote({
            greek: `Υπόδειξη: Δοκιμάστε να συνδυάσετε ${element1.name} (${element1.englishName}) με ${element2.name} (${element2.englishName}) για να ανακαλύψετε κάτι νέο από την ${randomHint.result.discoveredDay}η ημέρα της δημιουργίας.`,
            reference: 'Υπόδειξη - ' + randomHint.result.verse
        });
        
        // Play hint sound
        this.playSound('discovery');
    }

    getAvailableHints() {
        return ELEMENT_COMBINATIONS.filter(combo => {
            // Both input elements are discovered but result is not
            const hasInput1 = this.discoveredElements.has(combo.inputs[0]);
            const hasInput2 = this.discoveredElements.has(combo.inputs[1]);
            const hasResult = this.discoveredElements.has(combo.result.id);
            
            return hasInput1 && hasInput2 && !hasResult;
        });
    }

    setupEventListeners() {
        // Combination controls
        document.getElementById('combine-btn').addEventListener('click', () => this.combineElements());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearSlots());
        
        // Category toggle all
        document.getElementById('toggle-all-btn').addEventListener('click', () => this.toggleAllCategories());
        
        // Hints system
        document.getElementById('hints-btn').addEventListener('click', () => this.showHints());
        
        // Game controls
        document.getElementById('save-btn').addEventListener('click', () => this.saveGame());
        document.getElementById('load-btn').addEventListener('click', () => this.loadGame());
        document.getElementById('new-game-btn').addEventListener('click', () => this.confirmNewGame());
        
        // Help system
        document.getElementById('help-btn').addEventListener('click', () => this.toggleHelp());
        
        // Quote display
        document.getElementById('close-quote').addEventListener('click', () => this.hideQuote());
        
        // Allow clicking outside quote to close
        document.getElementById('quote-display').addEventListener('click', (e) => {
            if (e.target.id === 'quote-display') {
                this.hideQuote();
            }
        });
    }

    renderElements() {
        const leftPanel = document.getElementById('left-elements-panel');
        const rightPanel = document.getElementById('right-elements-panel');
        leftPanel.innerHTML = '';
        rightPanel.innerHTML = '';

        // Group elements by category
        const elementsByCategory = new Map();
        this.discoveredElements.forEach(element => {
            if (!elementsByCategory.has(element.category)) {
                elementsByCategory.set(element.category, []);
            }
            elementsByCategory.get(element.category).push(element);
        });

        // Render elements in both panels
        Object.keys(ELEMENT_CATEGORIES).forEach(categoryId => {
            const category = ELEMENT_CATEGORIES[categoryId];
            const elements = elementsByCategory.get(categoryId) || [];
            
            // Skip empty categories
            if (elements.length === 0) return;
            
            // Create left panel category
            const leftCategorySection = this.createCategorySection(category, elements, 'left');
            leftPanel.appendChild(leftCategorySection);
            
            // Create right panel category
            const rightCategorySection = this.createCategorySection(category, elements, 'right');
            rightPanel.appendChild(rightCategorySection);
        });
    }

    createCategorySection(category, elements, side) {
        const categorySection = document.createElement('div');
        categorySection.className = 'element-category';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header clickable';
        categoryHeader.style.color = category.color;
        categoryHeader.innerHTML = `
            <span class="category-toggle">▼</span>
            <span class="category-name">${category.name}</span>
            <span class="category-count">(${elements.length})</span>
        `;
        
        // Add click event to toggle category
        categoryHeader.addEventListener('click', () => this.toggleCategory(categorySection, categoryHeader));
        
        categorySection.appendChild(categoryHeader);
        
        const elementsGrid = document.createElement('div');
        elementsGrid.className = 'elements-grid';
        
        elements.forEach(element => {
            const elementDiv = this.createElement(element, side);
            elementsGrid.appendChild(elementDiv);
        });
        
        categorySection.appendChild(elementsGrid);
        return categorySection;
    }

    createElement(element, side) {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'element';
        elementDiv.draggable = true;
        elementDiv.dataset.elementId = element.id;
        elementDiv.dataset.side = side;
        
        // Apply category color
        const category = ELEMENT_CATEGORIES[element.category];
        elementDiv.style.borderLeftColor = category.color;
        
        elementDiv.innerHTML = `
            <div class="element-icon">${element.icon}</div>
            <div class="element-name">${element.name}</div>
            <div class="element-english">${element.englishName}</div>
            <div class="element-day">Ημέρα ${element.discoveredDay}</div>
        `;
        
        // Add click event listener for selection
        elementDiv.addEventListener('click', () => this.selectElementFromSide(element, side));
        
        // Add hover tooltip
        elementDiv.title = `${element.description}\n${element.verse}`;
        
        return elementDiv;
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.elementId);
    }

    selectElementFromSide(element, side) {
        if (side === 'left') {
            // Left side elements go to slot1
            this.setSlot('slot1', element);
        } else if (side === 'right') {
            // Right side elements go to slot2
            this.setSlot('slot2', element);
        }
        
        this.updateCombineButton();
        this.playSound('click');
    }

    setSlot(slotId, element) {
        this.selectedSlots[slotId] = element;
        const slot = document.getElementById(slotId);
        
        slot.innerHTML = `
            <div class="slot-element">
                <div class="element-icon">${element.icon}</div>
                <div class="element-name">${element.name}</div>
                <div class="clear-indicator">✕</div>
            </div>
        `;
        slot.classList.add('filled');
        
        // Add click listener to clear this specific slot
        slot.addEventListener('click', () => this.clearSpecificSlot(slotId));
    }

    clearSlot(slotId) {
        this.selectedSlots[slotId] = null;
        const slot = document.getElementById(slotId);
        
        slot.innerHTML = `<span class="slot-text">${slotId === 'slot1' ? 'Αριστερό Στοιχείο' : 'Δεξί Στοιχείο'}</span>`;
        slot.classList.remove('filled');
        
        // Remove existing event listeners by cloning the element
        const newSlot = slot.cloneNode(true);
        slot.parentNode.replaceChild(newSlot, slot);
    }

    clearSpecificSlot(slotId) {
        this.clearSlot(slotId);
        this.updateCombineButton();
        
        // Play click sound
        this.playSound('click');
    }

    clearSlots() {
        this.clearSlot('slot1');
        this.clearSlot('slot2');
        this.clearResultSlot();
        this.updateCombineButton();
    }

    clearResultSlot() {
        const resultSlot = document.getElementById('result-slot');
        resultSlot.innerHTML = '<span class="slot-text">Αποτέλεσμα</span>';
        resultSlot.classList.remove('filled', 'success', 'failure');
    }

    handleDrop(e, slotId) {
        e.preventDefault();
        const elementId = e.dataTransfer.getData('text/plain');
        const element = this.discoveredElements.get(elementId);
        
        if (element) {
            this.setSlot(slotId, element);
            this.updateCombineButton();
        }
    }

    updateCombineButton() {
        const combineBtn = document.getElementById('combine-btn');
        combineBtn.disabled = !this.selectedSlots.slot1 || !this.selectedSlots.slot2;
    }

    combineElements() {
        if (!this.selectedSlots.slot1 || !this.selectedSlots.slot2) return;
        
        const element1 = this.selectedSlots.slot1.id;
        const element2 = this.selectedSlots.slot2.id;
        
        // Find matching combination
        const combination = ELEMENT_COMBINATIONS.find(combo => 
            (combo.inputs[0] === element1 && combo.inputs[1] === element2) ||
            (combo.inputs[0] === element2 && combo.inputs[1] === element1)
        );
        
        this.combinations++;
        this.updateDisplay();
        
        if (combination && !this.discoveredElements.has(combination.result.id)) {
            // Successful new discovery
            this.discoverElement(combination.result);
            this.showResultSuccess(combination.result);
            
            // Track this combination as found
            const combKey = [element1, element2].sort().join('+');
            this.foundCombinations.add(combKey);
            
            // Check if this advances to next day
            if (combination.result.discoveredDay > this.currentDay) {
                this.currentDay = combination.result.discoveredDay;
                this.updateDisplay();
                this.showDayTransition(this.currentDay);
            }
            
            // Show biblical quote for special elements
            if (BIBLICAL_QUOTES[combination.result.id]) {
                setTimeout(() => {
                    this.showBiblicalQuote(BIBLICAL_QUOTES[combination.result.id]);
                }, 2000);
            }
            
        } else if (combination) {
            // Already discovered
            this.showResultExists(combination.result);
        } else {
            // No combination found
            this.showResultFailure();
        }
        
        // Play combination sound
        this.playSound('combine');
    }

    discoverElement(element) {
        this.discoveredElements.set(element.id, element);
        this.renderElements();
        
        // Add to discovery log
        this.addToDiscoveryLog(element);
        
        // Check for game completion
        this.checkGameCompletion();
        
        // Auto-save progress
        this.autoSave();
    }

    showResultSuccess(element) {
        const resultSlot = document.getElementById('result-slot');
        resultSlot.innerHTML = `
            <div class="slot-element success-animation">
                <div class="element-icon">${element.icon}</div>
                <div class="element-name">${element.name}</div>
                <div class="discovery-badge">ΝΕΟ!</div>
            </div>
        `;
        resultSlot.classList.add('filled', 'success');
        
        // Play discovery sound
        this.playSound('discovery');
    }

    showResultExists(element) {
        const resultSlot = document.getElementById('result-slot');
        resultSlot.innerHTML = `
            <div class="slot-element">
                <div class="element-icon">${element.icon}</div>
                <div class="element-name">${element.name}</div>
                <div class="exists-badge">ΓΝΩΣΤΟ</div>
            </div>
        `;
        resultSlot.classList.add('filled');
    }

    showResultFailure() {
        const resultSlot = document.getElementById('result-slot');
        resultSlot.innerHTML = `
            <div class="slot-element failure-animation">
                <div class="failure-icon">❌</div>
                <div class="failure-text">Κανένας Συνδυασμός</div>
            </div>
        `;
        resultSlot.classList.add('filled', 'failure');
        
        // Play failure sound
        this.playSound('failure');
    }

    addToDiscoveryLog(element) {
        const discoveryList = document.getElementById('discovery-list');
        
        const discoveryItem = document.createElement('div');
        discoveryItem.className = 'discovery-item new-discovery';
        discoveryItem.innerHTML = `
            <div class="discovery-header">
                <span class="discovery-icon">${element.icon}</span>
                <span class="discovery-name">${element.name}</span>
                <span class="discovery-day">Ημέρα ${element.discoveredDay}</span>
            </div>
            <span class="verse">"${element.description}"</span>
            <small class="reference">${element.verse}</small>
        `;
        
        // Insert at the bottom (append as last child)
        discoveryList.appendChild(discoveryItem);
        
        // Auto-scroll to the bottom to show the latest discovery
        setTimeout(() => {
            discoveryList.scrollTop = discoveryList.scrollHeight;
        }, 100);
        
        // Remove animation class after animation
        setTimeout(() => {
            discoveryItem.classList.remove('new-discovery');
        }, 2000);
    }

    // Auto-scroll discovery log to bottom
    scrollDiscoveryLogToBottom() {
        const discoveryList = document.getElementById('discovery-list');
        if (discoveryList) {
            setTimeout(() => {
                discoveryList.scrollTop = discoveryList.scrollHeight;
            }, 100);
        }
    }

    showDayTransition(day) {
        // Create day transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'day-transition';
        overlay.innerHTML = `
            <div class="day-content">
                <h2>Ημέρα ${day}</h2>
                <p>${this.getDayDescription(day)}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 1000);
        }, 3000);
    }

    getDayDescription(day) {
        const descriptions = {
            1: 'Καὶ ἐγένετο φῶς',
            2: 'Καὶ ἐγένετο στερέωμα',
            3: 'Συνηχθήτω τὰ ὕδατα',
            4: 'Γενηθήτωσαν φωστῆρες',
            5: 'Ἐξαγαγέτω τὰ ὕδατα ψυχὰς ζωσῶν',
            6: 'Ποιήσωμεν ἄνθρωπον',
            7: 'Καὶ κατέπαυσεν'
        };
        return descriptions[day] || '';
    }

    showBiblicalQuote(quote) {
        const quoteDisplay = document.getElementById('quote-display');
        const quoteText = document.getElementById('quote-text');
        const quoteReference = document.getElementById('quote-reference');
        
        quoteText.textContent = quote.greek;
        quoteReference.textContent = quote.reference;
        
        quoteDisplay.classList.remove('hidden');
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (!quoteDisplay.classList.contains('hidden')) {
                this.hideQuote();
            }
        }, 10000);
    }

    hideQuote() {
        document.getElementById('quote-display').classList.add('hidden');
    }

    toggleHelp() {
        const helpPanel = document.getElementById('help-panel');
        helpPanel.classList.toggle('hidden');
    }

    updateDisplay() {
        document.getElementById('element-count').textContent = this.discoveredElements.size;
        document.getElementById('combination-count').textContent = `${this.foundCombinations.size}/${ELEMENT_COMBINATIONS.length}`;
        document.getElementById('creation-day').textContent = this.currentDay;
        
        // Update progress bar
        const progressPercentage = (this.foundCombinations.size / ELEMENT_COMBINATIONS.length) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
        
        // Auto-scroll discovery log to show latest
        this.scrollDiscoveryLogToBottom();
    }

    checkGameCompletion() {
        // Check if all major elements from the creation story are discovered
        const majorElements = ['light', 'heaven', 'sea', 'tree', 'sun', 'moon', 'fish', 'bird', 'man', 'woman', 'sabbath'];
        const discoveredMajor = majorElements.filter(id => this.discoveredElements.has(id));
        
        if (discoveredMajor.length === majorElements.length && !this.gameComplete) {
            this.gameComplete = true;
            this.showGameCompletion();
        }
    }

    showGameCompletion() {
        const overlay = document.createElement('div');
        overlay.className = 'game-completion';
        overlay.innerHTML = `
            <div class="completion-content">
                <h2>☦ Συγχαρητήρια! ☦</h2>
                <p>Ολοκληρώσατε τη δημιουργία σύμφωνα με την Παλαιά Διαθήκη</p>
                <div class="completion-stats">
                    <p>Στοιχεία: ${this.discoveredElements.size}</p>
                    <p>Συνδυασμοί: ${this.foundCombinations.size}/${ELEMENT_COMBINATIONS.length}</p>
                    <p>Ημέρες: ${this.currentDay}</p>
                </div>
                <div class="final-quote">
                    <p>"Καὶ εἶδεν ὁ θεὸς τὰ πάντα, ὅσα ἐποίησεν, καὶ ἰδοὺ καλὰ λίαν."</p>
                    <small>Γένεσις 1:31</small>
                </div>
                <button onclick="location.reload()" class="restart-btn">Παίξτε Ξανά</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.playSound('completion');
    }

    playSound(type) {
        // Sound will be implemented in audio.js
        if (window.gameAudio) {
            window.gameAudio.play(type);
        }
    }

    // Save/Load/New Game Functions
    saveGame() {
        try {
            const gameState = {
                discoveredElements: Array.from(this.discoveredElements.entries()),
                currentDay: this.currentDay,
                combinations: this.combinations,
                foundCombinations: Array.from(this.foundCombinations),
                gameComplete: this.gameComplete,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('godCreatorSave', JSON.stringify(gameState));
            
            // Show success message
            this.showTemporaryMessage('Το παιχνίδι αποθηκεύτηκε! 💾', 'success');
            this.playSound('success');
        } catch (error) {
            console.error('Failed to save game:', error);
            this.showTemporaryMessage('Σφάλμα αποθήκευσης! ❌', 'error');
        }
    }

    loadGame() {
        try {
            const saveData = localStorage.getItem('godCreatorSave');
            if (!saveData) {
                this.showTemporaryMessage('Δεν βρέθηκε αποθηκευμένο παιχνίδι! 📂', 'warning');
                return;
            }

            const gameState = JSON.parse(saveData);
            
            // Restore game state
            this.discoveredElements = new Map(gameState.discoveredElements);
            this.currentDay = gameState.currentDay || 1;
            this.combinations = gameState.combinations || 0;
            this.foundCombinations = new Set(gameState.foundCombinations || []);
            this.gameComplete = gameState.gameComplete || false;
            
            // Clear current selections
            this.clearSlots();
            
            // Update display
            this.updateDisplay();
            this.renderElements();
            
            this.showTemporaryMessage('Το παιχνίδι φορτώθηκε! 📂', 'success');
            this.playSound('success');
            
        } catch (error) {
            console.error('Failed to load game:', error);
            this.showTemporaryMessage('Σφάλμα φόρτωσης! ❌', 'error');
        }
    }

    confirmNewGame() {
        if (confirm('Είστε σίγουροι ότι θέλετε να ξεκινήσετε νέο παιχνίδι; Όλη η πρόοδος θα χαθεί!')) {
            this.newGame();
        }
    }

    newGame() {
        try {
            // Clear saved data
            localStorage.removeItem('godCreatorSave');
            
            // Reset game state
            this.discoveredElements = new Map();
            this.currentDay = 1;
            this.combinations = 0;
            this.foundCombinations = new Set();
            this.gameComplete = false;
            this.selectedSlots = { slot1: null, slot2: null };
            
            // Clear discovery log except initial entry
            const discoveryList = document.getElementById('discovery-list');
            discoveryList.innerHTML = `
                <div class="discovery-item genesis">
                    <span class="verse">"Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν"</span>
                    <small class="reference">Γένεσις 1:1</small>
                </div>
            `;
            
            // Reinitialize game
            this.initializeGame();
            
            this.showTemporaryMessage('Νέο παιχνίδι ξεκίνησε! 🆕', 'success');
            this.playSound('success');
            
        } catch (error) {
            console.error('Failed to start new game:', error);
            this.showTemporaryMessage('Σφάλμα νέου παιχνιδιού! ❌', 'error');
        }
    }

    showTemporaryMessage(message, type = 'info') {
        // Create temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `temp-message temp-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--olive-green)' : type === 'error' ? 'var(--crimson)' : 'var(--deep-blue)'};
            color: var(--ivory);
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--orthodox-shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-family: var(--orthodox-font);
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    // Auto-save functionality
    autoSave() {
        if (this.discoveredElements.size > 4) { // Only auto-save if progress made
            try {
                const gameState = {
                    discoveredElements: Array.from(this.discoveredElements.entries()),
                    currentDay: this.currentDay,
                    combinations: this.combinations,
                    foundCombinations: Array.from(this.foundCombinations),
                    gameComplete: this.gameComplete,
                    timestamp: new Date().toISOString()
                };
                
                localStorage.setItem('godCreatorSave', JSON.stringify(gameState));
            } catch (error) {
                console.warn('Auto-save failed:', error);
            }
        }
    }

    tryAutoLoad() {
        try {
            const saveData = localStorage.getItem('godCreatorSave');
            if (saveData) {
                const gameState = JSON.parse(saveData);
                
                // Only auto-load if there's actual progress
                if (gameState.discoveredElements && gameState.discoveredElements.length > 4) {
                    // Restore game state silently
                    this.discoveredElements = new Map(gameState.discoveredElements);
                    this.currentDay = gameState.currentDay || 1;
                    this.combinations = gameState.combinations || 0;
                    this.foundCombinations = new Set(gameState.foundCombinations || []);
                    this.gameComplete = gameState.gameComplete || false;
                    
                    // Update display
                    this.updateDisplay();
                    this.renderElements();
                    
                    // Show subtle indication that game was restored
                    setTimeout(() => {
                        this.showTemporaryMessage('Συνέχιση από αποθηκευμένο παιχνίδι 📂', 'info');
                    }, 1000);
                }
            }
        } catch (error) {
            console.warn('Auto-load failed:', error);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GodCreatorGame();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.game.hideQuote();
            window.game.toggleHelp();
        }
        if (e.key === 'Enter' && !document.getElementById('combine-btn').disabled) {
            window.game.combineElements();
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
            window.game.clearSlots();
        }
    });
});