document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');
    
    // Function to update theme icons - using a single consistent implementation
    function updateThemeIcon(element) {
        if (element) {
            const icon = element.querySelector('i');
            if (icon) {
                if (body.classList.contains('dark-mode')) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        }
    }
    
    // Desktop theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            updateThemeIcon(themeToggle);
            updateThemeIcon(mobileThemeToggle);
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }
    
    // Mobile theme toggle - แก้ไขให้สามารถคลิกที่ทั้งลิงก์และข้อความได้
    if (mobileThemeToggle) {
        // ใช้ event delegation เพื่อให้คลิกที่ส่วนใดก็ได้ของปุ่ม
        mobileThemeToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            body.classList.toggle('dark-mode');
            updateThemeIcon(mobileThemeToggle);
            updateThemeIcon(themeToggle);
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
        
        // เพิ่ม event listener สำหรับข้อความในปุ่ม
        const themeText = mobileThemeToggle.querySelector('span');
        if (themeText) {
            themeText.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                // จำลองการคลิกที่ปุ่มหลัก
                mobileThemeToggle.click();
            });
        }
    }
    
    // Load saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        if (themeToggle) updateThemeIcon(themeToggle);
        if (mobileThemeToggle) updateThemeIcon(mobileThemeToggle);
    }
    
    // ... existing code ...
    
    // Mobile menu functionality
    if (mobileMenuBtn && mobileMenu && overlay) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        });
    }
    
    if (closeMenu && mobileMenu && overlay) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    if (overlay && mobileMenu) {
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Close menu when clicking on menu items
    document.querySelectorAll('.mobile-nav-link').forEach(item => {
        if (item.id !== 'mobile-theme-toggle') {
            item.addEventListener('click', function() {
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
    });
    
    // Create mobile menu if it doesn't exist
    if (!mobileMenu && document.querySelector('header')) {
        createMobileMenu();
    }
    
    function createMobileMenu() {
        // Create overlay
        const newOverlay = document.createElement('div');
        newOverlay.id = 'overlay';
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
        
        // Create mobile menu
        const newMobileMenu = document.createElement('div');
        newMobileMenu.id = 'mobile-menu';
        newMobileMenu.className = 'mobile-menu';
        
        // Create mobile menu header
        const menuHeader = document.createElement('div');
        menuHeader.className = 'mobile-menu-header';
        
        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo';
        logoDiv.innerHTML = '<i class="fas fa-gamepad"></i> ZERO GAME';
        
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-menu';
        closeBtn.className = 'close-menu';
        closeBtn.setAttribute('aria-label', 'ปิดเมนู');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        menuHeader.appendChild(logoDiv);
        menuHeader.appendChild(closeBtn);
        
        // Create mobile nav links
        const navLinks = document.createElement('nav');
        navLinks.className = 'mobile-nav-links';
        
        // Clone desktop menu items or create default ones
        const desktopMenuItems = document.querySelectorAll('.menu a');
        if (desktopMenuItems.length > 0) {
            desktopMenuItems.forEach(item => {
                const a = document.createElement('a');
                a.href = item.getAttribute('href');
                a.textContent = item.textContent;
                a.className = 'mobile-nav-link';
                navLinks.appendChild(a);
            });
        } else {
            // Default menu items if desktop menu doesn't exist
            const menuLinks = [
                { href: '#', text: 'หน้าหลัก' },
                { href: '#snake', text: 'เกมงู' },
                { href: '#memory', text: 'เกมจับคู่' },
                { href: '#tictactoe', text: 'เกม XO' },
                { href: '#rps', text: 'เป่ายิ้งฉุบ' }
            ];
            
            menuLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                a.className = 'mobile-nav-link';
                navLinks.appendChild(a);
            });
        }
        
           // Add theme toggle to mobile menu
    const themeToggleLink = document.createElement('a');
    themeToggleLink.href = 'javascript:void(0);';
    themeToggleLink.className = 'mobile-nav-link';
    themeToggleLink.id = 'mobile-theme-toggle';
    themeToggleLink.style.cursor = 'pointer'; // เพิ่ม cursor: pointer
    
    const themeIcon = document.createElement('i');
    themeIcon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    
    const themeText = document.createElement('span');
    themeText.textContent = 'เปลี่ยนธีม';
    themeText.style.pointerEvents = 'auto'; // ทำให้ span รับ event ได้
    
    themeToggleLink.appendChild(themeIcon);
    themeToggleLink.appendChild(themeText);
    
    navLinks.appendChild(themeToggleLink);
        
        newMobileMenu.appendChild(menuHeader);
        newMobileMenu.appendChild(navLinks);
        
        document.body.appendChild(newMobileMenu);
        
        // Update references
        mobileMenu = newMobileMenu;
        closeMenu = closeBtn;
        overlay = newOverlay;
        
        // Add event listeners
        setupMobileMenuListeners();
        
        // Add direct theme toggle event listener
        const mobileTT = document.getElementById('mobile-theme-toggle');
        if (mobileTT) {
            mobileTT.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                body.classList.toggle('dark-mode');
                updateThemeIcon(mobileTT);
                if (themeToggle) updateThemeIcon(themeToggle);
                localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
                return false; // Prevent default and stop propagation
            });
        }
    }
    
    function setupMobileMenuListeners() {
        if (mobileMenuBtn && mobileMenu && overlay) {
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.classList.add('menu-open');
            });
        }
        
        if (closeMenu && mobileMenu && overlay) {
            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        if (overlay && mobileMenu) {
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Close menu when clicking on menu items
        document.querySelectorAll('.mobile-nav-link').forEach(item => {
            if (item.id !== 'mobile-theme-toggle') {
                item.addEventListener('click', function() {
                    if (mobileMenu) mobileMenu.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            }
        });
    }
    
    // If mobile menu exists, setup listeners
    if (mobileMenu) {
        setupMobileMenuListeners();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) {
        const newScrollBtn = document.createElement('button');
        newScrollBtn.id = 'scroll-top';
        newScrollBtn.className = 'scroll-top';
        newScrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(newScrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                newScrollBtn.classList.add('show');
            } else {
                newScrollBtn.classList.remove('show');
            }
        });
        
        newScrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add responsive navigation if it doesn't exist
    if (!document.querySelector('header')) {
        createResponsiveNavigation();
    }
    
    function createResponsiveNavigation() {
        const header = document.createElement('header');
        const container = document.createElement('div');
        container.className = 'container';
        
        // Logo
        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo';
        const logoLink = document.createElement('a');
        logoLink.href = '#home';
        logoLink.innerHTML = '<i class="fas fa-gamepad"></i> Game Hub';
        logoDiv.appendChild(logoLink);
        
        // Navigation
        const nav = document.createElement('nav');
        const menuUl = document.createElement('ul');
        menuUl.className = 'menu';
        
        const menuItems = [
            { href: '#home', text: 'หน้าหลัก' },
            { href: '#games', text: 'เกม' },
            { href: '#about', text: 'เกี่ยวกับ' },
            { href: '#contact', text: 'ติดต่อ' }
        ];
        
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            li.appendChild(a);
            menuUl.appendChild(li);
        });
        
        nav.appendChild(menuUl);
        
        // Theme toggle button
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-toggle';
        themeBtn.className = 'theme-toggle';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        
        // Mobile menu button
        const mobileBtn = document.createElement('button');
        mobileBtn.id = 'mobile-menu-btn';
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        container.appendChild(logoDiv);
        container.appendChild(nav);
        container.appendChild(themeBtn);
        container.appendChild(mobileBtn);
        
        header.appendChild(container);
        
        // Insert at the beginning of the body
        document.body.insertBefore(header, document.body.firstChild);
        
        // Reinitialize event listeners
        location.reload();
    }
});
// ... existing code ...
// เพิ่มฟังก์ชันสำหรับการเริ่มต้นปุ่มเปลี่ยนธีม
// ในส่วนของฟังก์ชัน initThemeToggle หรือฟังก์ชันที่เกี่ยวข้องกับการเปลี่ยนธีม
// เพิ่มฟังก์ชันสำหรับการเริ่มต้นปุ่มเปลี่ยนธีม
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme-switch');
    const mobileThemeCheckbox = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    
    // ตรวจสอบธีมที่บันทึกไว้ใน localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    // ตั้งค่าเริ่มต้นสำหรับปุ่มเดสก์ท็อป
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    // ตั้งค่าเริ่มต้นสำหรับปุ่มมือถือ
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.checked = savedTheme === 'dark';
    }
    
    // เพิ่ม event listener สำหรับการเปลี่ยนธีมบนเดสก์ท็อป
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // เปลี่ยนไอคอน
            this.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // ซิงค์สถานะกับปุ่มบนมือถือ
            if (mobileThemeCheckbox) {
                mobileThemeCheckbox.checked = newTheme === 'dark';
            }
        });
    }
    
    // เพิ่ม event listener สำหรับการเปลี่ยนธีมบนมือถือ (ทั้งที่ checkbox และที่ข้อความ)
    if (mobileThemeSwitch) {
        mobileThemeSwitch.addEventListener('click', function(e) {
            // ถ้าคลิกที่ checkbox โดยตรง ไม่ต้องทำอะไร เพราะ event จะทำงานซ้ำซ้อน
            if (e.target === mobileThemeCheckbox) return;
            
            // สลับสถานะ checkbox
            if (mobileThemeCheckbox) {
                mobileThemeCheckbox.checked = !mobileThemeCheckbox.checked;
                
                // เปลี่ยนธีม
                const newTheme = mobileThemeCheckbox.checked ? 'dark' : 'light';
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // ซิงค์กับปุ่มบนเดสก์ท็อป
                if (themeToggle) {
                    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                }
            }
        });
    }
    
    // เพิ่ม event listener สำหรับ checkbox บนมือถือ
    if (mobileThemeCheckbox) {
        mobileThemeCheckbox.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // ซิงค์กับปุ่มบนเดสก์ท็อป
            if (themeToggle) {
                themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
}); 

// Snake Game
function initSnakeGame() {
    const canvas = document.getElementById('snake-game');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const startBtn = document.getElementById('start-snake');
    const pauseBtn = document.getElementById('pause-snake');
    const resetBtn = document.getElementById('reset-snake');
    const scoreElement = document.getElementById('snake-score');
    
    // Touch controls
    let upBtn = document.getElementById('up-btn');
    let leftBtn = document.getElementById('left-btn');
    let rightBtn = document.getElementById('right-btn');
    let downBtn = document.getElementById('down-btn');
    
    // Create touch controls if they don't exist
    const touchControlsContainer = document.querySelector('.touch-controls');
    if (!touchControlsContainer && canvas) {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'touch-controls';
        controlsContainer.style.display = 'grid';
        controlsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        controlsContainer.style.gridTemplateRows = 'repeat(3, 1fr)';
        controlsContainer.style.gap = '5px';
        controlsContainer.style.maxWidth = '200px';
        controlsContainer.style.margin = '20px auto';
        
        const createButton = (id, text, gridArea) => {
            const btn = document.createElement('button');
            btn.id = id;
            btn.className = 'direction-btn';
            btn.innerHTML = `<i class="fas fa-arrow-${text}"></i>`;
            btn.style.gridArea = gridArea;
            return btn;
        };
        
        const upButton = createButton('up-btn', 'up', '1 / 2 / 2 / 3');
        const leftButton = createButton('left-btn', 'left', '2 / 1 / 3 / 2');
        const rightButton = createButton('right-btn', 'right', '2 / 3 / 3 / 4');
        const downButton = createButton('down-btn', 'down', '3 / 2 / 4 / 3');
        
        controlsContainer.appendChild(upButton);
        controlsContainer.appendChild(leftButton);
        controlsContainer.appendChild(rightButton);
        controlsContainer.appendChild(downButton);
        
        canvas.parentNode.insertBefore(controlsContainer, canvas.nextSibling);
        
        upBtn = upButton;
        leftBtn = leftButton;
        rightBtn = rightButton;
        downBtn = downButton;
    }
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [];
    let food = {};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameInterval;
    let isPaused = false;
    let gameSpeed = 150;
    
    function initGame() {
        snake = [
            {x: 10, y: 10}
        ];
        generateFood();
        dx = 0;
        dy = 0;
        score = 0;
        if (scoreElement) scoreElement.textContent = score;
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                generateFood();
                break;
            }
        }
    }
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        
        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? '#4CAF50' : '#8BC34A';
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
            
            ctx.strokeStyle = '#333';
            ctx.strokeRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
        }
    }
    
    function moveSnake() {
        if (isPaused) return;
        
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // Check for wall collision
        if (head.x < 0) head.x = tileCount - 1;
        if (head.x >= tileCount) head.x = 0;
        if (head.y < 0) head.y = tileCount - 1;
        if (head.y >= tileCount) head.y = 0;
        
        // Check for self collision
         for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                clearInterval(gameInterval);
                gameInterval = null;
                alert('เกมจบแล้ว! คะแนนของคุณ: ' + score);
                initGame();
                return;
            }
        }
        
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score++;
            if (scoreElement) scoreElement.textContent = score;
            generateFood();
            
            if (score % 5 === 0 && gameSpeed > 50) {
                gameSpeed -= 10;
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        } else {
            snake.pop();
        }
    }
    
    function gameLoop() {
        moveSnake();
        drawGame();
    }
    
    function startGame() {
        if (!gameInterval) {
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
    }
    
    function pauseGame() {
        isPaused = !isPaused;
        if (pauseBtn) pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    }
    
    function resetGame() {
        clearInterval(gameInterval);
        gameInterval = null;
        gameSpeed = 150;
        isPaused = false;
        if (pauseBtn) pauseBtn.textContent = 'Pause';
        initGame();
        drawGame();
    }
    
    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    
    if (canvas) {
        canvas.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchend', function(e) {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) return;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0 && dx !== -1) {
                    dx = 1;
                    dy = 0;
                } else if (diffX < 0 && dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
            } else {
                if (diffY > 0 && dy !== -1) {
                    dx = 0;
                    dy = 1;
                } else if (diffY < 0 && dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
            e.preventDefault();
        }, { passive: false });
    }
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (!canvas) return;
        
        const gameArea = canvas.closest('.game-area');
        if (gameArea && gameArea.style.display === 'none') return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    });
    
    // Direction button controls
    if (upBtn) {
        upBtn.addEventListener('click', function() {
            if (dy !== 1) { dx = 0; dy = -1; }
        });
    }
    
    if (downBtn) {
        downBtn.addEventListener('click', function() {
            if (dy !== -1) { dx = 0; dy = 1; }
        });
    }
    
    if (leftBtn) {
        leftBtn.addEventListener('click', function() {
            if (dx !== 1) { dx = -1; dy = 0; }
        });
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            if (dx !== -1) { dx = 1; dy = 0; }
        });
    }
    
    // Game control buttons
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseGame);
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    
    initGame();
    drawGame();
}

// Memory Game
function initMemoryGame() {
    const memoryGame = document.querySelector('.memory-game');
    if (!memoryGame) return;
    
    const startBtn = document.getElementById('start-memory');
    const scoreElement = document.getElementById('memory-score');
    
    // เปลี่ยนจากไอคอน Font Awesome เป็นอิโมจิสัตว์
    const cardIcons = [
        '🐶', // หมา
        '🐱', // แมว
        '🐭', // หนู
        '🐰', // กระต่าย
        '🦊', // สุนัขจิ้งจอก
        '🐻', // หมี
        '🐼', // แพนด้า
        '🐨'  // โคอาล่า
    ];
    
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;
    
    function createCards() {
        memoryGame.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        if (scoreElement) scoreElement.textContent = moves;
        
        const cardPairs = [...cardIcons, ...cardIcons];
        
        for (let i = cardPairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
        }
        
        cardPairs.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.cardIndex = index;
            card.dataset.cardIcon = icon;
            
            // แก้ไขโครงสร้าง HTML ให้แสดงอิโมจิแทนไอคอน
            card.innerHTML = `
                <div class="memory-card-front">
                    <i class="fas fa-question"></i>
                </div>
                <div class="memory-card-back">
                    <span class="animal-emoji" style="font-size: 2rem;">${icon}</span>
                </div>
            `;
            
            card.addEventListener('click', flipCard);
            memoryGame.appendChild(card);
            cards.push(card);
        });
    }
    
    // ส่วนที่เหลือของฟังก์ชันยังคงเหมือนเดิม
    function flipCard() {
        if (!canFlip) return;
        if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
        
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            moves++;
            if (scoreElement) scoreElement.textContent = moves;
            canFlip = false;
            
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];
            
            if (card1.dataset.cardIcon === card2.dataset.cardIcon) {
                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    card1.style.pointerEvents = 'none';
                    card2.style.pointerEvents = 'none';
                    flippedCards = [];
                    canFlip = true;
                    matchedPairs++;
                    
                    if (matchedPairs === cardIcons.length) {
                        setTimeout(() => {
                            alert('ยินดีด้วย! คุณชนะด้วยการเดิน ' + moves + ' ครั้ง!');
                        }, 500);
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', createCards);
    }
    
    createCards();
}

// Rock Paper Scissors Game
function initRockPaperScissorsGame() {
    const rpsContainer = document.querySelector('.game-area#rps');
    if (!rpsContainer) return;
    
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const playerHandElement = document.querySelector('.player-choice');
    const computerHandElement = document.querySelector('.computer-choice');
    const resultElement = document.getElementById('rps-result');
    const options = document.querySelectorAll('.rps-option');
    const resetBtn = document.getElementById('reset-rps');
    
    let playWithComputer = true;
    let playerScore = 0;
    let computerScore = 0;
    let player1Choice = null;
    let player2Choice = null;
    let currentPlayer = 1;
    
    const toggleOpponentBtn = document.getElementById('toggle-opponent-rps');
    
    if (!toggleOpponentBtn && rpsContainer) {
        const modeBtn = document.createElement('button');
        modeBtn.id = 'toggle-opponent-rps';
        modeBtn.className = 'control-button';
        modeBtn.textContent = 'เล่นกับเพื่อน';
        modeBtn.style.marginTop = '1rem';
        
        const controlsDiv = resetBtn ? resetBtn.parentElement : rpsContainer;
        controlsDiv.appendChild(modeBtn);
        
        modeBtn.addEventListener('click', toggleGameMode);
    } else if (toggleOpponentBtn) {
        toggleOpponentBtn.addEventListener('click', toggleGameMode);
    }
    
    function toggleGameMode() {
        playWithComputer = !playWithComputer;
        const modeBtn = document.getElementById('toggle-opponent-rps');
        if (modeBtn) {
            modeBtn.textContent = playWithComputer ? 'เล่นกับเพื่อน' : 'เล่นกับคอมพิวเตอร์';
        }
        
        const player2Label = document.querySelector('.computer-label');
        if (player2Label) {
            player2Label.textContent = playWithComputer ? 'คอมพิวเตอร์' : 'ผู้เล่น 2';
        }
        resetGame();
    }
    
    function updateScore() {
        if (playerScoreElement) playerScoreElement.textContent = playerScore;
        if (computerScoreElement) computerScoreElement.textContent = computerScore;
    }
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * 3)];
    }
    
    function updateHands(playerChoice, computerChoice) {
        if (playerHandElement) {
            playerHandElement.innerHTML = `<i class="fas fa-hand-${playerChoice}"></i>`;
            playerHandElement.classList.add('shake');
            setTimeout(() => playerHandElement.classList.remove('shake'), 500);
        }
        
        if (computerHandElement) {
            computerHandElement.innerHTML = `<i class="fas fa-hand-${computerChoice}"></i>`;
            computerHandElement.classList.add('shake');
            setTimeout(() => computerHandElement.classList.remove('shake'), 500);
        }
    }
    
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'tie';
        
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'player';
        }
        
        return 'computer';
    }
    
    function updateResult(result) {
        if (!resultElement) return;
        
        if (result === 'tie') {
            resultElement.textContent = 'เสมอ!';
            resultElement.className = 'rps-result tie';
        } else if (result === 'player') {
            resultElement.textContent = playWithComputer ? 'คุณชนะ!' : 'ผู้เล่น 1 ชนะ!';
            resultElement.className = 'rps-result win';
        } else {
            resultElement.textContent = playWithComputer ? 'คอมพิวเตอร์ชนะ!' : 'ผู้เล่น 2 ชนะ!';
            resultElement.className = 'rps-result lose';
        }
    }
    
    function playGame(choice) {
        if (playWithComputer) {
            const playerChoice = choice;
            const computerChoice = getComputerChoice();
            
            updateHands(playerChoice, computerChoice);
            
            setTimeout(() => {
                const result = determineWinner(playerChoice, computerChoice);
                
                if (result === 'player') {
                    playerScore++;
                } else if (result === 'computer') {
                    computerScore++;
                }
                
                updateScore();
                updateResult(result);
                
                if (playerScore >= 5) {
                    setTimeout(() => {
                        alert('ยินดีด้วย! คุณชนะเกมแล้ว!');
                        resetGame();
                    }, 500);
                } else if (computerScore >= 5) {
                    setTimeout(() => {
                        alert('คอมพิวเตอร์ชนะ!');
                        resetGame();
                    }, 500);
                }
            }, 500);
        } else {
            if (currentPlayer === 1) {
                player1Choice = choice;
                if (playerHandElement) {
                    playerHandElement.innerHTML = '<i class="fas fa-question"></i>';
                }
                currentPlayer = 2;
                if (resultElement) {
                    resultElement.textContent = 'ตาผู้เล่น 2';
                }
            } else {
                player2Choice = choice;
                updateHands(player1Choice, player2Choice);
                
                setTimeout(() => {
                    const result = determineWinner(player1Choice, player2Choice);
                    
                    if (result === 'player') {
                        playerScore++;
                    } else if (result === 'computer') {
                        computerScore++;
                    }
                    
                    updateScore();
                    updateResult(result);
                    
                    if (playerScore >= 5) {
                        setTimeout(() => {
                            alert('ผู้เล่น 1 ชนะเกม!');
                            resetGame();
                        }, 500);
                    } else if (computerScore >= 5) {
                        setTimeout(() => {
                            alert('ผู้เล่น 2 ชนะเกม!');
                            resetGame();
                        }, 500);
                    }
                    
                    currentPlayer = 1;
                    player1Choice = null;
                    player2Choice = null;
                    if (resultElement) {
                        resultElement.textContent = 'ตาผู้เล่น 1';
                    }
                }, 500);
            }
        }
    }
    
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        player1Choice = null;
        player2Choice = null;
        currentPlayer = 1;
        updateScore();
        
        if (resultElement) {
            resultElement.textContent = playWithComputer ? 'เลือกการเล่นของคุณ' : 'ตาผู้เล่น 1';
            resultElement.className = 'rps-result';
        }
        
        if (playerHandElement) playerHandElement.innerHTML = '<i class="fas fa-question"></i>';
        if (computerHandElement) computerHandElement.innerHTML = '<i class="fas fa-question"></i>';
    }
    
    if (options) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                const choice = this.dataset.choice || this.id;
                playGame(choice);
            });
        });
    }
    
    if (resetBtn) {
        resetBtn.className = 'control-button';
        resetBtn.style.marginTop = '1rem';
        resetBtn.addEventListener('click', resetGame);
    }
    
    document.addEventListener('keydown', function(e) {
        if (!rpsContainer || rpsContainer.style.display === 'none') return;
        
        switch(e.key.toLowerCase()) {
            case 'r':
            case '1':
                playGame('rock');
                break;
            case 'p':
            case '2':
                playGame('paper');
                break;
            case 's':
            case '3':
                playGame('scissors');
                break;
        }
    });
    
    resetGame();
}

// ... existing code ...

// Tic Tac Toe Game
function initTicTacToeGame() {
    const gameArea = document.querySelector('.game-area#tictactoe');
    if (!gameArea) return;
    
    // ตรวจสอบว่ามีกระดานเกมอยู่แล้วหรือไม่
    let board = gameArea.querySelector('.tictactoe-board');
    let status = gameArea.querySelector('#tictactoe-status');
    let resetBtn = gameArea.querySelector('#reset-tictactoe');
    let modeBtn = gameArea.querySelector('#toggle-opponent');
    
    // ถ้ายังไม่มีองค์ประกอบของเกม ให้สร้างใหม่
    if (!board) {
        // Create the game board
        board = document.createElement('div');
        board.className = 'tictactoe-board';
        
        // Create 9 cells for the board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'tictactoe-cell';
            cell.setAttribute('data-index', i);
            board.appendChild(cell);
        }
        
        // Create status text
        status = document.createElement('div');
        status.id = 'tictactoe-status';
        status.className = 'game-status';
        status.textContent = "เลือกตำแหน่งที่จะวาง";
        
        // Create controls
        const controls = document.createElement('div');
        controls.className = 'game-controls';
        
        resetBtn = document.createElement('button');
        resetBtn.id = 'reset-tictactoe';
        resetBtn.className = 'control-button';
        resetBtn.textContent = 'Reset Game';
        
        modeBtn = document.createElement('button');
        modeBtn.id = 'toggle-opponent';
        modeBtn.className = 'control-button';
        modeBtn.textContent = 'เล่นกับเพื่อน';
        
        controls.appendChild(resetBtn);
        controls.appendChild(modeBtn);
        
        // Add elements to game area
        gameArea.appendChild(status);
        gameArea.appendChild(board);
        gameArea.appendChild(controls);
    }
    
    // Game variables
    let currentPlayer = 'X';
    let gameState = Array(9).fill('');
    let isGameActive = true;
    let isComputerMode = true;
    
    // Win patterns
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    function handleClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('tictactoe-cell')) return;
        
        const index = parseInt(cell.getAttribute('data-index'));
        if (gameState[index] || !isGameActive) return;
        
        makeMove(index);
        
        if (isGameActive && isComputerMode && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
    
    function makeMove(index) {
        gameState[index] = currentPlayer;
        const cell = board.children[index];
        cell.innerHTML = currentPlayer === 'X' ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="far fa-circle"></i>';
        
            if (checkWin()) {
                status.textContent = `${currentPlayer} ชนะ!`;
                highlightWinningCells();
                isGameActive = false;
                return;
            }
            
            if (isDraw()) {
                status.textContent = 'เสมอ!';
                isGameActive = false;
                return;
            }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = isComputerMode ? 
            (currentPlayer === 'O' ? 'คอมพิวเตอร์กำลังคิด...' : 'เลือกตำแหน่งที่จะวาง') : 
            `ตาผู้เล่น ${currentPlayer}`;
    }
    
    function checkWin() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameState[a] && 
                   gameState[a] === gameState[b] && 
                   gameState[a] === gameState[c];
        });
    }
    
    function isDraw() {
        return gameState.every(cell => cell !== '');
    }
    
  
    function highlightWinningCells() {
        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            if (gameState[a] && 
                gameState[a] === gameState[b] && 
                gameState[a] === gameState[c]) {
                pattern.forEach(index => {
                    const cell = board.children[index];
                    cell.classList.add('win');
                    cell.style.transition = 'border 0.3s ease';
                    cell.style.border = '3px solid #4CAF50';
                });
            }
        });
    }

    function resetGame() {
        gameState = Array(9).fill('');
        isGameActive = true;
        currentPlayer = 'X';
        status.textContent = isComputerMode ? 'เลือกตำแหน่งที่จะวาง' : `ตาผู้เล่น ${currentPlayer}`;
        
        board.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('win');
            cell.style.border = '';
            cell.style.transition = '';
        });
    }
    
    function computerMove() {
        if (!isGameActive) return;
        
        // Try to win or block
        for (let symbol of ['O', 'X']) {
            for (let i = 0; i < 9; i++) {
                if (gameState[i] === '') {
                    gameState[i] = symbol;
                    if (checkWin()) {
                        gameState[i] = '';
                        makeMove(i);
                        return;
                    }
                    gameState[i] = '';
                }
            }
        }
        
        // Take center if available
        if (gameState[4] === '') {
            makeMove(4);
            return;
        }
        
        // Take corners if available
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => gameState[i] === '');
        if (availableCorners.length > 0) {
            const cornerIndex = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            makeMove(cornerIndex);
            return;
        }
        
        // Take any available space
        const availableMoves = gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);
        
        if (availableMoves.length > 0) {
            const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(randomIndex);
        }
    }
    
    function resetGame() {
        gameState = Array(9).fill('');
        isGameActive = true;
        currentPlayer = 'X';
        status.textContent = isComputerMode ? 'เลือกตำแหน่งที่จะวาง' : `ตาผู้เล่น ${currentPlayer}`;
        
        board.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('win');
            cell.style.border = '';
            cell.style.transition = '';
        });
    }
    
    function toggleMode() {
        isComputerMode = !isComputerMode;
        modeBtn.textContent = isComputerMode ? 'เล่นกับเพื่อน' : 'เล่นกับคอมพิวเตอร์';
        resetGame();
    }
    
    // Add event listeners
    board.addEventListener('click', handleClick);
    resetBtn.addEventListener('click', resetGame);
    modeBtn.addEventListener('click', toggleMode);
    
    // Initialize game
    resetGame();
}
// ... existing code ...


// Number Guessing Game
function initNumberGame() {
    const gameArea = document.querySelector('.game-area#number');
    if (!gameArea) return;

    const input = gameArea.querySelector('#guess-input');
    const guessBtn = gameArea.querySelector('#guess-btn');
    const message = gameArea.querySelector('.number-message');
    const resetBtn = gameArea.querySelector('#reset-number');
    
    // เพิ่มส่วนคำแนะนำวิธีการเล่น
    const instructionsDiv = gameArea.querySelector('.number-instructions');
    if (!instructionsDiv) {
        const instructions = document.createElement('div');
        instructions.className = 'number-instructions';
        
        
    }
    
    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    
    function checkGuess() {
        if (!input.value) return;
        
        const guess = parseInt(input.value);
        attempts++;
        
        if (guess === targetNumber) {
            message.textContent = `ยินดีด้วย! คุณทายถูกใน ${attempts} ครั้ง`;
            message.style.color = 'var(--success)';
            input.disabled = true;
            guessBtn.disabled = true;
        } else if (guess < targetNumber) {
            message.textContent = 'น้อยเกินไป ลองใหม่!';
            message.style.color = 'var(--warning)';
        } else {
            message.textContent = 'มากเกินไป ลองใหม่!';
            message.style.color = 'var(--warning)';
        }
        
        input.value = '';
        input.focus();
    }
    
    function resetGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        message.textContent = 'เริ่มเกมใหม่! ทายตัวเลข 1-100';
        message.style.color = 'var(--accent)';
        input.disabled = false;
        guessBtn.disabled = false;
        input.value = '';
        input.focus();
    }
    
    guessBtn.addEventListener('click', checkGuess);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });
    resetBtn.addEventListener('click', resetGame);
    
    resetGame();
}

// Word Scramble Game
function initWordScrambleGame() {
    const gameArea = document.querySelector('.game-area#word');
    if (!gameArea) return;

    const wordDisplay = gameArea.querySelector('.word-display');
    const wordHint = gameArea.querySelector('.word-hint');
    const wordInput = gameArea.querySelector('#word-guess');
    const submitBtn = gameArea.querySelector('#word-submit');
    const skipBtn = gameArea.querySelector('#word-skip');
    const resetBtn = gameArea.querySelector('#reset-word');
    const messageElement = gameArea.querySelector('.word-message');
    
    // เพิ่มส่วนแสดงคะแนน
    let scoreDisplay = gameArea.querySelector('.word-score');
    if (!scoreDisplay) {
        scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'word-score';
        scoreDisplay.style.fontSize = '1.2rem';
        scoreDisplay.style.fontWeight = 'bold';
        scoreDisplay.style.marginBottom = '10px';
        scoreDisplay.style.color = 'var(--accent)';
        
        // แทรกส่วนแสดงคะแนนไว้ด้านบนของเกม
        const gameContainer = gameArea.querySelector('.game-container');
        if (gameContainer && gameContainer.firstChild) {
            gameContainer.insertBefore(scoreDisplay, gameContainer.firstChild);
        } else if (gameArea.firstChild) {
            gameArea.insertBefore(scoreDisplay, gameArea.firstChild);
        } else {
            gameArea.appendChild(scoreDisplay);
        }
    }
    // คำศัพท์และคำใบ้
    const words = [
        { word: 'คอมพิวเตอร์', hint: 'อุปกรณ์อิเล็กทรอนิกส์ที่ใช้ประมวลผลข้อมูล' },
        { word: 'อินเทอร์เน็ต', hint: 'เครือข่ายคอมพิวเตอร์ทั่วโลก' },
        { word: 'โทรศัพท์', hint: 'อุปกรณ์สื่อสารที่ใช้พูดคุยกัน' },
        { word: 'กล้อง', hint: 'อุปกรณ์ที่ใช้ถ่ายภาพ' },
        { word: 'หนังสือ', hint: 'สิ่งพิมพ์ที่มีเนื้อหาให้อ่าน' },
        { word: 'รถยนต์', hint: 'ยานพาหนะที่มีสี่ล้อ' },
        { word: 'ดนตรี', hint: 'ศิลปะของเสียง' },
        { word: 'อาหาร', hint: 'สิ่งที่กินเพื่อให้พลังงาน' },
        { word: 'ภาพยนตร์', hint: 'การเล่าเรื่องด้วยภาพเคลื่อนไหว' },
        { word: 'กีฬา', hint: 'กิจกรรมออกกำลังกายที่มีกฎกติกา' },
        { word: 'โรงเรียน', hint: 'สถานที่สำหรับการศึกษา' },
        { word: 'ครอบครัว', hint: 'กลุ่มคนที่มีความสัมพันธ์ทางสายเลือด' },
        { word: 'เพื่อน', hint: 'คนที่สนิทสนมและไว้ใจได้' },
        { word: 'ความรัก', hint: 'ความรู้สึกผูกพันอย่างลึกซึ้ง' },
        { word: 'ความสุข', hint: 'ความรู้สึกพึงพอใจและเบิกบาน' },
        // เพิ่มคำศัพท์ใหม่
        { word: 'จักรยาน', hint: 'พาหนะสองล้อที่ขับเคลื่อนด้วยการปั่น' },
        { word: 'ทะเล', hint: 'แหล่งน้ำเค็มขนาดใหญ่' },
        { word: 'ภูเขา', hint: 'พื้นที่ยกตัวสูงขึ้นบนพื้นโลก' },
        { word: 'ดวงจันทร์', hint: 'ดาวบริวารของโลก' },
        { word: 'ดวงอาทิตย์', hint: 'ดาวฤกษ์ที่เป็นศูนย์กลางของระบบสุริยะ' },
        { word: 'ท้องฟ้า', hint: 'พื้นที่เหนือพื้นโลกที่มองเห็นเป็นสีฟ้า' },
        { word: 'สายรุ้ง', hint: 'ปรากฏการณ์ธรรมชาติที่เกิดจากการหักเหของแสง' },
        { word: 'ดอกไม้', hint: 'ส่วนของพืชที่มีสีสันสวยงาม' },
        { word: 'ต้นไม้', hint: 'พืชที่มีลำต้นและกิ่งก้าน' },
        { word: 'สัตว์เลี้ยง', hint: 'สัตว์ที่คนนำมาเลี้ยงไว้เป็นเพื่อน' },
        { word: 'แมว', hint: 'สัตว์เลี้ยงที่ชอบจับหนู' },
        { word: 'สุนัข', hint: 'สัตว์เลี้ยงที่เป็นเพื่อนที่ซื่อสัตย์ของมนุษย์' },
        { word: 'นก', hint: 'สัตว์ที่มีปีกและขน' },
        { word: 'ปลา', hint: 'สัตว์น้ำที่หายใจด้วยเหงือก' },
        { word: 'เต่า', hint: 'สัตว์เลื้อยคลานที่มีกระดอง' },
        { word: 'ผีเสื้อ', hint: 'แมลงที่มีปีกสวยงาม' },
        { word: 'มหาสมุทร', hint: 'แหล่งน้ำเค็มขนาดใหญ่ที่สุดบนโลก' },
        { word: 'แม่น้ำ', hint: 'ทางน้ำธรรมชาติที่ไหลลงสู่ทะเล' },
        { word: 'ทะเลสาบ', hint: 'แหล่งน้ำจืดขนาดใหญ่ที่มีพื้นที่ล้อมรอบด้วยแผ่นดิน' },
        { word: 'น้ำตก', hint: 'น้ำที่ไหลตกลงมาจากที่สูง' },
        { word: 'ทะเลทราย', hint: 'พื้นที่แห้งแล้งที่มีทรายเป็นส่วนใหญ่' },
        { word: 'ป่าไม้', hint: 'พื้นที่ที่มีต้นไม้หนาแน่น' },
        { word: 'เกาะ', hint: 'แผ่นดินที่มีน้ำล้อมรอบ' },
        { word: 'ชายหาด', hint: 'พื้นที่ทรายริมทะเล' },
        { word: 'ดาวเคราะห์', hint: 'วัตถุท้องฟ้าที่โคจรรอบดวงอาทิตย์' },
        { word: 'กาแล็กซี', hint: 'ระบบดาวขนาดใหญ่ในอวกาศ' },
        { word: 'อวกาศ', hint: 'พื้นที่ว่างเปล่านอกโลก' },
        { word: 'ดาวเทียม', hint: 'วัตถุที่มนุษย์สร้างขึ้นเพื่อโคจรรอบโลก' },
        { word: 'ยานอวกาศ', hint: 'ยานพาหนะที่ใช้เดินทางในอวกาศ' },
        { word: 'นักบิน', hint: 'ผู้ที่ขับเครื่องบิน' },
        { word: 'นักดนตรี', hint: 'ผู้ที่เล่นเครื่องดนตรี' },
        { word: 'นักกีฬา', hint: 'ผู้ที่เล่นกีฬาอย่างมืออาชีพ' },
        { word: 'นักวิทยาศาสตร์', hint: 'ผู้ที่ศึกษาค้นคว้าทางวิทยาศาสตร์' },
        { word: 'แพทย์', hint: 'ผู้ที่รักษาโรคให้คนไข้' },
        { word: 'ครู', hint: 'ผู้ที่สอนหนังสือให้นักเรียน' },
        { word: 'วิศวกร', hint: 'ผู้ที่ออกแบบและสร้างสิ่งต่างๆ' },
        { word: 'สถาปนิก', hint: 'ผู้ที่ออกแบบอาคาร' },
        { word: 'ศิลปิน', hint: 'ผู้ที่สร้างสรรค์งานศิลปะ' },
        { word: 'นักแสดง', hint: 'ผู้ที่แสดงในภาพยนตร์หรือละคร' },
        { word: 'นักเขียน', hint: 'ผู้ที่เขียนหนังสือหรือบทความ' },
        { word: 'นักร้อง', hint: 'ผู้ที่ร้องเพลง' },
        { word: 'นักเต้น', hint: 'ผู้ที่เต้นรำ' },
        { word: 'นักประดิษฐ์', hint: 'ผู้ที่คิดค้นสิ่งใหม่ๆ' },
        { word: 'มหาวิทยาลัย', hint: 'สถาบันการศึกษาระดับสูง' },
        { word: 'โรงพยาบาล', hint: 'สถานที่รักษาคนป่วย' },
        { word: 'ห้องสมุด', hint: 'สถานที่เก็บรวบรวมหนังสือ' },
        { word: 'พิพิธภัณฑ์', hint: 'สถานที่จัดแสดงสิ่งของที่มีคุณค่า' },
        { word: 'สวนสาธารณะ', hint: 'พื้นที่สีเขียวสำหรับพักผ่อนหย่อนใจ' },
        { word: 'ตลาด', hint: 'สถานที่ซื้อขายสินค้า' },
        { word: 'ร้านอาหาร', hint: 'สถานที่ขายอาหาร' },
        { word: 'โรงแรม', hint: 'สถานที่พักแรม' },
        { word: 'สนามบิน', hint: 'สถานที่ขึ้นลงของเครื่องบิน' },
        { word: 'สถานีรถไฟ', hint: 'สถานที่จอดรับส่งผู้โดยสารของรถไฟ' },
        { word: 'ท่าเรือ', hint: 'สถานที่จอดเรือ' },
        { word: 'ถนน', hint: 'เส้นทางสำหรับการเดินทาง' },
        { word: 'สะพาน', hint: 'สิ่งก่อสร้างที่ทอดข้ามแม่น้ำหรือหุบเขา' },
        { word: 'อุโมงค์', hint: 'ทางลอดใต้ดินหรือภูเขา' },
        { word: 'รถไฟ', hint: 'ยานพาหนะที่วิ่งบนราง' },
        { word: 'เครื่องบิน', hint: 'ยานพาหนะที่บินได้' },
        { word: 'เรือ', hint: 'ยานพาหนะที่ลอยน้ำได้' },
        { word: 'รถจักรยานยนต์', hint: 'ยานพาหนะสองล้อที่ขับเคลื่อนด้วยเครื่องยนต์' },
        { word: 'รถบรรทุก', hint: 'ยานพาหนะสำหรับขนส่งสินค้า' },
        { word: 'รถโดยสาร', hint: 'ยานพาหนะสำหรับขนส่งผู้โดยสาร' },
        { word: 'รถไฟฟ้า', hint: 'ระบบขนส่งมวลชนที่ใช้พลังงานไฟฟ้า' },
        { word: 'จักรวาล', hint: 'ทุกสิ่งทุกอย่างที่มีอยู่ในอวกาศ' },
        { word: 'ดาวหาง', hint: 'วัตถุท้องฟ้าที่มีหางสว่าง' },
        { word: 'อุกกาบาต', hint: 'ก้อนหินจากอวกาศที่ตกลงมาสู่โลก' },
        { word: 'หลุมดำ', hint: 'บริเวณในอวกาศที่มีแรงโน้มถ่วงสูงมาก' },
        { word: 'กล้องดูดาว', hint: 'อุปกรณ์สำหรับดูวัตถุท้องฟ้า' },
        { word: 'นักดาราศาสตร์', hint: 'ผู้ที่ศึกษาเกี่ยวกับดวงดาวและอวกาศ' },
        { word: 'ทฤษฎี', hint: 'แนวคิดที่อธิบายปรากฏการณ์ต่างๆ' },
        { word: 'การทดลอง', hint: 'กระบวนการทดสอบสมมติฐาน' },
        { word: 'สมมติฐาน', hint: 'ข้อสันนิษฐานที่ต้องการพิสูจน์' },
        { word: 'ข้อมูล', hint: 'ข้อเท็จจริงที่รวบรวมได้' },
        { word: 'สถิติ', hint: 'การวิเคราะห์ข้อมูลเชิงตัวเลข' },
        { word: 'คณิตศาสตร์', hint: 'วิชาที่เกี่ยวกับตัวเลขและการคำนวณ' },
        { word: 'ฟิสิกส์', hint: 'วิชาที่ศึกษาเกี่ยวกับสสารและพลังงาน' },
        { word: 'เคมี', hint: 'วิชาที่ศึกษาเกี่ยวกับสารและปฏิกิริยา' },
        { word: 'ชีววิทยา', hint: 'วิชาที่ศึกษาเกี่ยวกับสิ่งมีชีวิต' },
        { word: 'ภูมิศาสตร์', hint: 'วิชาที่ศึกษาเกี่ยวกับโลกและสิ่งแวดล้อม' },
        { word: 'ประวัติศาสตร์', hint: 'วิชาที่ศึกษาเกี่ยวกับเหตุการณ์ในอดีต' },
        { word: 'ภาษาศาสตร์', hint: 'วิชาที่ศึกษาเกี่ยวกับภาษา' },
        { word: 'จิตวิทยา', hint: 'วิชาที่ศึกษาเกี่ยวกับพฤติกรรมและจิตใจ' },
        { word: 'สังคมวิทยา', hint: 'วิชาที่ศึกษาเกี่ยวกับสังคมมนุษย์' },
        { word: 'เศรษฐศาสตร์', hint: 'วิชาที่ศึกษาเกี่ยวกับการผลิตและการบริโภค' },
        { word: 'การเมือง', hint: 'กิจกรรมที่เกี่ยวข้องกับการปกครอง' },
        { word: 'วัฒนธรรม', hint: 'วิถีชีวิตและความเชื่อของกลุ่มคน' },
        { word: 'ประเพณี', hint: 'แบบแผนปฏิบัติที่สืบทอดกันมา' },
        { word: 'ศาสนา', hint: 'ความเชื่อและการปฏิบัติเกี่ยวกับสิ่งศักดิ์สิทธิ์' },
        { word: 'ปรัชญา', hint: 'การศึกษาเกี่ยวกับความจริงและความหมายของชีวิต' },
        { word: 'ศีลธรรม', hint: 'หลักความประพฤติที่ดีงาม' },
        { word: 'จริยธรรม', hint: 'หลักการปฏิบัติที่ถูกต้อง' },
        { word: 'กฎหมาย', hint: 'ข้อบังคับที่รัฐกำหนดขึ้น' },
        { word: 'สิทธิมนุษยชน', hint: 'สิทธิขั้นพื้นฐานที่มนุษย์ทุกคนพึงมี' },
        { word: 'ประชาธิปไตย', hint: 'ระบอบการปกครองโดยประชาชน' },
        { word: 'รัฐบาล', hint: 'คณะบุคคลที่บริหารประเทศ' },
        { word: 'รัฐสภา', hint: 'สถาบันที่ทำหน้าที่นิติบัญญัติ' },
        { word: 'ศาล', hint: 'สถาบันที่ทำหน้าที่ตัดสินคดีความ' },
        { word: 'ตำรวจ', hint: 'ผู้รักษากฎหมายและความสงบเรียบร้อย' },
        { word: 'ทหาร', hint: 'ผู้ปกป้องประเทศ' },
        { word: 'การศึกษา', hint: 'กระบวนการเรียนรู้และพัฒนาตนเอง' },
        { word: 'โรงงาน', hint: 'สถานที่ผลิตสินค้า' },
        { word: 'บริษัท', hint: 'องค์กรธุรกิจ' },
        { word: 'ธนาคาร', hint: 'สถาบันการเงิน' },
        { word: 'เงิน', hint: 'สิ่งที่ใช้แลกเปลี่ยนสินค้าและบริการ' },
        { word: 'ทอง', hint: 'โลหะมีค่าสีเหลือง' },
        { word: 'เพชร', hint: 'อัญมณีที่แข็งที่สุด' },
        { word: 'น้ำมัน', hint: 'เชื้อเพลิงที่ได้จากใต้ดิน' },
        { word: 'ไฟฟ้า', hint: 'พลังงานที่เกิดจากการเคลื่อนที่ของอิเล็กตรอน' },
        { word: 'พลังงานแสงอาทิตย์', hint: 'พลังงานที่ได้จากดวงอาทิตย์' },
        { word: 'พลังงานลม', hint: 'พลังงานที่ได้จากการเคลื่อนที่ของอากาศ' },
        { word: 'พลังงานน้ำ', hint: 'พลังงานที่ได้จากการเคลื่อนที่ของน้ำ' },
        { word: 'เทคโนโลยี', hint: 'การประยุกต์ความรู้ทางวิทยาศาสตร์' },
        { word: 'นวัตกรรม', hint: 'สิ่งใหม่ที่เกิดจากความคิดสร้างสรรค์' },
        { word: 'ปัญญาประดิษฐ์', hint: 'เทคโนโลยีที่ทำให้คอมพิวเตอร์คิดได้เหมือนมนุษย์' },
        { word: 'หุ่นยนต์', hint: 'เครื่องจักรที่ทำงานได้อัตโนมัติ' },
        { word: 'อินเทอร์เน็ตของสรรพสิ่ง', hint: 'การเชื่อมต่ออุปกรณ์ต่างๆ เข้ากับอินเทอร์เน็ต' },
        { word: 'ความเป็นจริงเสมือน', hint: 'เทคโนโลยีที่จำลองสภาพแวดล้อมเสมือนจริง' },
        { word: 'ความเป็นจริงเสริม', hint: 'เทคโนโลยีที่เพิ่มข้อมูลเสมือนเข้าไปในโลกจริง' },
        { word: 'บล็อกเชน', hint: 'เทคโนโลยีการเก็บข้อมูลแบบกระจายศูนย์' },
        { word: 'สกุลเงินดิจิทัล', hint: 'เงินที่อยู่ในรูปแบบดิจิทัล' },
        { word: 'การพิมพ์สามมิติ', hint: 'เทคโนโลยีการสร้างวัตถุสามมิติจากไฟล์ดิจิทัล' },
        { word: 'การเขียนโปรแกรม', hint: 'การสร้างชุดคำสั่งให้คอมพิวเตอร์ทำงาน' },
        { word: 'ข้อมูลขนาดใหญ่', hint: 'ชุดข้อมูลขนาดมหาศาลที่ต้องวิเคราะห์ด้วยคอมพิวเตอร์' },
        { word: 'การวิเคราะห์ข้อมูล', hint: 'กระบวนการตรวจสอบและแปลความหมายข้อมูล' },
        { word: 'ความปลอดภัยทางไซเบอร์', hint: 'การป้องกันระบบคอมพิวเตอร์จากการโจมตี' },
        { word: 'การแฮ็ก', hint: 'การเข้าถึงระบบคอมพิวเตอร์โดยไม่ได้รับอนุญาต' },
        { word: 'ไวรัสคอมพิวเตอร์', hint: 'โปรแกรมที่สร้างความเสียหายให้กับระบบคอมพิวเตอร์' },
        { word: 'มัลแวร์', hint: 'ซอฟต์แวร์ที่มีเจตนาร้าย' },
        { word: 'การเข้ารหัส', hint: 'กระบวนการแปลงข้อมูลให้อ่านไม่ได้' },
        { word: 'รหัสผ่าน', hint: 'ชุดตัวอักษรที่ใช้ยืนยันตัวตน' },
        { word: 'ลายนิ้วมือ', hint: 'ลักษณะเฉพาะของนิ้วมือที่ใช้ระบุตัวบุคคล' },
        { word: 'การจดจำใบหน้า', hint: 'เทคโนโลยีที่ระบุตัวบุคคลจากใบหน้า' },
        { word: 'การสแกนม่านตา', hint: 'เทคโนโลยีที่ระบุตัวบุคคลจากลักษณะของม่านตา' },
        { word: 'เสียงพูด', hint: 'เสียงที่เกิดจากการพูดของมนุษย์' },
        { word: 'การแปลภาษา', hint: 'การเปลี่ยนข้อความจากภาษาหนึ่งเป็นอีกภาษาหนึ่ง' },
        { word: 'การรู้จำเสียงพูด', hint: 'เทคโนโลยีที่แปลงเสียงพูดเป็นข้อความ' },
        { word: 'การสังเคราะห์เสียงพูด', hint: 'เทคโนโลยีที่แปลงข้อความเป็นเสียงพูด' },
        { word: 'การประมวลผลภาษาธรรมชาติ', hint: 'เทคโนโลยีที่ทำให้คอมพิวเตอร์เข้าใจภาษามนุษย์' },
        { word: 'การเรียนรู้ของเครื่อง', hint: 'เทคโนโลยีที่ทำให้คอมพิวเตอร์เรียนรู้จากข้อมูล' },
        { word: 'การเรียนรู้เชิงลึก', hint: 'เทคนิคการเรียนรู้ของเครื่องที่ใช้โครงข่ายประสาทเทียม' },
        { word: 'โครงข่ายประสาทเทียม', hint: 'แบบจำลองคอมพิวเตอร์ที่จำลองการทำงานของสมองมนุษย์' },
        { word: 'การวิเคราะห์ภาพ', hint: 'เทคโนโลยีที่ทำให้คอมพิวเตอร์เข้าใจภาพ' },
        { word: 'การตรวจจับวัตถุ', hint: 'เทคโนโลยีที่ระบุวัตถุในภาพ' },
        { word: 'การขับขี่อัตโนมัติ', hint: 'เทคโนโลยีที่ทำให้ยานพาหนะขับเคลื่อนได้เอง' },
        { word: 'โดรน', hint: 'อากาศยานไร้คนขับ' },
        { word: 'การสำรวจอวกาศ', hint: 'การศึกษาและค้นคว้าเกี่ยวกับอวกาศ' },
        { word: 'นักบินอวกาศ', hint: 'ผู้ที่เดินทางไปในอวกาศ' }
    ];


    let currentWord = '';
    let currentHint = '';
    let scrambledWord = '';
    let score = 0;

    // อัพเดทคะแนน
    function updateScore() {
        scoreDisplay.textContent = `คะแนน: ${score}`;
    }

    // สลับตัวอักษรในคำ
    function scrambleWord(word) {
        const wordArray = word.split('');
        for (let i = wordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        return wordArray.join('');
    }

     // เลือกคำใหม่
     function getNewWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex].word;
        currentHint = words[randomIndex].hint;
        
         // สลับคำจนกว่าจะได้คำที่ไม่เหมือนคำเดิม
         do {
            scrambledWord = scrambleWord(currentWord);
        } while (scrambledWord === currentWord);

        wordDisplay.textContent = scrambledWord;
        wordHint.textContent = `คำใบ้: ${currentHint}`;
        wordInput.value = '';
        messageElement.textContent = '';
        updateScore(); // อัพเดทคะแนนทุกครั้งที่เปลี่ยนคำ
    }

    // ตรวจสอบคำตอบ
    function checkAnswer() {
        const userGuess = wordInput.value.trim();
        
        if (!userGuess) {
            messageElement.textContent = 'กรุณาพิมพ์คำตอบ';
            messageElement.style.color = 'var(--warning)';
            return;
        }

        if (userGuess === currentWord) {
            score++;
            updateScore(); // อัพเดทคะแนนเมื่อตอบถูก
            messageElement.textContent = `ถูกต้อง!`;
            messageElement.style.color = 'var(--success)';
            getNewWord();
        } else {
            messageElement.textContent = 'ไม่ถูกต้อง ลองอีกครั้ง';
            messageElement.style.color = 'var(--danger)';
        }
    }

    // รีเซ็ตเกม
    function resetGame() {
        score = 0;
        updateScore(); // อัพเดทคะแนนเมื่อรีเซ็ตเกม
        messageElement.textContent = 'เกมเริ่มใหม่แล้ว';
        messageElement.style.color = 'var(--primary)';
        getNewWord();
    }

    // เพิ่ม Event Listeners
    if (submitBtn) {
        submitBtn.addEventListener('click', checkAnswer);
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            messageElement.textContent = `ข้ามไปคำถัดไป คำตอบคือ: ${currentWord}`;
            messageElement.style.color = 'var(--info)';
            getNewWord();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }

    if (wordInput) {
        wordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }


    // เริ่มเกม
    updateScore(); // แสดงคะแนนเริ่มต้น
    getNewWord();
}

// Initialize new games
document.addEventListener('DOMContentLoaded', function() {
    initSnakeGame();
    initMemoryGame();
    initRockPaperScissorsGame();
    initTicTacToeGame();
    initNumberGame();
    initWordScrambleGame(); // แก้ไขจาก initWordGame() เป็น initWordScrambleGame()
});
