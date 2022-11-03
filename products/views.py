from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from products.serializers import (CategorySerializer,ProductSerializer)
from products.models import (Category,Product)
from pharmacy.custom_methods import isAuthenticated

class ProductViewSet(ModelViewSet):
    products = Product.objects.select_related('category', 'created_by')
    serializer_class = ProductSerializer
    permission_classes = (isAuthenticated,)
    
class CategoryViewSet(ModelViewSet):
    categories = Category.objects.select_related('created_by').prefetch_related('products')
    serializer_class = CategorySerializer
    permission_classes = (isAuthenticated,)