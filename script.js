const API_KEY = 'AIzaSyCSaVwvthRWkgKfbnr5t7AK8sDv7ia_jm8'; // Your YouTube API Key
const CHANNEL_ID = 'UCvMfE7iLpU4kFnQ1avkWzcg'; // Shamsul Haque Channel ID

const videoContainer = document.getElementById('videoContainer');

// Fetch videos from YouTube API
async function fetchVideos() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
    );
    const data = await response.json();

    // Check if the response has items and handle them
    if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
            if (item.id.kind === "youtube#video") {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;

                // Create video element
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}?enablejsapi=1" 
                        title="${videoTitle}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <h3>${videoTitle}</h3>
                `;
                videoContainer.appendChild(videoElement);
            }
        });
    } else {
        videoContainer.innerHTML = '<p>No videos found!</p>';
    }
}

// Call the fetchVideos function on load
fetchVideos();
