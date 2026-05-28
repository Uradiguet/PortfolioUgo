// --- Initialization ---
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();

// Dark theme to match the portfolio
scene.background = new THREE.Color('#0C1A1A');
scene.fog = new THREE.FogExp2('#0C1A1A', 0.03);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('#6ACFC7', 2, 100);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight('#4ba6a0', 1.5, 100);
pointLight2.position.set(-2, -3, 2);
scene.add(pointLight2);

// ==========================================
// 1. Particles (Home Section Background)
// ==========================================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 35; // Spread
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    color: '#6ACFC7',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ==========================================
// 2. 3D Gallery (Réalisations Section)
// ==========================================
const galleryGroup = new THREE.Group();
// Position it below the home section
galleryGroup.position.set(0, -15, -5); 

const planeGeometry = new THREE.PlaneGeometry(3, 2);
// Use a wireframe material for a tech/hologram look
const planeMaterial = new THREE.MeshBasicMaterial({ 
    color: '#6ACFC7',
    side: THREE.DoubleSide,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const galleryItemsCount = 6;
const planes = [];
for(let i = 0; i < galleryItemsCount; i++) {
    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Arrange in a semicircle
    const angle = (i / (galleryItemsCount - 1)) * Math.PI - (Math.PI / 2);
    const radius = 7;
    mesh.position.x = Math.sin(angle) * radius;
    mesh.position.z = Math.cos(angle) * radius - radius + 2;
    mesh.rotation.y = -angle;
    
    galleryGroup.add(mesh);
    planes.push(mesh);
}
scene.add(galleryGroup);

// ==========================================
// 3. 3D Object/Nodes (Experience & About)
// ==========================================
const aboutGroup = new THREE.Group();
aboutGroup.position.set(5, -30, -3); // Further down

const icosahedronGeo = new THREE.IcosahedronGeometry(2, 1);
const icosahedronMat = new THREE.MeshStandardMaterial({
    color: '#4ba6a0',
    wireframe: true,
    transparent: true,
    opacity: 0.6
});
const abstractObject = new THREE.Mesh(icosahedronGeo, icosahedronMat);
aboutGroup.add(abstractObject);

// Add some orbiting rings
const ringGeo = new THREE.TorusGeometry(3, 0.05, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.2 });
const ring1 = new THREE.Mesh(ringGeo, ringMat);
const ring2 = new THREE.Mesh(ringGeo, ringMat);
ring1.rotation.x = Math.PI / 2;
ring2.rotation.y = Math.PI / 3;
aboutGroup.add(ring1);
aboutGroup.add(ring2);

scene.add(aboutGroup);

// --- Mouse Parallax Interaction ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// ==========================================
// GSAP Scroll Animations
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// We animate the camera's Y and Z positions based on the HTML scroll
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smoothness
    }
});

// Scene 1: Transition to Réalisations
tl.to(camera.position, {
    y: -15, 
    z: 2, 
    ease: "power2.inOut"
}, 0);

// Rotate the gallery while scrolling past it
tl.to(galleryGroup.rotation, {
    y: Math.PI / 3,
    ease: "none"
}, 0);

// Scene 2: Transition to Experience / About
tl.to(camera.position, {
    y: -30, 
    x: 2, // Move right to focus on the abstract object
    z: 5,
    ease: "power2.inOut"
}, "<0.5");

// Rotate the about object
tl.to(abstractObject.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    ease: "none"
}, "<");


// ==========================================
// Animation Loop
// ==========================================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    // Slowly rotate particles
    particlesMesh.rotation.y += 0.0005;
    
    // Add mouse parallax to particles
    particlesMesh.position.x += 0.05 * (targetX * 2 - particlesMesh.position.x);
    particlesMesh.position.y += 0.05 * (-targetY * 2 - particlesMesh.position.y);
    
    // Rotate gallery slowly
    planes.forEach((plane, i) => {
        // Slight floating effect for planes
        plane.position.y = Math.sin(elapsedTime + i) * 0.2;
    });
    
    // Rotate abstract object
    abstractObject.rotation.y += 0.005;
    abstractObject.rotation.z += 0.002;
    ring1.rotation.y -= 0.003;
    ring2.rotation.x += 0.004;

    renderer.render(scene, camera);
}

animate();

// ==========================================
// Resize Handler
// ==========================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ==========================================
// Projects HTML Scroll Animation
// ==========================================
const projectCards = document.querySelectorAll('#projects-container .glow-box');
projectCards.forEach((card, index) => {
    // Add break-inside-avoid for masonry layout
    card.style.breakInside = 'avoid';
    card.style.display = 'flex';
    card.style.marginBottom = '2rem';
    
    // We override the default .reveal CSS transition so GSAP can handle it
    card.style.transition = 'none';
    card.style.opacity = '0';
    
    // 3D Flip & Slide Up Animation
    gsap.fromTo(card, 
        { 
            y: 100, 
            opacity: 0,
            rotationX: 30, // 3D tilt
            scale: 0.95
        },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: card,
                start: "top 85%", // Triggers when top of card hits 85% of viewport
                toggleActions: "play none none reverse"
            }
        }
    );
});
