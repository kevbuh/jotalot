# # from rest_framework_jwt.settings import api_settings

# UserModel = get_user_model()


# class UserSerializer(serializers.ModelSerializer):
#     token = serializers.SerializerMethodField()

#     # create function to create the user

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     # def get_token(self, obj):
#     #     jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#     #     jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#     #     payload = jwt_payload_handler(obj)
#     #     token = jwt_encode_handler(payload)
#     #     return token

#     class Meta:
#         model = UserModel
#         fields = "__all__"

#     # email = serializers.EmailField(required=True, validators=[
#     #                                UniqueValidator(queryset=User.objects.all())])

#     # username = serializers.CharField(required=True, max_length=24, validators=[
#     #     UniqueValidator(queryset=User.objects.all())])

#     # first_name = serializers.CharField(required=True, max_length=32)

#     # last_name = serializers.CharField(required=True, max_length=32)

#     # # from user.models import User

#     # class UserSerializer(serializers.ModelSerializer):
#     #     password = serializers.CharField(write_only=True)

#     #     def create(self, validated_data):
#     #         user = UserModel.objects.create_user(
#     #             username=validated_data['username'],
#     #             password=validated_data['password'],
#     #         )
#     #         return user


from rest_framework import serializers
from django.contrib.auth import get_user_model  # If used custom user model

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username']
