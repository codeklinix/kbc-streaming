// Global variables
let currentRadioStation = null;
let currentTVChannel = null;
let currentPodcastEpisode = null;

// DOM elements
const radioPlayer = document.getElementById('radio-player');
const tvPlayer = document.getElementById('tv-player');
const podcastPlayer = document.getElementById('podcast-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeSlider = document.getElementById('volume-slider');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAudioControls();
    loadRadioStations();
    loadTVChannels();
    loadPodcasts();
    loadNews();
    
    // Load home page content
    loadHomeContent();
    
    // Show home section by default
    showSection('home');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Initialize audio controls
function initializeAudioControls() {
    // Play/Pause button
    playPauseBtn.addEventListener('click', function() {
        if (currentRadioStation && radioPlayer.src) {
            if (radioPlayer.paused) {
                radioPlayer.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                radioPlayer.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    });
    
    // Stop button
    stopBtn.addEventListener('click', function() {
        if (radioPlayer.src) {
            radioPlayer.pause();
            radioPlayer.currentTime = 0;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Volume control
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        if (radioPlayer) radioPlayer.volume = volume;
        if (tvPlayer) tvPlayer.volume = volume;
        if (podcastPlayer) podcastPlayer.volume = volume;
    });
    
    // Set initial volume
    const initialVolume = volumeSlider.value / 100;
    if (radioPlayer) radioPlayer.volume = initialVolume;
    if (tvPlayer) tvPlayer.volume = initialVolume;
    if (podcastPlayer) podcastPlayer.volume = initialVolume;
}

// Load radio stations from backend
async function loadRadioStations() {
    try {
        const response = await fetch('backend/api/radio.php');
        const stations = await response.json();
        
        const stationsContainer = document.getElementById('radio-stations');
        stationsContainer.innerHTML = '';
        
        stations.forEach(station => {
            const stationCard = createRadioStationCard(station);
            stationsContainer.appendChild(stationCard);
        });
        
        // Load today's schedule
        loadRadioSchedule();
        
    } catch (error) {
        console.error('Error loading radio stations:', error);
        document.getElementById('radio-stations').innerHTML = '<div class="loading">Error loading radio stations</div>';
    }
}

// Create radio station card
function createRadioStationCard(station) {
    const card = document.createElement('div');
    card.className = 'station-card';
    card.innerHTML = `
        <div class="card-header">
            <div class="card-logo">
                <i class="fas fa-radio"></i>
            </div>
            <div class="card-info">
                <h3>${station.name}</h3>
                <p>${station.category}</p>
            </div>
        </div>
        <div class="card-content">
            <p>${station.description}</p>
            <span class="card-category">${station.category}</span>
        </div>
    `;
    
    card.addEventListener('click', () => selectRadioStation(station, card));
    return card;
}

// Select radio station
function selectRadioStation(station, cardElement) {
    // Remove active class from all cards
    document.querySelectorAll('.station-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    cardElement.classList.add('active');
    
    // Update current station info
    currentRadioStation = station;
    document.getElementById('current-station-name').textContent = station.name;
    document.getElementById('current-station-desc').textContent = station.description;
    
    // Set up audio player
    radioPlayer.src = station.stream_url;
    radioPlayer.style.display = 'block';
    
    // Enable controls
    playPauseBtn.disabled = false;
    stopBtn.disabled = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Load radio schedule
async function loadRadioSchedule() {
    try {
        const response = await fetch('backend/api/schedule.php');
        const schedules = await response.json();
        
        const scheduleContainer = document.getElementById('radio-schedule');
        scheduleContainer.innerHTML = '';
        
        schedules.forEach(schedule => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <div class="schedule-time">${schedule.start_time} - ${schedule.end_time}</div>
                <div class="schedule-show">${schedule.show_name}</div>
                <div class="schedule-host">Host: ${schedule.host_name || 'N/A'}</div>
            `;
            scheduleContainer.appendChild(scheduleItem);
        });
        
    } catch (error) {
        console.error('Error loading schedule:', error);
        document.getElementById('radio-schedule').innerHTML = '<div class="loading">Error loading schedule</div>';
    }
}

// Load TV channels
async function loadTVChannels() {
    try {
        const response = await fetch('backend/api/tv.php');
        const channels = await response.json();
        
        const channelsContainer = document.getElementById('tv-channels');
        channelsContainer.innerHTML = '';
        
        channels.forEach(channel => {
            const channelCard = createTVChannelCard(channel);
            channelsContainer.appendChild(channelCard);
        });
        
    } catch (error) {
        console.error('Error loading TV channels:', error);
        document.getElementById('tv-channels').innerHTML = '<div class="loading">Error loading TV channels</div>';
    }
}

// Create TV channel card
function createTVChannelCard(channel) {
    const card = document.createElement('div');
    card.className = 'channel-card';
    card.innerHTML = `
        <div class="card-header">
            <div class="card-logo">
                <i class="fas fa-tv"></i>
            </div>
            <div class="card-info">
                <h3>${channel.channel_name}</h3>
                <p>${channel.category}</p>
            </div>
        </div>
        <div class="card-content">
            <p>${channel.description}</p>
            <span class="card-category">${channel.category}</span>
            ${channel.is_live ? '<span class="card-category" style="background-color: #ff6b6b; margin-left: 0.5rem;">LIVE</span>' : ''}
        </div>
    `;
    
    card.addEventListener('click', () => selectTVChannel(channel, card));
    return card;
}

// Select TV channel
function selectTVChannel(channel, cardElement) {
    // Remove active class from all cards
    document.querySelectorAll('.channel-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    cardElement.classList.add('active');
    
    // Update current channel
    currentTVChannel = channel;
    
    // Set up video player
    tvPlayer.src = channel.stream_url;
    tvPlayer.style.display = 'block';
    
    // Hide placeholder
    const placeholder = document.querySelector('.tv-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
}

// Load podcasts
async function loadPodcasts() {
    try {
        const response = await fetch('backend/api/podcasts.php');
        const podcasts = await response.json();
        
        const podcastsContainer = document.getElementById('podcasts-list');
        podcastsContainer.innerHTML = '';
        
        podcasts.forEach(podcast => {
            const podcastCard = createPodcastCard(podcast);
            podcastsContainer.appendChild(podcastCard);
        });
        
    } catch (error) {
        console.error('Error loading podcasts:', error);
        document.getElementById('podcasts-list').innerHTML = '<div class="loading">Error loading podcasts</div>';
    }
}

// Create podcast card
function createPodcastCard(podcast) {
    const card = document.createElement('div');
    card.className = 'podcast-card';
    card.innerHTML = `
        <div class="card-header">
            <div class="card-logo">
                <i class="fas fa-podcast"></i>
            </div>
            <div class="card-info">
                <h3>${podcast.title}</h3>
                <p>Host: ${podcast.host_name || 'Unknown'}</p>
            </div>
        </div>
        <div class="card-content">
            <p>${podcast.description}</p>
            <span class="card-category">${podcast.category}</span>
        </div>
    `;
    
    card.addEventListener('click', () => loadPodcastEpisodes(podcast));
    return card;
}

// Load podcast episodes
async function loadPodcastEpisodes(podcast) {
    try {
        const response = await fetch(`backend/api/episodes.php?podcast_id=${podcast.id}`);
        const episodes = await response.json();
        
        if (episodes.length > 0) {
            // Play the latest episode
            const latestEpisode = episodes[0];
            selectPodcastEpisode(latestEpisode, podcast);
        }
        
    } catch (error) {
        console.error('Error loading podcast episodes:', error);
    }
}

// Select podcast episode
function selectPodcastEpisode(episode, podcast) {
    currentPodcastEpisode = episode;
    
    // Update episode info
    document.getElementById('current-episode-title').textContent = episode.title;
    document.getElementById('current-podcast-name').textContent = podcast.title;
    
    // Set up audio player
    podcastPlayer.src = episode.audio_url;
    podcastPlayer.style.display = 'block';
}

// Load news articles
async function loadNews() {
    try {
        const response = await fetch('backend/api/news.php');
        const articles = await response.json();
        
        const newsContainer = document.getElementById('news-articles');
        newsContainer.innerHTML = '';
        
        articles.forEach(article => {
            const newsCard = createNewsCard(article);
            newsContainer.appendChild(newsCard);
        });
        
    } catch (error) {
        console.error('Error loading news:', error);
        document.getElementById('news-articles').innerHTML = '<div class="loading">Error loading news</div>';
    }
}

// Create news card
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    const publishedDate = new Date(article.published_at || article.created_at);
    const formattedDate = publishedDate.toLocaleDateString();
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-logo">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="card-info">
                <h3>${article.title}</h3>
                <p>By ${article.author || 'Staff Writer'}</p>
            </div>
        </div>
        <div class="card-content">
            <p>${article.summary || article.content.substring(0, 150) + '...'}</p>
            <div class="news-meta">
                <span class="card-category">${article.category}</span>
                <span class="news-date">${formattedDate}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Mobile menu toggle (for future mobile responsiveness)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Load home page content
async function loadHomeContent() {
    console.log('🔄 Loading home page content...');
    
    try {
        // Load radio stations for home page (limit to 6)
        console.log('📻 Loading radio stations...');
        const radioResponse = await fetch('backend/api/radio.php');
        console.log('Radio response status:', radioResponse.status);
        
        if (!radioResponse.ok) {
            throw new Error(`Radio API error: ${radioResponse.status}`);
        }
        
        const radioStations = await radioResponse.json();
        console.log('Radio stations loaded:', radioStations.length);
        
        if (radioStations && radioStations.length > 0) {
            loadHomeRadioStations(radioStations.slice(0, 6));
        } else {
            document.getElementById('home-radio-stations').innerHTML = '<div class="loading">No radio stations found. Please run setup_stations.php first.</div>';
        }
        
        // Load TV channels for home page
        console.log('📺 Loading TV channels...');
        const tvResponse = await fetch('backend/api/tv.php');
        if (tvResponse.ok) {
            const tvChannels = await tvResponse.json();
            console.log('TV channels loaded:', tvChannels.length);
            if (tvChannels && tvChannels.length > 0) {
                loadHomeTVChannels(tvChannels.slice(0, 6));
            } else {
                document.getElementById('home-tv-channels').innerHTML = '<div class="loading">No TV channels found.</div>';
            }
        }
        
        // Load podcasts for home page
        console.log('🎧 Loading podcasts...');
        const podcastsResponse = await fetch('backend/api/podcasts.php');
        if (podcastsResponse.ok) {
            const podcasts = await podcastsResponse.json();
            console.log('Podcasts loaded:', podcasts.length);
            if (podcasts && podcasts.length > 0) {
                loadHomePodcasts(podcasts.slice(0, 6));
            } else {
                document.getElementById('home-podcasts').innerHTML = '<div class="loading">No podcasts found.</div>';
            }
        }
        
        // Load news for home page
        console.log('📰 Loading news...');
        const newsResponse = await fetch('backend/api/news.php');
        if (newsResponse.ok) {
            const newsArticles = await newsResponse.json();
            console.log('News articles loaded:', newsArticles.length);
            if (newsArticles && newsArticles.length > 0) {
                loadHomeNews(newsArticles.slice(0, 6));
            } else {
                document.getElementById('home-news').innerHTML = '<div class="loading">No news articles found.</div>';
            }
        }
        
        console.log('✅ Home content loading complete!');
        
    } catch (error) {
        console.error('❌ Error loading home content:', error);
        // Show error message to user
        const errorMsg = '<div class="loading" style="color: red;">Error loading content. Please check console or run setup_stations.php</div>';
        document.getElementById('home-radio-stations').innerHTML = errorMsg;
        document.getElementById('home-tv-channels').innerHTML = errorMsg;
        document.getElementById('home-podcasts').innerHTML = errorMsg;
        document.getElementById('home-news').innerHTML = errorMsg;
    }
}

// Load radio stations for home page
function loadHomeRadioStations(stations) {
    const container = document.getElementById('home-radio-stations');
    container.innerHTML = '';
    
    stations.forEach(station => {
        const card = createHomeCard(station, 'radio', station.name, station.category, station.description);
        card.addEventListener('click', () => {
            showSection('radio');
            // Small delay to allow section to load
            setTimeout(() => {
                const stationCard = Array.from(document.querySelectorAll('.station-card')).find(card => 
                    card.querySelector('h3').textContent === station.name
                );
                if (stationCard) {
                    selectRadioStation(station, stationCard);
                }
            }, 100);
        });
        container.appendChild(card);
    });
}

// Load TV channels for home page
function loadHomeTVChannels(channels) {
    const container = document.getElementById('home-tv-channels');
    container.innerHTML = '';
    
    channels.forEach(channel => {
        const card = createHomeCard(channel, 'tv', channel.channel_name, channel.category, channel.description);
        card.addEventListener('click', () => {
            showSection('tv');
            setTimeout(() => {
                const channelCard = Array.from(document.querySelectorAll('.channel-card')).find(card => 
                    card.querySelector('h3').textContent === channel.channel_name
                );
                if (channelCard) {
                    selectTVChannel(channel, channelCard);
                }
            }, 100);
        });
        container.appendChild(card);
    });
}

// Load podcasts for home page
function loadHomePodcasts(podcasts) {
    const container = document.getElementById('home-podcasts');
    container.innerHTML = '';
    
    podcasts.forEach(podcast => {
        const card = createHomeCard(podcast, 'podcast', podcast.title, podcast.category, podcast.description);
        card.addEventListener('click', () => {
            showSection('podcasts');
            setTimeout(() => {
                loadPodcastEpisodes(podcast);
            }, 100);
        });
        container.appendChild(card);
    });
}

// Load news for home page
function loadHomeNews(articles) {
    const container = document.getElementById('home-news');
    container.innerHTML = '';
    
    articles.forEach(article => {
        const card = createHomeCard(article, 'newspaper', article.title, article.category, article.summary || article.content.substring(0, 100) + '...');
        card.addEventListener('click', () => {
            showSection('news');
        });
        container.appendChild(card);
    });
}

// Create home card (smaller version)
function createHomeCard(item, iconType, title, category, description) {
    const card = document.createElement('div');
    card.className = 'home-card';
    
    const iconClass = iconType === 'tv' ? 'fas fa-tv' : 
                     iconType === 'podcast' ? 'fas fa-podcast' :
                     iconType === 'newspaper' ? 'fas fa-newspaper' : 'fas fa-radio';
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-logo">
                <i class="${iconClass}"></i>
            </div>
            <div class="card-info">
                <h3>${title}</h3>
                <p>${category}</p>
            </div>
        </div>
        <div class="card-content">
            <p>${description}</p>
            <span class="card-category">${category}</span>
        </div>
    `;
    
    return card;
}

// Error handling for media elements
if (radioPlayer) {
    radioPlayer.addEventListener('error', function() {
        console.error('Error loading radio stream');
        alert('Error loading radio stream. Please try another station.');
    });
}

if (tvPlayer) {
    tvPlayer.addEventListener('error', function() {
        console.error('Error loading TV stream');
        alert('Error loading TV stream. Please try another channel.');
    });
}

if (podcastPlayer) {
    podcastPlayer.addEventListener('error', function() {
        console.error('Error loading podcast episode');
        alert('Error loading podcast episode. Please try another episode.');
    });
}
