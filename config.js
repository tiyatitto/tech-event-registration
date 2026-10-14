// ✏️ EDIT THIS FILE to change fest details and the event list.
// The frontend and the validation both read from here.
module.exports = {
  FEST: {
    name: 'TAKSHAK',
    tagline: 'The annual technical fest of MACE. Code it. Build it. Break it. Win it.',
    organiser: 'Mar Athanasius College of Engineering, Kothamangalam',
    dates: 'October 2 & 3, 2026',
    venue: 'Mar Athanasius College of Engineering (MACE), Kothamangalam, Kerala 686 666, India'
  },
  EVENTS: [
    { name: 'Code Sprint', emoji: '⌨️', category: 'Coding Competition', date: '2026-10-02', time: '9:30 AM–12:30 PM',
      blurb: 'Race the clock to solve algorithmic challenges and climb the leaderboard.' },
    { name: 'Tech Quiz', emoji: '🧠', category: 'Quiz', date: '2026-10-02', time: '10:00 AM–11:30 AM',
      blurb: 'Put your technology, science, and computing knowledge to the test.' },
    { name: 'Web Design Challenge', emoji: '🖥️', category: 'Design', date: '2026-10-02', time: '1:30 PM–3:30 PM',
      blurb: 'Create a polished, responsive web experience from a surprise brief.' },
    { name: 'Robo Wars', emoji: '🤖', category: 'Robotics', date: '2026-10-03', time: '9:30 AM–12:30 PM',
      blurb: 'Bring your machine to the arena and outlast the competition.' },
    { name: 'Project Expo', emoji: '🚀', category: 'Exhibition', date: '2026-10-03', time: '10:00 AM–2:00 PM',
      blurb: 'Showcase a working project, share your process, and meet fellow builders.' },
    { name: 'Capture The Flag – Cybersecurity', emoji: '🔐', category: 'Cybersecurity', date: '2026-10-03', time: '1:30 PM–3:30 PM',
      blurb: 'Find vulnerabilities, solve security puzzles, and capture the flags.' }
  ]
};
