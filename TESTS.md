# Testing Strategy

Our testing strategy prioritizes the financial integrity of the core audit engine. Because we are providing cost-saving recommendations to B2B teams, the underlying math must be flawless.

## Unit Testing (Vitest)
The `runAudit` function in `src/lib/audit-engine.ts` is designed as a pure, deterministic function. This allows for rapid, isolated unit testing without mocking databases or external APIs.

### Test Coverage
We currently enforce coverage across the following edge cases:
1.  **Duplicate Tooling:** Verifies that if a user submits both GitHub Copilot and Cursor, the engine recommends consolidating to the more expensive option to maximize displayed savings, while noting the IDE lock-in caveat.
2.  **Team Plan Downgrades:** Verifies that teams of ≤5 using ChatGPT Team are prompted to downgrade to Plus, correctly calculating the seat difference.
3.  **High API Spend:** Verifies the 40% heuristic applied to raw API usage.
4.  **Zero-Spend / Edge Cases:** Ensures that inputting 0 seats or $0 spend does not result in `NaN` or `Infinity` savings.

## Running Tests
Tests are executed via Vitest. To run the test suite locally:
```bash
npm run test
```

## Future Testing Scope (Pre-Series A)
*   **E2E (Playwright):** Add an end-to-end test flow that submits a mock form and validates the database insertion and report page routing.
*   **Load Testing (k6):** Verify the Server Action can handle 500+ concurrent requests without rate-limit failures when we implement Upstash Redis.
