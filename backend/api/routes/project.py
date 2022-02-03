from flask import Blueprint, request, jsonify
from models import Project, ProjectSchema, db

project_endpoint = Blueprint('project', __name__)

@project_endpoint.route("/v1/projects/<id>")
def get_project(id):
    project_schema = ProjectSchema(many=False)
    project = Project.query.get(id)
    return jsonify(project_schema.dump(project))

@project_endpoint.route("/v1/projects")
def get_projects():
    project_schema = ProjectSchema(many=True)
    project = Project.query.get(id)
    return jsonify(project_schema.dump(project))

@project_endpoint.route("/v1/projects", methods=["POST"])
def add_project():
    if not "name" in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name not given"
        }), 400
    new_project = Project(name=request.json["name"])

    new_project.save_to_db()
    return {
        "id": new_project.id,
        "name": new_project.name,
        "created_at": new_project.created_at
    }, 201

@project_endpoint.route('/v1/projects/<id>', methods=["DELETE"])
def remove_project(id):
    project = Project.query.get(id)
    try: 
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': f'Project {id} successfully removed'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500
