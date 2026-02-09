// Domain Dashboard JavaScript
// ==========================================

// Get current domain from localStorage or URL
let currentUserDomain = localStorage.getItem('selectedDomain') || 'programming';
let domainData = null;

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Get user info
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.name) {
        document.getElementById('userName').textContent = `Welcome, ${user.name}`;
    }
    
    // Load domain data
    loadDomainData(currentUserDomain);
}

function loadDomainData(domain) {
    // Get data from domain-resources.js
    domainData = domainResources[domain];
    
    if (!domainData) {
        console.error('Domain data not found for:', domain);
        domainData = domainResources['programming']; // Fallback
    }
    
    // Update UI with domain info
    document.getElementById('domainBadge').innerHTML = `${domainData.icon} ${domainData.name}`;
    document.getElementById('domainName').textContent = domainData.name;
    
    // Update description if available
    const descriptionEl = document.getElementById('domainDescription');
    if (descriptionEl && domainData.description) {
        descriptionEl.textContent = domainData.description;
    }
    
    // Load all sections
    loadInternships();
    loadInterviewExperiences();
    loadLeetCodeProblems();
    loadCourses();
    loadYouTubeResources();
    loadRoadmap();
    loadBooks();
    loadInterviewTips();
    loadPlacementGuide();
}

// Load Internships
function loadInternships() {
    const container = document.getElementById('internshipsList');
    container.innerHTML = '';
    
    const internships = domainData.internships || [];
    
    if (internships.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No internships available for this domain at the moment.</p>';
        return;
    }
    
    internships.forEach(internship => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200';
        
        // Format deadline
        const deadline = new Date(internship.deadline);
        const deadlineStr = deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h3 class="font-bold text-xl text-gray-800 mb-1">${internship.company}</h3>
                    <p class="text-gray-600 mb-2">${internship.position}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">📍 ${internship.location}</span>
                        <span class="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">⏱️ ${internship.duration}</span>
                        <span class="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">💰 ${internship.stipend}</span>
                    </div>
                    <div class="mb-3">
                        <p class="text-sm font-semibold text-gray-700 mb-1">Required Skills:</p>
                        <div class="flex flex-wrap gap-1">
                            ${internship.skills.map(skill => `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <p class="text-sm text-red-600 font-medium">⏰ Deadline: ${deadlineStr}</p>
                </div>
            </div>
            <a href="${internship.applyUrl}" target="_blank" class="block w-full mt-4 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white text-center py-3 rounded-lg transition font-medium">
                Apply Now →
            </a>
        `;
        container.appendChild(card);
    });
}

// Load Interview Experiences
function loadInterviewExperiences() {
    const container = document.getElementById('interviewExperienceList');
    container.innerHTML = '';
    
    domainData.interviewExperience.forEach(interview => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-gray-800 mb-2">${interview.title}</h3>
                    <div class="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">${interview.company}</span>
                        <span class="bg-green-100 text-green-700 px-2 py-1 rounded">${interview.level}</span>
                        <span>⏱️ ${interview.duration}</span>
                    </div>
                    <div class="text-sm text-gray-500">
                        👁️ ${interview.views} views • ${interview.channel}
                    </div>
                </div>
            </div>
            <a href="${interview.youtubeUrl}" target="_blank" class="block w-full mt-4 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg transition">
                ▶️ Watch on YouTube
            </a>
        `;
        container.appendChild(card);
    });
}

// Load LeetCode Problems
let currentLeetCodeFilter = 'all';

function loadLeetCodeProblems(filter = 'all') {
    currentLeetCodeFilter = filter;
    const container = document.getElementById('leetcodeList');
    container.innerHTML = '';
    
    let problems = domainData.leetcodeProblems;
    
    // Filter by difficulty
    if (filter !== 'all') {
        problems = problems.filter(p => p.difficulty.toLowerCase() === filter.toLowerCase());
    }
    
    problems.forEach(problem => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6';
        
        const difficultyColors = {
            'Easy': 'bg-green-100 text-green-700',
            'Medium': 'bg-orange-100 text-orange-700',
            'Hard': 'bg-red-100 text-red-700'
        };
        
        const frequencyColors = {
            'Very High': 'bg-red-500',
            'High': 'bg-orange-500',
            'Medium': 'bg-yellow-500',
            'Low': 'bg-gray-500'
        };
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-gray-800 mb-2">${problem.title}</h3>
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="px-2 py-1 rounded text-sm ${difficultyColors[problem.difficulty]}">${problem.difficulty}</span>
                        <span class="px-2 py-1 rounded text-sm text-white ${frequencyColors[problem.frequency]}">${problem.frequency} Frequency</span>
                        <span class="text-sm text-gray-600">✅ ${problem.acceptanceRate}%</span>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-2">
                        ${problem.topics.map(topic => `<span class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">${topic}</span>`).join('')}
                    </div>
                    <div class="text-xs text-gray-500">
                        Asked by: ${problem.companies.slice(0, 3).join(', ')}${problem.companies.length > 3 ? '...' : ''}
                    </div>
                </div>
            </div>
            <a href="${problem.url}" target="_blank" class="block w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg transition">
                Solve on LeetCode →
            </a>
        `;
        container.appendChild(card);
    });
    
    if (problems.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No problems found for this difficulty level.</p>';
    }
}

function filterLeetCode(difficulty) {
    // Update filter buttons
    document.querySelectorAll('.leetcode-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load filtered problems
    loadLeetCodeProblems(difficulty);
}

// Load Courses
function loadCourses() {
    const container = document.getElementById('coursesList');
    container.innerHTML = '';
    
    domainData.courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6';
        card.innerHTML = `
            <h3 class="font-bold text-lg text-gray-800 mb-2">${course.title}</h3>
            <div class="text-sm text-gray-600 mb-2">
                <div class="flex items-center mb-1">
                    <span class="font-medium">Platform:</span>
                    <span class="ml-2 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">${course.platform}</span>
                </div>
                <div class="flex items-center mb-1">
                    <span class="font-medium">Instructor:</span>
                    <span class="ml-2">${course.instructor}</span>
                </div>
                <div class="flex items-center mb-1">
                    <span class="font-medium">Students:</span>
                    <span class="ml-2 text-green-600">${course.students}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-yellow-500">⭐ ${course.rating}</span>
                    <span class="font-bold text-purple-600">${course.price}</span>
                </div>
            </div>
            <a href="${course.url}" target="_blank" class="block w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg transition">
                View Course →
            </a>
        `;
        container.appendChild(card);
    });
}

// Load YouTube Resources
function loadYouTubeResources() {
    const container = document.getElementById('youtubeList');
    container.innerHTML = '';
    
    domainData.youtubeResources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6';
        card.innerHTML = `
            <h3 class="font-bold text-lg text-gray-800 mb-2">${resource.title}</h3>
            <div class="text-sm text-gray-600 mb-3">
                <div class="flex items-center mb-1">
                    <span class="font-medium">Channel:</span>
                    <span class="ml-2">${resource.channel}</span>
                </div>
                <div class="flex items-center mb-1">
                    <span class="font-medium">Type:</span>
                    <span class="ml-2 capitalize bg-gray-100 px-2 py-1 rounded text-xs">${resource.type}</span>
                </div>
                ${resource.duration ? `<div class="flex items-center mb-1"><span class="font-medium">Duration:</span><span class="ml-2">⏱️ ${resource.duration}</span></div>` : ''}
                ${resource.subscribers ? `<div class="flex items-center mb-1"><span class="font-medium">Subscribers:</span><span class="ml-2 text-red-600">${resource.subscribers}</span></div>` : ''}
                ${resource.views ? `<div class="flex items-center mb-1"><span class="font-medium">Views:</span><span class="ml-2 text-gray-700">${resource.views}</span></div>` : ''}
            </div>
            <a href="${resource.url}" target="_blank" class="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg transition">
                ▶️ Watch Now
            </a>
        `;
        container.appendChild(card);
    });
}

// Load Roadmap
function loadRoadmap() {
    const beginner = document.getElementById('roadmapBeginner');
    const intermediate = document.getElementById('roadmapIntermediate');
    const advanced = document.getElementById('roadmapAdvanced');
    
    beginner.innerHTML = domainData.roadmap.beginner.map(item => 
        `<li class="flex items-start"><span class="mr-2">✓</span>${item}</li>`
    ).join('');
    
    intermediate.innerHTML = domainData.roadmap.intermediate.map(item => 
        `<li class="flex items-start"><span class="mr-2">✓</span>${item}</li>`
    ).join('');
    
    advanced.innerHTML = domainData.roadmap.advanced.map(item => 
        `<li class="flex items-start"><span class="mr-2">✓</span>${item}</li>`
    ).join('');
}

// Load Books
function loadBooks() {
    const container = document.getElementById('booksList');
    container.innerHTML = '';
    
    domainData.books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition p-6';
        card.innerHTML = `
            <div class="text-4xl mb-3 text-center">📚</div>
            <h3 class="font-bold text-md text-gray-800 mb-2">${book.title}</h3>
            <p class="text-sm text-gray-600 mb-2">by ${book.author}</p>
            <div class="flex items-center justify-between mb-3">
                <span class="text-yellow-500 text-sm">⭐ ${book.rating}</span>
                <span class="font-bold text-green-600">${book.price}</span>
            </div>
            <div class="space-y-2">
                <a href="${book.buyLink}" target="_blank" class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition text-sm">
                    Buy Now
                </a>
                ${book.freeLink ? `<a href="${book.freeLink}" target="_blank" class="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition text-sm">Read Free</a>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// Load Interview Tips
function loadInterviewTips() {
    const container = document.getElementById('tipsList');
    container.innerHTML = '';
    
    domainData.interviewTips.forEach(tip => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `<span class="mr-3 text-yellow-300">💡</span><span>${tip}</span>`;
        container.appendChild(li);
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navigate to other pages
function showLanding() {
    window.location.href = 'index.html';
}

function showResume() {
    // Store flag to show resume page
    localStorage.setItem('showResumePage', 'true');
    window.location.href = 'index.html#resume';
}

// Scroll to section smoothly
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Interview Preparation Tab Functions
// ==========================================

function switchInterviewTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.interview-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hide all tab content
    document.querySelectorAll('.interview-tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // Activate selected tab
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    const activeContent = document.getElementById(`tab-${tabName}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
    }
}

// Load Placement Guide Content
function loadPlacementGuide() {
    if (!domainData.placementGuide) return;
    
    const guide = domainData.placementGuide;
    
    // Load Application Steps
    const applicationSteps = document.getElementById('applicationSteps');
    if (applicationSteps) {
        applicationSteps.innerHTML = guide.applicationSteps.map(step => `
            <div class="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    ${step.icon}
                </div>
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <span class="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">Step ${step.step}</span>
                        <h5 class="font-bold text-gray-800">${step.title}</h5>
                    </div>
                    <p class="text-sm text-gray-600">${step.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Load Top Companies
    const topCompanies = document.getElementById('topCompanies');
    if (topCompanies) {
        topCompanies.innerHTML = guide.topCompanies.map(company => `
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <div class="text-3xl mb-2 text-center">${company.icon}</div>
                <h5 class="font-bold text-gray-800 text-center mb-1">${company.name}</h5>
                <p class="text-xs text-gray-600 text-center mb-3">${company.roles}</p>
                <a href="${company.applyUrl}" target="_blank" class="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg transition text-sm">
                    Apply Now →
                </a>
            </div>
        `).join('');
    }
    
    // Load Preparation Timeline
    const preparationTimeline = document.getElementById('preparationTimeline');
    if (preparationTimeline) {
        preparationTimeline.innerHTML = guide.preparationTimeline.map(month => {
            const colorClasses = {
                green: 'bg-green-50 border-green-500',
                orange: 'bg-orange-50 border-orange-500',
                red: 'bg-red-50 border-red-500'
            };
            const badgeColors = {
                green: 'bg-green-500',
                orange: 'bg-orange-500',
                red: 'bg-red-500'
            };
            
            return `
                <div class="border-l-4 ${colorClasses[month.color]} p-4 rounded-r-lg">
                    <div class="flex items-center mb-2">
                        <span class="${badgeColors[month.color]} text-white text-xs font-bold px-3 py-1 rounded-full mr-2">${month.month}</span>
                        <h5 class="font-bold text-gray-800">${month.focus}</h5>
                    </div>
                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-700">
                        ${month.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
            `;
        }).join('');
    }
    
    // Load Placement Tips
    const placementTips = document.getElementById('placementTips');
    if (placementTips) {
        placementTips.innerHTML = guide.keyTips.map(tip => `
            <li class="flex items-start">
                <span class="mr-2 text-orange-500">✓</span>
                <span class="text-gray-700">${tip}</span>
            </li>
        `).join('');
    }
}

