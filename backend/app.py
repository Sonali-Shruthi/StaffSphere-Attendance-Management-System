from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import mysql, jwt
from routes.auth_routes import auth_bp
from routes.employee_routes import employee_bp
from routes.attendance_routes import attendance_bp
from routes.dashboard_routes import dashboard_bp
app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(dashboard_bp)
mysql.init_app(app)
jwt.init_app(app)

CORS(app)
app.register_blueprint(auth_bp)

app.register_blueprint(employee_bp)
app.register_blueprint(attendance_bp)
@app.route("/")
def home():
    return {
        "message": "Attendance Management System API Running"
    }

if __name__ == "__main__":
    app.run(debug=True)