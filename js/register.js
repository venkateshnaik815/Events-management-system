// register.js - Event Details rendering and registration logic

document.addEventListener('DOMContentLoaded', () => {
    const eventDetailsContainer = document.getElementById('eventDetails');
    const registrationForm = document.getElementById('registrationForm');

    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (eventId) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const event = events.find(ev => ev.id === eventId);

        if (event) {
            eventDetailsContainer.innerHTML = `
                <div class="small">
                    <p class="mb-1"><strong>ID:</strong> ${event.id}</p>
                    <p class="mb-1"><strong>Name:</strong> ${event.name}</p>
                    <p class="mb-1"><strong>Category:</strong> ${event.category}</p>
                    <p class="mb-1"><strong>Date:</strong> ${event.date}</p>
                    <p class="mb-1"><strong>Time:</strong> ${event.time}</p>
                </div>
            `;
        } else {
            eventDetailsContainer.innerHTML = '<p class="text-danger">Event not found.</p>';
        }
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const registration = {
                eventId: eventId,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('registerEmail').value,
                date: new Date().toISOString()
            };

            const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
            registrations.push(registration);
            localStorage.setItem('registrations', JSON.stringify(registrations));

            alert('Successfully registered for the event!');
            window.location.href = 'index.html';
        });
    }
});
