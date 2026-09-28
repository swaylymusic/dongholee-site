# dongholee.ca

Personal brand website for Dongho Lee.

## Brand naming

- Use `Dongho Lee` as the primary English name everywhere.
- Use `이동호` when a Korean name is helpful for the audience.
- Do not shorten the public-facing name to `Dongho` or use `Don Lee` as a brand name.
- `donghotheagent.com` is the real estate website URL, not the preferred written name.
- Use `donlee@donlee.realtor` for direct contact on the personal website.
- Use `contact@donlee.realtor` for general inquiries and forms on the real estate website.
- Email subscriptions from `dongholee.ca` and `donghotheagent.com` are managed together in the same Resend audience/segment.


## Website structure

The main menu is About, Journals, Places, Work, Shop, and Contact. The brand name links home.

- `journals.html`: Ontario Living Guide and the Korean Naver blog.
- `shop.html`: published Gumroad products grouped into Homeowners and Realtors.
- `for-realtors.html`: detailed Realtor Toolkit page retaining the existing URL, with Shop as the active menu.
- `css/brand-system.css`: shared navigation, footer, typography, page introductions, Shop and Journals styles.
- `css/pages/home.css`: the approved homepage and responsive layout.
- `functions/api/newsletter.js`: existing email subscription proxy.

The main branch is connected to Cloudflare Pages. Version stylesheet links when changing their content. `_headers` requests revalidation so returning visitors receive updated pages.

Local mockups and inspection screenshots are excluded from Git. Product checkout and delivery remain on Gumroad.
