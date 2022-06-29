from flask import Flask
from flask_migrate import Migrate
from flasgger import Swagger
from flask_jwt_extended import JWTManager
import config
from models import db, ma
from routes.auth import auth_endpoint
from routes.task import task_endpoint
from routes.project import project_endpoint
from routes.list import list_endpoint
from flask_cors import CORS

swagger_template = {
  "swagger": "2.0",
  "info": {
    "title": "task-planner API",
    "description": "",
    "version": "1.0.0"
  },
}

app = Flask(__name__)
app.config.from_object(config.Config)
CORS(app)
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)
swagger = Swagger(app, template=swagger_template)
jwt = JWTManager(app)

app.register_blueprint(auth_endpoint)
app.register_blueprint(task_endpoint)
app.register_blueprint(project_endpoint)
app.register_blueprint(list_endpoint)

@app.route('/')
def index():
    return {'name': 'task-planner API', 'version': '1.0'}
