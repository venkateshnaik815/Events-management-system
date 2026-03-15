// events.js - CRUD Operations and Search logic

function showAlert(message, type = 'success') {
    const placeholder = document.getElementById('alertPlaceholder');
    if (!placeholder) return;
    
    const alertBody = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    placeholder.innerHTML = alertBody;
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(placeholder.querySelector('.alert'));
        if (alert) alert.close();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAdminEvents();

    const searchBtn = document.getElementById('searchBtn');
    const searchCategory = document.getElementById('searchCategory');
    const specificEvent = document.getElementById('specificEvent');

    // Add Event
    if (addEventForm) {
        addEventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newEvent = {
                id: document.getElementById('eventId').value,
                name: document.getElementById('eventName').value,
                category: document.getElementById('eventCategory').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value,
                url: document.getElementById('eventUrl').value
            };

            const events = JSON.parse(localStorage.getItem('events')) || [];
            
            if (events.find(ev => ev.id === newEvent.id)) {
                showAlert('An event with this ID already exists!', 'danger');
                return;
            }

            events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));
            
            showAlert('Event added successfully!');
            addEventForm.reset();
            renderAdminEvents();
        });
    }

    // Search Events
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const category = searchCategory.value;
            const term = specificEvent.value.toLowerCase();
            renderAdminEvents(term, category);
        });
    }
});

function renderAdminEvents(filter = '', categoryFilter = '') {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const container = document.getElementById('adminEventList');
    if (!container) return;

    container.innerHTML = '';

    const filteredEvents = events.filter(ev => {
        const matchesTerm = ev.name.toLowerCase().includes(filter) || ev.id.toLowerCase().includes(filter);
        const matchesCategory = categoryFilter === '' || ev.category === categoryFilter;
        return matchesTerm && matchesCategory;
    });

    if (filteredEvents.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted py-5">No events found matching your search.</div>';
        return;
    }

    filteredEvents.forEach(event => {
        const item = `
            <div class="col-md-4">
                <div class="card p-3 h-100">
                    <h5 class="fw-bold mb-2">${event.name}</h5>
                    <div class="small">
                        <p class="mb-1"><strong>ID:</strong> ${event.id}</p>
                        <p class="mb-1"><strong>Category:</strong> ${event.category}</p>
                        <p class="mb-1"><strong>Date:</strong> ${event.date}</p>
                        <p class="mb-3"><strong>Time:</strong> ${event.time}</p>
                    </div>
                    <div class="mt-auto">
                        <button onclick="window.open('${event.url}', '_blank')" class="btn btn-primary w-100 mb-2">Join Event</button>
                        <button onclick="deleteEvent('${event.id}')" class="btn btn-danger w-100">Delete</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += item;
    });
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(ev => ev.id !== id);
        localStorage.setItem('events', JSON.stringify(events));
        renderAdminEvents();
        alert('Event deleted successfully.');
    }
}
