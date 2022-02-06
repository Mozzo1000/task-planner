"""empty message

Revision ID: 7e39c5ce2cd4
Revises: 875a19bf1878
Create Date: 2022-02-06 17:08:58.644261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7e39c5ce2cd4'
down_revision = '875a19bf1878'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('owner_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'tasks', 'users', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.drop_column('tasks', 'owner_id')
    # ### end Alembic commands ###
