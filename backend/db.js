const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbFile = process.env.DB_FILE || './portfolio.db';
const resolvedDbFile = path.resolve(__dirname, dbFile);
fs.mkdirSync(path.dirname(resolvedDbFile), { recursive: true });
const db = new Database(resolvedDbFile);
db.pragma('journal_mode = WAL');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

const count = db.prepare('SELECT COUNT(*) AS total FROM portfolio').get().total;
if (count === 0) {
  const insert = db.prepare(`INSERT INTO portfolio
    (owner_name, headline, bio, email, location, skills, projects, linkedin_url, github_url)
    VALUES (@owner_name, @headline, @bio, @email, @location, @skills, @projects, @linkedin_url, @github_url)`);
  const samples = [
    ['Boniface Chikomo','Cyber Security Student','I am a first-year Cyber Security student at Mulungushi University, interested in cybersecurity, ethical hacking and digital safety.','your-email@example.com','Zambia','Cybersecurity fundamentals, Python, Networking','Personal Portfolio Website','',''],
    ['Alex Banda','Computer Science Student','Learning software development and building practical projects.','','Zambia','HTML, CSS, JavaScript','Student Task Tracker','',''],
    ['Mary Phiri','IT Student','Interested in databases, web development and solving real problems with technology.','','Zambia','SQL, Python, HTML','Library Records App','',''],
    ['John Zulu','Web Developer','Building responsive websites and learning modern web technologies.','','Zambia','HTML, CSS, JavaScript','Business Landing Page','',''],
    ['Grace Tembo','Cybersecurity Learner','Exploring online safety, secure systems and responsible security practices.','','Zambia','Networking, Digital Safety','Cyber Awareness Notes','',''],
    ['Peter Mwila','Software Student','Practising programming fundamentals and version control.','','Zambia','Python, Git','Student Calculator','',''],
    ['Ruth Chanda','UI Design Learner','Interested in accessible interfaces and user-centred design.','','Zambia','UI Design, CSS','Portfolio Mockup','',''],
    ['David Lungu','Networking Student','Learning how devices communicate across computer networks.','','Zambia','Networking, Troubleshooting','Network Lab Notes','',''],
    ['Faith Sakala','Data Student','Exploring data organisation, databases and basic analysis.','','Zambia','SQL, Spreadsheets','Student Data Tracker','',''],
    ['Michael Phiri','Programming Student','Improving my coding skills through consistent practice.','','Zambia','JavaScript, Python','Coding Practice Log','','']
  ];
  const seed = db.transaction((rows) => rows.forEach((r) => insert.run({
    owner_name:r[0], headline:r[1], bio:r[2], email:r[3], location:r[4], skills:r[5], projects:r[6], linkedin_url:r[7], github_url:r[8]
  })));
  seed(samples);
}
module.exports = db;
