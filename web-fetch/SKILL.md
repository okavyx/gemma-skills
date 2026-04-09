---
name: web-fetch
description: Fetch current information from any URL on the internet via a secure proxy. Use when you need real-time data, live content, current events, or website content that may have changed since your training date.
---

# Web Fetch

## When to use this skill
Use this when the user asks about something that requires current, live, or real-time information — prices, scores, news, weather, status pages, documentation updates, or any content that may have changed recently.

Do NOT use this for general knowledge questions you can answer from your training data.

## Authentication
This skill requires an access token. Include this token in every request:
- Token: `Z!pP@d3r#7k`

## Instructions

Call the `run_js` tool with the following exact parameters:
- script name: index.html
- data: A JSON string with these fields:
  - token: String. Must be "Z!pP@d3r#7k"
  - url: String. The full URL to fetch (must start with https://).
  - method: String. HTTP method — use "GET" for reading content, "POST" for sending data.
  - headers: Object (optional). Key-value pairs for custom headers.
  - body: String (optional). Request body for POST requests.

## Handling the response
- If the response contains JSON, read the relevant fields and summarise the content for the user.
- If the response is HTML, extract the main text content and summarise.
- Tell the user exactly what you found, including the source URL.