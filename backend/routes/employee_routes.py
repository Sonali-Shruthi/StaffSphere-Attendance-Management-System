from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt
)
from extensions import mysql

employee_bp = Blueprint("employees", __name__)


@employee_bp.route("/employees", methods=["POST"])
@jwt_required()

def add_employee():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    data = request.get_json()

    employee_code = data.get("employee_code")
    employee_name = data.get("employee_name")
    email = data.get("email")
    mobile = data.get("mobile")
    department_id = data.get("department_id")
    designation = data.get("designation")

    cursor = mysql.connection.cursor()

    # Check duplicate employee code
    cursor.execute(
        """
        SELECT id
        FROM employees
        WHERE employee_code = %s
        """,
        (employee_code,)
    )

    existing_employee = cursor.fetchone()

    if existing_employee:
        cursor.close()

        return jsonify({
            "message": "Employee code already exists"
        }), 400

    # Check duplicate email
    cursor.execute(
        """
        SELECT id
        FROM employees
        WHERE email = %s
        """,
        (email,)
    )

    existing_email = cursor.fetchone()

    if existing_email:
        cursor.close()

        return jsonify({
            "message": "Email already exists"
        }), 400

    # Insert employee
    cursor.execute(
        """
        INSERT INTO employees
        (
            employee_code,
            employee_name,
            email,
            mobile,
            department_id,
            designation
        )
        VALUES (%s,%s,%s,%s,%s,%s)
        """,
        (
            employee_code,
            employee_name,
            email,
            mobile,
            department_id,
            designation
        )
    )

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "message": "Employee added successfully"
    }), 201
@employee_bp.route("/employees", methods=["GET"])
@jwt_required()
def get_employees():

    search = request.args.get("search")

    cursor = mysql.connection.cursor()

    if search:

        cursor.execute(
            """
            SELECT
                employee_code,
                employee_name,
                email,
                mobile,
                department_id,
                designation,
                status
            FROM employees
            WHERE
                employee_code LIKE %s
                OR employee_name LIKE %s
                OR email LIKE %s
            """,
            (
                f"%{search}%",
                f"%{search}%",
                f"%{search}%"
            )
        )

    else:

        cursor.execute(
            """
            SELECT
                employee_code,
                employee_name,
                email,
                mobile,
                department_id,
                designation,
                status
            FROM employees
            """
        )

    employees = cursor.fetchall()

    cursor.close()

    employee_list = []

    for employee in employees:

        employee_list.append({
            "employee_code": employee[0],
            "employee_name": employee[1],
            "email": employee[2],
            "mobile": employee[3],
            "department_id": employee[4],
            "designation": employee[5],
            "status": employee[6]
        })

    return jsonify(employee_list), 200
@employee_bp.route("/employees/<employee_code>", methods=["GET"])
@jwt_required()
def get_employee(employee_code):

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        SELECT
            employee_code,
            employee_name,
            email,
            mobile,
            department_id,
            designation,
            status
        FROM employees
        WHERE employee_code = %s
        """,
        (employee_code,)
    )

    employee = cursor.fetchone()

    cursor.close()

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({
        "employee_code": employee[0],
        "employee_name": employee[1],
        "email": employee[2],
        "mobile": employee[3],
        "department_id": employee[4],
        "designation": employee[5],
        "status": employee[6]
    }), 200
@employee_bp.route("/employees/<employee_code>", methods=["PUT"])
@jwt_required()
def update_employee(employee_code):

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    data = request.get_json()

    employee_name = data.get("employee_name")
    email = data.get("email")
    mobile = data.get("mobile")
    department_id = data.get("department_id")
    designation = data.get("designation")
    status = data.get("status")

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        UPDATE employees
        SET
            employee_name = %s,
            email = %s,
            mobile = %s,
            department_id = %s,
            designation = %s,
            status = %s
        WHERE employee_code = %s
        """,
        (
            employee_name,
            email,
            mobile,
            department_id,
            designation,
            status,
            employee_code
        )
    )

    mysql.connection.commit()

    if cursor.rowcount == 0:
        cursor.close()

        return jsonify({
            "message": "Employee not found"
        }), 404

    cursor.close()

    return jsonify({
        "message": "Employee updated successfully"
    }), 200
@employee_bp.route("/employees/<employee_code>", methods=["DELETE"])
@jwt_required()
def delete_employee(employee_code):

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        DELETE FROM employees
        WHERE employee_code = %s
        """,
        (employee_code,)
    )

    mysql.connection.commit()

    if cursor.rowcount == 0:
        cursor.close()

        return jsonify({
            "message": "Employee not found"
        }), 404

    cursor.close()

    return jsonify({
        "message": "Employee deleted successfully"
    }), 200
    