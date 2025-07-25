# StreamHub - Radio, TV, Podcasts & News Platform

A comprehensive streaming website built with HTML, CSS, JavaScript, and PHP that provides radio streaming, TV channels, podcasts, and news articles.

## Features

- **Radio Streaming**: Live radio stations with real-time playback controls
- **Radio Schedule**: View daily schedules for each radio station
- **Live TV**: Stream live television channels
- **Podcasts**: Browse and listen to podcast episodes
- **News Section**: Read the latest news articles
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL/MariaDB
- **Server**: Apache (XAMPP)
- **Styling**: Custom CSS with Font Awesome icons

## Setup Instructions

### Prerequisites

1. **XAMPP** installed on your system
   - Download from: https://www.apachefriends.org/
   - Includes Apache, MySQL, and PHP

### Installation Steps

1. **Start XAMPP Services**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

2. **Access the Project**
   - The project is already in: `C:\xampp\htdocs\streaming`
   - Open your browser and go to: `http://localhost/streaming`

3. **Database Setup**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Import the database schema:
     - Go to "Import" tab
     - Choose file: `database/schema.sql`
     - Click "Go" to create the database and tables
   
   - Import sample data (optional):
     - Choose file: `database/sample_data.sql`
     - Click "Go" to populate with sample content

4. **Configuration**
   - Database settings are in: `backend/config.php`
   - Default MySQL credentials:
     - Host: localhost
     - Username: root
     - Password: (empty)
     - Database: streaming_website

## Project Structure

```
streaming/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/             # Image assets
├── backend/
│   ├── config.php          # Database configuration
│   └── api/
│       ├── radio.php       # Radio stations API
│       ├── schedule.php    # Radio schedule API
│       ├── tv.php          # TV channels API
│       ├── podcasts.php    # Podcasts API
│       ├── episodes.php    # Podcast episodes API
│       └── news.php        # News articles API
├── database/
│   ├── schema.sql          # Database structure
│   └── sample_data.sql     # Sample content
└── README.md               # This file
```

## API Endpoints

- `GET /backend/api/radio.php` - Get all active radio stations
- `GET /backend/api/schedule.php` - Get today's radio schedule
- `GET /backend/api/tv.php` - Get all active TV channels
- `GET /backend/api/podcasts.php` - Get all active podcasts
- `GET /backend/api/episodes.php?podcast_id=X` - Get episodes for a podcast
- `GET /backend/api/news.php` - Get published news articles

## Usage

### Radio Section
1. Click on "Radio" in the navigation
2. Select a radio station from the grid
3. Use the play/pause and volume controls
4. View today's schedule below the stations

### TV Section
1. Click on "Live TV" in the navigation
2. Select a channel to start watching
3. Video will appear in the player above

### Podcasts Section
1. Click on "Podcasts" in the navigation
2. Click on a podcast to load its latest episode
3. The episode will start playing in the audio player

### News Section
1. Click on "News" in the navigation
2. Browse through the latest articles
3. Articles are sorted by publication date

## Customization

### Adding Content

1. **Radio Stations**: Add to `radio_stations` table
2. **TV Channels**: Add to `tv_streams` table
3. **Podcasts**: Add to `podcasts` and `podcast_episodes` tables
4. **News**: Add to `news_articles` table

### Styling

- Modify `assets/css/style.css` for design changes
- Color scheme uses CSS variables for easy theming
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Functionality

- Extend `assets/js/main.js` for additional features
- API endpoints can be modified in `backend/api/` directory

## Streaming Integration

### Radio Streams
- Supports HTTP/HTTPS audio streams
- Compatible with Icecast, Shoutcast, and direct MP3 streams
- Uses HTML5 `<audio>` element for playback

### TV Streams
- Supports HTTP/HTTPS video streams
- Compatible with HLS, MP4, and other HTML5 video formats
- Uses HTML5 `<video>` element for playback

### Podcast Audio
- Supports MP3, OGG, and other HTML5 audio formats
- Direct URL linking to audio files

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if MySQL is running in XAMPP
   - Verify credentials in `backend/config.php`

2. **Streaming Not Working**
   - Ensure stream URLs are valid and accessible
   - Check browser console for CORS errors
   - Some streams may require HTTPS

3. **API Errors**
   - Check Apache error logs in XAMPP
   - Verify PHP error reporting is enabled
   - Check database table existence

### Browser Requirements

- Modern browsers with HTML5 support
- JavaScript enabled
- Audio/Video codec support for streaming

## Security Considerations

- This is a development/demo setup
- For production use:
  - Change default database credentials
  - Implement user authentication
  - Add input validation and sanitization
  - Use HTTPS for all streaming content
  - Implement rate limiting for APIs

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check XAMPP error logs
4. Verify database connectivity

## Future Enhancements

- User registration and favorites
- Search functionality
- Playlist creation
- Social features (comments, ratings)
- Admin panel for content management
- Mobile app development
- Advanced analytics and reporting
