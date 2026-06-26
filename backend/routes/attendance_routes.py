from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt
)

from extensions import mysql

attendance_bp = Blueprint("attendance", __name__)
@attendance_bp.route("/attendance", methods=["POST"])
@jwt_required()
def mark_attendance():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    data = request.get_json()

    employee_code = data.get("employee_id")
    attendance_date = data.get("attendance_date")
    check_in = data.get("check_in")
    check_out = data.get("check_out")
    attendance_status = data.get("attendance_status")

    cursor = mysql.connection.cursor()

    # 1. Check employee exists
    cursor.execute(
    """
    SELECT id, status
    FROM employees
    WHERE employee_code = %s
    """,
    (employee_code,)
)

    employee = cursor.fetchone()

    if not employee:
        cursor.close()
        return jsonify({
        "message": "Employee not found"
        }), 404
    
    employee_id = employee[0]
    employee_status = employee[1]

    if employee_status != "Active":
        cursor.close()
        return jsonify({
            "message": "Cannot mark attendance for inactive employee"
        }), 400

    # 2. Check duplicate attendance (IMPORTANT FINAL VALIDATION)
    cursor.execute(
        """
        SELECT id
        FROM attendance
        WHERE employee_id = %s AND attendance_date = %s
        """,
        (employee_id, attendance_date)
    )

    existing_attendance = cursor.fetchone()

    if existing_attendance:
        cursor.close()
        return jsonify({
            "message": "Attendance already marked for this date"
        }), 400

    # 3. Insert attendance
    cursor.execute(
        """
        INSERT INTO attendance
        (
            employee_id,
            attendance_date,
            check_in,
            check_out,
            attendance_status
        )
        VALUES (%s,%s,%s,%s,%s)
        """,
        (
            employee_id,
            attendance_date,
            check_in,
            check_out,
            attendance_status
        )
    )

    mysql.connection.commit()
    cursor.close()

    return jsonify({
        "message": "Attendance marked successfully"
    }), 201

@attendance_bp.route("/attendance", methods=["GET"])
@jwt_required()
def get_attendance():

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        SELECT
            a.id,
            e.employee_code,
            e.employee_name,
            a.attendance_date,
            a.check_in,
            a.check_out,
            a.attendance_status
        FROM attendance a
        JOIN employees e
            ON a.employee_id = e.id
        ORDER BY attendance_date DESC,
        check_in DESC
        """
    )

    records = cursor.fetchall()

    cursor.close()

    attendance_list = []

    for record in records:

        attendance_list.append({
             "id": record[0],
             "employee_code": record[1],
             "employee_name": record[2],
             "attendance_date": str(record[3]),
             "check_in": str(record[4]),
             "check_out": str(record[5]),
             "attendance_status": record[6]
        })

    return jsonify(attendance_list), 200

@attendance_bp.route("/attendance/employee/<employee_code>", methods=["GET"])
@jwt_required()
def get_employee_attendance(employee_code):

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        SELECT
            e.employee_code,
            e.employee_name,
            a.attendance_date,
            a.check_in,
            a.check_out,
            a.attendance_status
        FROM attendance a
        JOIN employees e
            ON a.employee_id = e.id
        WHERE e.employee_code = %s
        ORDER BY a.attendance_date DESC
        """,
        (employee_code,)
    )

    records = cursor.fetchall()

    cursor.close()

    if not records:
        return jsonify({
            "message": "No attendance records found"
        }), 404

    attendance_history = []

    for record in records:

        attendance_history.append({
            "employee_code": record[0],
            "employee_name": record[1],
            "attendance_date": str(record[2]),
            "check_in": str(record[3]),
            "check_out": str(record[4]),
            "attendance_status": record[5]
        })

    return jsonify(attendance_history), 200

@attendance_bp.route("/attendance/summary/<employee_code>", methods=["GET"])
@jwt_required()
def attendance_summary(employee_code):

    cursor = mysql.connection.cursor()

    cursor.execute(
        """
        SELECT
            e.employee_code,
            e.employee_name,

            SUM(
                CASE
                    WHEN a.attendance_status = 'Present'
                    THEN 1
                    ELSE 0
                END
            ) AS present_count,

            SUM(
                CASE
                    WHEN a.attendance_status = 'Absent'
                    THEN 1
                    ELSE 0
                END
            ) AS absent_count,

            SUM(
                CASE
                    WHEN a.attendance_status = 'Leave'
                    THEN 1
                    ELSE 0
                END
            ) AS leave_count,

            SUM(
                CASE
                    WHEN a.attendance_status = 'WFH'
                    THEN 1
                    ELSE 0
                END
            ) AS wfh_count

        FROM employees e

        LEFT JOIN attendance a
            ON e.id = a.employee_id

        WHERE e.employee_code = %s

        GROUP BY
            e.employee_code,
            e.employee_name
        """,
        (employee_code,)
    )

    summary = cursor.fetchone()

    cursor.close()

    if not summary:
        return jsonify({
            "message": "Employee not found"
        }), 404
    print(summary)
    print(type(summary[2]))
    print(type(summary[3]))
    return jsonify({
        "employee_code": summary[0],
        "employee_name": summary[1],
        "present": int(summary[2] or 0),
        "absent": int(summary[3] or 0),
        "leave": int(summary[4] or 0),
        "wfh": int(summary[5] or 0)
    }), 200
