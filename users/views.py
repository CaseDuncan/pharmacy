from rest_framework.viewsets import ModelViewset
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from datetime import datetime
from users.serializer import (CustomUserSerializer, LoginSerializer)
from users.models import CustomUser


class CreateUserView(modelViewSet):
    http_method_names = ["post"]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer()

    def Create(self, request):
        valid_request = self.serializer_class(data=request.data)
        valid_request.is_valid(raise_exception=True)

        CustomUser.objects.create(**valid_request.validated_data)
        return Response(
            {"success":"user created successfully"},
            status=status.HTTP_201_CREATED
        )
        
class LoginView(ModelViewset):
    http_method_names =["post"]
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer
    
    def jls_extract_def(self, user):
        if user:
            user = user["email"]
        return user

    def create(self,request):  # sourcery skip: raise-specific-error, remove-unnecessary-else, swap-if-else-branches
        valid_request = self.serializer_class(data=request.data)
        valid_request.is_valid(raise_exception=True)
        
        new_user = valid_request.validated_data["is_new_user"]
        
        if new_user:
            user = CustomUser.objects.filter(email= valid_request.validated_data["email"])
            user = self.jls_extract_def(user)
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
        # access = get_access_token({"user_id":user.id})
        user.last_login = datetime.now()
        user.save()
            

