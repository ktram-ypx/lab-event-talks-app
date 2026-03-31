const talksData = [
    {
        title: "The Existential Toolkit: Finding Purpose in a Meaningless Universe",
        speakers: ["Dr. Anya Sharma"],
        category: ["Philosophy", "Existentialism"],
        duration: 60,
        description: "Explore philosophical approaches to constructing personal meaning in an apparently indifferent cosmos. This talk will delve into frameworks from Kierkegaard to Camus, offering practical perspectives for modern life."
    },
    {
        title: "Neuroscience of Happiness: Beyond Dopamine and Serotonin",
        speakers: ["Prof. Ben Carter", "Dr. Chloe Davies"],
        category: ["Neuroscience", "Psychology"],
        duration: 60,
        description: "Unravel the complex neural pathways and chemical interactions that contribute to enduring well-being. We'll discuss cutting-edge research on how brain activity shapes our sense of purpose and contentment."
    },
    {
        title: "Ancient Wisdom, Modern Meaning: Lessons from Stoicism and Buddhism",
        speakers: ["Elara Vance"],
        category: ["Spirituality", "Philosophy", "Mindfulness"],
        duration: 60,
        description: "Discover how ancient traditions like Stoicism and Buddhism offer timeless insights into living a more meaningful life. Learn practices for resilience, inner peace, and ethical living that are relevant today."
    },
    {
        title: "AI & Consciousness: Can Machines Find Meaning?",
        speakers: ["Dr. Finn O'Connell"],
        category: ["Artificial Intelligence", "Ethics"],
        duration: 60,
        description: "As AI advances, the line between computation and consciousness blurs. This talk examines the provocative question of whether artificial intelligence could ever develop a sense of self or purpose, and what that might mean for humanity."
    },
    {
        title: "The Art of Storytelling: Crafting Your Life's Narrative",
        speakers: ["Gwen Holloway"],
        category: ["Creativity", "Personal Development"],
        duration: 60,
        description: "Our lives are narratives we tell ourselves. Learn how to consciously shape your personal story, identify key themes, and empower yourself through the art of narrative to live a more fulfilling and purposeful existence."
    },
    {
        title: "Cosmic Perspective: Humanity's Place in the Grand Scheme",
        speakers: ["Dr. Isaac Chen"],
        category: ["Astronomy", "Philosophy", "Science"],
        duration: 60,
        description: "From the vastness of the universe to the intricacies of subatomic particles, this talk offers a scientific and philosophical journey into humanity's unique position. Explore how understanding our cosmic context can profoundly impact our search for meaning."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('categorySearch');

    let currentSchedule = [];

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function generateSchedule(filter = '') {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        let talkIndex = 0;
        const filteredTalks = talksData.filter(talk =>
            talk.category.some(cat => cat.toLowerCase().includes(filter.toLowerCase()))
        );

        if (filter && filteredTalks.length === 0) {
            scheduleContainer.innerHTML = '<p class="no-results">No talks found for this category.</p>';
            return;
        }

        for (let i = 0; i < 6; i++) {
            // Add talk if available and matches filter
            if (talkIndex < filteredTalks.length) {
                const talk = filteredTalks[talkIndex];
                const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

                const talkElement = document.createElement('div');
                talkElement.classList.add('schedule-item');
                talkElement.innerHTML = `
                    <div class="time-slot">${formatTime(currentTime)} - ${formatTime(talkEndTime)}</div>
                    <div class="talk-details">
                        <h3 class="talk-title">${talk.title}</h3>
                        <p class="talk-speakers">${talk.speakers.join(' & ')}</p>
                        <p class="talk-categories">
                            ${talk.category.map(cat => `<span class="talk-category">${cat}</span>`).join('')}
                        </p>
                        <p class="talk-description">${talk.description}</p>
                    </div>
                `;
                scheduleContainer.appendChild(talkElement);
                currentTime = new Date(talkEndTime.getTime()); // Update current time after talk

                talkIndex++;
            }

            // Add lunch break after 3rd talk
            if (i === 2) {
                const lunchStartTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 min transition
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60 * 1000); // 1 hour lunch

                const lunchElement = document.createElement('div');
                lunchElement.classList.add('schedule-item', 'break');
                lunchElement.innerHTML = `
                    <div class="time-slot">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
                    <div class="talk-details">
                        <h3 class="talk-title">Lunch Break</h3>
                        <p class="talk-description">Enjoy a delicious lunch!</p>
                    </div>
                `;
                scheduleContainer.appendChild(lunchElement);
                currentTime = new Date(lunchEndTime.getTime()); // Update current time after lunch
            }

            // Add transition time, but not after the very last item or before lunch break
            if (i < 5 && !(i === 2)) {
                currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 min transition
            }
        }
    }

    categorySearchInput.addEventListener('input', (event) => {
        generateSchedule(event.target.value);
    });

    // Initial schedule generation
    generateSchedule();
});
