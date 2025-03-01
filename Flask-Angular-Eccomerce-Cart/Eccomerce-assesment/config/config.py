class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:root@localhost/ecommerce'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'static/images'
