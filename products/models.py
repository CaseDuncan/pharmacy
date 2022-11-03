from django.db import models
from users.models import CustomUser, UserActivities

# Create your models here.
class Category(models,Model):
    created_by = models.ForeignKey(CustomUser, null=True, related_name="Categories",on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering=['created_at']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.old_name = self.name
    
    def save(self, *args, **kwargs):
        action = f"added new category {self.name}"
        if self.pk is not None:
            action = f"updated category {self.old_name}"
            super().save(*args, **kwargs)
            user_activity(self.created_by, action=action)
            
    def delete(self, *args, **kwargs):
        created_by = self.created_by
        action = f"deleted category {self.name}"
        super().delete(*args, **kwargs)
        user_activity(self.created_by, action=action)
        
class Product(models.Model):
    created_by = models.ForeignKey(CustomUser, null=True, related_name="Categories",on_delete=models.SET_NULL)
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
    
    def save(self,*args, **kwargs):
        is_new = self.pk = None

        if is_new:
            self.instock = self.quantity
        super().save(*args, **kwargs)

        action = "created new item"
        
        if not is_new:
            f"updated item {self.name}"
        
        user_activity(self.created_by, action=action)
        
    def delete(self, *args, **kwargs):
        created_by = self.created_by
        action = f"deleted item {self.name}"
        super().delete(*args,**kwargs)
        user_activity(self.created_by, action=action)
    
    def __str__(self):
        return f"{self.name}, {self.category}"
    