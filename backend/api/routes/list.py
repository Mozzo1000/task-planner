from flask import Blueprint, request, jsonify
from models import List, ListSchema, db

list_endpoint = Blueprint('list', __name__)

@list_endpoint.route("/v1/lists/<id>")
def get_list(id):
    list_schema = ListSchema(many=False)
    list = List.query.get(id)
    return jsonify(list_schema.dump(list))

@list_endpoint.route("/v1/lists")
def get_lists():
    list_schema = ListSchema(many=True)
    list = List.query.get(id)
    return jsonify(list_schema.dump(list))

@list_endpoint.route("/v1/lists", methods=["POST"])
def add_list():
    if not "name" in request.json or "project_id" not in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name and/or project_id not given"
        }), 400
    new_list = List(name=request.json["name"], project_id=request.json["project_id"])

    new_list.save_to_db()
    return {
        "id": new_list.id,
        "name": new_list.name,
        "project_id": new_list.project_id,
        "created_at": new_list.created_at
    }, 201

@list_endpoint.route('/v1/lists/<id>', methods=["DELETE"])
def remove_list(id):
    list = List.query.get(id)
    try: 
        db.session.delete(list)
        db.session.commit()
        return jsonify({'message': f'List {id} successfully removed'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500
