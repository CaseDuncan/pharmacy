from rest_framework import serializers
from products.models import Category, Product
from users.serializers import CustomUserSerializer

class CategorySerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    total_products = serializers.CharField(read_only=True, required=False)
    class Meta:
        model = Category
        fields ="__all__"


class ProductSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"