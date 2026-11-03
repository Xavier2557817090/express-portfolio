/* ============================================================
   File Name   : index.js (routes)
   Student's Name : 徐斌航
   StudentID   : 2024110514
   Date        : 2026-11-03
   Description : Express router for the portfolio site. Every
                 page of the site has its own GET route that
                 renders an EJS view with local data. The contact
                 form POST route captures the submitted info and
                 redirects the user back to the Home page.
   ============================================================ */

var express = require('express');
var router = express.Router();

/* ---------- Sample data (edit these to personalise the site) ---------- */

// Projects highlighted on the Projects page
var projects = [
  {
    title: 'Campus Eats – Online Food Ordering',
    image: '/images/project-1.svg',
    role: 'Full-Stack Developer (solo project)',
    outcome: 'Built a food ordering web app for the campus cafeteria using Node.js, Express and MongoDB. Students can browse the menu, place orders and track their status. Reduced average queue time at lunch by roughly 30%.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Bootstrap']
  },
  {
    title: 'TaskFlow – Personal Task Manager',
    image: '/images/project-2.svg',
    role: 'Front-End Developer & UI Designer',
    outcome: 'Designed and developed a responsive single-page task manager with drag-and-drop boards, due-date reminders and dark mode. Adopted by classmates during the exam period to organise study plans.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API']
  },
  {
    title: 'WeatherScope – Weather Dashboard',
    image: '/images/project-3.svg',
    role: 'Back-End Developer',
    outcome: 'Created a dashboard that consumes a third-party weather API and displays 7-day forecasts with animated charts. Implemented smart caching so repeat searches respond in under 100 ms.',
    tech: ['JavaScript', 'Express', 'Chart.js', 'Web API']
  }
];

// Services offered, listed on the Services page
var services = [
  {
    icon: 'bi-code-slash',
    title: 'Web Development',
    description: 'Design and build complete websites and web applications from concept to deployment using modern frameworks.'
  },
  {
    icon: 'bi-window-sidebar',
    title: 'Front-End Development',
    description: 'Responsive, accessible user interfaces with HTML5, CSS3, JavaScript and Bootstrap that look great on any device.'
  },
  {
    icon: 'bi-hdd-network',
    title: 'Back-End Development',
    description: 'Server-side logic, RESTful APIs and database integration built on Node.js and Express.'
  },
  {
    icon: 'bi-phone',
    title: 'Mobile-First Responsive Design',
    description: 'Mobile-friendly layouts that adapt smoothly from small phone screens to large desktop monitors.'
  },
  {
    icon: 'bi-database-check',
    title: 'Database Design & Integration',
    description: 'Modelling and connecting SQL / NoSQL databases so your data is stored safely and retrieved quickly.'
  },
  {
    icon: 'bi-bug-check',
    title: 'Testing & Debugging',
    description: 'Systematic testing, code reviews and debugging to keep your project error free and maintainable.'
  }
];

/* ---------- Site page routes (GET) ---------- */

/* GET Home page – welcome message, mission statement and links to other pages */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    messageSent: req.query.sent === '1'   // show a success banner after the contact form is submitted
  });
});

/* GET About Me page – legal name, photo, short bio and resume link */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page – 3+ highlighted projects with images */
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects', projects: projects });
});

/* GET Services page – list of services offered */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services', services: services });
});

/* GET Contact Me page – contact info panel + message form */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

/* ---------- Contact form submission (POST) ---------- */

/* POST /contact – capture the submitted information, then redirect back to the Home page */
router.post('/contact', function (req, res, next) {
  // Capture the data entered by the user in the contact form
  var contactMessage = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    message: req.body.message,
    receivedAt: new Date().toISOString()
  };

  // Log the captured message (a real site would email or store it)
  console.log('New contact form submission:');
  console.log(JSON.stringify(contactMessage, null, 2));

  // Redirect the user back to the Home page with a success flag
  res.redirect('/?sent=1');
});

module.exports = router;
