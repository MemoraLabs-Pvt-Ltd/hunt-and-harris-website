# Hunt & Harris CRM Feed API — Reference

> **Source note:** This is **not** Onlinist's official documentation. It is a
> reference compiled by observing the live API (`api-crm.huntandharris-re.com`)
> on 2026-08-13. Field availability was verified across all 938 listings. For
> the authoritative spec — auth, rate limits, blog/news feeds — ask your
> Onlinist account contact (their platform site `onlinist.com` was down at time
> of writing).

## Base URL

```
https://api-crm.huntandharris-re.com
```

- No authentication required for the feed (public, read-only).
- CORS is **not** enabled → cannot be fetched from the browser. Fetch it
  server-side / at build time (this is why the site bakes it into static JSON).

## Endpoints

| Method | Path | Returns | Notes |
|---|---|---|---|
| GET | `/` | JSON health check | `{"status":"success","record":"Welcome to CRM APIs…"}` |
| GET | `/listings/feed/generic` | XML property feed | **The endpoint the site uses.** |
| GET | `/listings/feed` | XML property feed | Same data |
| GET | `/listings/feed/kyero` | XML property feed | Same data (Kyero v3 format) |
| GET | `/listings/feed/blog` | XML property feed | ⚠️ Misleading name — returns **properties**, not blogs |

### No blog / news / article feed
Every content path probed returns `404`:
`/blog`, `/blogs`, `/news`, `/articles`, `/content`, `/posts/feed/generic`,
`/api/blogs`, `/api/articles` …

```json
{ "status": "error", "error": { "code": 404, "message": "The path you are looking for not found" } }
```

**Conclusion:** this API exposes property listings only. Blog content, if it
exists in Onlinist, is not published through this API on these paths.

## Response shape (property feed)

```xml
<root>
  <kyero><feed_version>3</feed_version></kyero>
  <property>
    <ref>HH-R-12410</ref>
    <price>80000</price>
    ...
  </property>
  <!-- ~938 <property> elements -->
</root>
```

## Property fields (all present on 100% of 938 listings)

| Field | Example | Used on site? |
|---|---|---|
| `ref` | `HH-R-12410` | ✅ key / URL |
| `last_update` | `2026-08-13 17:59:37` | ✅ home "latest" sort |
| `price` | `80000` | ✅ |
| `currency` | `AED` | ✅ |
| `price_freq` | `year` / `month` | ✅ |
| `property_for` | `Sale` / `Rent` | ✅ filter + badge |
| `property_type` | `Residential` | ❌ mapped, not shown |
| `type` | `Apartment` / `Villa` | ✅ |
| `tower` | building/project name | ✅ |
| `sub_location` | `Falcon Island` | ✅ |
| `location` | area **string** (and a duplicate `{latitude,longitude}` object) | ✅ area + map pin |
| `city` | `Ras Al Khaimah` | ✅ |
| `country` | `AE` | ❌ not shown |
| `location_detail` | full address line | ✅ |
| `street` | street name | ❌ not mapped |
| `floor` | floor number | ✅ Details tab |
| `key_location` | landmark | ❌ not shown |
| `property_status` | `Available` | ✅ |
| `completion_status` | `Off Plan` / `Off Plan Primary` / `Ready` | ✅ off-plan filter |
| `title` | listing headline | ✅ |
| `beds` | `3` / `Studio` | ✅ |
| `baths` | `4` | ✅ |
| `surface_area` | `{ built, plot }` | ✅ |
| `size_unit` | `SqFt` | ✅ |
| `rent_frequency` | `Annual` | ✅ (rentals) |
| `cheques` | `4` | ✅ (rentals) |
| `view` | `Sea View` | ✅ Details tab |
| `furnished` | `Furnished` | ✅ |
| `parking` | `1` | ✅ Details tab |
| `featured` | `Yes` / `No` | ✅ home featured |
| `video_url` | tour video link | ❌ not shown (no player yet) |
| `desc` | HTML description | ✅ About section |
| `agent` | `{ name, mobile, email, reference, profile_picture }` | ✅ (except `reference`) |
| `images` | list of `<image><url><id>` | ✅ (`id` unused; `tags/tag=floorplan` used) |
| `features` | `<feature>` + `<amenity>` lists | ✅ Features tab |

### Nested structures

```
surface_area → { built, plot }
agent        → { name, mobile, email, reference, profile_picture }
images.image → { url, id, tags?: { tag: "floorplan" | ... } }
features     → { feature: [...], amenity: [...] }
location     → appears TWICE: once as an area string, once as { latitude, longitude }
```

## How the site consumes this

1. `scripts/gen-data.mjs` + the SSG build fetch the feed **once at build time**.
2. Parsed with `fast-xml-parser` → mapped in `src/data/feedLoader.js`.
3. Output: prerendered `/property/:ref` pages + static JSON
   (`public/data/home.json`, `listings-all.json`, `off-plan.json`) + `sitemap.xml`.
4. The browser only ever reads the same-origin static JSON (no CORS issue).
