from rest_framework import serializers
from users.models import CustomUser,Roles

class CustomUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    role = serializers.ChoiceField(Roles)
    password = serializers.CharField()
    
    def create(self,validated_data):
        return CustomUser.objects.create(**validated_data)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    is_new_user = serializers.BooleanField(default=False, required=False)