from werkzeug.security import generate_password_hash

users = [
    ("priya", "EMP004"),
    ("arjun", "EMP005"),
    ("sophia", "EMP006"),
    ("rahul", "EMP007"),
    ("ananya", "EMP008"),
    ("noah", "EMP009"),
    ("karthik", "EMP010"),
    ("meera", "EMP011"),
    ("charlotte", "EMP012"),
    ("vikram", "EMP013")
]

print("INSERT INTO users (username, password, role, employee_code) VALUES")

for i, (username, employee_code) in enumerate(users):

    hashed_password = generate_password_hash(username)

    ending = "," if i < len(users) - 1 else ";"

    print(
        f"('{username}', "
        f"'{hashed_password}', "
        f"'employee', "
        f"'{employee_code}')"
        + ending
    )