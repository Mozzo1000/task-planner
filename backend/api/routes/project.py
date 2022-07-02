from flask import Blueprint, request, jsonify
from api.models import Project, ProjectSchema, ProjectListSchema,  db, User
from flask_jwt_extended import (jwt_required, get_jwt_identity)


project_endpoint = Blueprint('project', __name__)

@project_endpoint.route("/v1/projects/lists/<id>")
@jwt_required()
def get_project_lists(id):
    project_list_schema = ProjectListSchema(many=False)
    project = Project.query.filter_by(owner_id=User.find_by_email(get_jwt_identity()).id, id=id).first()
    return jsonify(project_list_schema.dump(project))


@project_endpoint.route("/v1/projects/<id>")
@jwt_required()
def get_project(id):
    project_schema = ProjectSchema(many=False)
    project = Project.query.filter_by(owner_id=User.find_by_email(get_jwt_identity()).id, id=id).first()
    return jsonify(project_schema.dump(project))

@project_endpoint.route("/v1/projects")
@jwt_required()
def get_projects():
    project_schema = ProjectSchema(many=True)
    if request.args.get('include_lists'):
        include_lists = request.args.get('include_lists').lower()
        if include_lists == "true":
            project_schema = ProjectListSchema(many=True)
    project = Project.query.filter_by(owner_id=User.find_by_email(get_jwt_identity()).id).all()
    return jsonify(project_schema.dump(project))

@project_endpoint.route("/v1/projects", methods=["POST"])
@jwt_required()
def add_project():
    if not "name" in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name not given"
        }), 400
    new_project = Project(owner_id=User.find_by_email(get_jwt_identity()).id, name=request.json["name"])

    new_project.save_to_db()
    return {
        "id": new_project.id,
        "name": new_project.name,
        "created_at": new_project.created_at
    }, 201

@project_endpoint.route('/v1/projects/<id>', methods=["DELETE"])
@jwt_required()
def remove_project(id):
    project = Project.query.get(id)
    try: 
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': f'Project {id} successfully removed'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500
