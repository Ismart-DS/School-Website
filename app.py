from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime

app = Flask(__name__)
app.secret_key = "change-this-secret-key"

SCHOOL = {
    "name": "MAMTA MEMORIAL JUNIOR HIGH SCHOOL",
    "phone1": "+91 9999999999",
    "phone2": "+91 9999999999",
    "email": "abcd@gmail.com",
    "address": "Bandipur, Ambedkar Nagar, Uttar Pradesh",
}

@app.context_processor
def inject_globals():
    return {"school": SCHOOL, "year": datetime.now().year}

@app.route("/")
def home():
    return render_template("index.html", title="Home")

@app.route("/about")
def about():
    return render_template("about.html", title="About Us")

@app.route("/academics")
def academics():
    return render_template("academics.html", title="Academics")

@app.route("/admissions", methods=["GET", "POST"])
def admissions():
    if request.method == "POST":
        name = request.form.get("student_name", "").strip()
        guardian = request.form.get("guardian_name", "").strip()
        phone = request.form.get("phone", "").strip()
        grade = request.form.get("grade", "").strip()
        if not all([name, guardian, phone, grade]):
            flash("Please complete all required fields.", "error")
        else:
            # Demo only: submissions are not stored. Connect a database/email service for production.
            flash(f"Thank you, {guardian}. Your enquiry for {name} (Class {grade}) has been received in this demo.", "success")
            return redirect(url_for("admissions"))
    return render_template("admissions.html", title="Admissions")

@app.route("/facilities")
def facilities():
    return render_template("facilities.html", title="Facilities")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html", title="Gallery")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        message = request.form.get("message", "").strip()
        if not name or not message:
            flash("Please enter your name and message.", "error")
        else:
            flash("Thanks! Your message was validated in this demo. Connect email/database to receive it.", "success")
            return redirect(url_for("contact"))
    return render_template("contact.html", title="Contact")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        flash("This is a front-end demo. Connect secure authentication before using real accounts.", "error")
        return redirect(url_for("login"))
    return render_template("login.html", title="Login")

@app.route("/switch-school")
def switch_school():
    return render_template("switch_school.html", title="Switch School")

if __name__ == "__main__":
    app.run(debug=True)
