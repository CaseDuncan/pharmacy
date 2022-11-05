from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate
from datetime import datetime
from users.serializers import (CustomUserSerializer, LoginSerializer)
from users.models import CustomUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CreateUserView(ModelViewSet):
    http_method_names = ["post"]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def Create(self, request):
        valid_request = self.serializer_class(data=request.data)
        valid_request.is_valid(raise_exception=True)

        CustomUser.objects.create(**valid_request.validated_data)
        return Response(
            {"success":"user created successfully"},
            status=status.HTTP_201_CREATED
        )
        
class LoginView(ModelViewSet):
    http_method_names =["post"]
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer

    def create(self,request):
        valid_request = self.serializer_class(data=request.data)
        valid_request.is_valid(raise_exception=True)
        
        new_user = valid_request.validated_data["is_new_user"]
        
        if new_user:
            user = CustomUser.objects.filter(email= valid_request.validated_data["email"])
            if user:
                user = user[0]
                if not user.password:
                    return Response({"user_id":user.id})
                else:
                    raise Exception("incorrect password")
        else:
            raise Exception("user with provided email not found")
        
        user = authenticate(
            username = valid_request.validated_data['email'],
            password = valid_request.validated_data.get("password", None)
        )
        
        if not user:
            return Response(
                {"error":"invalid email or password"},
                status=status.HTTP_400_BAD_REQUEST
                )
        access = get_access_token({"user_id":user.id})
        user.last_login = datetime.now()
        user.save()
        return Response({'access':access})
            

