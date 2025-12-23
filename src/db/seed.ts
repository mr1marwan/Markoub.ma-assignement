import { db } from './index';
import { positions } from './schema';
import 'dotenv/config';

async function seed() {
  console.log('Seeding database...');

  await db.insert(positions).values([
    {
      title: 'Software engineer',
      department: 'Engineering',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'Full Stack Developer position',
      whatWeDo: `MarKoub.ma is a pioneering intercity bus ticketing platform in Morocco, committed to making travel easy, affordable, and convenient for everyone. We provide a seamless online experience for booking bus tickets, connecting users with a wide network of bus operators across the country. As we continue to grow, we are looking for a dynamic and experienced Full Stack Developer to join our team.`,
      yourMission: `In collaboration with our lead developer, you will be in charge of:
• Developing application components using React, Next.js, and React Native (with Expo).
• Adhering to and enforcing practices, procedures, and use of tool sets described in the team's working agreement.
• Building, improving, and maintaining our code base and projects, ensuring they are easy to use, properly tested, simple to extend, and ultimately driving value for our users.
• Working as a generalist across back-end, front-end, and mobile development priorities, building integrations and other features for the product.
• Supporting the test-driven development of the software stack (e.g., code reviews, unit tests, CI) and documentation.
• Implementing integrations with internal and external systems.
• Writing clean, efficient, and well-documented code.`,
      yourProfile: `• Experience in building frontend architecture and design systems.
• Practical experience in e2e and unit testing.
• Working understanding of mono repos and micro-frontends.
• Proficient with TypeScript (both frontend and backend).
• Great understanding of CI/CD, GitHub Actions, and Vite.
• Experience in mobile development using React Native and Expo.
• Able to learn new systems and languages with a short ramp-up period.
• Experienced in architecting and implementing robust, scalable solutions that tackle real user needs.
• Curious, positive, and a doer mentality.
• 3+ years of professional experience with React, Next.js, React Native, and TypeScript.`,
      techStack: `• Frontend: React, Next.js, JavaScript, TypeScript, Vite
• Mobile: React Native, Expo
• Libraries: TRPC, Shadcn UI, Drizzle ORM, Node SDKs for various tools
• FullStack: Next.js
• Backend: Node.js, Nitro
• DB: MySQL, Planetscale, Postgres, Clickhouse
• Cloud: VPS, Docker, Cloudflare, R2, Cloudflare Workers`,
      whatWeOffer: `• Opportunity to be part of a passionate, dynamic and motivated team.
• An entrepreneurial journey in a fast growing pioneering scale-up.
• Flexibility and a hybrid work environment.`,
    },
    {
      title: 'UX Designer',
      department: 'Design',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'User Experience Designer',
      whatWeDo: `MarKoub.ma is a pioneering intercity bus ticketing platform in Morocco. We're looking for a talented UX Designer to help shape the future of travel in Morocco.`,
      yourMission: `• Design intuitive and user-friendly interfaces
• Conduct user research and usability testing
• Create wireframes, prototypes, and high-fidelity designs
• Collaborate with developers to implement designs`,
      yourProfile: `• 3+ years of UX design experience
• Proficiency in Figma or similar design tools
• Strong portfolio demonstrating UX work
• Understanding of user-centered design principles`,
      techStack: `• Design: Figma, Adobe XD, Sketch
• Prototyping: Principle, ProtoPie
• Research: Hotjar, Google Analytics`,
      whatWeOffer: `• Creative freedom in a growing startup
• Collaborative team environment
• Flexible working hours`,
    },
    {
      title: 'Product Manager',
      department: 'Product',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'Product Manager',
      whatWeDo: `MarKoub.ma is transforming intercity travel in Morocco. We need a Product Manager to drive our product vision forward.`,
      yourMission: `• Define product strategy and roadmap
• Gather and prioritize product requirements
• Work closely with engineering and design teams
• Analyze metrics and user feedback`,
      yourProfile: `• 4+ years of product management experience
• Strong analytical and problem-solving skills
• Excellent communication abilities
• Experience with agile methodologies`,
      techStack: `• Tools: Jira, Linear, Notion
• Analytics: Mixpanel, Amplitude
• Design: Figma`,
      whatWeOffer: `• Leadership opportunity in a growing company
• Direct impact on product direction
• Competitive compensation`,
    },
    {
      title: 'Graphic Designer',
      department: 'Design',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'Graphic Designer',
      whatWeDo: `MarKoub.ma needs a creative Graphic Designer to elevate our brand presence.`,
      yourMission: `• Create visual content for marketing campaigns
• Design brand materials and assets
• Maintain brand consistency across platforms
• Collaborate with marketing team`,
      yourProfile: `• 2+ years of graphic design experience
• Proficiency in Adobe Creative Suite
• Strong portfolio of design work
• Understanding of branding principles`,
      techStack: `• Design: Adobe Photoshop, Illustrator, InDesign
• Motion: After Effects
• Collaboration: Figma`,
      whatWeOffer: `• Creative environment
• Portfolio-building opportunities
• Flexible schedule`,
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'Marketing Manager',
      whatWeDo: `MarKoub.ma is seeking a Marketing Manager to lead our growth initiatives.`,
      yourMission: `• Develop and execute marketing strategies
• Manage digital marketing campaigns
• Analyze campaign performance
• Lead marketing team`,
      yourProfile: `• 5+ years of marketing experience
• Proven track record in digital marketing
• Strong leadership skills
• Data-driven mindset`,
      techStack: `• Marketing: Google Ads, Facebook Ads, SEO tools
• Analytics: Google Analytics, Mixpanel
• Automation: HubSpot, Mailchimp`,
      whatWeOffer: `• Leadership role in a growing startup
• Budget for marketing initiatives
• Performance-based bonuses`,
    },
    {
      title: 'Account Manager',
      department: 'Customer Success',
      workType: 'Hybrid',
      location: 'Rabat, Morocco',
      description: 'Account Manager',
      whatWeDo: `MarKoub.ma needs an Account Manager to build and maintain relationships with our bus operator partners.`,
      yourMission: `• Manage relationships with bus operators
• Ensure partner satisfaction and success
• Identify growth opportunities
• Resolve partner issues`,
      yourProfile: `• 3+ years of account management experience
• Excellent communication skills
• Problem-solving ability
• Customer-focused mindset`,
      techStack: `• CRM: Salesforce, HubSpot
• Communication: Slack, Zoom
• Analytics: Excel, Google Sheets`,
      whatWeOffer: `• Relationship-building opportunities
• Growing network of partners
• Performance incentives`,
    },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
