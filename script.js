// Pun Intended - JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const jokeText = document.getElementById('joke-text');
    const punchline = document.getElementById('punchline');
    const newJokeBtn = document.getElementById('new-joke-btn');
    
    // API endpoints for jokes
    const APIs = [
        {
            name: 'JokeAPI',
            url: 'https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit',
            parse: (data) => {
                if (data.type === 'single') {
                    return { setup: data.joke, delivery: '"Pun Intended!"' };
                } else {
                    return { setup: data.setup, delivery: data.delivery + ' "Pun Intended!"' };
                }
            }
        },
        {
            name: 'icanhazdadjoke',
            url: 'https://icanhazdadjoke.com/',
            headers: { Accept: 'application/json' },
            parse: (data) => {
                return { setup: data.joke, delivery: '"Pun Intended!"' };
            }
        },
        {
            name: 'Official Joke API',
            url: 'https://official-joke-api.appspot.com/jokes/random',
            parse: (data) => {
                return { setup: data.setup, delivery: data.punchline + ' "Pun Intended!"' };
            }
        }
    ];
    
    // Get a random API from the list
    const getRandomAPI = () => {
        const randomIndex = Math.floor(Math.random() * APIs.length);
        return APIs[randomIndex];
    };
    
    // Fetch a joke from a random API
    const fetchJoke = async () => {
        jokeText.textContent = 'Loading a punny joke for you...';
        punchline.textContent = '';
        
        try {
            const api = getRandomAPI();
            const response = await fetch(api.url, { headers: api.headers || {} });
            
            if (!response.ok) {
                throw new Error(`API responded with ${response.status}`);
            }
            
            const data = await response.json();
            const joke = api.parse(data);
            
            // Display the joke with a slight delay for the punchline
            jokeText.textContent = joke.setup;
            
            setTimeout(() => {
                punchline.textContent = joke.delivery;
                punchline.style.animation = 'fadeIn 0.8s ease';
            }, 1500);
            
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeText.textContent = 'Oops! The joke machine is out of puns right now.';
            punchline.textContent = 'Please try again later. "No Pun Intended" (just kidding!)';
        }
    };
    
    // Event listeners
    newJokeBtn.addEventListener('click', () => {
        // Reset animation
        punchline.style.animation = 'none';
        setTimeout(() => {
            punchline.style.animation = '';
        }, 10);
        
        fetchJoke();
    });
    
    // Fetch a joke when the page loads
    fetchJoke();
});