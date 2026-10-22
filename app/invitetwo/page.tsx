"use client"

import { InvitationPage } from "@/components/invitation-page"
import { SiteConfigOverride } from "@/contexts/site-config-context"
import { applyInviteTwo } from "@/lib/site-config"

// Reception-only invitation: date/venue, guest list, FAQ and Event Details text come from
// siteConfig.inviteTwo (applyInviteTwo); no entourage / principal sponsors, no timeline.
export default function InviteTwoPage() {
  return (
    <SiteConfigOverride transform={applyInviteTwo}>
      <InvitationPage sponsorsList="two" showEntourage={false} showTimeline={false} />
    </SiteConfigOverride>
  )
}
