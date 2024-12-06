import '../styles/modal.css';

export const createModal = (title, inputPlaceholder, callback, defaultValue = '') => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal'; // Use CSS class for styling

    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    modal.appendChild(titleElement);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = inputPlaceholder || defaultValue;
    input.value = defaultValue; // Set the default value in the input
    
    const buttonContainer = document.createElement('div'); // Container for buttons

    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.className = 'modalButton okButton'; // Apply OK button styles
    okButton.onclick = () => {
        const value = input.value.trim() || defaultValue; // Use default if input is empty
        document.body.removeChild(modal);
        callback(value);
    };

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.className = 'modalButton cancelButton'; // Apply Cancel button styles
    cancelButton.onclick = () => {
        document.body.removeChild(modal); // Just close the modal
    };

    // Append buttons to the container
    buttonContainer.appendChild(okButton);
    buttonContainer.appendChild(cancelButton);
    modal.appendChild(input);
    modal.appendChild(buttonContainer);
    document.body.appendChild(modal);
};

// Function to show a modal for saving circuit data
export const showSaveCircuitModal = (callback) => {
    createModal('Save Circuit', 'Enter a filename for your circuit', callback);
};

// Function to show a modal for saving circuit data
export const showSaveImageCircuitModal = (defaultValue, callback) => {
    createModal('Save Circuit as Image', '', callback, defaultValue);
};

export const showSaveOnlineModal = (callback) => {
    createModal('Save file online', 'Enter a filename for your circuit', callback);
};
