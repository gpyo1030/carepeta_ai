document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    const careForm = document.getElementById('care-form');
    const userInput = document.getElementById('user-input');
    const aiAdvice = document.getElementById('ai-advice');
    const loadingSpinner = document.getElementById('loading-spinner');

    let selectedCompanion = 'Cat'; // Default selection

    const petData = [
        { name: 'Cat', image: 'https://placekitten.com/200/150' },
        { name: 'Dog', image: 'https://placedog.net/200/150' },
        { name: 'Rabbit', image: 'https://place-rabbit.com/200/150' },
    ];

    const plantData = [
        { name: 'Succulent', image: 'https://images.unsplash.com/photo-1593971485387-133a8a5b4b1f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200' },
        { name: 'Fern', image: 'https://images.unsplash.com/photo-1601326284993-4174b8a1c9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200' },
        { name: 'Orchid', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200' },
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
                selectedCompanion = item.name;
                userInput.value = '';
                aiAdvice.innerHTML = '';
                document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
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

    careForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userQuery = userInput.value;

        if (!userQuery) {
            aiAdvice.innerHTML = '<p>Please describe your pet or plant.</p>';
            return;
        }

        loadingSpinner.style.display = 'block';
        aiAdvice.innerHTML = '';

        try {
            const fullPrompt = `Provide care advice for a ${selectedCompanion}. The user says: "${userQuery}". Provide a detailed, helpful response.`;

            const serverResponse = await fetch('http://localhost:3000/api/get-advice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: fullPrompt }),
            });

            if (!serverResponse.ok) {
                throw new Error(`Server error: ${serverResponse.statusText}`);
            }

            const data = await serverResponse.json();
            aiAdvice.innerHTML = `<p>${data.advice}</p>`;

        } catch (error) {
            console.error(error);
            aiAdvice.innerHTML = '<p>Sorry, I could not get advice at this time. Please try again later.</p>';
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });

    renderCards('pets', petData);
    renderCards('plants', plantData);
});