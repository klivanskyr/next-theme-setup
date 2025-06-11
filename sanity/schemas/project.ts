export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required().max(500),
      description: "Brief description of the project (max 500 characters)",
    },
    {
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "skills",
      title: "Skills/Technologies Used",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.required().min(1),
      description: "Technologies, frameworks, and tools used in this project",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "Web Development" },
          { title: "AI/ML", value: "AI/ML" },
          { title: "Mobile Development", value: "Mobile Development" },
          { title: "IoT", value: "IoT" },
          { title: "Systems", value: "Systems" },
          { title: "Blockchain", value: "Blockchain" },
          { title: "Game Development", value: "Game Development" },
          { title: "Data Science", value: "Data Science" },
          { title: "DevOps", value: "DevOps" },
          { title: "Other", value: "Other" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
      description: "Mark as featured to highlight this project",
    },
    {
      name: "showLiveDemo",
      title: "Show Live Demo Button",
      type: "boolean",
      initialValue: true,
      description: "Toggle visibility of the Live Demo button",
    },
    {
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
      hidden: ({ document }: any) => !document?.showLiveDemo,
      validation: (Rule: any) =>
        Rule.custom((liveUrl: string, context: any) => {
          const { document } = context
          if (document?.showLiveDemo && !liveUrl) {
            return "Live Demo URL is required when Show Live Demo is enabled"
          }
          return true
        }),
    },
    {
      name: "showCode",
      title: "Show Code Button",
      type: "boolean",
      initialValue: true,
      description: "Toggle visibility of the Code/GitHub button",
    },
    {
      name: "githubUrl",
      title: "GitHub Repository URL",
      type: "url",
      hidden: ({ document }: any) => !document?.showCode,
      validation: (Rule: any) =>
        Rule.custom((githubUrl: string, context: any) => {
          const { document } = context
          if (document?.showCode && !githubUrl) {
            return "GitHub URL is required when Show Code is enabled"
          }
          return true
        }),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (when not sorting by featured)",
    },
    {
      name: "startDate",
      title: "Project Start Date",
      type: "date",
      description: "When you started working on this project",
    },
    {
      name: "endDate",
      title: "Project End Date",
      type: "date",
      description: "When you completed this project (leave empty if ongoing)",
    },
    {
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In Progress", value: "in-progress" },
          { title: "On Hold", value: "on-hold" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "completed",
    },
    {
      name: "detailedDescription",
      title: "Detailed Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed project description with rich text formatting",
    },
    {
      name: "challenges",
      title: "Challenges & Solutions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "challenge",
              title: "Challenge",
              type: "string",
            },
            {
              name: "solution",
              title: "Solution",
              type: "text",
            },
          ],
        },
      ],
      description: "Key challenges faced and how you solved them",
    },
    {
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Main features and functionalities of the project",
    },
    {
      name: "teamSize",
      title: "Team Size",
      type: "number",
      description: "Number of people who worked on this project (1 for solo projects)",
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: "myRole",
      title: "My Role",
      type: "string",
      description: "Your specific role in this project",
      placeholder: "e.g., Full-Stack Developer, Lead Frontend Developer, etc.",
    },
  ],
  orderings: [
    {
      title: "Featured First, Then by Order",
      name: "featuredOrder",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Most Recent First",
      name: "dateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Category, Then Order",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      featured: "featured",
      status: "status",
    },
    prepare(selection: any) {
      const { title, subtitle, media, featured, status } = selection
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${subtitle} • ${status}`,
        media,
      }
    },
  },
}
