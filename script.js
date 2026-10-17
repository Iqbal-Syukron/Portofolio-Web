/**
 * Professional Web Portfolio Interactions
 * Candidate Name: M. Iqbal Syukron Firdausi
 * Target Role: Cybersecurity Analyst / Information Security Professional
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Terminal Typing Effect
    initTerminalSimulator();
    // 2. Mobile Navigation Toggle
    initMobileNav();
    // 3. Active Link Scroll Spy
    initScrollSpy();
    // 4. Secure Form Validation & Sanitization
    initSecureContactForm();
});
/**
 * Terminal Typing Simulation
 */
function initTerminalSimulator() {
    const terminal = document.getElementById('terminal-body');
    if (!terminal) return;
    // Command configurations: commands to type, output to show, delays
    const script = [
        { type: 'command', text: 'whoami' },
        { type: 'output', text: 'M. Iqbal Syukron Firdausi' },
        { type: 'output', text: 'Target Role: Cybersecurity Analyst / Information Security Professional' },
        
        { type: 'command', text: 'cat credentials.txt' },
        { type: 'output', text: 'Education: Universitas Nahdlatul Ulama Sidoarjo' },
        { type: 'output', text: 'Major: Computer Science / Informatics Undergraduate' },
        
        { type: 'command', text: 'cat specialization.txt' },
        { type: 'output', text: 'Specializations: Network Security, Threat Mitigation, Ethical Hacking' },
        { type: 'output', text: 'Organizational Track: OSIS Financial Audit & Event Coordinator' },
        
        { type: 'command', text: 'status --verify' },
        { type: 'output', text: '[OK] Ready for incident response, database tuning, and Python development.' }
    ];
    let scriptIndex = 0;
    
    // Clear terminal and prepare
    terminal.innerHTML = '';
    
    function runNextStep() {
        if (scriptIndex >= script.length) {
            // End of script, show final prompt with blinking cursor
            const finalPromptLine = document.createElement('p');
            finalPromptLine.className = 'term-line';
            finalPromptLine.innerHTML = `<span class="term-prompt">guest@iqbal-sec:~$</span> <span class="cursor"></span>`;
            terminal.appendChild(finalPromptLine);
            terminal.scrollTop = terminal.scrollHeight;
            return;
        }
        const step = script[scriptIndex++];
        
        if (step.type === 'command') {
            typeCommand(step.text, runNextStep);
        } else if (step.type === 'output') {
            printOutput(step.text, runNextStep);
        }
    }
    function typeCommand(text, callback) {
        const line = document.createElement('p');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-prompt">guest@iqbal-sec:~$</span> <span class="typing-area"></span><span class="cursor"></span>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        const typingArea = line.querySelector('.typing-area');
        const cursor = line.querySelector('.cursor');
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                typingArea.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 60 + Math.random() * 40); // Natural random typing speed
            } else {
                // Done typing command, remove typing cursor from this line
                cursor.remove();
                setTimeout(callback, 500); // Wait after typing completes
            }
            terminal.scrollTop = terminal.scrollHeight;
        }
        
        setTimeout(typeChar, 200);
    }
    function printOutput(text, callback) {
        const line = document.createElement('p');
        line.className = 'term-output font-mono';
        line.textContent = text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        
        setTimeout(callback, 250); // Pause between output lines
    }
    // Start simulation
    setTimeout(runNextStep, 800);
}
/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('open');
    });
    // Close menu when clicking on any link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
        });
    });
}
/**
 * Active Navigation Scroll Spy
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for header height
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
/**
 * Secure Contact Form (Validation & Sanitization)
 */
function initSecureContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const statusDiv = document.getElementById('form-status');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous validation errors
        resetFormErrors();
        
        // Read values and sanitize (anti-XSS measures)
        const nameVal = sanitizeInput(nameInput.value.trim());
        const emailVal = sanitizeInput(emailInput.value.trim());
        const messageVal = sanitizeInput(messageInput.value.trim());
        let isValid = true;
        // Name Validation
        if (!nameVal) {
            showError(nameInput, 'name-error', 'Name payload field is required.');
            isValid = false;
        } else if (nameVal.length < 2) {
            showError(nameInput, 'name-error', 'Name must be at least 2 characters.');
            isValid = false;
        }
        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailVal) {
            showError(emailInput, 'email-error', 'Email routing destination is required.');
            isValid = false;
        } else if (!emailPattern.test(emailVal)) {
            showError(emailInput, 'email-error', 'Invalid security email routing format.');
            isValid = false;
        }
        // Message Validation
        if (!messageVal) {
            showError(messageInput, 'message-error', 'Message payload content cannot be empty.');
            isValid = false;
        } else if (messageVal.length < 10) {
            showError(messageInput, 'message-error', 'Message content must be at least 10 characters.');
            isValid = false;
        }
        if (isValid) {
            simulateSecureSubmission(nameVal);
        }
    });
    function sanitizeInput(str) {
        if (!str) return '';
        // Escape HTML tags to prevent basic XSS injections
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    function showError(inputElement, errorId, message) {
        const errorSpan = document.getElementById(errorId);
        inputElement.parentElement.classList.add('invalid');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
    function resetFormErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('invalid'));
        
        const errorMsgs = document.querySelectorAll('.error-msg');
        errorMsgs.forEach(msg => msg.textContent = '');
        statusDiv.style.display = 'none';
        statusDiv.className = 'form-status font-mono';
        statusDiv.textContent = '';
    }
    function simulateSecureSubmission(senderName) {
        // Disable submit button during "transmission"
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1.2s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            Encrypting Payload...
        `;
        
        statusDiv.textContent = 'STATUS: INITIATING SECURE E2EE TRANSMISSION...';
        statusDiv.classList.add('success');
        statusDiv.style.display = 'block';
        // Add custom keyframe spin dynamically if not in CSS
        if (!document.getElementById('spin-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spin-keyframes';
            style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }
        setTimeout(() => {
            statusDiv.innerHTML = `[OK] SECURE ENVELOPE RECEIVED.<br>&gt; SENDER: ${senderName}<br>&gt; HASH: SHA-256[${Math.random().toString(16).substr(2, 8).toUpperCase()}]<br>&gt; MESSAGE: Transmitted successfully.`;
            
            // Clear inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 1800);
    }
}
