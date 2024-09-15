document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate on Scroll)
    AOS.init();

    // Load data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateContent(data);
        })
        .catch(error => console.error('Error loading data:', error));

    // Populate content from JSON
    function populateContent(data) {
        document.querySelector('#home h1').textContent = data.homeTitle;
        document.querySelector('#coordinates').innerHTML = data.coordinates.join('<br>');

        populateProjects(data.projects);
        populateOutreach(data.outreach);
        populateFindMe(data.findMe);
    }

    // Populate projects
    function populateProjects(projects) {
        const projectsContainer = document.querySelector('#projects');
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.style.backgroundImage = `url('${project.image}')`;

            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            const titleElement = document.createElement('h3');
            titleElement.textContent = project.title;
            overlayElement.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = project.description;
            overlayElement.appendChild(descriptionElement);

            projectElement.appendChild(overlayElement);
            projectsContainer.appendChild(projectElement);
        });
    }

    // Populate outreach section
    function populateOutreach(outreach) {
        const outreachContainer = document.querySelector('.outreach-container');
        outreach.forEach(section => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('outreach-column');

            const titleElement = document.createElement('h3');
            titleElement.textContent = section.title;
            columnElement.appendChild(titleElement);

            const listElement = document.createElement('ul');

            // Show only the first 4 items initially
            section.items.slice(0, 4).forEach(item => {
                const listItemElement = document.createElement('li');
                const linkElement = document.createElement('a');
                linkElement.href = item.link;
                linkElement.textContent = item.text;
                listItemElement.appendChild(linkElement);
                listElement.appendChild(listItemElement);
            });

            // Add a "More here" button if there are more than 4 items
            if (section.items.length > 4) {
                const moreButton = document.createElement('span');
                moreButton.textContent = 'more';
                moreButton.classList.add('more-button');
                moreButton.addEventListener('click', function () {
                    moreButton.style.display = 'none';
                    section.items.slice(4).forEach(item => {
                        const listItemElement = document.createElement('li');
                        const linkElement = document.createElement('a');
                        linkElement.href = item.link;
                        linkElement.textContent = item.text;
                        listItemElement.appendChild(linkElement);
                        listElement.appendChild(listItemElement);
                    });
                });
                columnElement.appendChild(moreButton);
            }

            columnElement.appendChild(listElement);
            outreachContainer.appendChild(columnElement);
        });
    }

    // Populate Find Me section
    function populateFindMe(findMe) {
        const findMeContainer = document.querySelector('.find-me-container');

        findMe.forEach(section => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('find-me-column');

            const titleElement = document.createElement('h3');
            titleElement.textContent = section.title;
            columnElement.appendChild(titleElement);

            const listElement = document.createElement('ul');
            section.items.forEach(item => {
                const listItemElement = document.createElement('li');
                if (item.link) {
                    const linkElement = document.createElement('a');
                    linkElement.href = item.link;
                    linkElement.textContent = item.text;
                    listItemElement.appendChild(linkElement);
                } else {
                    listItemElement.textContent = item.text;
                }
                listElement.appendChild(listItemElement);
            });

            columnElement.appendChild(listElement);
            findMeContainer.appendChild(columnElement);
        });
    }

    // Highlight the active section in the navigation bar
    window.addEventListener('scroll', function () {
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('nav ul li a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Particles.js configuration
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#888888"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#888888",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Fade out the profile image when scrolling
    window.addEventListener('scroll', function () {
        const aboutSection = document.getElementById('about');
        const profileImage = document.querySelector('.about-image');
        const scrollPosition = window.scrollY;

        const fadeStart = aboutSection.offsetTop + aboutSection.offsetHeight - window.innerHeight;
        const fadeEnd = aboutSection.offsetTop + aboutSection.offsetHeight;

        if (scrollPosition >= fadeStart && scrollPosition <= fadeEnd) {
            profileImage.style.opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        } else if (scrollPosition > fadeEnd) {
            profileImage.style.opacity = 0;
        } else {
            profileImage.style.opacity = 1;
        }
    });

    // Coordinates opacity change based on scroll
    window.addEventListener('scroll', function () {
        const coordinates = document.getElementById('coordinates');
        const aboutSection = document.getElementById('about');
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;

        if (aboutSectionTop < window.innerHeight) {
            coordinates.classList.add('hidden');
        } else {
            coordinates.classList.remove('hidden');
        }
    });

    document.getElementById('menu-icon').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the event from bubbling up to the document
        this.classList.toggle('active'); // Toggle the active class for the menu icon
        const navList = document.querySelector('nav ul');
        navList.classList.toggle('mobile-menu-active'); // Toggle the mobile menu
    });
    
    
// Close the menu when clicking outside of it
document.addEventListener('click', function (event) {
    const navList = document.querySelector('nav ul');
    const menuIcon = document.getElementById('menu-icon');

    if (navList.classList.contains('mobile-menu-active') && !menuIcon.contains(event.target) && !navList.contains(event.target)) {
        navList.classList.remove('mobile-menu-active'); // Hide the menu
        menuIcon.classList.remove('active'); // Reset the menu icon to its original state
    }
});

    
    
});
