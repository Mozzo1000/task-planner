from flask import Blueprint, request, jsonify
from models import Task, TaskSchema, db

task_endpoint = Blueprint('task', __name__)

@task_endpoint.route("/v1/tasks/<id>")
def get_task(id):
    task_schema = TaskSchema(many=False)
    task = Task.query.get(id)
    return jsonify(task_schema.dump(task))

@task_endpoint.route("/v1/tasks", methods=["POST"])
def add_task():
    if not "name" in request.json or "list_id" not in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name and/or list_id not given"
        }), 400

    if "description" in request.json:
        description = request.json["description"]
    else:
        description = None

    if "due_date" in request.json:
        due_date = request.json["due_date"]
    else:
        due_date = None
    
    new_task = Task(name=request.json["name"], list_id=request.json["list_id"], description=description, due_date=due_date)

    new_task.save_to_db()
    return {
        "id": new_task.id,
        "name": new_task.name,
        "project_id": new_task.project_id,
        "created_at": new_task.created_at
    }, 201

@task_endpoint.route('/v1/tasks/<id>', methods=["DELETE"])
def remove_task(id):
    task = Task.query.get(id)
    try: 
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': f'Task {id} successfully removed'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500
