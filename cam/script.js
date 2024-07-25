(async function() {
    const video = document.getElementById('video');
    const cameraSelect = document.getElementById('cameraSelect');

    async function getCameras() {
        try {
            // Request permission to access the camera
            await navigator.mediaDevices.getUserMedia({ video: true });

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log('Detected video devices:', videoDevices); // Log detected devices for debugging

            // Clear the current camera options
            cameraSelect.innerHTML = '';

            if (videoDevices.length === 0) {
                cameraSelect.innerHTML = '<option>No cameras found</option>';
                return [];
            }

            videoDevices.forEach((device, index) => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.text = device.label || `Camera ${index + 1}`;
                cameraSelect.appendChild(option);
            });

            return videoDevices;
        } catch (err) {
            console.error('Error enumerating devices:', err);
            alert('Could not access the camera devices.');
            return [];
        }
    }

    async function startStream(deviceId) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: deviceId ? { exact: deviceId } : undefined
                }
            });
            video.srcObject = stream;
        } catch (err) {
            console.error('Error accessing the camera:', err);
            alert('Could not access the camera. Please check permissions and try again.');
        }
    }

    cameraSelect.addEventListener('change', async () => {
        if (video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        await startStream(cameraSelect.value);
    });

    // Load and start with the default camera
    const videoDevices = await getCameras();
    if (videoDevices.length > 0) {
        await startStream(videoDevices[0].deviceId);
    }
})();