from flask import Blueprint, request, jsonify
from models import List, ListSchema, db, User, Task, TaskSchema
from flask_jwt_extended import (jwt_required, get_jwt_identity)

list_endpoint = Blueprint('list', __name__)

@list_endpoint.route("/v1/lists/<id>")
@jwt_required()
def get_list(id):
    list_schema = ListSchema(many=False)
    
    list = List.query.filter_by(owner_id=User.find_by_email(get_jwt_identity()).id, id=id).first()
    return jsonify(list_schema.dump(list))

@list_endpoint.route("/v1/lists/<id>/tasks")
@jwt_required()
def get_tasks_in_list(id):
    task_schema = TaskSchema(many=True)
    if request.args.get('status'):
        status = ""
        argument = request.args.get('status').lower()
        if argument == "completed":
            status = "Completed"
        elif argument == "in_progress":
            status = "In progress"
        elif argument == "not_started":
            status = "Not started"
        tasks = Task.query.filter_by(owner_id=User.find_by_email(get_jwt_identity()).id, list_id=id, status=status).all()
    else:
        tasks = Task.query.filter(Task.owner_id == User.find_by_email(get_jwt_identity()).id, Task.list_id == id, Task.status != "Completed").all()
    return jsonify(task_schema.dump(tasks))

@list_endpoint.route("/v1/lists", methods=["POST"])
@jwt_required()
def add_list():
    if not "name" in request.json or "project_id" not in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name and/or project_id not given"
        }), 400
    new_list = List(owner_id=User.find_by_email(get_jwt_identity()).id, name=request.json["name"], project_id=request.json["project_id"])

    new_list.save_to_db()
    return {
        "id": new_list.id,
        "name": new_list.name,
        "project_id": new_list.project_id,
        "created_at": new_list.created_at
    }, 201

@list_endpoint.route('/v1/lists/<id>', methods=["DELETE"])
@jwt_required()
def remove_list(id):
    list = List.query.get(id)
    try: 
        db.session.delete(list)
        db.session.commit()
        return jsonify({'message': f'List {id} successfully removed'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500
