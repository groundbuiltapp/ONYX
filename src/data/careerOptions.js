export const careerOptions = {
  business: {
    label: 'Business',
    fields: [
      {
        id: 'marketing',
        label: 'Marketing',
        prompt: 'Your campus event is next week, but not many people have heard about it. What would you do to get the word out?',
        internships: [
          { title: 'Social Media Intern', company: 'Example campus arts group', location: 'Remote' },
          { title: 'Content Marketing Intern', company: 'Example local bookstore', location: 'Hybrid' },
          { title: 'Brand Marketing Intern', company: 'Example student-focused startup', location: 'New York, NY' },
          { title: 'Email Marketing Intern', company: 'Example community organization', location: 'Remote' },
          { title: 'Campus Marketing Intern', company: 'Example education company', location: 'Boston, MA' },
        ],
      },
      {
        id: 'business-development',
        label: 'Business development',
        prompt: 'A neighborhood café might be a great partner for your student club. How would you introduce the idea and make it useful for both sides?',
        internships: [
          { title: 'Business Development Intern', company: 'Example neighborhood startup', location: 'Hybrid' },
          { title: 'Sales Intern', company: 'Example small business software team', location: 'Remote' },
          { title: 'Partnerships Intern', company: 'Example student services company', location: 'Boston, MA' },
          { title: 'Community Outreach Intern', company: 'Example local nonprofit', location: 'Chicago, IL' },
          { title: 'Account Growth Intern', company: 'Example independent retail group', location: 'Austin, TX' },
        ],
      },
      {
        id: 'events-planning',
        label: 'Events & planning',
        prompt: 'You have a small budget and one week to plan a student event people will actually want to attend. What would you do first?',
        internships: [
          { title: 'Event Planning Intern', company: 'Example campus events team', location: 'New York, NY' },
          { title: 'Community Events Intern', company: 'Example neighborhood arts center', location: 'Hybrid' },
          { title: 'Experiential Marketing Intern', company: 'Example creative studio', location: 'Los Angeles, CA' },
          { title: 'Conference Programs Intern', company: 'Example education nonprofit', location: 'Remote' },
          { title: 'Student Activities Intern', company: 'Example community college program', location: 'Seattle, WA' },
        ],
      },
      {
        id: 'other',
        label: 'Something else',
        prompt: 'Think of a small problem at school or in your community that you would like to make better. What would you change first?',
        internships: [
          { title: 'Operations Intern', company: 'Example local community group', location: 'Hybrid' },
          { title: 'Research Intern', company: 'Example youth research project', location: 'Remote' },
          { title: 'Program Assistant Intern', company: 'Example after-school program', location: 'Chicago, IL' },
          { title: 'People & Culture Intern', company: 'Example growing small business', location: 'New York, NY' },
          { title: 'Community Programs Intern', company: 'Example neighborhood nonprofit', location: 'Austin, TX' },
        ],
      },
    ],
  },
  tech: {
    label: 'Technology',
    fields: [
      {
        id: 'ai-software',
        label: 'AI & software',
        prompt: 'A study app gives students confusing answers. What would you check first to make the app more useful and trustworthy?',
        internships: [
          { title: 'AI Software Intern', company: 'Example learning technology team', location: 'Remote' },
          { title: 'Machine Learning Intern', company: 'Example research lab', location: 'Hybrid' },
          { title: 'AI Product Intern', company: 'Example student tools startup', location: 'San Francisco, CA' },
          { title: 'Software Developer Intern', company: 'Example small software studio', location: 'New York, NY' },
          { title: 'Data & AI Intern', company: 'Example education nonprofit', location: 'Remote' },
        ],
      },
      {
        id: 'engineering',
        label: 'Engineering',
        prompt: 'Students keep getting lost on your club’s website. If you had an afternoon to improve it, what would you look at first?',
        internships: [
          { title: 'Software Engineering Intern', company: 'Example web development team', location: 'Remote' },
          { title: 'Frontend Engineering Intern', company: 'Example campus app project', location: 'Hybrid' },
          { title: 'IT Support Intern', company: 'Example school technology team', location: 'Boston, MA' },
          { title: 'QA Engineering Intern', company: 'Example mobile app studio', location: 'New York, NY' },
          { title: 'Web Engineering Intern', company: 'Example community media group', location: 'Austin, TX' },
        ],
      },
      {
        id: 'other',
        label: 'Something else',
        prompt: 'What is one small tech idea that could make student life easier? How would you start exploring it?',
        internships: [
          { title: 'UX Research Intern', company: 'Example student design team', location: 'Remote' },
          { title: 'Product Design Intern', company: 'Example campus app team', location: 'San Francisco, CA' },
          { title: 'Technical Support Intern', company: 'Example community internet provider', location: 'Hybrid' },
          { title: 'Digital Projects Intern', company: 'Example library technology group', location: 'Chicago, IL' },
          { title: 'Product Testing Intern', company: 'Example educational games studio', location: 'Remote' },
        ],
      },
    ],
  },
};

export function getCareerField(track, fieldId) {
  const fields = careerOptions[track]?.fields || careerOptions.business.fields;
  return fields.find((field) => field.id === fieldId) || fields[0];
}
