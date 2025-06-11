export default {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Skill Icon/Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
      description: "Upload an icon or logo representing this skill",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Programming Languages", value: "programming" },
          { title: "Frontend Technologies", value: "frontend" },
          { title: "Backend & Database", value: "backend" },
          { title: "AI & Machine Learning", value: "ai" },
          { title: "DevOps & Tools", value: "devops" },
          { title: "Mobile Development", value: "mobile" },
          { title: "Design & UI/UX", value: "design" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "proficiencyLevel",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      initialValue: "intermediate",
    },
    {
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule: any) => Rule.min(0).max(20),
      description: "How many years you've been using this skill",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of your experience with this skill",
    },
    {
      name: "projects",
      title: "Related Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      description: "Projects where you used this skill",
    },
    {
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Certification Name",
              type: "string",
            },
            {
              name: "issuer",
              title: "Issuing Organization",
              type: "string",
            },
            {
              name: "date",
              title: "Date Obtained",
              type: "date",
            },
            {
              name: "url",
              title: "Certificate URL",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order within the category (lower numbers appear first)",
    },
    {
      name: "featured",
      title: "Featured Skill",
      type: "boolean",
      initialValue: false,
      description: "Highlight this skill as one of your strongest",
    },
    {
      name: "learningResources",
      title: "Learning Resources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Resource Title",
              type: "string",
            },
            {
              name: "url",
              title: "Resource URL",
              type: "url",
            },
            {
              name: "type",
              title: "Resource Type",
              type: "string",
              options: {
                list: [
                  { title: "Course", value: "course" },
                  { title: "Book", value: "book" },
                  { title: "Documentation", value: "documentation" },
                  { title: "Tutorial", value: "tutorial" },
                  { title: "Other", value: "other" },
                ],
              },
            },
          ],
        },
      ],
      description: "Resources you used to learn this skill",
    },
  ],
  orderings: [
    {
      title: "Category, Featured, Order",
      name: "categoryFeaturedOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Proficiency Level",
      name: "proficiencyDesc",
      by: [{ field: "proficiencyLevel", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
      featured: "featured",
      proficiency: "proficiencyLevel",
    },
    prepare(selection: any) {
      const { title, subtitle, media, featured, proficiency } = selection
      const categoryLabels: { [key: string]: string } = {
        programming: "Programming Languages",
        frontend: "Frontend Technologies",
        backend: "Backend & Database",
        ai: "AI & Machine Learning",
        devops: "DevOps & Tools",
        mobile: "Mobile Development",
        design: "Design & UI/UX",
        other: "Other",
      }

      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${categoryLabels[subtitle] || subtitle} • ${proficiency}`,
        media,
      }
    },
  },
}
