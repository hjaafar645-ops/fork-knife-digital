// ============================================================
//                    SMOOTH SCROLL
// ============================================================
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
//                  NAVBAR BACKGROUND ON SCROLL
// ============================================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.92)';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.zIndex = '999';
        header.style.transition = 'background-color 0.4s ease';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.position = 'absolute';
    }
});

// ============================================================
//                  HAMBURGER MENU (MOBILE)
// ============================================================
/*const nav = document.querySelector('.nav');
const burger = document.createElement('div');
burger.innerHTML = '<i class="fa fa-bars fa-2x"></i>';
burger.style.cssText = `
    display: none;
    cursor: pointer;
    color: rgb(235, 103, 8);
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1000;
`;
burger.classList.add('burger-menu');
document.querySelector('.header .container').appendChild(burger);

function checkBurger() {
    if (window.innerWidth <= 768) {
        burger.style.display = 'block';
    } else {
        burger.style.display = 'none';
        nav.style.display = '';
    }
}

checkBurger();
window.addEventListener('resize', checkBurger);

burger.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.alignItems = 'center';
        nav.style.backgroundColor = 'rgba(0,0,0,0.95)';
        nav.style.padding = '15px 0';
        nav.style.width = '100%';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.zIndex = '998';
    }
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
        }
    });
});*/


// ============================================================
//              COUNTER ANIMATION (SCROLL INTO VIEW)
// ============================================================
const counters = document.querySelectorAll('.meals-h3');
let counted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/\D/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const step = Math.ceil(target / 80);

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.innerText = current + suffix;
        }, 20);
    });
}

const mealsSection = document.querySelector('.meals');

window.addEventListener('scroll', () => {
    if (!counted) {
        const rect = mealsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            animateCounters();
            counted = true;
        }
    }
});


// ============================================================
//           SCROLL ANIMATION (ELEMENTS FADE IN)
// ============================================================
const animateElements = document.querySelectorAll(
    '.item-service, .selector-item, .selector-item2, .order-list, .meals-item, .trophies-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

function revealOnScroll() {
    animateElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ============================================================
//                   BACK TO TOP BUTTON
// ============================================================
const backTop = document.createElement('button');
backTop.innerHTML = '<i class="fa fa-chevron-up"></i>';
backTop.style.cssText = `
    position: fixed;
    bottom: 35px;
    right: 30px;
    width: 45px;
    height: 45px;
    background-color: rgb(235, 103, 8);
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease, transform 0.3s ease;
`;
document.body.appendChild(backTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backTop.style.display = 'block';
    } else {
        backTop.style.display = 'none';
    }
});

backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backTop.addEventListener('mouseenter', () => {
    backTop.style.transform = 'translateY(-4px)';
    backTop.style.backgroundColor = 'rgb(6, 6, 60)';
});

backTop.addEventListener('mouseleave', () => {
    backTop.style.transform = 'translateY(0)';
    backTop.style.backgroundColor = 'rgb(235, 103, 8)';
});


// ============================================================
//                CONTACT FORM VALIDATION
// ============================================================
const sendBtn = document.querySelector('.send button');
const nameInput = document.querySelector('.send-contact');
const emailInput = document.querySelector('.send-contact1');
const messageInput = document.querySelector('.area');
const successMsg = document.createElement('p');
successMsg.innerText = '✅ Your message has been sent successfully!';
successMsg.style.cssText = `
    color: green;
    font-weight: bold;
    margin-top: 10px;
    display: none;
    font-family: 'Lucida Sans', sans-serif;
`;
document.querySelector('.send').appendChild(successMsg);

const errorMsg = document.createElement('p');
errorMsg.innerText = '❌ Please fill in all fields correctly.';
errorMsg.style.cssText = `
    color: red;
    font-weight: bold;
    margin-top: 10px;
    display: none;
    font-family: 'Lucida Sans', sans-serif;
`;
document.querySelector('.send').appendChild(errorMsg);

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        nameInput.value.trim() === '' ||
        !emailRegex.test(emailInput.value.trim()) ||
        messageInput.value.trim() === ''
    ) {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
    } else {
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);
    }
});


// ============================================================
//               EMAIL SUBSCRIBE NOTIFICATION
// ============================================================
const emailBtn = document.querySelector('.email-message button');
const emailInput2 = document.querySelector('.your');
const toast = document.createElement('div');
toast.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    background-color: rgb(235, 103, 8);
    color: #fff;
    padding: 12px 22px;
    border-radius: 8px;
    font-family: 'Lucida Sans', sans-serif;
    font-size: 15px;
    display: none;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease;
`;
document.body.appendChild(toast);

emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput2.value.trim())) {
        toast.innerText = '❌ Please enter a valid email!';
        toast.style.backgroundColor = '#c0392b';
    } else {
        toast.innerText = '✅ You\'re subscribed! Thank you 🎉';
        toast.style.backgroundColor = 'rgb(235, 103, 8)';
        emailInput2.value = '';
    }

    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3500);
});
