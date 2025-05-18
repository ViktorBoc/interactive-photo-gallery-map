document.addEventListener('DOMContentLoaded', () => {
    let photosData = [];
    let routeLine;

    fetch('photos/photos.json')
        .then(res => res.json())
        .then(data => {
            photosData = data.photos;
            initMap();
        });

    function initMap() {
        const map = L.map('map').setView([49.5, 19.0], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        const groups = {};
        photosData.forEach(p => {
            groups[p.marker] = groups[p.marker] || [];
            groups[p.marker].push(p);
        });

        Object.entries(groups).forEach(([markerId, group]) => {
            const lat = parseFloat(group[0].GPSx);
            const lng = parseFloat(group[0].GPSy);
            L.marker([lat, lng]).addTo(map)
                .on('click', () => showGallery(group, markerId));
        });

        document.getElementById('toggle-route')
            .addEventListener('click', () => {
                if (routeLine) {
                    map.removeLayer(routeLine);
                    routeLine = null;
                    document.getElementById('route-length').textContent = '';
                } else {
                    const sorted = photosData.slice().sort((a,b) =>
                        parseDate(a.datumACas) - parseDate(b.datumACas)
                    );
                    const coords = sorted.map(p => [
                        parseFloat(p.GPSx),
                        parseFloat(p.GPSy)
                    ]);
                    routeLine = L.polyline(coords, { color: 'blue' }).addTo(map);
                    map.fitBounds(routeLine.getBounds());

                    let dist = 0;
                    for (let i = 1; i < coords.length; i++) {
                        dist += map.distance(coords[i-1], coords[i]);
                    }
                    document.getElementById('route-length').textContent =
                        `Dĺžka trasy: ${(dist/1000).toFixed(2)} km`;
                }
            });
    }

    function showGallery(group, markerId) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        document.getElementById('selected-gallery-title')
            .textContent = `Fotografie pre miesto ${markerId}`;

        group.forEach(photo => {
            const col = document.createElement('div');
            col.className = 'col-sm-6 col-md-4 col-lg-3';

            const a = document.createElement('a');
            a.href = photo.zdroj;
            a.setAttribute('data-fancybox', `map-gallery-${markerId}`);
            a.setAttribute(
                'data-caption',
                `${photo.meno} — ${photo.opis} (${photo.datumACas})`
            );

            const img = document.createElement('img');
            img.src = photo.zdroj;
            img.alt = photo.meno;
            img.className = 'img-fluid mb-2';

            a.appendChild(img);
            col.appendChild(a);
            gallery.appendChild(col);
        });

        Fancybox.bind(`[data-fancybox="map-gallery-${markerId}"]`, {
            infinite: true,
            Toolbar: {
                display: ['counter','prev','next','zoom','fullscreen','download','close']
            },
            Image: { zoom: true }
        });
    }

    function parseDate(s) {
        const [d,m,y] = s.split(' ')[0].split('.');
        const [hh,mm] = s.split(' ')[1].split(':');
        return new Date(+y, +m-1, +d, +hh, +mm);
    }
});
