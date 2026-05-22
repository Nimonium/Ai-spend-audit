# Core Telemetry & Metrics

For the MVP wedge to be successful, we must ruthlessly measure funnel drop-off. The current architecture supports integrating PostHog or similar product analytics.

## Primary KPIs

1.  **Form Start Rate:** Percentage of landing page visitors who click "Start Free Audit." Target: >15%.
2.  **Form Completion Rate (The Crux):** Percentage of users who finish the multi-step form and generate an audit. 
    *   *Risk:* The form currently requires manual entry of tools. If drop-off exceeds 60%, we must simplify the form or rethink the friction.
3.  **Consultation Conversion Rate:** Percentage of generated audits that result in a booked Credex Consultation. Target: >2%. 

## Secondary System Metrics

*   **Audit Engine Execution Time:** Currently sub-10ms because it is a deterministic function. Must remain under 50ms to ensure zero layout shift.
*   **Database Fallback Triggers:** Tracking how often `mockDatabase` is used in production indicates Supabase connection instability or misconfigured environment variables.
