from flask import Blueprint, request, jsonify
from app import db
from app.models.cart import Cart
from app.models.product import Product

cart_bp = Blueprint("cart", __name__)

@cart_bp.route("/", methods=["POST"])
def add_to_cart():
    data = request.json
    product_id = data.get("product_id")

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    cart_item = Cart(product_id=product_id)
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({"message": "Added to cart successfully"}), 201

@cart_bp.route("/", methods=["GET"])
def get_cart_items():
    cart_items = Cart.query.join(Product, Cart.product_id == Product.id).all()
    return jsonify([{
        "id":item.id,
        "product":item.product.to_dict() if item.product else None
    } for item in cart_items])


@cart_bp.route("/<int:id>", methods=["DELETE"])
def delete_cart(id):
    try:
        product = Cart.query.get_or_404(id) 
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Cart deleted successfully", "cart_id": id}), 200
    except Exception as e:
        db.session.rollback()  
        return jsonify({"error": "Failed to delete cart", "details": str(e)}), 500



