export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already in use. Please use a different email.';
        case 'auth/invalid-email':
            return 'The email address is not valid. Please enter a valid email.';
        case 'auth/weak-password':
            return 'The password is too weak. Please choose a stronger password.';
        case 'auth/operation-not-allowed':
            return 'This operation is not allowed. Please contact support.';
        case 'auth/user-not-found':
            return 'No user found with this email. Please sign up.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/popup-closed-by-user':
            return 'The sign-in popup was closed before completing the sign-in. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'The sign-in process was cancelled. Please try again.';
        case 'auth/user-disabled':
            return 'This user has been disabled. Please contact support.';
        case 'auth/timeout':
            return 'The operation timed out. Please try again.';
        default:
            return 'An unexpected error occurred. Please try again.'; // Fallback for other errors
    }
};