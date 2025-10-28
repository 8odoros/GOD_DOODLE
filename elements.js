// Elements database based on the Septuagint and Orthodox Christian tradition
// Each element includes Greek names, biblical references, and combination rules

const INITIAL_ELEMENTS = [
    {
        id: 'air',
        name: 'Ἀήρ',
        englishName: 'Air',
        category: 'primordial',
        description: 'Το πνεῦμα τοῦ θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος',
        verse: 'Γένεσις 1:2',
        icon: '💨',
        discoveredDay: 1
    },
    {
        id: 'water',
        name: 'Ὕδωρ',
        englishName: 'Water',
        category: 'primordial',
        description: 'Καὶ τὸ πνεῦμα τοῦ θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος',
        verse: 'Γένεσις 1:2',
        icon: '💧',
        discoveredDay: 1
    },
    {
        id: 'earth',
        name: 'Γῆ',
        englishName: 'Earth',
        category: 'primordial',
        description: 'Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν',
        verse: 'Γένεσις 1:1',
        icon: '🌍',
        discoveredDay: 1
    },
    {
        id: 'fire',
        name: 'Πῦρ',
        englishName: 'Fire',
        category: 'primordial',
        description: 'Καὶ εἶπεν ὁ θεός· γενηθήτω φῶς. καὶ ἐγένετο φῶς',
        verse: 'Γένεσις 1:3',
        icon: '🔥',
        discoveredDay: 1
    }
];

const ELEMENT_COMBINATIONS = [
    // Day 1 - Light and Darkness
    {
        inputs: ['fire', 'air'],
        result: {
            id: 'light',
            name: 'Φῶς',
            englishName: 'Light',
            category: 'divine',
            description: 'Καὶ εἶπεν ὁ θεός· γενηθήτω φῶς. καὶ ἐγένετο φῶς',
            verse: 'Γένεσις 1:3',
            icon: '✨',
            discoveredDay: 1
        }
    },
    {
        inputs: ['light', 'air'],
        result: {
            id: 'darkness',
            name: 'Σκότος',
            englishName: 'Darkness',
            category: 'divine',
            description: 'Καὶ τὸ σκότος ἐπὶ προσώπου τῆς ἀβύσσου',
            verse: 'Γένεσις 1:2',
            icon: '🌑',
            discoveredDay: 1
        }
    },
    {
        inputs: ['light', 'darkness'],
        result: {
            id: 'day',
            name: 'Ἡμέρα',
            englishName: 'Day',
            category: 'time',
            description: 'Καὶ ἐκάλεσεν ὁ θεὸς τὸ φῶς ἡμέραν',
            verse: 'Γένεσις 1:5',
            icon: '☀️',
            discoveredDay: 1
        }
    },
    {
        inputs: ['darkness', 'light'],
        result: {
            id: 'night',
            name: 'Νύξ',
            englishName: 'Night',
            category: 'time',
            description: 'Καὶ τὸ σκότος ἐκάλεσεν νύκτα',
            verse: 'Γένεσις 1:5',
            icon: '🌙',
            discoveredDay: 1
        }
    },

    // Day 2 - Firmament/Sky
    {
        inputs: ['air', 'water'],
        result: {
            id: 'firmament',
            name: 'Στερέωμα',
            englishName: 'Firmament',
            category: 'cosmic',
            description: 'Καὶ εἶπεν ὁ θεός· γενηθήτω στερέωμα ἐν μέσῳ τοῦ ὕδατος',
            verse: 'Γένεσις 1:6',
            icon: '🌌',
            discoveredDay: 2
        }
    },
    {
        inputs: ['firmament', 'air'],
        result: {
            id: 'heaven',
            name: 'Οὐρανός',
            englishName: 'Heaven',
            category: 'cosmic',
            description: 'Καὶ ἐκάλεσεν ὁ θεὸς τὸ στερέωμα οὐρανόν',
            verse: 'Γένεσις 1:8',
            icon: '☁️',
            discoveredDay: 2
        }
    },

    // Day 3 - Dry Land and Plants
    {
        inputs: ['earth', 'water'],
        result: {
            id: 'sea',
            name: 'Θάλασσα',
            englishName: 'Sea',
            category: 'geographic',
            description: 'Καὶ τὰ συστήματα τῶν ὑδάτων ἐκάλεσεν θαλάσσας',
            verse: 'Γένεσις 1:10',
            icon: '🌊',
            discoveredDay: 3
        }
    },
    {
        inputs: ['earth', 'air'],
        result: {
            id: 'dry_land',
            name: 'Ξηρά',
            englishName: 'Dry Land',
            category: 'geographic',
            description: 'Καὶ ἐκάλεσεν ὁ θεὸς τὴν ξηρὰν γῆν',
            verse: 'Γένεσις 1:10',
            icon: '🏔️',
            discoveredDay: 3
        }
    },
    {
        inputs: ['dry_land', 'water'],
        result: {
            id: 'grass',
            name: 'Χόρτος',
            englishName: 'Grass',
            category: 'plant',
            description: 'Βλαστησάτω ἡ γῆ βοτάνην χόρτου',
            verse: 'Γένεσις 1:11',
            icon: '🌱',
            discoveredDay: 3
        }
    },
    {
        inputs: ['grass', 'earth'],
        result: {
            id: 'herb',
            name: 'Βοτάνη',
            englishName: 'Herb',
            category: 'plant',
            description: 'Σπεῖρον σπέρμα κατὰ γένος καὶ καθ᾽ ὁμοιότητα',
            verse: 'Γένεσις 1:11',
            icon: '🌿',
            discoveredDay: 3
        }
    },
    {
        inputs: ['herb', 'earth'],
        result: {
            id: 'tree',
            name: 'Δένδρον',
            englishName: 'Tree',
            category: 'plant',
            description: 'Καὶ ξύλον κάρπιμον ποιοῦν καρπόν',
            verse: 'Γένεσις 1:11',
            icon: '🌳',
            discoveredDay: 3
        }
    },
    {
        inputs: ['tree', 'light'],
        result: {
            id: 'fruit',
            name: 'Καρπός',
            englishName: 'Fruit',
            category: 'plant',
            description: 'Οὗ τὸ σπέρμα αὐτοῦ ἐν αὐτῷ κατὰ γένος ἐπὶ τῆς γῆς',
            verse: 'Γένεσις 1:11',
            icon: '🍎',
            discoveredDay: 3
        }
    },

    // Day 4 - Heavenly Bodies
    {
        inputs: ['light', 'heaven'],
        result: {
            id: 'sun',
            name: 'Ἥλιος',
            englishName: 'Sun',
            category: 'celestial',
            description: 'Τὸν φωστῆρα τὸν μέγαν εἰς ἀρχὰς τῆς ἡμέρας',
            verse: 'Γένεσις 1:16',
            icon: '☀️',
            discoveredDay: 4
        }
    },
    {
        inputs: ['darkness', 'heaven'],
        result: {
            id: 'moon',
            name: 'Σελήνη',
            englishName: 'Moon',
            category: 'celestial',
            description: 'Καὶ τὸν φωστῆρα τὸν ἐλάσσω εἰς ἀρχὰς τῆς νυκτός',
            verse: 'Γένεσις 1:16',
            icon: '🌙',
            discoveredDay: 4
        }
    },
    {
        inputs: ['light', 'darkness'],
        result: {
            id: 'stars',
            name: 'Ἀστέρες',
            englishName: 'Stars',
            category: 'celestial',
            description: 'Καὶ τοὺς ἀστέρας',
            verse: 'Γένεσις 1:16',
            icon: '⭐',
            discoveredDay: 4
        }
    },

    // Day 5 - Sea Creatures and Birds
    {
        inputs: ['water', 'life'],
        result: {
            id: 'fish',
            name: 'Ἰχθύς',
            englishName: 'Fish',
            category: 'animal',
            description: 'Ἐξαγαγέτω τὰ ὕδατα ἑρπετὰ ψυχῶν ζωσῶν',
            verse: 'Γένεσις 1:20',
            icon: '🐟',
            discoveredDay: 5
        }
    },
    {
        inputs: ['air', 'life'],
        result: {
            id: 'bird',
            name: 'Πετεινόν',
            englishName: 'Bird',
            category: 'animal',
            description: 'Καὶ πετεινὰ πετόμενα ἐπὶ τῆς γῆς κατὰ τὸ στερέωμα τοῦ οὐρανοῦ',
            verse: 'Γένεσις 1:20',
            icon: '🐦',
            discoveredDay: 5
        }
    },
    {
        inputs: ['sea', 'life'],
        result: {
            id: 'whale',
            name: 'Κῆτος',
            englishName: 'Great Sea Creature',
            category: 'animal',
            description: 'Καὶ ἐποίησεν ὁ θεὸς τὰ κήτη τὰ μεγάλα',
            verse: 'Γένεσις 1:21',
            icon: '🐋',
            discoveredDay: 5
        }
    },

    // Day 6 - Land Animals and Man
    {
        inputs: ['earth', 'life'],
        result: {
            id: 'beast',
            name: 'Θηρίον',
            englishName: 'Wild Beast',
            category: 'animal',
            description: 'Ἐξαγαγέτω ἡ γῆ ψυχὴν ζῶσαν κατὰ γένος',
            verse: 'Γένεσις 1:24',
            icon: '🦁',
            discoveredDay: 6
        }
    },
    {
        inputs: ['earth', 'grass'],
        result: {
            id: 'cattle',
            name: 'Κτῆνος',
            englishName: 'Cattle',
            category: 'animal',
            description: 'Τετράποδα καὶ ἑρπετὰ καὶ θηρία τῆς γῆς κατὰ γένος',
            verse: 'Γένεσις 1:24',
            icon: '🐄',
            discoveredDay: 6
        }
    },
    {
        inputs: ['earth', 'air'],
        result: {
            id: 'creeping_thing',
            name: 'Ἑρπετόν',
            englishName: 'Creeping Thing',
            category: 'animal',
            description: 'Καὶ ἑρπετὰ ἑρπόντων ἐπὶ τῆς γῆς',
            verse: 'Γένεσις 1:24',
            icon: '🐍',
            discoveredDay: 6
        }
    },

    // Special Combinations for Life and Soul
    {
        inputs: ['air', 'fire'],
        result: {
            id: 'breath',
            name: 'Πνοή',
            englishName: 'Breath',
            category: 'divine',
            description: 'Καὶ ἐνεφύσησεν εἰς τὸ πρόσωπον αὐτοῦ πνοὴν ζωῆς',
            verse: 'Γένεσις 2:7',
            icon: '💨',
            discoveredDay: 6
        }
    },
    {
        inputs: ['breath', 'earth'],
        result: {
            id: 'life',
            name: 'Ζωή',
            englishName: 'Life',
            category: 'divine',
            description: 'Καὶ ἐγένετο ὁ ἄνθρωπος εἰς ψυχὴν ζῶσαν',
            verse: 'Γένεσις 2:7',
            icon: '✨',
            discoveredDay: 6
        }
    },
    {
        inputs: ['earth', 'breath'],
        result: {
            id: 'man',
            name: 'Ἄνθρωπος',
            englishName: 'Man',
            category: 'human',
            description: 'Καὶ ἔπλασεν ὁ θεὸς τὸν ἄνθρωπον χοῦν ἀπὸ τῆς γῆς',
            verse: 'Γένεσις 2:7',
            icon: '👨',
            discoveredDay: 6
        }
    },
    {
        inputs: ['man', 'sleep'],
        result: {
            id: 'woman',
            name: 'Γυνή',
            englishName: 'Woman',
            category: 'human',
            description: 'Καὶ ἐπέβαλεν ὁ θεὸς ἔκστασιν ἐπὶ τὸν Αδαμ καὶ ὕπνωσεν',
            verse: 'Γένεσις 2:21',
            icon: '👩',
            discoveredDay: 6
        }
    },

    // Eden and Garden
    {
        inputs: ['earth', 'tree'],
        result: {
            id: 'garden',
            name: 'Παράδεισος',
            englishName: 'Paradise/Garden',
            category: 'place',
            description: 'Καὶ ἐφύτευσεν κύριος ὁ θεὸς παράδεισον ἐν Εδεμ',
            verse: 'Γένεσις 2:8',
            icon: '🌺',
            discoveredDay: 6
        }
    },
    {
        inputs: ['garden', 'tree'],
        result: {
            id: 'tree_of_life',
            name: 'Ξύλον Ζωῆς',
            englishName: 'Tree of Life',
            category: 'sacred',
            description: 'Καὶ τὸ ξύλον τῆς ζωῆς ἐν μέσῳ τοῦ παραδείσου',
            verse: 'Γένεσις 2:9',
            icon: '🌲',
            discoveredDay: 6
        }
    },
    {
        inputs: ['tree', 'knowledge'],
        result: {
            id: 'tree_of_knowledge',
            name: 'Ξύλον Γνώσεως',
            englishName: 'Tree of Knowledge',
            category: 'sacred',
            description: 'Καὶ τὸ ξύλον τοῦ εἰδέναι γνωστὸν καλοῦ καὶ πονηροῦ',
            verse: 'Γένεσις 2:9',
            icon: '🍃',
            discoveredDay: 6
        }
    },

    // Day 7 - Rest
    {
        inputs: ['day', 'night'],
        result: {
            id: 'sabbath',
            name: 'Σάββατον',
            englishName: 'Sabbath',
            category: 'sacred',
            description: 'Καὶ κατέπαυσεν τῇ ἡμέρᾳ τῇ ἑβδόμῃ',
            verse: 'Γένεσις 2:2',
            icon: '✝️',
            discoveredDay: 7
        }
    },

    // Additional elements for complexity
    {
        inputs: ['night', 'man'],
        result: {
            id: 'sleep',
            name: 'Ὕπνος',
            englishName: 'Sleep',
            category: 'human',
            description: 'Καὶ ἐπέβαλεν ὁ θεὸς ἔκστασιν ἐπὶ τὸν Αδαμ',
            verse: 'Γένεσις 2:21',
            icon: '😴',
            discoveredDay: 6
        }
    },
    {
        inputs: ['tree', 'man'],
        result: {
            id: 'knowledge',
            name: 'Γνῶσις',
            englishName: 'Knowledge',
            category: 'divine',
            description: 'Τὸ ξύλον τοῦ εἰδέναι γνωστὸν καλοῦ καὶ πονηροῦ',
            verse: 'Γένεσις 2:9',
            icon: '📚',
            discoveredDay: 6
        }
    },
    {
        inputs: ['light', 'voice'],
        result: {
            id: 'word',
            name: 'Λόγος',
            englishName: 'Word/Logos',
            category: 'divine',
            description: 'Καὶ εἶπεν ὁ θεός',
            verse: 'Γένεσις 1:3',
            icon: '📜',
            discoveredDay: 1
        }
    },
    {
        inputs: ['air', 'word'],
        result: {
            id: 'voice',
            name: 'Φωνή',
            englishName: 'Voice',
            category: 'divine',
            description: 'Καὶ ἤκουσαν τὴν φωνὴν κυρίου τοῦ θεοῦ',
            verse: 'Γένεσις 3:8',
            icon: '🗣️',
            discoveredDay: 1
        }
    },
    {
        inputs: ['water', 'earth'],
        result: {
            id: 'mud',
            name: 'Πηλός',
            englishName: 'Clay/Mud',
            category: 'material',
            description: 'Χοῦν ἀπὸ τῆς γῆς',
            verse: 'Γένεσις 2:7',
            icon: '🟤',
            discoveredDay: 2
        }
    },
    {
        inputs: ['fire', 'earth'],
        result: {
            id: 'stone',
            name: 'Λίθος',
            englishName: 'Stone',
            category: 'material',
            description: 'Καὶ ἦσαν αὐτοῖς αἱ πλίνθοι εἰς λίθον',
            verse: 'Γένεσις 11:3',
            icon: '🗿',
            discoveredDay: 3
        }
    },
    {
        inputs: ['air', 'earth'],
        result: {
            id: 'dust',
            name: 'Κονιορτός',
            englishName: 'Dust',
            category: 'material',
            description: 'Ὅτι γῆ εἶ καὶ εἰς γῆν ἀπελεύσῃ',
            verse: 'Γένεσις 3:19',
            icon: '🌪️',
            discoveredDay: 1
        }
    },
    {
        inputs: ['water', 'fire'],
        result: {
            id: 'cloud',
            name: 'Νεφέλη',
            englishName: 'Cloud',
            category: 'weather',
            description: 'Καὶ ἀτμὶς ἀνέβαινεν ἀπὸ τῆς γῆς',
            verse: 'Γένεσις 2:6',
            icon: '☁️',
            discoveredDay: 2
        }
    },
    {
        inputs: ['air', 'water'],
        result: {
            id: 'mist',
            name: 'Ἀτμίς',
            englishName: 'Mist',
            category: 'weather',
            description: 'Καὶ ἐπότιζεν πᾶν τὸ πρόσωπον τῆς γῆς',
            verse: 'Γένεσις 2:6',
            icon: '🌫️',
            discoveredDay: 2
        }
    },
    {
        inputs: ['light', 'water'],
        result: {
            id: 'rainbow',
            name: 'Τόξον',
            englishName: 'Rainbow',
            category: 'covenant',
            description: 'Τὸ τόξον μου τίθημι ἐν τῇ νεφέλῃ',
            verse: 'Γένεσις 9:13',
            icon: '🌈',
            discoveredDay: 4
        }
    },
    {
        inputs: ['man', 'woman'],
        result: {
            id: 'family',
            name: 'Οἰκογένεια',
            englishName: 'Family',
            category: 'human',
            description: 'Διὰ τοῦτο καταλείψει ἄνθρωπος τὸν πατέρα αὐτοῦ',
            verse: 'Γένεσις 2:24',
            icon: '👨‍👩‍👧‍👦',
            discoveredDay: 6
        }
    },
    {
        inputs: ['breath', 'voice'],
        result: {
            id: 'soul',
            name: 'Ψυχή',
            englishName: 'Soul',
            category: 'divine',
            description: 'Καὶ ἐγένετο ὁ ἄνθρωπος εἰς ψυχὴν ζῶσαν',
            verse: 'Γένεσις 2:7',
            icon: '✨',
            discoveredDay: 6
        }
    },
    {
        inputs: ['light', 'voice'],
        result: {
            id: 'logos',
            name: 'Λόγος',
            englishName: 'Word/Logos',
            category: 'divine',
            description: 'Καὶ εἶπεν ὁ θεός',
            verse: 'Γένεσις 1:3',
            icon: '📜',
            discoveredDay: 1
        }
    },
    {
        inputs: ['soul', 'breath'],
        result: {
            id: 'spirit',
            name: 'Πνεῦμα',
            englishName: 'Spirit',
            category: 'divine',
            description: 'Καὶ τὸ πνεῦμα τοῦ θεοῦ ἐπεφέρετο ἐπάνω τοῦ ὕδατος',
            verse: 'Γένεσις 1:2',
            icon: '🕊️',
            discoveredDay: 1
        }
    }
];

// Categories for organization
const ELEMENT_CATEGORIES = {
    'primordial': { name: 'Πρωτογενή', color: '#8B4513' },
    'divine': { name: 'Θεῖα', color: '#FFD700' },
    'cosmic': { name: 'Κοσμικά', color: '#4169E1' },
    'geographic': { name: 'Γεωγραφικά', color: '#228B22' },
    'plant': { name: 'Φυτά', color: '#32CD32' },
    'celestial': { name: 'Ουράνια', color: '#F0E68C' },
    'animal': { name: 'Ζῷα', color: '#CD853F' },
    'human': { name: 'Ἀνθρώπινα', color: '#DDA0DD' },
    'place': { name: 'Τόποι', color: '#98FB98' },
    'sacred': { name: 'Ἱερά', color: '#B22222' },
    'material': { name: 'Ὑλικά', color: '#696969' },
    'weather': { name: 'Καιρός', color: '#87CEEB' },
    'covenant': { name: 'Διαθήκη', color: '#9370DB' },
    'time': { name: 'Χρόνος', color: '#DAA520' }
};

// Biblical quotes for special discoveries
const BIBLICAL_QUOTES = {
    'light': {
        greek: 'Καὶ εἶπεν ὁ θεός· γενηθήτω φῶς. καὶ ἐγένετο φῶς. καὶ εἶδεν ὁ θεὸς τὸ φῶς ὅτι καλόν.',
        reference: 'Γένεσις 1:3-4'
    },
    'man': {
        greek: 'Καὶ ἔπλασεν ὁ θεὸς τὸν ἄνθρωπον χοῦν ἀπὸ τῆς γῆς καὶ ἐνεφύσησεν εἰς τὸ πρόσωπον αὐτοῦ πνοὴν ζωῆς, καὶ ἐγένετο ὁ ἄνθρωπος εἰς ψυχὴν ζῶσαν.',
        reference: 'Γένεσις 2:7'
    },
    'woman': {
        greek: 'Καὶ εἶπεν Αδαμ· τοῦτο νῦν ὀστοῦν ἐκ τῶν ὀστέων μου καὶ σὰρξ ἐκ τῆς σαρκός μου· αὕτη κληθήσεται γυνή, ὅτι ἐκ τοῦ ἀνδρὸς αὐτῆς ἐλήμφθη αὕτη.',
        reference: 'Γένεσις 2:23'
    },
    'sabbath': {
        greek: 'Καὶ συνετέλεσεν ὁ θεὸς ἐν τῇ ἡμέρᾳ τῇ ἕκτῃ τὰ ἔργα αὐτοῦ, ἃ ἐποίησεν· καὶ κατέπαυσεν τῇ ἡμέρᾳ τῇ ἑβδόμῃ ἀπὸ πάντων τῶν ἔργων αὐτοῦ, ὧν ἐποίησεν.',
        reference: 'Γένεσις 2:2'
    },
    'garden': {
        greek: 'Καὶ ἐφύτευσεν κύριος ὁ θεὸς παράδεισον ἐν Εδεμ κατὰ ἀνατολὰς καὶ ἔθετο ἐκεῖ τὸν ἄνθρωπον, ὃν ἔπλασεν.',
        reference: 'Γένεσις 2:8'
    }
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        INITIAL_ELEMENTS,
        ELEMENT_COMBINATIONS,
        ELEMENT_CATEGORIES,
        BIBLICAL_QUOTES
    };
}