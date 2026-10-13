# Mamta Memorial Junior High School Website

A responsive school website built with HTML templates, CSS, JavaScript, and Python (Flask).

## Pages
- Home
- About Us
- Academics
- Admissions (demo enquiry form)
- Facilities
- Gallery (illustrative placeholders)
- Contact (demo message form)
- Login (UI only)
- Switch School (single-school demo)

## Run locally
1. Install Python 3.10+.
2. Open a terminal in this folder.
3. Create/activate a virtual environment (recommended).
4. Run: `pip install -r requirements.txt`
5. Run: `python app.py`
6. Open `http://127.0.0.1:5000`

## Before publishing
- Replace the sample phone numbers and email in `app.py`.
- Replace the text-based MMJHS logo with the official school logo.
- Confirm school address, grades, and all factual school details.
- Connect enquiry/contact forms to a database or email service.
- Add secure authentication before enabling real logins; never store passwords in plain text.
- Set a strong `SECRET_KEY`, disable Flask debug mode, and deploy behind a production WSGI server with HTTPS.
- Replace gallery placeholders with approved school photographs.

This is a working front-end/demo site. Form entries are validated but not saved.
