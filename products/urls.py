from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from products import views


router = DefaultRouter(trailing_slash=True)

router.register('products', views.ProductViewSet, 'products')
router.register('categories', views.CategoryViewSet, basename='categories')


urlpatterns =[
    path("", include(router.urls))
]