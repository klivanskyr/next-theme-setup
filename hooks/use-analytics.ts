"use client"

import { useCallback } from "react"

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "user_interaction",
        ...parameters,
      })
    }
  }, [])

  const trackNameStyleChange = useCallback(
    (styleName: string, method: "auto" | "manual") => {
      trackEvent("name_style_change", {
        event_label: styleName,
        method: method,
      })
    },
    [trackEvent],
  )

  const trackProjectView = useCallback(
    (projectTitle: string) => {
      trackEvent("project_view", {
        event_label: projectTitle,
      })
    },
    [trackEvent],
  )

  const trackSkillClick = useCallback(
    (skillName: string) => {
      trackEvent("skill_click", {
        event_label: skillName,
      })
    },
    [trackEvent],
  )

  const trackContactFormSubmit = useCallback(() => {
    trackEvent("contact_form_submit", {
      event_category: "conversion",
    })
  }, [trackEvent])

  const trackResumeDownload = useCallback(() => {
    trackEvent("resume_download", {
      event_category: "conversion",
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackNameStyleChange,
    trackProjectView,
    trackSkillClick,
    trackContactFormSubmit,
    trackResumeDownload,
  }
}
