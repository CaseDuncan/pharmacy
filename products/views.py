from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from products.serializers import (CategorySerializer,ProductSerializer)
from products.models import (Category,Product)


class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True, context={"request":request})
            response ={"error":False, "message":"fetched categories data successfully", "data":serializer.data}
            return Response(response)
        except:
            response ={"error":True, "message":"an error occured while fetching category data"}
        return Response(response)
    
    def create(self, request):
        try:
            serializer = CategorySerializer(data=request.data)
            serializer.is_valid()
            serializer.save()
            response ={"error":False, "message":"category added successfully"}
            return Response(response)
        except:
            response ={"error":True, "message":"an error occured while saving category"}
        return Response(response)
                
category_list = CategoryViewSet.as_view({"get":"list"})
category_create = CategoryViewSet.as_view({"post":"create"})
category_update = CategoryViewSet.as_view({"put":"update"})

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={"request":request})
        response_dict={"error":False,"message":"all products","data":serializer.data}
        return Response(response_dict)
    def create(self, request):
        try:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                response ={"error":False, "message":"product added successfully"}
            return Response(response)
                
        except:
            response ={"error":True, "message":"an error occured while saving product"}
        return Response(response)
        
    def update(self, request, pk=None):
        try:
            queryset= Product.objects.all()
            product = get_object_or_404(queryset, pk=pk)
            serializer = ProductSerializer(product, data=request.data)
            serializer.is_valid()
            serializer.save()
            response ={"error":False, "message":"product updated successfully"}
            
        except:
            response ={"error":True, "message":"an error occured while updating product"}
        return Response(response)
            
        
product_list = ProductViewSet.as_view({"get":"list"})
product_create = ProductViewSet.as_view({"post":"create"})
product_update = ProductViewSet.as_view({"put":"update"})

