from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from products import views


urlpatterns =[
    path('products/', views.ProductList.as_view(), name='products'),
    path('products/<int:pk>/', views.ProductDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)