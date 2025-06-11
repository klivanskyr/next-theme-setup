export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      initialValue: "Ryan Klivansky - Software Engineer",
    },
    {
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
      description: "Used for SEO meta description",
    },
    {
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description: "Your portfolio website URL",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Site favicon (32x32px recommended)",
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image shown when sharing your site on social media (1200x630px recommended)",
    },
    {
      name: "themeSettings",
      title: "Theme Settings",
      type: "object",
      fields: [
        {
          name: "defaultTheme",
          title: "Default Theme",
          type: "string",
          options: {
            list: [
              { title: "Light", value: "light" },
              { title: "Dark", value: "dark" },
              { title: "System", value: "system" },
            ],
          },
          initialValue: "light",
        },
        {
          name: "accentColor",
          title: "Accent Color",
          type: "color",
          description: "Primary accent color for the site",
        },
      ],
    },
    {
      name: "contactSettings",
      title: "Contact Settings",
      type: "object",
      fields: [
        {
          name: "emailNotifications",
          title: "Enable Email Notifications",
          type: "boolean",
          initialValue: true,
          description: "Receive email notifications when someone submits the contact form",
        },
        {
          name: "autoReply",
          title: "Auto Reply Message",
          type: "text",
          description: "Automatic reply message sent to people who contact you",
        },
        {
          name: "responseTime",
          title: "Expected Response Time",
          type: "string",
          initialValue: "24-48 hours",
          description: "How quickly you typically respond to messages",
        },
      ],
    },
    {
      name: "analyticsSettings",
      title: "Analytics Settings",
      type: "object",
      fields: [
        {
          name: "googleAnalyticsId",
          title: "Google Analytics ID",
          type: "string",
          description: "Your Google Analytics tracking ID (e.g., GA-XXXXXXXXX)",
        },
        {
          name: "enableAnalytics",
          title: "Enable Analytics",
          type: "boolean",
          initialValue: false,
        },
      ],
    },
    {
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "object",
      fields: [
        {
          name: "enabled",
          title: "Enable Maintenance Mode",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "message",
          title: "Maintenance Message",
          type: "text",
          description: "Message to show when site is in maintenance mode",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      }
    },
  },
}
