// Existing code remains unchanged, add this at the end of the file

// Snowfall Effect
function createSnowflakes() {
  const snowfall = document.createElement("div");
  snowfall.className = "snowfall";
  document.body.appendChild(snowfall);

  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowfall.appendChild(snowflake);
  }
}

window.addEventListener("load", createSnowflakes);

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body

themeToggle.addEventListener("click", () => {
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark"
  localStorage.setItem("theme", body.dataset.theme)
  themeToggle.querySelector("i").classList.toggle("fa-moon")
  themeToggle.querySelector("i").classList.toggle("fa-sun")
  themeToggle.querySelector("span").textContent = body.dataset.theme === "dark" ? "Light Mode" : "Dark Mode"
})

// Load saved theme
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  body.dataset.theme = savedTheme
  themeToggle.querySelector("i").classList.toggle("fa-moon", savedTheme === "dark")
  themeToggle.querySelector("i").classList.toggle("fa-sun", savedTheme === "light")
  themeToggle.querySelector("span").textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode"
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 80) {
    navbar.style.background = "rgba(31, 26, 68, 0.98)"
    navbar.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)"
  } else {
    navbar.style.background = "rgba(31, 26, 68, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Music Player Functionality (Simplified for single song)
const playBtn = document.querySelector(".play-btn")
const audio = document.querySelector("#music")
const progressFill = document.querySelector(".progress-fill")
const songTitle = document.querySelector(".song-title")
const artist = document.querySelector(".artist")
const volumeSlider = document.querySelector(".volume-slider")
let isPlaying = false

const song = {
  title: "Loving You",
  artist: "prazkhanal",
  src: "https://cdn.pixabay.com/audio/2022/03/24/audio_9a1c6c6b5c.mp3"
}

function loadSong() {
  audio.src = song.src
  songTitle.textContent = song.title
  artist.textContent = song.artist
}

loadSong()

playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying
  playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'
  if (isPlaying) {
    audio.play()
  } else {
    audio.pause()
  }
})

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value
})

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100
  progressFill.style.width = progress + "%"
  updateTime()
})

function updateTime() {
  const currentTime = Math.floor(audio.currentTime)
  const duration = Math.floor(audio.duration) || 165
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60
  document.querySelector(".time-info span:first-child").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`
  document.querySelector(".time-info span:last-child").textContent =
    `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el))

// Typing Effect for Hero Title
const heroTitle = document.querySelector(".hero-title")
const originalText = heroTitle.innerHTML
let index = 0

function typeWriter() {
  if (index < originalText.length) {
    heroTitle.innerHTML = originalText.slice(0, index + 1)
    index++
    setTimeout(typeWriter, 50)
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    heroTitle.innerHTML = ""
    index = 0
    typeWriter()
  }, 600)
})

// Parallax Effect for Floating Shapes and Animals
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape, .cute-animal")

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.3
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Cute Animal Interactions
document.querySelectorAll(".cute-animal").forEach((animal) => {
  animal.addEventListener("click", () => {
    const type = animal.dataset.animal
    const sound = new Audio(
      `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${type === "cat" ? 1 : type === "bunny" ? 2 : 3}.mp3`,
    )
    sound.play()
    animal.style.animation = "jump 0.5s ease"
    setTimeout(() => {
      animal.style.animation = `bounce ${2.5 + (type === "bunny" ? 0.5 : type === "panda" ? 0.8 : 0)}s ease-in-out infinite`
    }, 500)
  })
})

// Enhanced Skill Interactions
document.querySelectorAll(".running-skill").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    createSparkles(skill)
  })

  skill.addEventListener("click", () => {
    createExplosion(skill)
  })
})

function createSparkles(element) {
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle 1s ease-out forwards;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `

    element.appendChild(sparkle)

    setTimeout(() => sparkle.remove(), 1000)
  }
}

function createExplosion(element) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div")
    particle.className = "explosion-particle"
    particle.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--gradient-2);
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      animation: explode 0.8s ease-out forwards;
      --angle: ${i * 45}deg;
    `

    element.appendChild(particle)

    setTimeout(() => particle.remove(), 800)
  }
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preloader styles
const style = document.createElement("style")
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-1);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Đang tải...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
    }
    
    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-30px) rotate(10deg); }
    }
    
    @keyframes sparkle {
        0% { opacity: 1; transform: scale(0) rotate(0deg); }
        100% { opacity: 0; transform: scale(1.2) rotate(180deg) translateY(-15px); }
    }
    
    @keyframes explode {
        0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(0); 
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(1) 
                      translateX(calc(cos(var(--angle)) * 40px)) 
                      translateY(calc(sin(var(--angle)) * 40px)); 
        }
    }
    
    .skills-track:hover .skills-runner {
        animation-play-state: paused;
    }
`

document.head.appendChild(style)

