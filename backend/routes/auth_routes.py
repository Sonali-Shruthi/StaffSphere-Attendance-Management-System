from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from extensions import mysql

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    cursor = mysql.connection.cursor()

    cursor.execute(
    """
    SELECT
        id,
        username,
        password,
        role,
        employee_code
    FROM users
    WHERE username = %s
    """,
    (username,)
)

    user = cursor.fetchone()

    cursor.close()

    if not user:
        return jsonify({
            "message": "Invalid username or password"
        }), 401

    user_id = user[0]
    db_username = user[1]
    db_password = user[2]
    db_role = user[3]
    employee_code = user[4]
    if not check_password_hash(db_password, password):
        return jsonify({
            "message": "Invalid username or password"
        }), 401

    access_token = create_access_token(
    identity=str(user_id),
    additional_claims={
        "role": db_role,
        "employee_code": employee_code
    }
)

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "username": db_username,
        "role": db_role,
        "employee_code": employee_code
    }), 200