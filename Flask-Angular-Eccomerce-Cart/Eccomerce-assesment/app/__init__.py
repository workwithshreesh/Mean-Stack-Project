from flask import Flask
from flask import Flask, send_from_directory
from flask_cors import CORS 
from flask_migrate import Migrate
from config.config import Config 
from .db import db
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route('/images/<filename>')
    def get_image(filename):
        return send_from_directory(os.path.join(app.root_path, 'D:/New folder/Eccomerce-assesment/static/images'), filename)

    db.init_app(app)
    migrate = Migrate(app, db)  

    from app.models import product, cart

    from app.routes.product_routes import product_bp
    from app.routes.cart_routes import cart_bp
    
    app.register_blueprint(product_bp, url_prefix="/product")
    app.register_blueprint(cart_bp, url_prefix="/cart")
    
    return app
