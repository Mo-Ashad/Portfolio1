// Small helper
const q = s => document.querySelector(s);
const qa = s => document.querySelectorAll(s);

// Preloader
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    const p = q('#preloader');
    if(p) p.style.display='none';
  },700);
});

// Mobile nav
const hamburger = q('#hamburger');
const nav = q('#nav-menu');
hamburger && hamburger.addEventListener('click', ()=>{
  nav.classList.toggle('open');
  hamburger.classList.toggle('is-active');
});

// Smooth scroll and active link
const links = qa('.nav-link');
links.forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const href = link.getAttribute('href');
    document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    if(nav.classList.contains('open')) nav.classList.remove('open');
  });
});

// Back to top
const back = q('#backToTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY>400) back.style.display='flex'; else back.style.display='none';
});
back.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

// Typing effect
const typingEl = q('#typing');
const words = ['DevOps Learner','Cloud Computing Intern','Linux Learner','Docker Learner','Kubernetes Learner','CI/CD Learner','Cloud Networking Learner','Python Developer'];
let wI=0, chI=0, forward=true;
function typeTick(){
  const word = words[wI];
  if(forward){
    chI++;
    typingEl.textContent = word.slice(0,chI) + ' |';
    if(chI===word.length){forward=false;setTimeout(typeTick,900);return}
  } else {
    chI--;
    typingEl.textContent = word.slice(0,chI) + ' |';
    if(chI===0){forward=true;wI=(wI+1)%words.length}
  }
  setTimeout(typeTick,80);
}
if(typingEl) typeTick();

// Skills data
const skills = [
  ['Linux',75],['Git & GitHub',80],['Docker',70],['Kubernetes',65],['Cloud Computing',75],['Cloud Networking',65],['CI/CD',60],['GitHub Actions',60],['Jenkins Basics',55],['Terraform Basics',50],['AWS Basics',65],['Google Cloud Basics',60],['Python',80],['Shell Scripting',55],['HTML/CSS',70],['SQL',70],['Data Analytics',65]
];
const skillsGrid = q('#skills-grid');
skills.forEach(s=>{
  const card = document.createElement('div');card.className='skill-card';
  card.innerHTML = `<div class="skill-info"><div class="skill-name">${s[0]}</div><div class="progress"><div class="progress-fill" data-width="${s[1]}"></div></div></div><div class="skill-percent">${s[1]}%</div>`;
  skillsGrid.appendChild(card);
});

// Animate skills when skills section becomes visible
const skillsSection = q('#skills');
const progressFills = () => qa('.progress-fill');

function fillSkillBars(){
  progressFills().forEach(el=>{
    const w = el.dataset.width || el.getAttribute('data-width') || '0';
    el.style.width = w + '%';
  });
}

if(window.IntersectionObserver && skillsSection){
  const obs = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        fillSkillBars();
        observer.disconnect();
      }
    });
  },{threshold:0.25});
  obs.observe(skillsSection);
} else {
  // fallback: fill on load
  window.addEventListener('load', fillSkillBars);
}

// Projects data
const projects = [
  {title:'Dockerized Flask Web Application',desc:'A Flask web application containerized using Docker with a Dockerfile, image build process, and port mapping.',tech:'Python, Flask, Docker',tag:'devops',github:'#',live:'#'},
  {title:'CI/CD Pipeline with GitHub Actions',desc:'Automated build and deployment workflow using GitHub Actions triggered on git pushes.',tech:'GitHub Actions, Git, YAML, Python',tag:'devops',github:'#',live:'#'},
  {title:'Kubernetes Deployment Practice',desc:'Kubernetes manifests for deployments, services, and scaling — practice lab for orchestration.',tech:'Kubernetes, Docker, YAML',tag:'devops',github:'#',live:'#'},
  {title:'Cloud Computing Practice Labs',desc:'Collection of cloud practice labs covering Linux, Docker, Kubernetes, cloud networking, and deployment.',tech:'Cloud, Linux, Docker, Kubernetes',tag:'cloud',github:'#',live:'#'},
  {title:'Terraform Infrastructure as Code Basics',desc:'Beginner-level Terraform project to provision simple cloud resources and manage infrastructure as code.',tech:'Terraform, IaC, AWS Basics',tag:'devops',github:'#',live:'#'}
];
const projectsGrid = q('#projects-grid');
projects.forEach(p=>{
  const card = document.createElement('div');card.className='project-card';
  card.dataset.tag = p.tag;
  card.innerHTML = `<img src="/static/images/project-placeholder.png" alt="${p.title}"><h3>${p.title}</h3><p>${p.desc}</p><div class="project-meta"><div class="project-tags"><span class="tag">${p.tech}</span></div><div class="project-actions"><a href="${p.github}" target="_blank">GitHub</a><a href="${p.live}" target="_blank">Live Demo</a></div></div>`;
  projectsGrid.appendChild(card);
});

// Project filtering
qa('.filter').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    qa('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    qa('.project-card').forEach(card=>{
      if(f==='all'||card.dataset.tag===f) card.style.display='block'; else card.style.display='none';
    });
  });
});

// Certificates
const certs = [
  {name:'CodeAlpha Cloud Computing Internship Certificate',plat:'CodeAlpha',desc:'Cloud Computing internship certificate',img:'/static/images/cert-placeholder.png'},
  {name:'Kubernetes Certificate',plat:'Various',desc:'Kubernetes fundamentals certificate',img:'/static/images/cert-placeholder.png'},
  {name:'Cloud Computing Certificate',plat:'Various',desc:'Cloud fundamentals certificate',img:'/static/images/cert-placeholder.png'},
  {name:'Python for Data Science',plat:'IBM',desc:'Certificate for Python in Data Science',img:'/static/images/cert-placeholder.png'},
  {name:'Machine Learning',plat:'IBM',desc:'Machine Learning certificate',img:'/static/images/cert-placeholder.png'},
  {name:'SQL',plat:'Simplilearn',desc:'SQL fundamentals certificate',img:'/static/images/cert-placeholder.png'},
  {name:'Tata Data Analytics Virtual Internship',plat:'Tata',desc:'4 hour virtual internship',img:'/static/images/cert-placeholder.png'},
  {name:'JP Morgan Virtual Internship',plat:'JP Morgan',desc:'4 hour virtual internship',img:'/static/images/cert-placeholder.png'},
  {name:'DecodeLab Internship',plat:'DecodeLab',desc:'1 month practical internship',img:'/static/images/cert-placeholder.png'}
];
const certGrid = q('#cert-grid');
certs.forEach(c=>{
  const d = document.createElement('div');d.className='cert-card';
  d.innerHTML = `<img src="${c.img}" alt="${c.name}"><h4>${c.name}</h4><p>${c.plat}</p><div><a href="#" class="btn outline">View Certificate</a></div>`;
  certGrid.appendChild(d);
});

// Services
const services = [
  ['DevOps Basics','I understand DevOps fundamentals including development workflow, automation, deployment, CI/CD, and collaboration.','fa-cogs'],
  ['Linux Basics','Knowledge of basic Linux commands, file management, permissions, and server-side environments.','fa-terminal'],
  ['Docker Basics','Containerization concepts using Docker to package, manage, and deploy applications.','fa-docker'],
  ['Kubernetes Basics','Understanding of pods, clusters, deployments, services, scaling, and orchestration.','fa-network-wired'],
  ['CI/CD Pipeline','Automate build, test, and deployment processes using GitHub Actions and Jenkins.','fa-rocket'],
  ['Cloud Computing','Cloud fundamentals including storage, networking, deployment, and security basics.','fa-cloud'],
  ['Cloud Networking','Basic VPC, subnets, routing, security groups, and network connectivity concepts.','fa-network-wired'],
  ['Infrastructure as Code','Learning Terraform basics to define and version infrastructure as code.','fa-code']
];
const servicesGrid = q('.services-grid');
services.forEach(s=>{
  const card = document.createElement('div');card.className='service-card';
  card.innerHTML = `<i class="fa ${s[2]}"></i><h4>${s[0]}</h4><p>${s[1]}</p>`;
  servicesGrid.appendChild(card);
});

// Contact form: submit to backend /contact via fetch
const contactForm = q('#contactForm');
contactForm && contactForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const data = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    subject: contactForm.subject.value.trim(),
    message: contactForm.message.value.trim()
  };

  // basic client validation
  if(!data.name || !data.email || !data.message){
    alert('Please fill name, email and message.');
    return;
  }

  try{
    const res = await fetch('/contact', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const j = await res.json();
    if(res.ok && j.ok){
      alert('Message sent successfully. Thank you!');
      contactForm.reset();
    } else {
      alert('Error: ' + (j.error||'Unknown error'));
    }
  }catch(err){
    alert('Network error, could not send message.');
  }
});

// Scroll reveal simple
const srItems = qa('.project-card, .service-card, .cert-card, .timeline-item, .skill-card');
function reveal(){
  srItems.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 60) el.style.transform='translateY(0)', el.style.opacity=1;
  });
}
srItems.forEach(el=>{el.style.transform='translateY(18px)';el.style.opacity=0;el.style.transition='all .7s ease'});
window.addEventListener('scroll', reveal);reveal();

// Active nav on scroll
const sections = qa('section');
function setActiveOnScroll(){
  let idx = sections.length;
  while(--idx && window.scrollY + 120 < sections[idx].offsetTop){}
  qa('.nav-link').forEach(l=>l.classList.remove('active'));
  const id = sections[idx].id;
  const a = q(`.nav-link[href="#${id}"]`);
  if(a) a.classList.add('active');
}
window.addEventListener('scroll', setActiveOnScroll);
setActiveOnScroll();
