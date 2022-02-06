from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    role = db.Column(db.String, default="user")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @staticmethod
    def generate_hash(password):
        return generate_password_hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return check_password_hash(hash, password)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        fields = ("name", "email", "image")

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    lists = db.relationship("List", uselist=True, backref="projects")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class List(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    tasks = db.relationship("Task", uselist=True, backref="lists")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String, nullable=False, default="New")
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task




class ListSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = List



class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project




class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)
