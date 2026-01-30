const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateMessage = (data) => {
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
        return { valid: false, error: "Name is required" };
    }

    if (!data.email || typeof data.email !== "string" || !data.email.trim()) {
        return { valid: false, error: "Email is required" };
    }

    if (!validateEmail(data.email)) {
        return { valid: false, error: "Invalid email format" };
    }

    if (
        !data.message ||
        typeof data.message !== "string" ||
        !data.message.trim()
    ) {
        return { valid: false, error: "Message is required" };
    }

    if (data.name.length > 255 || data.email.length > 255) {
        return { valid: false, error: "Input too long" };
    }

    return { valid: true };
};

module.exports = {
    validateMessage,
    validateEmail,
};
