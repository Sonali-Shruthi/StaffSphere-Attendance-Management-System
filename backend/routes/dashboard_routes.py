from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from extensions import mysql

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def get_dashboard():

    cursor = mysql.connection.cursor()

    # Total Employees
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM employees
        """
    )
    total_employees = cursor.fetchone()[0]

    # Active Employees
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM employees
        WHERE status = 'Active'
        """
    )
    active_employees = cursor.fetchone()[0]

    # Present Today
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM attendance
        WHERE attendance_date = CURDATE()
        AND attendance_status = 'Present'
        """
    )
    present_today = cursor.fetchone()[0]

    # Absent Today
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM attendance
        WHERE attendance_date = CURDATE()
        AND attendance_status = 'Absent'
        """
    )
    absent_today = cursor.fetchone()[0]

    cursor.close()

    return jsonify({
        "total_employees": total_employees,
        "active_employees": active_employees,
        "present_today": present_today,
        "absent_today": absent_today
    }), 200

@dashboard_bp.route("/dashboard/department-count", methods=["GET"])
@jwt_required()
def department_count():

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        SELECT
            d.department_name,
            COUNT(e.id)
        FROM departments d
        LEFT JOIN employees e
            ON d.id = e.department_id
        GROUP BY d.department_name
        ORDER BY d.department_name
        """
    )

    results = cursor.fetchall()

    cursor.close()

    department_list = []

    for row in results:

        department_list.append({
            "department": row[0],
            "employee_count": row[1]
        })

    return jsonify(department_list), 200
