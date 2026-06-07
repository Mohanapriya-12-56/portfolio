import axios from 'axios';
import { skills, projects, experience } from './data.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact';
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const storedTheme = localStorage.getItem('portfolio-theme');

if (storedTheme === 'dark') {
  htmlElement.classList.add('dark');
  themeToggle.textContent = 'Light mode';
}

themeToggle.addEventListener('click', () => {
  const isDark = htmlElement.classList.toggle('dark');
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

const skillsGrid = document.getElementById('skillsGrid');
const projectsGrid = document.getElementById('projectsGrid');
const experienceGrid = document.getElementById('experienceGrid');

const createCard = (title, description) => {
  const card = document.createElement('article');
  card.className = 'glass-card p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20';
  card.innerHTML = `<h3 class="text-xl font-semibold text-white">${title}</h3><p class="mt-3 text-slate-300 leading-7">${description}</p>`;
  return card;
};

const renderSkills = () => {
  skills.forEach((skill, index) => {
    const card = createCard(skill.title, skill.description);
    card.classList.add('opacity-0', 'translate-y-6');
    card.style.transitionDelay = `${index * 80}ms`;
    skillsGrid.appendChild(card);
    requestAnimationFrame(() => card.classList.remove('opacity-0', 'translate-y-6'));
  });
};

const renderProjects = () => {
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'glass-card border-white/10 p-6 shadow-glass transition duration-300 hover:-translate-y-1 hover:border-violet-400/20';
    card.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-xl font-semibold text-white">${project.title}</h3>
        <span class="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-violet-200">Live</span>
      </div>
      <p class="mt-4 text-slate-300 leading-7">${project.description}</p>
      <div class="mt-6 flex flex-wrap gap-2 text-slate-400">
        ${project.tech.map((item) => `<span class="rounded-full border border-white/10 px-3 py-1 text-xs">${item}</span>`).join('')}
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="${project.github}" target="_blank" rel="noreferrer" class="btn-glass">GitHub</a>
        <a href="${project.demo}" target="_blank" rel="noreferrer" class="btn-glass">Live Demo</a>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
};

const renderExperience = () => {
  experience.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'glass-card p-6 border-white/10';
    card.innerHTML = `
      <div class="flex items-center justify-between gap-4">
        <div>
          <h3 class="text-xl font-semibold text-white">${item.title}</h3>
          <p class="mt-1 text-sm text-violet-300">${item.type}</p>
        </div>
        <p class="text-sm text-slate-400">${item.period}</p>
      </div>
      <p class="mt-4 text-slate-300 leading-7">${item.details}</p>
    `;
    experienceGrid.appendChild(card);
  });
};

const showToast = (message, variant = 'success') => {
  toast.textContent = message;
  toast.className = `toast ${variant === 'error' ? 'border-rose-400/40 bg-rose-950/90 text-rose-200' : 'border-emerald-400/40 bg-emerald-950/90 text-emerald-200'}`;
  toast.classList.remove('hidden');
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => toast.classList.add('hidden'), 3200);
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const bindContactForm = () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      subject: formData.get('subject')?.trim(),
      message: formData.get('message')?.trim()
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      showToast('Please fill out every field.', 'error');
      return;
    }

    if (!validateEmail(payload.email)) {
      showToast('Enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await axios.post(API_URL, payload);
      if (response.data?.success) {
        showToast('Message Sent Successfully');
        form.reset();
      } else {
        throw new Error(response.data?.message || 'Unable to send message');
      }
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Submission failed.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
};

const init = () => {
  renderSkills();
  renderProjects();
  renderExperience();
  bindContactForm();
};

init();
