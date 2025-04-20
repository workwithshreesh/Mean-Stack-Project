import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app import db
from app.models.product import Product

product_bp = Blueprint("product", __name__)

UPLOAD_FOLDER = "static/images"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS



@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@product_bp.route("/<int:id>",methods=["GET"])
def get_products_byid(id):
    if id:
        product = Product.query.get_or_404(id)
        return jsonify(product.to_dict()), 200
    
    return jsonify("No data available for these id"), 400


@product_bp.route("/", methods=["POST"])
def add_product():
    name = request.form.get("name")
    price = request.form.get("price")
    description = request.form.get("description")
    file = request.files.get("image")


    print(name,file,description,price)
    if not name or not price or not file or not description:
        return jsonify({"error": "Name, price, and image are required"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        

        product = Product(name=name, price=float(price), image=file_path, description=description)
        db.session.add(product)
        db.session.commit()

        return jsonify(product.to_dict()), 201

    return jsonify({"error": "Invalid image format"}), 400


@product_bp.route("/<int:id>",methods=["PUT"])
def update_product(id):
    product = Product.query.get_or_404(id)

    name = request.form.get("name")
    price = request.form.get("price")
    description = request.form.get("description")
    file = request.files.get("image")

    if name:
        product.name = name

    if price:
        product.price = price

    if description:
        product.description = description

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        product.image = file_path
    
    db.session.commit()
    return jsonify(product.to_dict())



@product_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200



