# Interactive Photo Gallery Map

# interactive-photo-gallery-map

This repository contains a web application developed as a school project to demonstrate a dynamic photo gallery paired with an interactive map. The gallery reads image metadata from a local JSON file and presents square thumbnails that can be filtered in real time by title or description. Clicking any thumbnail launches a full-screen lightbox powered by Fancybox v4, offering zoom, slideshow, fullscreen mode, download, and thumbnail navigation. The map is built with Leaflet and OpenStreetMap tiles, placing markers at each photo’s GPS coordinates; selecting a marker brings up a location-specific gallery, and a “Route” toggle draws a chronological path between photos while calculating and displaying the total distance. The app is implemented using modern web standards (HTML5, CSS3, JavaScript ES6+) and Bootstrap for responsive layout and styling.


**Features & Implementation:**
 - **Photo Gallery**
   - Loads image metadata from `photos/photos.json`.
   - Real-time text filtering by title/description.
   - Square thumbnails (`object-fit: cover`).
   - Fancybox v4 lightbox with zoom, slideshow, fullscreen, download, thumbs.
 - **Interactive Map**
    - Built with Leaflet and OpenStreetMap tiles.
   - Clickable markers group photos by location.
   - In-map per-place gallery with Fancybox.
   - “Route” toggle draws a chronological polyline and displays total distance.

## Installation & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/ViktorBoc/interactive-photo-gallery-map.git
cd interactive-photo-gallery-map

# 2. Serve via a local HTTP server 
#    (otherwise fetch() will be blocked on file:// due to CORS)

# Option A: Python 3 built-in server
python3 -m http.server 8000

# Option B: Node.js http-server
npm install -g http-server
http-server . -p 8000

# 3. Open in your browser
http://localhost:8000/index.html
http://localhost:8000/mapa.html