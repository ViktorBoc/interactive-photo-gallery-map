document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const search  = document.getElementById('search');
    const items   = [];


    fetch('photos/photos.json')
        .then(res => res.json())
        .then(data => {
            data.photos.forEach(photo => {

                const col = document.createElement('div');
                col.className = 'col-sm-6 col-md-4 col-lg-3';

                col.dataset.caption = (photo.meno + ' ' + photo.opis).toLowerCase();


                const a = document.createElement('a');
                a.href = photo.zdroj;
                a.setAttribute('data-fancybox', 'gallery');
                // tu pridávame späť aj dátum a čas do titulku
                a.setAttribute(
                    'data-caption',
                    `${photo.meno} — ${photo.opis} (${photo.datumACas})`
                );


                const wrap = document.createElement('div');
                wrap.className = 'imgwrapper';
                const img  = document.createElement('img');
                img.src   = photo.zdroj;
                img.alt   = photo.meno;
                wrap.appendChild(img);

                a.appendChild(wrap);
                col.appendChild(a);
                gallery.appendChild(col);
                items.push(col);
            });

            Fancybox.bind('[data-fancybox="gallery"]', {
                infinite: true,
                Toolbar: {
                    display: [
                        'counter',
                        'prev',
                        'next',
                        'zoom',
                        'slideshow',
                        'fullscreen',
                        'download',
                        'thumbs',
                        'close'
                    ]
                },
                Image: {
                    zoom: true,
                    initialSize: "cover"
                }
            });
        })
        .catch(err => {
            console.error('Chyba pri načítaní JSON:', err);
        });

    // Real-time filter
    search.addEventListener('input', e => {
        const term = e.target.value.trim().toLowerCase();
        items.forEach(col => {
            col.style.display = col.dataset.caption.includes(term) ? '' : 'none';
        });
    });
});
