const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const projectData = {
  vada: {
    number: '01', category: 'Embedded systems · Rocket avionics', title: 'VADA Avionics',
    subtitle: 'Astro Club, BITS Pilani · December 2025 – May 2026',
    overview: '<p>Designed and developed the architecture for a custom rocket avionics system built around Raspberry Pi Pico 2 microcontrollers. The system brings together flight sensors, onboard storage, and LoRa telemetry in a compact platform.</p><h3>My contribution</h3><ul><li>Planned system architecture and selected components for the avionics system.</li><li>Designed the KiCad schematic for a custom shield PCB integrating sensor, SD-card, and LoRa interfaces.</li><li>Assembled fabricated boards and helped test and debug hardware.</li><li>Developed and debugged RTOS-based firmware for sensors and peripherals.</li></ul>',
    approach: '<p>I approached the system as an integration problem: define the interfaces first, then bring up each peripheral and validate the data path before relying on the full system.</p><ul><li>Organized sensor and peripheral connections around I²C and SPI.</li><li>Integrated IMUs, barometric sensors, SD-card logging, and telemetry hardware.</li><li>Worked through board-level and firmware debugging as the components came together.</li></ul><p>The emphasis was on making the hardware and firmware work together as a flight-computer system, not just designing each part in isolation.</p>',
    tools: '<p><strong>Microcontroller:</strong> Raspberry Pi Pico 2</p><p><strong>Firmware:</strong> C/C++, PlatformIO, RTOS-based development</p><p><strong>Interfaces:</strong> I²C, SPI, sensor interfacing, SD-card data logging, LoRa telemetry</p><p><strong>Hardware:</strong> KiCad schematic design, PCB assembly, soldering, testing, and debugging</p>'
  },
  skywalker: {
    number: '02', category: 'High-powered rocketry · Avionics', title: 'Project Skywalker',
    subtitle: 'Astro Club, BITS Pilani · December 2024 – May 2025',
    overview: '<p>Contributed to a student-built high-powered rocket project spanning flight-computer development, motor and nozzle design, mechanical CAD, and flight simulation.</p><h3>My contribution</h3><ul><li>Programmed and debugged the rocket’s flight computer based on Raspberry Pi Zero 2 W and Arduino Nano ESP32.</li><li>Designed the rocket motor and nozzle using OpenMotor.</li><li>Simulated flight characteristics with OpenRocket and assisted with CAD design of mechanical components.</li></ul><p>Project performance figures of approximately 2,800 m altitude and 26 G peak acceleration are estimates from the project, not independently verified flight measurements.</p>',
    approach: '<p>The project connected several disciplines: avionics for onboard computing, mechanical design for the vehicle, and simulation to estimate how the complete rocket would perform.</p><ul><li>Worked on the flight-computer software and debugging.</li><li>Used motor and flight simulation tools to explore expected performance.</li><li>Contributed to mechanical design alongside the electronics work.</li></ul>',
    tools: '<p><strong>Flight computer:</strong> Raspberry Pi Zero 2 W, Arduino Nano ESP32</p><p><strong>Simulation:</strong> OpenRocket, OpenMotor</p><p><strong>Design:</strong> CAD, flight-system electronics, firmware debugging</p>'
  },
  'mars-mesh': {
    number: '03', category: 'Hardware hackathon · Electronics', title: 'Mars Communication Mesh',
    subtitle: 'Hardware Hackathon 2.0 · Second place · December 2025',
    overview: '<p>A team project developed during a 72-hour hardware hackathon focused on systems for human travel and survival on Mars. The concept connected surface nodes, a ground station, and a 1U CubeSat prototype as a Mars communication mesh.</p><h3>My contribution</h3><ul><li>Designed a discrete H-bridge driver for a custom PCB magnetorquer.</li><li>Worked on MicroPython demonstration code.</li><li>Collaborated with the team on the broader communication-mesh prototype.</li></ul><p>The team placed second in Hardware Hackathon 2.0.</p>',
    approach: '<p>My work focused on the electronics that drive the magnetorquer: translating the intended control behavior into a discrete H-bridge circuit, then helping demonstrate it through code.</p><ul><li>Designed the discrete driver circuit for the custom magnetorquer PCB.</li><li>Worked on the demonstration code in MicroPython.</li><li>Integrated this component into the wider team concept.</li></ul>',
    tools: '<p><strong>Electronics:</strong> Discrete H-bridge, custom PCB, magnetorquer driver</p><p><strong>Programming:</strong> MicroPython</p><p><strong>Project context:</strong> Mars surface nodes, ground station, 1U CubeSat prototype, communication mesh</p>'
  }
};
const order = ['vada', 'skywalker', 'mars-mesh'];
const modal = document.getElementById('project-modal');
const dialog = modal.querySelector('.modal-dialog');
const content = document.getElementById('modal-content');
const tabs = [...modal.querySelectorAll('[data-tab]')];
let activeProject = 'vada';
let activeTab = 'overview';
let previousFocus = null;

function renderProject() {
  const project = projectData[activeProject];
  document.getElementById('modal-number').textContent = 'PROJECT / ' + project.number;
  document.getElementById('modal-category').textContent = project.category;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-subtitle').textContent = project.subtitle;
  tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.tab === activeTab)));
  content.innerHTML = project[activeTab];
  document.getElementById('prev-project').disabled = order.indexOf(activeProject) === 0;
  document.getElementById('next-project').disabled = order.indexOf(activeProject) === order.length - 1;
}
function openProject(id) {
  if (!projectData[id]) return;
  activeProject = id;
  activeTab = 'overview';
  previousFocus = document.activeElement;
  renderProject();
  modal.hidden = false;
  document.body.classList.add('modal-open');
  dialog.focus();
  history.replaceState(null, '', '#' + activeProject);
}
function closeProject() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  history.replaceState(null, '', location.pathname + location.search);
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
modal.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeProject));
tabs.forEach(tab => tab.addEventListener('click', () => { activeTab = tab.dataset.tab; renderProject(); }));
document.getElementById('prev-project').addEventListener('click', () => {
  const i = order.indexOf(activeProject);
  if (i > 0) { activeProject = order[i - 1]; activeTab = 'overview'; renderProject(); history.replaceState(null, '', '#' + activeProject); }
});
document.getElementById('next-project').addEventListener('click', () => {
  const i = order.indexOf(activeProject);
  if (i < order.length - 1) { activeProject = order[i + 1]; activeTab = 'overview'; renderProject(); history.replaceState(null, '', '#' + activeProject); }
});
modal.querySelector('.copy-project-link').addEventListener('click', async event => {
  const url = location.origin + location.pathname + '#' + activeProject;
  const button = event.currentTarget;
  try { await navigator.clipboard.writeText(url); button.firstChild.textContent = 'Link copied '; }
  catch { button.firstChild.textContent = url + ' '; }
});
document.addEventListener('keydown', event => {
  if (!modal.hidden && event.key === 'Escape') closeProject();
});
function openProjectFromHash() {
  const id = location.hash.slice(1);
  if (projectData[id]) {
    activeProject = id;
    activeTab = 'overview';
    renderProject();
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }
}
window.addEventListener('hashchange', openProjectFromHash);
openProjectFromHash();
