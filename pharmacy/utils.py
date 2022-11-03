import jwt
from datetime import datetime, timedelta
from django.conf import settings
from users.models import CustomUser
from rest_framework.pagination import PageNumberPagination

def get_access_token(payload, days):
    pass

def decodeJWT(bearer):
    pass