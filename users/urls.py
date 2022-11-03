from django.urls import path, include
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from users.views import CreateUserView, LoginView


router = DefaultRouter(trailing_slash=True)

router.register('register', CreateUserView, 'register')
router.register('login', LoginView, 'login')

urlpatterns =[
    path("", include(router.urls))
]