document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    const adviceContent = document.getElementById('advice-content');

    const petData = [
        { name: 'Cat', image: 'https://placekitten.com/200/150', advice: 'Cats need a balanced diet, regular play, and a clean litter box.' },
        { name: 'Dog', image: 'https://placedog.net/200/150', advice: 'Dogs require daily walks, training, and social interaction.' },
        { name: 'Rabbit', image: 'https://place-rabbit.com/200/150', advice: 'Rabbits need a diet of hay, fresh vegetables, and a spacious hutch.' },
        
    ];

    const plantData = [
        { name: 'Succulent', image: 'https://images.unsplash.com/photo-1593971485387-133a8a5b4b1f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200', advice: 'Succulents thrive in bright, indirect light and need infrequent watering.' },
        { name: 'Fern', image: 'https://images.unsplash.com/photo-1601326284993-4174b8a1c9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200', advice: 'Ferns prefer humid environments and consistently moist soil.' },
        { name: 'Orchid', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200', advice: 'Orchids need specialized care, including specific potting mix and careful watering.' },
    ];

    function renderCards(containerId, data) {
        const container = document.querySelector(`#${containerId} .card-container`);
        container.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
            `;
            card.addEventListener('click', () => {
                adviceContent.innerHTML = `<p>${item.advice}</p>`;
            });
            container.appendChild(card);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    renderCards('pets', petData);
    renderCards('plants', plantData);
});