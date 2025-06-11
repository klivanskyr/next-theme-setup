export default {
  name: "research",
  title: "Research Experience",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Research Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "institution",
      title: "Institution/Lab",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if this is ongoing research",
    },
    {
      name: "ongoing",
      title: "Ongoing Research",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "description",
      title: "Research Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "skills",
      title: "Research Areas & Technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "supervisor",
      title: "Research Supervisor",
      type: "string",
    },
    {
      name: "publications",
      title: "Publications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Publication Title",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "conference",
              title: "Conference/Journal",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "year",
              title: "Publication Year",
              type: "number",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "url",
              title: "Publication URL",
              type: "url",
            },
            {
              name: "abstract",
              title: "Abstract",
              type: "text",
            },
            {
              name: "authors",
              title: "Authors",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "pdfFile",
              title: "PDF File",
              type: "file",
              options: {
                accept: ".pdf",
              },
            },
          ],
        },
      ],
    },
    {
      name: "images",
      title: "Research Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    },
  ],
  orderings: [
    {
      title: "Start Date, New to Old",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "institution",
      ongoing: "ongoing",
      startDate: "startDate",
      endDate: "endDate",
    },
    prepare(selection: any) {
      const { title, subtitle, ongoing, startDate, endDate } = selection
      const dateRange = ongoing
        ? `${startDate ? new Date(startDate).getFullYear() : ""} - Present`
        : `${startDate ? new Date(startDate).getFullYear() : ""} - ${
            endDate ? new Date(endDate).getFullYear() :\
