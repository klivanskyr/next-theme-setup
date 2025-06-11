export default {
  name: "about",
  title: "About Me",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      initialValue: "Ryan Klivansky",
    },
    {
      name: "title",
      title: "Professional Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      initialValue: "Computer Engineering Student at Brown University",
    },
    {
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      validation: (Rule: any) => Rule.required().max(200),
      description: "Brief introduction for the hero section (max 200 characters)",
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Professional headshot or profile photo",
    },
    {
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        {
          name: "institution",
          title: "Institution",
          type: "string",
          initialValue: "Brown University",
        },
        {
          name: "degree",
          title: "Degree",
          type: "string",
          initialValue: "Computer Engineering",
        },
        {
          name: "year",
          title: "Class Year",
          type: "string",
          initialValue: "Junior",
        },
        {
          name: "gpa",
          title: "GPA (optional)",
          type: "number",
        },
        {
          name: "relevantCoursework",
          title: "Relevant Coursework",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "achievements",
          title: "Academic Achievements",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    },
    {
      name: "interests",
      title: "Technical Interests",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Interest Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: 'Lucide icon name (e.g., "code", "eye", "brain")',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "relatedSkills",
              title: "Related Skills",
              type: "array",
              of: [
                {
                  type: "reference",
                  to: [{ type: "skill" }],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: "personalValues",
      title: "Personal Values",
      type: "array",
      of: [{ type: "string" }],
      description: "Values that drive you (e.g., Problem Solving, Innovation, etc.)",
    },
    {
      name: "detailedBio",
      title: "Detailed Biography",
      type: "array",
      of: [{ type: "block" }],
      description: "Longer form biography with rich text formatting",
    },
    {
      name: "currentFocus",
      title: "Current Focus",
      type: "text",
      description: "What you're currently working on or learning",
    },
    {
      name: "careerGoals",
      title: "Career Goals",
      type: "text",
      description: "Your professional aspirations and goals",
    },
    {
      name: "hobbies",
      title: "Hobbies & Interests",
      type: "array",
      of: [{ type: "string" }],
      description: "Personal interests outside of technology",
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "city",
          title: "City",
          type: "string",
          initialValue: "Providence",
        },
        {
          name: "state",
          title: "State",
          type: "string",
          initialValue: "RI",
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          initialValue: "USA",
        },
      ],
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "github",
          title: "GitHub URL",
          type: "url",
          initialValue: "https://github.com/klivanskyr",
        },
        {
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
          initialValue: "https://linkedin.com/in/ryan-klivansky",
        },
        {
          name: "email",
          title: "Email",
          type: "email",
          initialValue: "klivanskyr@gmail.com",
        },
        {
          name: "twitter",
          title: "Twitter URL (optional)",
          type: "url",
        },
        {
          name: "website",
          title: "Personal Website (optional)",
          type: "url",
        },
      ],
    },
    {
      name: "resume",
      title: "Resume",
      type: "object",
      fields: [
        {
          name: "file",
          title: "Resume PDF",
          type: "file",
          options: {
            accept: ".pdf",
          },
        },
        {
          name: "lastUpdated",
          title: "Last Updated",
          type: "date",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "profileImage",
    },
  },
}
