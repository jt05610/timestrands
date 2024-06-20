(function () {
    const modal = document.createElement('div');

    modal.style.cssText = 'position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;';
    modal.innerHTML = `<div style="background:white;padding:20px;border-radius:5px;text-align:center;"><h2>Ready to play Strands?</h2><p>Click start to begin timing your game.</p><button id="start-game-btn">Start Game</button></div>`;
    document.body.appendChild(modal);

    let startTime;
    let timerInterval;

// Add a small floating timer that follows scroll
    const floatingTimer = document.createElement('div');
    floatingTimer.style.cssText = `position: fixed;top: 10px;right: 10px;background: rgba(0, 0, 0, 0.7);color: white;padding: 5px 10px;border-radius: 5px;font-size: 16px;z-index: 10000;display: none;`;
    document.body.appendChild(floatingTimer);

    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = Math.floor(elapsedTime % 60);
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const progress = getGameProgress();
        floatingTimer.textContent = `${timeString} | Progress: ${progress}`;
    }

    function getGameProgress() {
        const hintElement = document.getElementById('hint');
        if (hintElement) {
            const progressText = hintElement.querySelector('p').textContent;
            const match = progressText.match(/(\d+)\s+of\s+(\d+)/);
            if (match) {
                return match[0]; // Return the full "X of Y" string
            }
        }
        return 'N/A';
    }

    function checkGameCompletion() {
        const progress = getGameProgress();
        const [current, total] = progress.split(' of ').map(Number);
        return current === total;
    }

// Start timer when button is clicked
    document.getElementById('start-game-btn').addEventListener('click', function () {
        // Close the modal
        modal.style.display = 'none';

        startTime = Date.now();

        // Show the floating timer
        floatingTimer.style.display = 'block';

        // Update timer every 100ms for smoother display
        timerInterval = setInterval(updateTimer, 100);

        // Check for game end every second
        const gameEndInterval = setInterval(() => {
            if (checkGameCompletion()) {
                clearInterval(gameEndInterval);
                clearInterval(timerInterval);
                const endTime = Date.now();
                const duration = (endTime - startTime) / 1000; // duration in seconds
                alert(`Game finished! Time: ${duration.toFixed(2)} seconds`);

                // Hide the floating timer
                floatingTimer.style.display = 'none';

                // Optionally send data to your server
                // sendData({startTime, endTime, duration});
            }
        }, 1000);
    });
})();

// add the above function as a script element to the document as a single line that will work as a bookmarklet
let script = document.createElement('script');script.innerText = ``