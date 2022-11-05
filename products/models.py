from django.db import models
from users.models import CustomUser
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering=['-created_at']
    
    def __str__(self):
        return self.name
        
class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    batch_no = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name="Products", on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()
    price = models.FloatField(default=0)
    instock = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering=['created_at']
    
    def __str__(self):
        return f"{self.name}, {self.category}"
    