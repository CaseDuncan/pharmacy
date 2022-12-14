from django.db import models
from django.contrib.auth.models import (AbstractBaseUser,PermissionsMixin, BaseUserManager)
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _

Roles=(("admin", "admin"),("pharmacist","pharmacist"))
class CustomUserManager(BaseUserManager):

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)

        if extra_fields.get("is_active") is not True:
            raise ValueError(_("superusers must have is_active=True"))
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("superusers must have is_staff=True"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("superusers must have is_superuser=True"))
        
        if not email:
            raise ValueError(_("Email is required"))
        return self.create_user(email, password, username, first_name, last_name, **extra_fields)
        
        def create(self, email, username, password, role,**extra_fields):
            if not email:
                raise ValueError('You must provide an email address')
            email = self.normalize(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save()
            return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("Username"), max_length=50, unique=True)
    email = models.EmailField(_("Email"), max_length=254, unique=True)
    first_name = models.CharField(_("First Name"), max_length=50)
    last_name = models.CharField(_("Last name"), max_length=50)
    is_staff = models.BooleanField(_("Is Staff"), default=False)
    is_superuser = models.BooleanField(_("Is Superuser"), default=False)
    is_active = models.BooleanField(_("Is Active"), default=True)
    role = models.CharField(_("Role"), max_length=50, choices=Roles)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    last_login = models.DateTimeField(_("Last Login"), null=True)
      
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['username', 'password']
  

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['created_at']

    @property
    def get_fullname(self):
        return f"{self.first_name} {self.last_name}"

