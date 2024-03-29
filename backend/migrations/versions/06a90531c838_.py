"""empty message

Revision ID: 06a90531c838
Revises: 7e39c5ce2cd4
Create Date: 2022-02-06 18:42:32.712335

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '06a90531c838'
down_revision = '7e39c5ce2cd4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('owner_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'projects', 'users', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'projects', type_='foreignkey')
    op.drop_column('projects', 'owner_id')
    # ### end Alembic commands ###
