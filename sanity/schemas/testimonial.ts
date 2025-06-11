export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Person's Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "testimonial",
      title: "Testimonial Text",
      type: "text",
      validation: (Rule: any) => Rule.required().max(500),
      description: "The testimonial content (max 500 characters)",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1).max(5),
      description: "Rating out of 5 stars",
    },
    {
      name: "relationship",
      title: "Professional Relationship",
      type: "string",
      options: {
        list: [
          { title: "Colleague", value: "colleague" },
          { title: "Manager", value: "manager" },
          { title: "Client", value: "client" },
          { title: "Professor", value: "professor" },
          { title: "Mentor", value: "mentor" },
          { title: "Team Member", value: "team-member" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "linkedinUrl",
      title: "LinkedIn Profile",
      type: "url",
      description: "Link to their LinkedIn profile for verification",
    },
    {
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      initialValue: false,
      description: "Show this testimonial prominently",
    },
    {
      name: "dateReceived",
      title: "Date Received",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "projectContext",
      title: "Project Context",
      type: "reference",
      to: [{ type: "project" }],
      description: "Which project this testimonial relates to (if applicable)",
    },
  ],
  orderings: [
    {
      title: "Featured First, Then by Date",
      name: "featuredDate",
      by: [
        { field: "featured", direction: "desc" },
        { field: "dateReceived", direction: "desc" },
      ],
    },
    {
      title: "Highest Rating First",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "image",
      featured: "featured",
      rating: "rating",
    },
    prepare(selection: any) {
      const { title, subtitle, media, featured, rating } = selection
      const stars = "⭐".repeat(rating)
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${subtitle} • ${stars}`,
        media,
      }
    },
  },
}
